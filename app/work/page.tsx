import Link from "next/link";
import { workItems } from "@/work/data";

export const metadata = {
  title: "Work",
  description: "Creative Lab 작업 목록",
};

function getCategoryBadgeStyles(category: string) {
  const base = "inline-block rounded-full px-3 py-1 text-xs font-medium";
  const styles: Record<string, string> = {
    Branding: "bg-amber-100 text-amber-800",
    Web: "bg-blue-100 text-blue-800",
    Motion: "bg-violet-100 text-violet-800",
  };
  return `${base} ${styles[category] ?? "bg-neutral-100 text-neutral-700"}`;
}

export default function WorkPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">Work</h1>
      <p className="mt-4 leading-relaxed text-neutral-600">
        진행한 프로젝트와 작업 목록입니다
      </p>
      <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {workItems.map((item) => (
          <li key={item.id}>
            <Link
              href={`/work/${item.slug}`}
              className="block min-h-32 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-colors hover:border-neutral-300"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-semibold text-neutral-900">{item.title}</h2>
                <span className="text-sm text-neutral-500">{item.year}</span>
              </div>
              <span className={`mt-2 ${getCategoryBadgeStyles(item.category)}`}>
                {item.category}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
