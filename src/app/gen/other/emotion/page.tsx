import { getNavMainItem } from "@/lib/sidebar";

import { Generator } from "./generator";

const item = getNavMainItem(`/gen/other/emotion`);

export const metadata = {
  title: `Random ${item ? item.title : "Emotion"} Generator`,
  description: `Generate random ${item ? item.title : "Emotion"} for testing and development purposes.`,
};

export default function Page() {
  return (
    <div className="space-y-12 p-4">
      <article className="prose max-w-screen-lg">
        <h1>{metadata.title}</h1>
        <p>{metadata.description}</p>
      </article>

      <div className="max-w-screen-lg">
        <Generator />
      </div>
    </div>
  );
}
