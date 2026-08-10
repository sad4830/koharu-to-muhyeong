# Character Site Factory

This repository is the user's permanent character-site deployment factory.

- Preserve the existing Koharu site at the repository root.
- Put each new character site in `sites/<lowercase-slug>/` as a standalone,
  production-ready Vercel project.
- Add `sites/<slug>/site.factory.json` with `project` equal to the directory
  slug. Choose a new slug when that Vercel project belongs to another site.
- Keep each site self-contained, including its package and lock files, framework
  configuration, assets, and `vercel.json` when needed.
- Validate the changed site locally before publishing it.
- Publish to `main`; `.github/workflows/deploy-character-sites.yml` creates or
  reuses the Vercel project and deploys only changed sites.
- Do not create another GitHub repository or ask the user to import a project in
  the Vercel dashboard for routine character-site work.
- Never commit Vercel credentials or `.vercel/` directories. If deployment says
  `VERCEL_TOKEN` is missing, ask for the one-time repository-secret setup only;
  never ask the user to paste the token into chat.
- Do not add the local `vercel-static/` directory.
- Do not also import factory-managed projects through Vercel Git integration;
  that would deploy the same push twice.
