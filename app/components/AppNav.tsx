"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const NAV_LINKS = [
  { href: "/", label: "홈" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

export default function AppNav({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav className="flex h-14 items-center justify-between">
            <Link
              href="/"
              className="text-lg font-semibold text-neutral-900 transition-colors hover:text-neutral-600"
            >
              Creative Lab
            </Link>
            <ul className="flex gap-6">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`text-sm font-medium transition-colors ${
                      pathname === href
                        ? "text-neutral-900"
                        : "text-neutral-500 hover:text-neutral-900"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {children}
      </main>

      <footer className="border-t border-neutral-200 bg-white py-8">
        <div className="mx-auto max-w-4xl px-4 text-center text-sm text-neutral-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Creative Lab. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
