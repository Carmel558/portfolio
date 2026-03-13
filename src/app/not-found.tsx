import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#050608] via-[#05090B] to-[#050607] text-zinc-50">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(120,255,180,0.12),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(10,120,90,0.18),_transparent_55%)]" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-4 py-16 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-300/80">
          404
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          Page introuvable / Page not found
        </h1>
        <p className="mt-3 max-w-xl text-sm text-zinc-300">
          La page que vous cherchez n&apos;existe pas, ou a été déplacée.
          <br />
          The page you&apos;re looking for doesn&apos;t exist or was moved.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm">
          <Link
            href="/fr"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-medium text-zinc-900 shadow-sm transition hover:bg-emerald-300"
          >
            Retour au portfolio (FR)
          </Link>
          <Link
            href="/en"
            className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/40 px-5 py-2.5 text-sm text-zinc-100 transition hover:border-zinc-500 hover:bg-zinc-800"
          >
            Back to portfolio (EN)
          </Link>
        </div>
      </div>
    </main>
  );
}

