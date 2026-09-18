"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function InteractiveEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function runCount(n: HTMLElement) {
      const t = parseFloat(n.dataset.count || "0");
      const d = parseInt(n.dataset.dec || "0", 10);
      const pre = n.dataset.prefix || "";
      const suf = n.dataset.suffix || "";

      if (reduce) {
        n.textContent = pre + t.toFixed(d) + suf;
        return;
      }

      const dur = 1150;
      const t0 = performance.now();
      const tick = (x: number) => {
        const p = Math.min((x - t0) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        n.textContent = pre + (t * e).toFixed(d) + suf;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
            if ("querySelectorAll" in e.target) {
              (e.target as HTMLElement)
                .querySelectorAll<HTMLElement>("[data-count]")
                .forEach(runCount);
            }
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -40px" }
    );

    const rvNodes = document.querySelectorAll<HTMLElement>(".rv");
    rvNodes.forEach((n, i) => {
      n.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`;
      io.observe(n);
    });

    const pointerFine = window.matchMedia("(pointer:fine)").matches;
    const cleanups: (() => void)[] = [];

    if (!reduce && pointerFine) {
      const cards = document.querySelectorAll<HTMLElement>(".glass-hover");
      cards.forEach((c) => {
        const handler = (e: PointerEvent) => {
          const r = c.getBoundingClientRect();
          c.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
          c.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
        };
        c.addEventListener("pointermove", handler);
        cleanups.push(() => c.removeEventListener("pointermove", handler));
      });
    }

    return () => {
      io.disconnect();
      cleanups.forEach((c) => c());
    };
  }, [pathname]);

  return null;
}
