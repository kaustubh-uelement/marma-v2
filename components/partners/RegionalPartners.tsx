"use client";

import React, { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import {
  getPartners,
  FALLBACK_PARTNERS,
  type RegionKey,
  type Partner,
} from "@/lib/partnerData";
import { PartnerLogo } from "./PartnerLogo";

export default function RegionalPartners() {
  const [partnersData, setPartnersData] = useState<Record<RegionKey, Partner[]>>(FALLBACK_PARTNERS);

  useEffect(() => {
    let isMounted = true;
    getPartners()
      .then((data) => {
        if (isMounted && data) {
          setPartnersData(data);
        }
      })
      .catch((err) => {
        console.warn("Failed to fetch partners, using fallback data:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="w-full bg-white flex flex-col items-center pt-16 lg:pt-24 pb-16 lg:pb-24 font-body overflow-hidden">
      <div className="w-full max-w-[1440px] px-6 lg:px-16 mx-auto flex flex-col items-center gap-10 lg:gap-14">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-4 text-center max-w-[800px]">
          <div className="flex items-center gap-2 text-sm font-semibold text-[#FF0000] uppercase tracking-[2px]">
            <Globe size={16} strokeWidth={2.5} />
            <span>Partner Network</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#333333] leading-tight">
            Our Trusted Partners
          </h2>
          <p className="text-base md:text-lg text-slate-500 leading-relaxed max-w-[600px]">
            Marma Security works with leading technology partners across the
            globe to deliver best-in-class cybersecurity solutions.
          </p>
        </div>
      </div>

      {/* Stacked Carousels */}
      <div className="w-full flex flex-col gap-10 md:gap-12 mt-12 md:mt-16">
        {["USA", "India", "Caribbean", "Thailand"].map(
          (regionKey, regionIndex) => {
            const partners: Partner[] =
              partnersData[regionKey as RegionKey] || [];
            if (partners.length === 0) return null;

            const isSingle = partners.length === 1;

            // Duplicate the list to create seamless infinite scroll
            // For regions with very few partners (like Thailand), duplicate more times to fill the screen width
            // If there's only one partner, don't duplicate.
            const duplications = isSingle
              ? 1
              : Math.max(2, Math.ceil(12 / partners.length));
            const carouselItems = Array(duplications).fill(partners).flat();

            // Base duration on unique partner count, but ensure a minimum speed
            const baseDuration = Math.max(20, partners.length * 4);
            const animationDuration = `${baseDuration}s`;
            const animationDirection =
              regionIndex % 2 === 1 ? "reverse" : "normal";

            return (
              <div
                key={regionKey}
                className="w-full flex flex-col gap-4 relative"
              >
                {/* Region Label */}
                <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-16 flex items-center gap-2 text-sm font-semibold text-[#A0A0A0] uppercase tracking-[1.5px]">
                  <span className="w-8 h-[1px] bg-[#E0E0E0]"></span>
                  <span>{regionKey}</span>
                </div>

                {/* Carousel */}
                <div className="w-full relative">
                  {/* Fade edges - only show if scrolling */}
                  {!isSingle && (
                    <>
                      <div className="absolute top-0 left-0 w-[80px] md:w-[150px] h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                      <div className="absolute top-0 right-0 w-[80px] md:w-[150px] h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                    </>
                  )}

                  {/* Scrolling track */}
                  <div
                    className={`flex items-center gap-6 md:gap-8 ${
                      isSingle
                        ? "px-6 lg:px-16 w-full max-w-[1440px] mx-auto"
                        : "partner-carousel-track"
                    }`}
                    style={
                      isSingle
                        ? undefined
                        : {
                            width: "max-content",
                            animationDuration,
                            animationDirection,
                          }
                    }
                  >
                    {carouselItems.map((partner, index) => (
                      <a
                        key={`${partner.name}-${index}`}
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex-shrink-0 flex items-center gap-4 bg-white border border-[#F2F2F2] rounded-2xl
                                 px-6 py-5 md:px-8 md:py-6
                                 shadow-[0_4px_20px_rgba(0,0,0,0.03)]
                                 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:border-[#E8E8E8]
                                 transition-all duration-300 hover:-translate-y-1
                                 min-w-[220px] md:min-w-[260px]"
                      >
                        {/* Logo */}
                        <div
                          className={`w-[80px] h-[48px] md:w-[100px] md:h-[56px] flex items-center justify-center flex-shrink-0 rounded-xl border p-1.5 md:p-2 overflow-hidden transition-colors duration-300 ${partner.theme === "dark" ? "bg-[#1A1A1A] border-[#2A2A2A] shadow-inner" : "bg-white border-[#F0F0F0]"}`}
                        >
                          <PartnerLogo
                            partner={partner}
                            index={index % partners.length}
                          />
                        </div>

                        {/* Name */}
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm md:text-base font-semibold text-[#323232] group-hover:text-[#FF0000] transition-colors duration-300 truncate">
                            {partner.name}
                          </span>
                          <span className="text-xs text-slate-400 truncate">
                            {partner.website
                              .replace(/^https?:\/\/(www\.)?/, "")
                              .replace(/\/$/, "")}
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          },
        )}
      </div>
    </section>
  );
}
