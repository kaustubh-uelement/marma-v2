"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CheckCircle2 } from "lucide-react";

interface SaaSHeroProps {
  onBookDemo: () => void;
}

const SLIDES = [
  {
    src: "/images/marma-dashboard/enterprise_protection.webp",
    alt: "Marma Management Platform",
  },
  {
    src: "/images/marma-dashboard/endpoint_protection.webp",
    alt: "Marma Endpoint Protection Software",
  },
  {
    src: "/images/product/hardwareDevices.webp",
    alt: "Marma Hardware Security Gateways",
  },
];

const AUTOPLAY_INTERVAL = 4000;

export default function SaaSHero({ onBookDemo }: SaaSHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isAnimatingRef = useRef(false);
  const [current, setCurrent] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  const goToSlide = useCallback(
    (next: number, fromAutoplay = false) => {
      if (isAnimatingRef.current && !fromAutoplay) return;
      if (next === current) return;

      isAnimatingRef.current = true;

      const currentEl = slidesRef.current[current];
      const nextEl = slidesRef.current[next];

      if (!currentEl || !nextEl) {
        isAnimatingRef.current = false;
        return;
      }

      gsap.set(nextEl, { opacity: 0, scale: 1.03, zIndex: 2 });
      gsap.set(currentEl, { zIndex: 1 });

      gsap.to(currentEl, {
        opacity: 0,
        scale: 0.97,
        duration: 0.6,
        ease: "power2.inOut",
      });

      gsap.to(nextEl, {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(currentEl, { zIndex: 0, scale: 1 });
          isAnimatingRef.current = false;
        },
      });

      setCurrent(next);
      setProgressKey((k) => k + 1);
    },
    [current],
  );

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % SLIDES.length;
        goToSlide(next, true);
        return prev;
      });
    }, AUTOPLAY_INTERVAL);
  }, [goToSlide]);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [startAutoplay]);

  const handleDotClick = (idx: number) => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    goToSlide(idx);
    startAutoplay();
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Hero text entrance
      gsap.fromTo(
        ".hero-text-content > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
        },
      );

      // Dashboard mockup entrance
      gsap.fromTo(
        ".hero-dashboard",
        { opacity: 0, y: 40, rotateY: -8, rotateX: 4 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          rotateX: 0,
          duration: 1.2,
          delay: 0.3,
          ease: "power3.out",
        },
      );

      // Floating decorative elements
      gsap.to(".hero-float-1", {
        y: -15,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".hero-float-2", {
        y: 12,
        x: -8,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(".hero-float-3", {
        y: -10,
        x: 6,
        duration: 3.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-fit lg:min-h-[92vh] bg-[#FAFBFF] overflow-hidden flex items-center"
    >
      {/* Subtle background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-bl from-[#FF000008] via-transparent to-transparent rounded-full" />
        <div className="absolute bottom-0 left-0 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-gradient-to-tr from-[#FF000005] via-transparent to-transparent rounded-full" />
      </div>

      {/* Floating decorative dots */}
      <div className="hero-float-1 absolute top-[15%] right-[12%] w-3 h-3 bg-brand-red/20 rounded-full hidden lg:block" />
      <div className="hero-float-2 absolute top-[35%] right-[5%] w-2 h-2 bg-brand-red/30 rounded-full hidden lg:block" />
      <div className="hero-float-3 absolute bottom-[25%] left-[8%] w-2.5 h-2.5 bg-brand-red/15 rounded-full hidden lg:block" />
      <div className="absolute top-[20%] left-[15%] w-1.5 h-1.5 bg-[#E0E0E0] rounded-full hidden lg:block" />
      <div className="absolute bottom-[35%] right-[18%] w-1.5 h-1.5 bg-[#D0D0D0] rounded-full hidden lg:block" />

      {/* Main content */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 pt-28 sm:pt-32 lg:pt-28 pb-12 lg:pb-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Column: Text Content */}
          <div className="hero-text-content w-full lg:w-[48%] flex flex-col items-center lg:items-start text-center lg:text-left space-y-5 lg:space-y-6">
            {/* Main Headline */}
            <h1 className="font-banner font-normal text-[28px] sm:text-[36px] md:text-[40px] lg:text-[48px] leading-[1.15] tracking-[-0.02em] text-[#1A1A2E]">
              The All-in-One <br className="hidden sm:block" />
              AI Cybersecurity <br className="hidden sm:block" />
              Platform for{" "}
              <span className="text-brand-red font-medium whitespace-nowrap">Modern Enterprises</span>
            </h1>

            {/* Subtitle */}
            <p className="font-body font-light text-[15px] lg:text-[18px] leading-[1.6] text-[#5A5A7A] max-w-[480px]">
              Marma helps you detect, prevent, and respond to cyber threats —
              all in one powerful platform. Enterprise-grade security in
              minutes, no IT expertise needed.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 lg:gap-4 pt-2">
              <button
                onClick={onBookDemo}
                className="group relative flex items-center gap-2.5 bg-brand-red text-white rounded-full px-6 lg:px-7 py-3 font-banner text-[14px] md:text-[15px] lg:text-[16px] font-normal tracking-[-0.01em] hover:bg-brand-red-hover transition-all duration-300 shadow-lg shadow-brand-red/25 hover:shadow-xl hover:shadow-brand-red/30 hover:scale-[1.02]"
              >
                Start Free Trial
                <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      stroke="white"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 lg:gap-x-6 gap-y-2 pt-2">
              {[
                "No credit card required",
                "30-day free trial",
                "Cancel anytime",
              ].map((text) => (
                <div key={text} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-red" />
                  <span className="font-body text-[11px] sm:text-[12px] text-[#777777]">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Dashboard Mockup */}
          <div
            className="hero-dashboard w-full lg:w-[52%] relative"
            style={{ perspective: "1200px" }}
          >
            {/* Dots navigation — lives OUTSIDE image, below it */}
            <div className="relative">
              {/* Subtle glow behind dashboard */}
              <div className="absolute -inset-8 bg-gradient-to-br from-brand-red/15 via-transparent to-brand-red/10 rounded-[40px] blur-3xl opacity-70" />

              {/* Dashboard image slider */}
              <div className="relative overflow-hidden transition-transform duration-700 hover:scale-[1.01]">
                {/* Subtle glass reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none mix-blend-overlay z-20" />

                <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                  {SLIDES.map((slide, idx) => (
                    <div
                      key={slide.src}
                      ref={(el) => {
                        slidesRef.current[idx] = el;
                      }}
                      className="absolute inset-0"
                      style={{
                        opacity: idx === 0 ? 1 : 0,
                        zIndex: idx === 0 ? 2 : 0,
                      }}
                    >
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        fill
                        className="object-cover"
                        priority={idx === 0}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 52vw"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Slider dots — placed BELOW the image, never overlapping */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleDotClick(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className="relative h-2 rounded-full overflow-hidden transition-all duration-300 focus-visible:outline-2 focus-visible:outline-brand-red"
                    style={{
                      width: idx === current ? "28px" : "8px",
                      backgroundColor:
                        idx === current ? "#FF000040" : "#b5b5b5",
                    }}
                  >
                    {idx === current && (
                      <span
                        key={progressKey}
                        className="absolute inset-y-0 left-0 bg-brand-red rounded-full"
                        style={{
                          animation: `heroProgress ${AUTOPLAY_INTERVAL}ms linear forwards`,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Floating notification card - top right */}
              {/* <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 lg:-top-6 lg:-right-8 bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.15)] border border-white/50 px-3 sm:px-4 py-2.5 sm:py-3 hidden sm:flex items-center gap-2.5 sm:gap-3 animate-pulse-slow z-30">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-body text-[11px] sm:text-[12px] font-semibold text-[#1A1A2E]">
                    Threat Blocked
                  </p>
                  <p className="font-body text-[9px] sm:text-[10px] text-[#777777]">
                    Just now
                  </p>
                </div>
              </div> */}

              {/* Floating stat card - bottom left */}
              {/* <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 lg:-bottom-6 lg:-left-8 bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.15)] border border-white/50 px-4 sm:px-5 py-2.5 sm:py-3 hidden sm:block z-30">
                <p className="font-body text-[10px] sm:text-[11px] text-[#888888] font-medium tracking-wide">
                  Devices Protected
                </p>
                <div className="flex items-baseline gap-1.5 sm:gap-2 mt-0.5">
                  <p className="font-banner text-[20px] sm:text-[24px] font-semibold text-[#1A1A2E] tracking-tight">
                    8,430
                  </p>
                  <span className="font-body text-[10px] sm:text-[11px] text-green-600 font-semibold bg-green-50 px-1.5 py-0.5 rounded-md">
                    +12.5%
                  </span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}
