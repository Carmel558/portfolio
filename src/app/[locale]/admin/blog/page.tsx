"use client";

import { useEffect, useState } from "react";

type BlogItem = {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorEmail: string;
  status: string;
  createdAt: string | null;
};

export default function AdminBlogPage() {
  const [items, setItems] = useState<BlogItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/blogs");
      const data = await res.json();
      setItems(data.items ?? []);
    } catch (e) {
      console.error(e);
      setError("Impossible de charger les articles.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function updateStatus(id: string, status: string) {
    try {
      setSavingId(id);
      await fetch("/api/admin/blogs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      await load();
    } finally {
      setSavingId(null);
    }
  }

  async function remove(id: string) {
    try {
      setSavingId(id);
      const url = `/api/admin/blogs?id=${encodeURIComponent(id)}`;
      await fetch(url, { method: "DELETE" });
      await load();
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div className="rounded-2xl bg-white/5 p-5 text-sm shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Articles proposés</h2>
        <span className="text-xs text-white/70">
          {items ? `${items.length} articles` : ""}
        </span>
      </div>
      {loading ? (
        <p className="text-xs text-white/70">Chargement...</p>
      ) : error ? (
        <p className="text-xs text-red-400">{error}</p>
      ) : !items || items.length === 0 ? (
        <p className="text-xs text-white/70">Aucun article pour le moment.</p>
      ) : (
        <div className="space-y-3">
          {items.map((b) => (
            <article
              key={b.id}
              className="rounded-xl border border-white/10 bg-black/40 p-3 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-medium text-white">{b.title}</p>
                  <p className="mt-0.5 text-[13px] text-white/70">
                    {b.authorName} •{" "}
                    <a
                      href={`mailto:${b.authorEmail}`}
                      className="text-emerald-300 hover:text-emerald-200"
                    >
                      {b.authorEmail}
                    </a>
                  </p>
                </div>
                <div className="text-right text-[13px] text-white/60">
                  <p className="capitalize">{b.status}</p>
                  <p>
                    {b.createdAt
                      ? new Date(b.createdAt).toLocaleString()
                      : "-"}
                  </p>
                </div>
              </div>
              <p className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap text-white/80">
                {b.content}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={savingId === b.id}
                  onClick={() => updateStatus(b.id, "published")}
                  className="rounded-full bg-emerald-400 px-3 py-1 text-[13px] font-medium text-zinc-900 hover:bg-emerald-300 disabled:opacity-60"
                >
                  Publier
                </button>
                <button
                  type="button"
                  disabled={savingId === b.id}
                  onClick={() => updateStatus(b.id, "rejected")}
                  className="rounded-full border border-red-400/70 bg-red-500/10 px-3 py-1 text-[13px] font-medium text-red-200 hover:bg-red-500/20 disabled:opacity-60"
                >
                  Rejeter
                </button>
                <button
                  type="button"
                  disabled={savingId === b.id}
                  onClick={() => remove(b.id)}
                  className="rounded-full border border-white/20 px-3 py-1 text-[13px] text-white/80 hover:bg-white/10 disabled:opacity-60"
                >
                  Supprimer
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

