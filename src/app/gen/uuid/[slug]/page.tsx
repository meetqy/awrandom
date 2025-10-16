import { notFound } from "next/navigation";

import { getNavMainItem } from "@/lib/sidebar";

import { GeneratorUUID } from "./generator";

import type { Metadata } from "next";

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
  const { slug } = await params;

  const item = getNavMainItem(`/gen/uuid/${slug}`);

  if (!item) {
    notFound();
  }

  return {
    title: `Random ${item.title} Generator`,
    description: `Generate random ${item.title} for testing and development purposes.`,
  };
};

export default async function Layout({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const item = getNavMainItem(`/gen/uuid/${slug}`);

  if (!item) {
    notFound();
  }

  return (
    <div className="space-y-12 p-4">
      <article className="prose max-w-screen-lg">
        <h1>Random {item.title} Generator</h1>
        <p>
          Generate random Universally Unique Identifiers (UUID) for testing and development purposes. UUIDs are unique 36-character strings used to identify
          information in computer systems.
        </p>
      </article>

      <section className="max-w-screen-lg">
        <GeneratorUUID defaultVersion={slug} />
      </section>
    </div>
  );
}
