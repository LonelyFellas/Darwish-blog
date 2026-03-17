import Link from "next/link";

import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-14 sm:py-16">
      <header className="mb-14">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          技术博客
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-7 text-zinc-600 dark:text-zinc-400">
          用 Next.js + MDX 搭建的个人知识库，记录实践与思考。
        </p>
      </header>

      <main>
        {posts.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/50 px-6 py-10 text-center text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/30 dark:text-zinc-400">
            还没有文章。请在{" "}
            <code className="rounded bg-zinc-200 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
              content/posts
            </code>{" "}
            下新建{" "}
            <code className="rounded bg-zinc-200 px-1.5 py-0.5 text-sm dark:bg-zinc-800">
              .mdx
            </code>{" "}
            文件。
          </p>
        ) : (
          <ul className="space-y-5">
            {posts.map((p) => (
              <li key={p.slug} className="group">
                <Link
                  href={`/post/${p.slug}`}
                  className="block rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700 dark:hover:shadow-zinc-900/50"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-lg font-semibold text-zinc-900 decoration-zinc-400 underline-offset-4 transition-colors group-hover:underline group-hover:decoration-zinc-600 dark:text-zinc-100 dark:decoration-zinc-500 dark:group-hover:decoration-zinc-400">
                      {p.meta.title}
                    </h2>
                    <time
                      dateTime={p.meta.date}
                      className="shrink-0 text-sm text-zinc-500 dark:text-zinc-400"
                    >
                      {p.meta.date}
                    </time>
                  </div>
                  {p.meta.description ? (
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                      {p.meta.description}
                    </p>
                  ) : null}
                  {p.meta.tags?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.meta.tags.slice(0, 6).map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
