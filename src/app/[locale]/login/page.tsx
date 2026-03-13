"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "").trim();
    if (!email || !password) {
      setError("Email et mot de passe requis.");
      return;
    }
    try {
      setPending(true);
      setError(null);
      const auth = getFirebaseAuth();
      await signInWithEmailAndPassword(auth, email, password);
      router.push("./admin/messages");
    } catch (err) {
      console.error(err);
      setError(
        process.env.NODE_ENV === "development"
          ? String(err)
          : "Identifiants invalides."
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#050608] via-[#05090B] to-[#050607] text-zinc-50">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(120,255,180,0.12),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(10,120,90,0.18),_transparent_55%)]" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-4 py-12">
        <div className="w-full rounded-3xl border border-white/10 bg-black/50 p-6 shadow-[0_32px_120px_rgba(0,0,0,0.75)] backdrop-blur-xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-300/80">
            Admin
          </p>
          <h1 className="mt-2 text-lg font-semibold tracking-tight">
            Connexion au dashboard
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Utilisez votre compte admin Firebase (email / mot de passe).
          </p>
          <form onSubmit={onSubmit} className="mt-5 space-y-3 text-xs">
            <div className="space-y-1">
              <label className="text-[13px] text-zinc-400">Email</label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white outline-none ring-0 focus:border-emerald-400"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[13px] text-zinc-400">Mot de passe</label>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white outline-none ring-0 focus:border-emerald-400"
              />
            </div>
            {error && (
              <p className="text-[13px] text-red-400">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={pending}
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-xs font-medium text-zinc-900 transition hover:bg-emerald-300 disabled:opacity-60"
            >
              {pending ? "Connexion..." : "Se connecter"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

