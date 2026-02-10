import Link from "next/link";

export const metadata = {
  title: "홈",
  description: "Creative Lab 메인 페이지",
};

export default function RootPage() {
  return (
    <section className="py-12 text-center sm:py-20">
      <h1 className="text-3xl font-bold text-neutral-900 sm:text-4xl">
        Creative Lab (Root)
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/work"
          className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
        >
          Work
        </Link>
        <Link
          href="/about"
          className="rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
        >
          Contact
        </Link>
        <Link
          href="/blog"
          className="rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
        >
          Blog
        </Link>
      </div>
      <section className="mt-16 grid gap-8 sm:grid-cols-2 sm:gap-12">
        <article className="rounded-xl border border-neutral-200 bg-white p-6 text-left shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-900">(root)</h2>
          <p className="mt-2 flex text-sm text-neutral-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            repellendus a rerum veniam excepturi quibusdam similique quod
            voluptate est, aliquid laudantium voluptates eveniet repudiandae
            molestiae, debitis doloremque quas. Fugiat, vero.
          </p>
        </article>
        <article className="rounded-xl border border-neutral-200 bg-white p-6 text-left shadow-sm">
          <h2 className="text-lg font-semibold text-neutral-900">Sub</h2>
          <p className="mt-2 text-sm text-neutral-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            repellendus a rerum veniam excepturi quibusdam similique quod
            voluptate est, aliquid laudantium voluptates eveniet repudiandae
            molestiae, debitis doloremque quas. Fugiat, vero.
          </p>
        </article>
      </section>
    </section>
  );
}
