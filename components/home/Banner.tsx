"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "../global/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export interface BannerButton {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  icon?: boolean;
}

export interface BannerProps {
  backgroundImage: string;
  heightVariant?: "900" | "810" | "794";
  title: React.ReactNode;
  middleText?: React.ReactNode;
  middleTextClassName?: string;
  subtitle?: React.ReactNode;
  subtitleClassName?: string;
  buttons?: BannerButton[];
  rightImage?: string;
  rightImageAlt?: string;

  showRightImageCircle?: boolean;
  titleClassName?: string;
  rightImageClassName?: string;
  rightImageCircleClassName?: string;
  rightContent?: React.ReactNode;
  ContinerClass?: string;
  backgroundSize?: string;
  sectionClassName?: string;
  overlay?: boolean;
}

export default function Banner({
  backgroundImage,
  title,
  subtitle,
  subtitleClassName = "font-title text-[20px] lg:text-[24px] text-white/90 max-w-[550px] tracking-[-0.01em] leading-relaxed font-light",
  buttons = [],
  rightImage,
  rightImageAlt = "Banner Image",
  titleClassName = "font-banner font-normal text-[32px] lg:text-[45px] leading-[1.2] lg:leading-[60px] tracking-[-0.01em] text-white drop-shadow-sm",
  rightImageClassName = "",
  showRightImageCircle = true,
  overlay = false,
}: BannerProps) {
  const [activeImage, setActiveImage] = useState<string | null>(rightImage || null);
  const [outgoingImage, setOutgoingImage] = useState<string | null>(null);
  const [activeBg, setActiveBg] = useState<string>(backgroundImage);
  const [outgoingBg, setOutgoingBg] = useState<string | null>(null);

  const imgContainerRef = useRef<HTMLDivElement>(null);
  const bgContainerRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);
  // Synchronize first mount flag
  useEffect(() => {
    isFirstMount.current = false;
  }, []);

  // Sync product image prop to state for transition
  useEffect(() => {
    if (rightImage !== activeImage) {
      setOutgoingImage(activeImage);
      setActiveImage(rightImage || null);
    }
  }, [rightImage]);

  // Sync background prop to state for transition
  useEffect(() => {
    if (backgroundImage !== activeBg) {
      setOutgoingBg(activeBg);
      setActiveBg(backgroundImage);
    }
  }, [backgroundImage]);

  useGSAP(
    () => {
      if (!outgoingBg) return;

      const incoming = bgContainerRef.current?.querySelector(".incoming-bg");
      const outgoing = bgContainerRef.current?.querySelector(".outgoing-bg");

      if (incoming) {
        gsap.fromTo(incoming,
          { opacity: 0, scale: 1.1 },
          { opacity: 1, scale: 1, duration: 1.5, ease: "power2.inOut" }
        );
      }

      if (outgoing) {
        gsap.to(outgoing, {
          opacity: 0,
          scale: 0.85,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => setOutgoingBg(null)
        });
      }
    },
    { dependencies: [activeBg], scope: bgContainerRef }
  );

  useGSAP(
    () => {
      if (!activeImage || isFirstMount.current) return;

      const incoming = imgContainerRef.current?.querySelector(".incoming-img");
      const outgoing = imgContainerRef.current?.querySelector(".outgoing-img");

      if (incoming) {
        gsap.fromTo(
          incoming,
          {
            x: "0%",
            z: -500,
            scale: 0.8,
            rotateY: 90,
            opacity: 0,
            filter: "blur(8px)",
            transformOrigin: "50% 50% -250px",
          },
          {
            x: "0%",
            z: 0,
            scale: 1,
            rotateY: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power3.out",
          }
        );
      }

      if (outgoing) {
        gsap.to(outgoing, {
          scale: 0.5,
          z: -1000,
          opacity: 0,
          filter: "blur(25px)",
          duration: 0.8,
          ease: "power2.inOut",
          transformOrigin: "50% 50%",
          onComplete: () => setOutgoingImage(null),
        });
      }
    },
    { dependencies: [activeImage], scope: imgContainerRef }
  );

  return (
    <section className="relative h-svh w-screen">
      {/* Background Image Container */}
      <div ref={bgContainerRef} className="absolute inset-0 w-full h-[96svh]! lg:h-[93svh]! overflow-hidden">
        {outgoingBg && (
          <Image
            src={outgoingBg}
            alt="hero-background-outgoing"
            fill
            className="outgoing-bg object-cover object-center"
            priority={true}
            sizes="(max-width: 1920px) 100vw, 1920px"
            quality={70}
          />
        )}
        <Image
          src={activeBg}
          alt="hero-background-active"
          fill
          className="incoming-bg object-cover object-center"
          priority={true}
          fetchPriority="high"
          sizes="(max-width: 1920px) 100vw, 1920px"
          quality={70}
        />
        {/* Dark Overlay */}
        {overlay && <div className="absolute inset-0 bg-black/70 z-[5]" />}
      </div>

      <div className="h-[96svh] lg:h-[93svh] relative z-10 overflow-hidden w-full flex items-center lg:items-center">
        {/* Main Content Container inside the Banner */}
        <div className="relative z-20 px-6 lg:px-16 h-3/5 mb-14 w-full lg:py-0">
          {/* Left Column: Text, Subtitle, and Buttons */}
          <div className="flex flex-col space-y-4  lg:space-y-6 pb-5 lg:mt-4 text-white z-30 items-center lg:items-start text-center lg:text-left">
            {" "}
            {/* Title text */}
            <div className={titleClassName}>{title}</div>
            {/* Render Subtitle conditionally */}
            {subtitle && <div className={subtitleClassName}>{subtitle}</div>}
            {/* Render Buttons conditionally */}
            {buttons && buttons.length > 0 && (
              <div className=" lg:absolute flex flex-wrap items-center justify-center lg:justify-start gap-4 lg:gap-6 pt-6 lg:pt-8 lg:pt-16 w-full lg:bottom-0">
                {buttons.map((btn, index) => {
                  const ButtonContent = (
                    <Button
                      key={`btn-inner-${index}`}
                      label={btn.label}
                      variant={btn.variant}
                      icon={btn.icon}
                      onClick={btn.onClick}
                    />
                  );

                  return btn.href ? (
                    <Link href={btn.href} key={`btn-${index}`}>
                      {ButtonContent}
                    </Link>
                  ) : (
                    <React.Fragment key={`btn-frag-${index}`}>
                      {ButtonContent}
                    </React.Fragment>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/*  background circle */}
        {showRightImageCircle && <div
          className=" absolute max-lg:left-1/2 max-lg:-translate-x-1/2 lg:-right-6 bottom-0 lg:-bottom-4 w-[35vh] h-[35vh] md:w-[40vh] md:h-[40vh] lg:w-[75svh] lg:h-[75svh] rounded-full opacity-50
            bg-[linear-gradient(290deg,rgba(255,0,0,0.01)_0%,rgba(255,0,0,1)_100%)]
            backdrop-blur-[60px]
            "
        ></div>}
      </div>

      {/* product image */}

      <div
        ref={imgContainerRef}
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-10 z-20 pointer-events-none h-full ${rightImageClassName || "w-[20vh] lg:w-[50svh]"}`}
        style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
      >
        {outgoingImage && (
          <div
            className="outgoing-img absolute bottom-0 right-0 w-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Image
              src={outgoingImage}
              alt={rightImageAlt}
              width={700}
              height={700}
              className="w-full h-auto object-contain"
              sizes="(max-width: 1024px) 20vh, 50vh"
            />
          </div>
        )}
        {activeImage && (
          <div
            className="incoming-img absolute bottom-0 right-0 w-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            <Image
              src={activeImage}
              alt={rightImageAlt}
              width={700}
              height={700}
              priority
              className="w-full h-auto object-contain"
              sizes="(max-width: 1024px) 20vh, 50vh"
            />
          </div>
        )}
      </div>
    </section>
  );
}
