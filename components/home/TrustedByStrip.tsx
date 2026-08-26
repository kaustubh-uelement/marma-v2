"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const trustedCompanies = [
  { name: "Healthcare", logo: null },
  { name: "Manufacturing", logo: null },
  { name: "Finance", logo: null },
  { name: "Legal", logo: null },
  { name: "Construction", logo: null },
  { name: "Energy", logo: null },
  { name: "Education", logo: null },
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
            start: "top 90%",
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="w-full bg-white border-y border-[#F0F0F0] py-8 lg:py-10"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        {/* Label */}
        <p className="trusted-item text-center font-body text-[11px] md:text-[12px] tracking-[0.25em] uppercase text-[#AAAAAA] font-medium mb-8">
          Trusted by fast-growing companies worldwide IN
        </p>

        {/* Logo Row */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16 lg:gap-x-20">
          {trustedCompanies.map((company) => (
            <div
              key={company.name}
              className="trusted-item flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-default"
            >
              <div className="flex items-center gap-1.5">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[#BBBBBB]"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M8 12l3 3 5-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-banner text-[16px] md:text-[18px] font-semibold text-[#888888] tracking-tight">
                  {company.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
