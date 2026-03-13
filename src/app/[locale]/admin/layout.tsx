import type { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050608] via-[#05090B] to-[#050607] text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl px-6 py-8 sm:px-10">
        <aside className="w-60 pr-6">
          <div className="sticky top-8 flex flex-col gap-6">
            <div>
              <p className="text-[13px] font-medium uppercase tracking-[0.22em] text-emerald-300/80">
                Admin dashboard
              </p>
              <p className="mt-1 text-xs text-white/60">
                Gestion des messages et des articles.
              </p>
            </div>
            <nav className="flex flex-col gap-2 text-sm">
              <Link
                href="./messages"
                className="block rounded-md px-3 py-2 text-sm text-white/80 hover:bg-white/5"
              >
                Messages contact
              </Link>
              <Link
                href="./blog"
                className="block rounded-md px-3 py-2 text-sm text-white/80 hover:bg-white/5"
              >
                Articles du blog
              </Link>
            </nav>
          </div>
        </aside>
        <div className="flex-1 flex flex-col">
          <header className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-[13px] font-medium uppercase tracking-[0.22em] text-emerald-300/80">
                Admin dashboard
              </p>
            </div>
          </header>
          <main className="flex-1 pb-10">{children}</main>
        </div>
      </div>
    </div>
  );
}

