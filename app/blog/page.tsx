import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "Creative Lab 블로그",
};

const posts = [
  {
    slug: "first-post",
    title: "첫 번째 글",
    date: "2024-01-15",
    excerpt: "App Router와 라우트 그룹에 대한 소개입니다.",
  },
  {
    slug: "second-post",
    title: "두 번째 글",
    date: "2024-02-01",
    excerpt: "Next.js 14의 주요 기능을 살펴봅니다.",
  },
];

export default function BlogPage() {
  return (
    <article>
      <h1 className="text-2xl font-bold text-neutral-900 sm:text-3xl">Blog</h1>
      <p className="mt-4 leading-relaxed text-neutral-600">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur
        dignissimos tenetur fuga quod sequi quasi ducimus,
      </p>
      <ul className="mt-8 space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="block rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-colors hover:border-neutral-300 hover:bg-neutral-50/50"
            >
              <time className="text-sm text-neutral-500">{post.date}</time>
              <h2 className="mt-1 font-semibold text-neutral-900">
                {post.title}
              </h2>
              <p className="mt-2 text-sm text-neutral-600">{post.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
