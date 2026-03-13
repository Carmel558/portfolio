import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { AnimatedSection } from "@/components/animated-section";

type Props = {
  params: { locale: Locale };
};

type BlogItem = {
  id: string;
  title: string;
  content: string;
  authorName: string;
  createdAt: string | null;
};

export default async function BlogsPage({ params }: Props) {
  const dict = await getDictionary(params.locale);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/blogs`, {
    cache: "no-store",
  });

  const data = (await res.json().catch(() => ({ items: [] }))) as {
    items?: BlogItem[];
  };

  const items = data.items ?? [];

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#050608] via-[#05090B] to-[#050607] text-zinc-50">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(120,255,180,0.12),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(10,120,90,0.18),_transparent_55%)]" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col px-4 pb-16 pt-12 md:px-8">
        <AnimatedSection id="blog" className="space-y-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-300/80">
              Blog
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              {dict.blog.title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-zinc-300">
              {dict.blog.subtitle}
            </p>
          </div>

          <section className="mt-4 grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className="space-y-4">
              {items.length === 0 && (
                <p className="text-sm text-zinc-400">
                  Aucun article publié pour le moment.
                </p>
              )}
              {items.map((post) => (
                <article
                  key={post.id}
                  className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm shadow-[0_24px_80px_rgba(0,0,0,0.65)] backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-sm font-semibold text-white">
                      {post.title}
                    </h2>
                    <span className="text-[13px] text-zinc-400">
                      {post.authorName}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-zinc-300 whitespace-pre-wrap">
                    {post.content.slice(0, 480)}
                    {post.content.length > 480 ? "..." : ""}
                  </p>
                </article>
              ))}
            </div>

            <div className="space-y-3 rounded-3xl border border-white/15 bg-black/40 p-4 text-sm shadow-[0_24px_80px_rgba(0,0,0,0.7)] backdrop-blur-xl">
              <h2 className="text-sm font-semibold text-white">
                {dict.blog.submitTitle}
              </h2>
              <p className="text-xs text-zinc-300">
                {dict.blog.submitDescription}
              </p>
              <form
                method="POST"
                action="/api/blogs"
                className="mt-3 space-y-3 text-xs"
              >
                <div className="space-y-1">
                  <label className="text-[13px] text-zinc-400">
                    {dict.blog.form.name}
                  </label>
                  <input
                    name="name"
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white outline-none ring-0 focus:border-emerald-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[13px] text-zinc-400">
                    {dict.blog.form.email}
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white outline-none ring-0 focus:border-emerald-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[13px] text-zinc-400">
                    {dict.blog.form.title}
                  </label>
                  <input
                    name="title"
                    required
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white outline-none ring-0 focus:border-emerald-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[13px] text-zinc-400">
                    {dict.blog.form.content}
                  </label>
                  <textarea
                    name="content"
                    required
                    rows={6}
                    className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white outline-none ring-0 focus:border-emerald-400"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-xs font-medium text-zinc-900 transition hover:bg-emerald-300"
                >
                  {dict.blog.form.submit}
                </button>
                <p className="text-[13px] text-zinc-500">
                  Les articles sont soumis en statut{" "}
                  <span className="font-semibold text-emerald-300">
                    pending
                  </span>{" "}
                  et publiés uniquement après validation.
                </p>
              </form>
            </div>
          </section>
        </AnimatedSection>
      </div>
    </main>
  );
}

