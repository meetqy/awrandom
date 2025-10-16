import Link from "next/link";

import { Button } from "@/components/ui/button";
import { navMain } from "@/lib/sidebar";

export default function Page() {
  return (
    <div className="p-4">
      <section className="prose max-w-screen-lg">
        <h1>Welcome to awrandom!</h1>
        <p>Select a generator from the options below to get started.</p>
      </section>

      <div className="mt-8 space-y-8">
        {navMain.map((section) => (
          <div key={section.title} className="space-y-4">
            <h2 className="text-2xl font-bold">{section.title}</h2>
            <div className="flex flex-wrap gap-4">
              {section.items.map((item) => (
                <Link href={item.url} key={item.url}>
                  <Button size="lg" variant={"outline"}>
                    Random {item.title} Generator
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
