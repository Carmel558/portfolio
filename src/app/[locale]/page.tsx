import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n";
import { AnimatedSection } from "@/components/animated-section";
import { ProjectsSection } from "@/components/projects-section";
import { ArrowRight, Download, PhoneCall, Github, Linkedin } from "lucide-react";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: Locale }>;
};

const WHATSAPP_NUMBER = "2290197303491";

const projects = [
  {
    id: "economiam",
    title: "Economiam Dashboard",
    url: "https://economiam-dashboard.vercel.app/",
    github: null,
    type: "saas",
    stack: ["Next.js", "TypeScript", "TailwindCSS", "Firebase"],
  },
  {
    id: "fermier-connect",
    title: "Fermier Connect",
    url: "https://fermier-connect.vercel.app/",
    github: null,
    type: "web",
    stack: ["Next.js", "TypeScript"],
  },
  {
    id: "huufit",
    title: "HuuFit",
    url: "https://huufit.com",
    github: "https://github.com/Carmel558",
    type: "saas",
    stack: ["Next.js", "Firebase", "TailwindCSS"],
  },
  {
    id: "zouglou",
    title: "Zouglou",
    url: "https://zouglou.vercel.app",
    github: null,
    type: "web",
    stack: ["Next.js", "TailwindCSS"],
  },
  {
    id: "fitscore",
    title: "FitScore",
    url: "https://fitscore-five.vercel.app/",
    github: null,
    type: "saas",
    stack: ["Next.js", "TypeScript"],
  },
  {
    id: "moneymanager",
    title: "Money Manager",
    url: "https://moneymanager-five.vercel.app/",
    github: null,
    type: "web",
    stack: ["Next.js", "Firebase"],
  },
  {
    id: "documentmanager",
    title: "Document Manager",
    url: "https://documentmanager-five.vercel.app/fr",
    github: null,
    type: "saas",
    stack: ["Next.js", "Firebase"],
  },
  {
    id: "goalmanager",
    title: "Goal Manager",
    url: "https://goalmanager.vercel.app/",
    github: null,
    type: "web",
    stack: ["Next.js", "TypeScript"],
  },
  {
    id: "stockmanager",
    title: "Stock Manager",
    url: "https://stockmanager-nine.vercel.app/fr",
    github: null,
    type: "web",
    stack: ["Next.js", "Firebase"],
  },
  {
    id: "wilaon",
    title: "Wilaon Web App",
    url: "https://wilaon-web-app.onrender.com/",
    github: null,
    type: "web",
    stack: ["React", "Node.js"],
  },
  {
    id: "durabilis",
    title: "Durabilis",
    url: "https://durabilis.co",
    github: null,
    type: "web",
    stack: ["Next.js", "TailwindCSS"],
  },
];

