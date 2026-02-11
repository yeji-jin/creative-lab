import Link from "next/link";
import { notFound } from "next/navigation";
import { workItems } from "@/work/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { workItems } = await import("@/work/data");
  return workItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const item = workItems.find((i) => i.slug === slug);
  if (!item) return { title: "Not Found" };
  return { title: item.title, description: `${item.category} · ${item.year}` };
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = workItems.find((i) => i.slug === slug);
  if (!item) notFound();

  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
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
          <p className="mt-4 text-sm text-neutral-500">
            {item.category} · {item.year}
          </p>
        </header>
      </div>
      {item.component && <article className="mt-10">{item.component}</article>}
    </>
  );
}
