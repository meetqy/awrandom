import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { getBreadcrumbItems } from "@/lib/sidebar";
import { cn } from "@/lib/utils";

export default async function Page({ params }: { params: Promise<{ catchAll: string[] }> }) {
  const { catchAll } = await params;
  const items = getBreadcrumbItems("/" + catchAll.join("/"));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
              {item.isCurrentPage || !item.href ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < items.length - 1 && <BreadcrumbSeparator className={cn("pl-1", index === 0 ? "hidden md:block" : "")} />}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
