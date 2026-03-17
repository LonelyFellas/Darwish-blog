import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "技术博客",
    template: "%s · 技术博客",
  },
  description: "用 Next.js + MDX 搭建的个人技术博客。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body className="min-h-dvh bg-zinc-50 text-zinc-950 antialiased dark:bg-zinc-950 dark:text-zinc-100">
        <header className="sticky top-0 z-10 border-b border-zinc-200/80 bg-white/90 backdrop-blur-sm dark:border-zinc-800/80 dark:bg-zinc-950/90">
          <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="text-sm font-semibold tracking-tight text-zinc-950 transition-colors hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-400"
            >
              技术博客
            </Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link
                href="/"
                className="text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                首页
              </Link>
              <a
                className="text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100"
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </nav>
          </div>
        </header>

        {children}

        <footer className="mt-20 border-t border-zinc-200/80 py-12 text-sm text-zinc-500 dark:border-zinc-800/80 dark:text-zinc-500">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-2 px-6 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} 技术博客</span>
            <div className="flex gap-6">
              <Link
                href="/"
                className="transition-colors hover:text-zinc-800 dark:hover:text-zinc-300"
              >
                首页
              </Link>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-zinc-800 dark:hover:text-zinc-300"
              >
                GitHub
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
