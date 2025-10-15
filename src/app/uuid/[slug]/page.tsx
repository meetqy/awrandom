import { Core } from "./core";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <Core slug={slug} />;
}
