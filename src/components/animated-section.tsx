"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AnimatedSectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export function AnimatedSection({ id, className, children }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none", // une seule fois
            once: true,
          },
        }
      );
    }, el);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id={id} ref={ref} className={className}>
      {children}
    </section>
  );
}

