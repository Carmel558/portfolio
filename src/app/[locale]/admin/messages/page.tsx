"use client";

import { useEffect, useState } from "react";

type MessageItem = {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  attachmentUrl?: string | null;
  status?: string;
  createdAt?: string | null;
};

export default function AdminMessagesPage() {
  const [items, setItems] = useState<MessageItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch("/api/admin/messages")
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        setItems(data.items ?? []);
      })
      .catch((err) => {
        console.error(err);
        setError("Impossible de charger les messages.");
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="rounded-2xl bg-white/5 p-5 text-sm shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Messages de contact</h2>
        <span className="text-xs text-white/70">
          {items ? `${items.length} messages` : ""}
        </span>
      </div>
      {loading ? (
        <p className="text-xs text-white/70">Chargement...</p>
      ) : error ? (
        <p className="text-xs text-red-400">{error}</p>
      ) : !items || items.length === 0 ? (
        <p className="text-xs text-white/70">Aucun message pour le moment.</p>
      ) : (
        <div className="space-y-3">
          {items.map((m) => (
            <article
              key={m.id}
              className="rounded-xl border border-white/10 bg-black/40 p-3 text-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <p className="font-medium text-white">{m.name}</p>
                  <a
                    href={`mailto:${m.email}`}
                    className="text-emerald-300 hover:text-emerald-200"
                  >
                    {m.email}
                  </a>
                </div>
                <div className="text-right text-[13px] text-white/60">
                  <p className="capitalize">{m.status ?? "unread"}</p>
                  <p>
                    {m.createdAt
                      ? new Date(m.createdAt).toLocaleString()
                      : "-"}
                  </p>
                </div>
              </div>
              {m.subject && (
                <p className="mt-2 text-[13px] text-white/80">
                  <span className="font-semibold">Sujet: </span>
                  {m.subject}
                </p>
              )}
              <p className="mt-2 whitespace-pre-wrap text-white/80">
                {m.message}
              </p>
              {m.attachmentUrl && (
                <p className="mt-2 text-[13px]">
                  <a
                    href={m.attachmentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-300 hover:text-emerald-200"
                  >
                    Voir la pièce jointe
                  </a>
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

