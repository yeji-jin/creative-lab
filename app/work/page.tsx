import Link from "next/link";
import { workItems } from "@/work/data";

export const metadata = {
  title: "Work",
  description: "Creative Lab 작업 목록",
};

export default function WorkPage() {
  return (
    <article>
      <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">Work</h1>
      <p className="mt-4 leading-relaxed text-neutral-600">
        진행한 프로젝트와 작업 목록입니다
      </p>
      <ul className="mt-8 grid grid-cols-3 gap-6">
        {workItems.map((item) => (
          <li key={item.id}>
            <Link
              href={`/work/${item.id}`}
              className="block rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-colors hover:border-neutral-300"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-semibold text-neutral-900">{item.title}</h2>
                <span className="text-sm text-neutral-500">{item.year}</span>
              </div>
              <p className="mt-1 text-sm text-neutral-600">{item.category}</p>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
