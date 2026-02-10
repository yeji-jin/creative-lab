import Link from "next/link";
import { notFound } from "next/navigation";
import { workItems } from "@/work/data";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const item = workItems.find((i) => i.id === Number(id));
  if (!item) return { title: "Not Found" };
  return { title: item.title, description: `${item.category} · ${item.year}` };
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { id } = await params;
  const item = workItems.find((i) => i.id === Number(id));
  if (!item) notFound();

  return (
    <article>
      <Link
        href="/work"
        className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
      >
        ← Work
      </Link>
      <header className="mt-4">
        <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">
          {item.title}
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          {item.category} · {item.year}
        </p>
      </header>
      {item.component && (
        <section className="mt-8">{item.component}</section>
      )}
    </article>
  );
}
