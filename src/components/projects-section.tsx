"use client";

import { useState } from "react";
import { AnimatedSection } from "./animated-section";
import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";

type Project = {
  id: string;
  title: string;
  url: string;
  github: string | null;
  type: "web" | "saas" | "mobile";
  stack: string[];
};

type Props = {
  projects: Project[];
  dict: Dictionary["projects"];
};

const FILTERS = ["all", "web", "saas", "mobile"] as const;

export function ProjectsSection({ projects, dict }: Props) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");

  const filtered =
    filter === "all"
      ? projects
      : projects.filter((p) => p.type === filter);

  const labelForFilter: Record<(typeof FILTERS)[number], string> = {
    all: dict.filterAll,
    web: dict.filterWeb,
    saas: dict.filterSaaS,
    mobile: dict.filterMobile,
  };

  return (
    <AnimatedSection id="projects" className="mt-16 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight sm:text-2xl text-zinc-50">
            {dict.title}
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            {filtered.length} / {projects.length}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full border px-3 py-1 transition ${
                filter === f
                  ? "border-emerald-400 bg-emerald-500/20 text-emerald-200"
                  : "border-zinc-700 bg-zinc-900/60 text-zinc-200 hover:border-emerald-400 hover:bg-zinc-900"
              }`}
            >
              {labelForFilter[f]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((project) => (
          <article
            key={project.id}
            className="group rounded-2xl border border-white/10 bg-white/5 p-5 text-sm shadow-[0_24px_80px_rgba(0,0,0,0.65)] backdrop-blur-xl transition hover:border-emerald-400/70 hover:bg-white/10"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-zinc-100">
                  {project.title}
                </h3>
                <p className="mt-1 text-[13px] uppercase tracking-wide text-emerald-300/80">
                  {project.type === "saas"
                    ? "SaaS"
                    : project.type === "web"
                    ? "Web App"
                    : "Mobile"}
                </p>
              </div>
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/70 text-xs text-zinc-100 transition group-hover:border-emerald-300 group-hover:text-emerald-200"
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5 text-[12px]">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-white/10 px-2 py-1 text-zinc-100"
                >
                  {tech}
                </span>
              ))}
            </div>
            {project.github && project.github.trim().length > 0 && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex text-[12px] text-emerald-300 hover:text-emerald-200"
              >
                {dict.viewCode}
              </a>
            )}
          </article>
        ))}
      </div>
    </AnimatedSection>
  );
}

