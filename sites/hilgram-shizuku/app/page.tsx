import ProfileClient from "./profile-client";

export default async function Page({ searchParams }: { searchParams: Promise<{ record?: string }> }) {
  const params = await searchParams;
  return <ProfileClient initialMode={params.record === "sealed" ? "secret" : "public"} />;
}
