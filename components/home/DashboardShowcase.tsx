"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DashboardShowcase() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".showcase-header",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".showcase-browser",
        {
          rotateX: 20,
          y: 60,
          scale: 0.95,
          opacity: 0,
        },
        {
          rotateX: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "center center",
            scrub: 1,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full px-6 lg:px-16 pb-10 sm:pb-20 flex flex-col items-center overflow-hidden bg-white"
      style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
    >
      <div className="showcase-header flex flex-col items-center mb-6 sm:mb-10 text-center max-w-4xl mx-auto relative z-10 pt-16">
        <span className="inline-block font-body text-[12px] md:text-[13px] tracking-[0.2em] uppercase text-brand-red font-semibold mb-3">
          Built for Growth
        </span>
        <h2 className="font-banner text-[24px] md:text-[32px] lg:text-[38px] leading-[1.2] tracking-[-0.02em] text-[#1A1A2E] mb-4">
          Scale Your Security{" "}
          <span className="text-brand-red">Without Limits</span>
        </h2>
        <p className="text-[#777777] text-[15px] md:text-[17px] max-w-2xl font-light leading-relaxed">
          Marma grows with you. Whether you&apos;re a startup or an enterprise,
          our platform is built to scale. Take total control from a single
          centralized interface.
        </p>
      </div>

      <div className="showcase-browser relative w-full max-w-[1100px] bg-white rounded-[8px] sm:rounded-[12px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] border border-[#E8E8EC] overflow-hidden self-center">
        <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-[#F8F8FA] border-b border-[#ECECEF]">
          {/* Windows-style Navigation Arrows */}
          <div className="flex items-center gap-3 text-[#BBBBBB] ml-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zM12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex-1 mx-4 sm:mx-8">
            <div className="bg-white rounded-md h-6 sm:h-7 flex items-center px-3 border border-[#E5E5E5]">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                className="text-[#BBBBBB] mr-2 shrink-0"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M2 12h20M12 2c2.5 2.5 4 6 4 10s-1.5 7.5-4 10c-2.5-2.5-4-6-4-10s1.5-7.5 4-10z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <span className="text-[10px] sm:text-[12px] text-[#AAAAAA] font-body truncate">
                app.marmasec.com/dashboard
              </span>
            </div>
          </div>
          
          {/* Windows Controls */}
          <div className="flex items-center text-[#777777]">
            {/* Minimize */}
            <div className="px-3 py-1.5 hover:bg-[#E5E5E5] transition-colors cursor-pointer">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M1 5.5H10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            {/* Maximize */}
            <div className="px-3 py-1.5 hover:bg-[#E5E5E5] transition-colors cursor-pointer">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <rect x="1.5" y="1.5" width="8" height="8" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </div>
            {/* Close */}
            <div className="px-3 py-1.5 hover:bg-[#E81123] hover:text-white transition-colors cursor-pointer">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M2 2L9 9M9 2L2 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
        <div className="relative w-full border-t border-[#ECECEF]">
          <Image
            src="/images/product/software/enterprise-dashboard1.webp"
            alt="Marma Platform Dashboard"
            width={1100}
            height={687}
            className="w-full h-auto object-cover object-top"
            priority
            sizes="(max-width: 1100px) 100vw, 1100px"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mt-8 lg:mt-12 max-w-[1000px] w-full">
        {[
          { value: "99.99%", label: "Uptime SLA", trend: null },
          { value: "2,450+", label: "Threats Blocked Daily", trend: "+18.2%" },
          { value: "<5min", label: "Setup Time", trend: null },
          { value: "Custom", label: "Integrations", trend: null },
        ].map((stat) => (
          <div
            key={stat.label}
            className="text-center bg-[#FAFBFF] rounded-xl border border-[#F0F0F0] p-4 lg:p-5 hover:shadow-md hover:border-[#E0E0E0] transition-all duration-300"
          >
            <p className="font-banner text-[24px] md:text-[28px] font-semibold text-[#1A1A2E]">
              {stat.value}
            </p>
            {stat.trend && (
              <span className="font-body text-[11px] text-green-500 font-medium">
                {stat.trend}
              </span>
            )}
            <p className="font-body text-[11px] md:text-[12px] text-[#999999] mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
