import { appendFileSync, existsSync, readFileSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, posix, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const workflowPath = ".github/workflows/deploy-character-sites.yml";
const scriptPath = "scripts/discover-factory-sites.mjs";
const zeroSha = /^0+$/;
const sitePathPattern = /^sites\/[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const projectPattern = /^[a-z0-9](?:[a-z0-9-]{0,98}[a-z0-9])?$/;

function git(...args) {
  return execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function allSitePaths() {
  const paths = [];

  if (existsSync(join(root, "site.factory.json"))) {
    paths.push(".");
  }

  const sitesRoot = join(root, "sites");
  if (existsSync(sitesRoot)) {
    for (const entry of readdirSync(sitesRoot, { withFileTypes: true })) {
      if (
        entry.isDirectory() &&
        existsSync(join(sitesRoot, entry.name, "site.factory.json"))
      ) {
        paths.push(posix.join("sites", entry.name));
      }
    }
  }

  return paths.sort();
}

function changedFiles() {
  const base = process.env.BASE_SHA?.trim();
  const head = process.env.HEAD_SHA?.trim() || "HEAD";

  if (!base || zeroSha.test(base)) {
    return git("show", "--pretty=", "--name-only", "--diff-filter=ACMRT", head)
      .split("\n")
      .filter(Boolean);
  }

  return git("diff", "--name-only", "--diff-filter=ACMRT", base, head, "--")
    .split("\n")
    .filter(Boolean);
}

function isRootSiteFile(file) {
  return (
    /^(app|components|lib|pages|public|src|styles)\//.test(file) ||
    /^(package(?:-lock)?\.json|pnpm-lock\.yaml|yarn\.lock)$/.test(file) ||
    /^(next\.config\.|tsconfig|postcss\.config\.|tailwind\.config\.|vercel\.json)/.test(
      file,
    ) ||
    file === "site.factory.json"
  );
}

function normalizeRequestedSite(requested) {
  if (requested === "." || requested === "root") {
    return ".";
  }

  const normalized = requested.startsWith("sites/")
    ? requested.replace(/\/$/, "")
    : `sites/${requested.replace(/\/$/, "")}`;

  if (!sitePathPattern.test(normalized)) {
    throw new Error(
      `Invalid site path "${requested}". Use "." or "sites/<slug>".`,
    );
  }

  return normalized;
}

function selectedSitePaths() {
  const requested = process.env.FACTORY_SITE?.trim();
  if (requested) {
    return [normalizeRequestedSite(requested)];
  }

  const files = changedFiles();
  const infraChanged = files.some(
    (file) => file === workflowPath || file === scriptPath,
  );

  if (infraChanged) {
    return allSitePaths();
  }

  const paths = new Set();
  for (const file of files) {
    const match = file.match(/^(sites\/[^/]+)\//);
    if (match && sitePathPattern.test(match[1])) {
      paths.add(match[1]);
    } else if (isRootSiteFile(file)) {
      paths.add(".");
    }
  }

  return [...paths].sort();
}

function readSite(path) {
  if (path !== "." && !sitePathPattern.test(path)) {
    throw new Error(`Unsafe site path: ${path}`);
  }

  const manifestPath = join(root, path, "site.factory.json");
  if (!existsSync(manifestPath)) {
    throw new Error(`Missing ${posix.join(path, "site.factory.json")}`);
  }

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  if (
    typeof manifest.project !== "string" ||
    !projectPattern.test(manifest.project)
  ) {
    throw new Error(
      `${posix.join(path, "site.factory.json")}: project must be a lowercase Vercel project slug.`,
    );
  }

  if (path !== "." && posix.basename(path) !== manifest.project) {
    throw new Error(
      `${posix.join(path, "site.factory.json")}: project must match the site directory slug.`,
    );
  }

  if (!existsSync(join(root, path, "package.json"))) {
    throw new Error(`${path}: package.json is required.`);
  }

  return { path, project: manifest.project };
}

const include = selectedSitePaths().map(readSite);
const matrix = JSON.stringify({ include });

console.log(matrix);

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `matrix=${matrix}\n`);
  appendFileSync(process.env.GITHUB_OUTPUT, `count=${include.length}\n`);
}
