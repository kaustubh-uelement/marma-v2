"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface SlideImage {
  src: string;
  alt: string;
}

interface HeroImageSliderProps {
  images: SlideImage[];
  className?: string;
}

const CARD_WIDTH = 420;
const CARD_HEIGHT = 300;
const AUTOPLAY_INTERVAL = 4000;

function getCardProps(offset: number, sideOffset: number) {
  const abs = Math.abs(offset);
  const dir = offset <= 0 ? -1 : 1;

  switch (abs) {
    case 0:
      return { x: 0, scale: 1.05, opacity: 1, zIndex: 30 };
    case 1:
      return { x: dir * sideOffset, scale: 0.72, opacity: 0.45, zIndex: 20 };
    default:
      return { x: dir * (sideOffset + 300), scale: 0.65, opacity: 0, zIndex: 0 };
  }
}

export default function HeroImageSlider({
  images,
  className = "",
}: HeroImageSliderProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cardWidth, setCardWidth] = useState(CARD_WIDTH);
  const [cardHeight, setCardHeight] = useState(CARD_HEIGHT);
  const [sideOffset, setSideOffset] = useState(340);
  const containerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const total = images.length;

  useEffect(() => {
    const measure = () => {
      const w = outerRef.current?.offsetWidth ?? 600;
      const mobile = w < 500;
      setIsMobile(mobile);

      if (mobile) {
        const cw = Math.round(w * 0.72);
        const ch = Math.round(cw * (CARD_HEIGHT / CARD_WIDTH)); // keep aspect ratio
        setCardWidth(cw);
        setCardHeight(ch);
        setSideOffset(Math.round(w * 0.35));
      } else {
        // Desktop: restore original values exactly
        setCardWidth(CARD_WIDTH);
        setCardHeight(CARD_HEIGHT);
        setSideOffset(340);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const next = useCallback(
    () => setCurrent((prev) => (prev + 1) % total),
    [total]
  );

  useEffect(() => {
    if (paused || total <= 1) return;
    const timer = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [next, paused, total]);

  useGSAP(
    () => {
      images.forEach((_, i) => {
        let offset = i - current;
        if (offset > total / 2) offset -= total;
        if (offset < -total / 2) offset += total;

        const { x, scale, opacity, zIndex } = getCardProps(offset, sideOffset);
        const card = containerRef.current?.querySelector(`.hero-slide-${i}`);

        if (card) {
          gsap.to(card, {
            x,
            scale,
            opacity,
            zIndex,
            duration: 0.8,
            ease: "power3.out",
            overwrite: true,
          });
        }
      });
    },
    { dependencies: [current, sideOffset], scope: containerRef }
  );

  if (total === 1) {
    return (
      <div className={`relative rounded-2xl overflow-hidden ${className}`}>
        <Image src={images[0].src} alt={images[0].alt} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div
      ref={outerRef}
      className={`relative flex flex-col items-center justify-center ${className}`}
      style={
        isMobile
          ? {
              // Mobile only: clip horizontal bleed, fade edges with real divs
              overflowX: "clip",
              overflowY: "visible",
            }
          : {
              // Desktop: original mask — worked perfectly
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
              maskImage:
                "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
            }
      }
    >
      {/* Mobile edge fades — real divs, don't clip shadows */}
      {isMobile && (
        <>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "8%",
              height: "100%",
              background: "linear-gradient(to right, #F3F4F6, transparent)",
              zIndex: 40,
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "8%",
              height: "100%",
              background: "linear-gradient(to left, #F3F4F6, transparent)",
              zIndex: 40,
              pointerEvents: "none",
            }}
          />
        </>
      )}

      {/* Carousel track */}
      <div
        ref={containerRef}
        className="relative flex items-center justify-center w-full"
        style={{
          height: cardHeight + 80,
          overflow: "visible",
          paddingBottom: 40,
        }}
      >
        {images.map((image, i) => {
          let offset = i - current;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          const isCenter = offset === 0;
          const isSide = Math.abs(offset) === 1;

          return (
            <div
              key={image.src}
              className={`hero-slide-${i}`}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                marginLeft: -(cardWidth / 2),
                marginTop: -(cardHeight / 2),
                cursor: isSide ? "pointer" : "default",
                borderRadius: 20,
                boxShadow: isCenter
                  ? "0 20px 60px rgba(0,0,0,0.18)"
                  : "0 8px 24px rgba(0,0,0,0.08)",
                transition: "box-shadow 0.8s ease",
              }}
              onClick={() => isSide && setCurrent(i)}
            >
              {/* Bottom glow */}
              {isCenter && (
                <div
                  style={{
                    position: "absolute",
                    bottom: -16,
                    left: "10%",
                    width: "80%",
                    height: 28,
                    background:
                      "radial-gradient(ellipse 100% 100%, rgba(0,0,0,0.18) 0%, transparent 75%)",
                    filter: "blur(10px)",
                    borderRadius: "50%",
                    zIndex: -1,
                  }}
                />
              )}

              {/* Card */}
              <div
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  borderRadius: 20,
                  overflow: "hidden",
                  position: "relative",
                  background: "#f3f4f6",
                  border: isCenter
                    ? "1px solid rgba(0,0,0,0.12)"
                    : "1px solid rgba(0,0,0,0.06)",
                  transition: "border 0.8s ease",
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={isCenter}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}