export default async function LocaleHome({ params }: Props) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-[#050608] via-[#05090B] to-[#050607] text-zinc-50">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(120,255,180,0.12),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(10,120,90,0.18),_transparent_55%)]" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 pb-20 pt-10 md:px-8 lg:px-12">
        {/* Navigation */}
        <header className="flex items-center justify-between gap-6 pb-10">
          <div className="flex items-center gap-3">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border border-emerald-200 bg-white shadow-sm">
              <Image
                src="/images/image.png"
                alt="Jesugnon Carmel AHOTIN"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold tracking-tight">
                Jesugnon Carmel AHOTIN
              </span>
              <span className="text-sm text-zinc-500">
                {dict.hero.role}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Link
              href="https://www.linkedin.com/in/carmel-ahotin/"
              target="_blank"
              className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-white/80 px-3 py-1 text-sky-700 shadow-sm hover:border-sky-300 hover:bg-sky-50 transition"
            >
              <Linkedin className="h-3 w-3" />
              LinkedIn
            </Link>
            <Link
              href="https://github.com/Carmel558"
              target="_blank"
              className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-white/80 px-3 py-1 text-emerald-700 shadow-sm hover:border-emerald-300 hover:bg-emerald-50 transition"
            >
              <Github className="h-3 w-3" />
              GitHub
            </Link>
            <div className="ml-2 flex items-center gap-1 rounded-full border border-zinc-200 bg-white/80 px-2 py-1 text-[13px] shadow-sm">
              <span className="text-zinc-500">Lang</span>
              <Link
                href="/fr"
                className={`rounded-full px-2 py-0.5 text-xs ${
                  locale === "fr"
                    ? "bg-emerald-500 text-white"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                FR
              </Link>
              <Link
                href="/en"
                className={`rounded-full px-2 py-0.5 text-xs ${
                  locale === "en"
                    ? "bg-emerald-500 text-white"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                EN
              </Link>
            </div>
          </div>
        </header>

        {/* Hero */}
        <AnimatedSection
          id="hero"
          className="grid gap-12 pb-18 pt-4 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-center"
        >
          <div className="space-y-6">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-emerald-500">
              Jesugnon Carmel AHOTIN
            </p>
            <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight text-zinc-100 sm:text-5xl lg:text-6xl">
              {dict.hero.headline}
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-zinc-200 sm:text-lg">
              {dict.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-400"
              >
                {dict.hero.ctaProjects}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-800 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50"
              >
                {dict.hero.ctaContact}
              </a>
              <Link
                href={whatsappUrl}
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700 shadow-sm transition hover:border-emerald-400 hover:bg-emerald-100"
              >
                <PhoneCall className="h-4 w-4" />
                {dict.hero.ctaWhatsapp}
              </Link>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-950 p-5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-100">
                Stack principale
              </span>
              <span className="rounded-full bg-zinc-900 px-2 py-1 text-[10px] uppercase tracking-wide text-zinc-100">
                Next.js · Firebase · NestJS · React  ·UX
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1.5">
                <p className="text-[13px] uppercase tracking-wide text-zinc-500">
                  Frontend
                </p>
                <p className="text-zinc-100">Next.js, React, ...</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-[13px] uppercase tracking-wide text-zinc-500">
                  Backend & Data
                </p>
                <p className="text-zinc-100">Firebase, NestJS, Express, ...</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-[13px] uppercase tracking-wide text-zinc-500">
                  DevOps
                </p>
                <p className="text-zinc-100">Vercel, CI/CD, monitoring, ..</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-[13px] uppercase tracking-wide text-zinc-500">
                  Communication
                </p>
                <p className="text-zinc-100">Brevo, intégration email & tracking, ...</p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Projets */}
        <ProjectsSection
          projects={projects.map((project) => ({
            ...project,
            type:
              project.type === "saas" ||
              project.type === "web" ||
              project.type === "mobile"
                ? project.type
                : "web", // fallback or update as needed
            github:
              project.github === null
                ? ""
                : project.github,
          }))}
          dict={dict.projects}
        />

        {/* Compétences */}
        <AnimatedSection
          id="skills"
          className="mt-20 grid gap-8 "
        >
          <div>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl text-zinc-50">
              {dict.skills.title}
            </h2>
            <p className="mt-3 text-base text-zinc-300">
              {dict.skills.description}
            </p>
          </div>
          <div className="grid gap-5 text-sm sm:grid-cols-2">
            <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
                {dict.skills.frontend}
              </p>
              <p className="text-zinc-100">
                {dict.skills.frontendDescription}
              </p>
            </div>
            <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
                {dict.skills.backend}
              </p>
              <p className="text-zinc-100">
                {dict.skills.backendDescription}
              </p>
            </div>
            <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
                {dict.skills.mobile}
              </p>
              <p className="text-zinc-100">
                {dict.skills.mobileDescription}
              </p>
            </div>
            <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
                {dict.skills.database}
              </p>
              <p className="text-zinc-100">
                {dict.skills.databaseDescription}
              </p>
            </div>
            <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
                {dict.skills.devops}
              </p>
              <p className="text-zinc-100">
                {dict.skills.devopsDescription}
              </p>
            </div>
            <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
                {dict.skills.tools}
              </p>
              <p className="text-zinc-100">
                {dict.skills.toolsDescription}
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Expériences */}
        <AnimatedSection id="experience" className="mt-16 space-y-6">
          <div>
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              {dict.experience.title}
            </h2>
            <p className="mt-2 text-sm text-zinc-300">
              {dict.experience.intro}
            </p>
          </div>
          <ol className="space-y-4 border-l border-white/10 pl-4 text-sm">
            <li className="relative pl-4">
              <span className="absolute left-[-9px] top-1 h-2 w-2 rounded-full bg-emerald-400" />
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium">
                  {dict.experience.items.pixaalab.title}
                </p>
                <span className="text-xs text-zinc-100">
                  {dict.experience.items.pixaalab.period}
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-300">
                {dict.experience.items.pixaalab.description}
              </p>
            </li>
            <li className="relative pl-4">
              <span className="absolute left-[-9px] top-1 h-2 w-2 rounded-full bg-emerald-400" />
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium">
                  {dict.experience.items.hkim.title}
                </p>
                <span className="text-xs text-zinc-100">
                  {dict.experience.items.hkim.period}
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-300">
                {dict.experience.items.hkim.description}
              </p>
            </li>
            <li className="relative pl-4">
              <span className="absolute left-[-9px] top-1 h-2 w-2 rounded-full bg-emerald-400" />
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium">
                  {dict.experience.items.digitalcab.title}
                </p>
                <span className="text-xs text-zinc-100">
                  {dict.experience.items.digitalcab.period}
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-300">
                {dict.experience.items.digitalcab.description}
              </p>
            </li>
            <li className="relative pl-4">
              <span className="absolute left-[-9px] top-1 h-2 w-2 rounded-full bg-emerald-400" />
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium">
                  {dict.experience.items.scarbri.title}
                </p>
                <span className="text-xs text-zinc-100">
                  {dict.experience.items.scarbri.period}
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-300">
                {dict.experience.items.scarbri.description}
              </p>
            </li>
          </ol>
        </AnimatedSection>

        {/* Valeurs */}
        <AnimatedSection
          id="values"
          className="mt-16 grid gap-6 "
        >
          <div className="md:col-span-1">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {dict.values.title}
            </h2>
          </div>
          <div className="md:col-span-3 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
                {dict.values.rigor}
              </p>
              <p className="mt-2 text-zinc-100">
                {dict.values.rigorDescription}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
                {dict.values.transparency}
              </p>
              <p className="mt-2 text-zinc-100">
                {dict.values.transparencyDescription}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
                {dict.values.innovation}
              </p>
              <p className="mt-2 text-zinc-100">
                {dict.values.innovationDescription}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
                {dict.values.excellence}
              </p>
              <p className="mt-2 text-zinc-100">
                {dict.values.excellenceDescription}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
                {dict.values.speed}
              </p>
              <p className="mt-2 text-zinc-100">
                {dict.values.speedDescription}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">
                {dict.values.efficiency}
              </p>
              <p className="mt-2 text-zinc-100">
                {dict.values.efficiencyDescription}
              </p>
            </div>
          </div>
        </AnimatedSection>

        {/* Blog teaser */}
        <AnimatedSection id="blog" className="mt-16 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              {dict.blog.title}
            </h2>
            <p className="mt-1 max-w-xl text-sm text-zinc-300">
              {dict.blog.subtitle}
            </p>
          </div>
          <Link
            href={`/${locale}/blogs`}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-400/60 bg-emerald-400/10 px-4 py-2 text-xs font-medium text-emerald-200 transition hover:border-emerald-300 hover:bg-emerald-400/20"
          >
            {dict.blog.ctaSubmit}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </AnimatedSection>

        {/* Contact */}
        <AnimatedSection
          id="contact"
          className="mt-16 grid gap-8 "
        >
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-300/80">
              {dict.contact.title}
            </p>
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              {dict.contact.subtitle}
            </h2>
            <p className="text-sm text-zinc-300">
              {dict.contact.description}
            </p>
            <p className="mt-3 text-xs text-zinc-100">
              {dict.contact.whatsapp}{" "}
              <Link
                href={whatsappUrl}
                target="_blank"
                className="text-emerald-300 hover:text-emerald-200"
              >
                WhatsApp ({WHATSAPP_NUMBER})
              </Link>
            </p>
          </div>
          <form
            action="/api/contact"
            method="POST"
            encType="multipart/form-data"
            className="space-y-3 rounded-3xl border border-white/10 bg-black/40 p-5 text-xs shadow-[0_24px_80px_rgba(0,0,0,0.7)] backdrop-blur-xl w-10/12 md:w-1/2 mx-auto"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-[13px] text-zinc-100">
                  {dict.contact.form.name}
                </label>
                <input
                  name="name"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white outline-none ring-0 focus:border-emerald-400"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[13px] text-zinc-100">
                  {dict.contact.form.email}
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white outline-none ring-0 focus:border-emerald-400"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[13px] text-zinc-100">
                {dict.contact.form.subject}
              </label>
              <input
                name="subject"
                className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white outline-none ring-0 focus:border-emerald-400"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[13px] text-zinc-100">
                {dict.contact.form.message}
              </label>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full resize-none rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-white outline-none ring-0 focus:border-emerald-400"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[13px] text-zinc-100">
                {dict.contact.form.file}
              </label>
              <input
                name="file"
                type="file"
                className="w-full text-[13px] text-zinc-300 file:mr-3 file:rounded-full file:border-0 file:bg-emerald-400/90 file:px-3 file:py-1 file:text-xs file:font-medium file:text-zinc-900 hover:file:bg-emerald-300"
              />
            </div>
            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-xs font-medium text-zinc-900 transition hover:bg-emerald-300"
            >
              {dict.contact.form.submit}
            </button>
          </form>
        </AnimatedSection>
      </div>
    </main>
  );
}

