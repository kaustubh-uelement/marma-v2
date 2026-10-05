"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Modern geometric logos matching Screenshot 1 (Logoipsum style)
const partners = [
  {
    name: "Logoipsum",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white/80">
        <polygon points="12 2 2 7 12 12 22 7 12 2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <polyline points="2 17 12 22 22 17" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <polyline points="2 12 12 17 22 12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Logoipsum",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white/80">
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Logoipsum",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white/80">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: "Logoipsum",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white/80">
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M7 12l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: "Logoipsum",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white/80">
        <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.095-8-12.178-8-5.096 0-5.096 8 0 8 5.095 0 7.095-8 12.178-8z" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: "Logoipsum",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white/80">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function TrustedByStrip() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".trusted-item",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 95%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#000000] border-t border-b border-white/[0.08] py-8 lg:py-10 relative z-20"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        {/* Logo Row matching Screenshot 1 */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16 lg:gap-x-20">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="trusted-item flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-default"
            >
              <div className="flex items-center gap-2">
                {partner.icon}
                <span className="font-banner text-[15px] md:text-[17px] font-semibold text-white/90 tracking-tight">
                  {partner.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
