"use client";
import React from "react";
import Image from "next/image";
import Button from "../global/Button";
import GlassWrapper from "../global/GlassWrapper";
import Link from "next/link";

interface SolutionsInfoProps {
  imageSrc?: string;
  imagePosition?: "left" | "right";
  bgText?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  bgTextClassName?: string;
  button?: {
    label: string;
    href: string;
  };
}

export default function SolutionsInfo({
  imageSrc = "/images/solutions/OneSolution.webp",
  imagePosition = "left",
  bgText = "One Solution. Every Environment",
  bgTextClassName = "text-[clamp(14px,3.5dvw,54px)] tracking-[0.18em]",
  title = "A unified cybersecurity platform designed to protect networks across homes, businesses, and critical industries.",
  description = "Marma delivers enterprise-grade, network-level cybersecurity that adapts seamlessly to a wide range of use cases—from residential environments and small businesses to healthcare, finance, education, and other critical sectors. Built for simplicity and scale, Marma protects every device connected to your Wi-Fi network without requiring complex setups or technical expertise.",
  button
}: SolutionsInfoProps) {
  const isRight = imagePosition === "right";

  return (
    <section className="relative w-full mt-8 md:pt-12 pb-0 flex flex-col items-center ">
      {/* Faded Background Text */}
      <div className="w-full absolute -translate-y-3/4 flex justify-center z-0 select-none pointer-events-none max-w-[1440px] mx-auto overflow-hidden">
        <span
          className={`solutions-info-bg-text w-full whitespace-nowrap ${bgTextClassName}`}
        >
          {bgText}
        </span>
      </div>

      {/* Main Content Grid */}
      <div className="w-full max-w-[1440px] bg-[#f7f7f7] mx-auto px-6 lg:px-16 flex flex-col lg:grid py-0 lg:py-10 lg:grid-cols-2 gap-8 lg:gap-16 relative z-10 items-center rounded-sm">
        {/* Content Side */}
        <div
          className={`flex flex-col z-10 relative w-full h-full items-center text-center max-sm:gap-4 lg:items-start lg:text-left order-1 pt-4 md:p-10 ${isRight ? "lg:order-1" : "lg:order-2"
            }`}
        >
          <div className="bg-transparent flex flex-col justify-center h-full items-center lg:items-start relative lg:mb-12 ">
            <div className="flex flex-col">
              <h3 className="solutions-info-title pb-[20px]">
                {title}
              </h3>

              <p className="solutions-info-desc">{description}</p>
            </div>
          </div>
          {button && (
            <Link href={button.href} >
              <Button label={button.label} icon textContainer="text-[12px]" />
            </Link>
          )}
        </div>

        {/* Image Side */}
        <div
          className={`relative w-full h-[300px] md:h-[400px] lg:h-[420px] order-2 flex items-center justify-center ${isRight ? "lg:order-2" : "lg:order-1"
            }`}
        >

          {/* Glass Border Shell (The 12px frame) */}
          <GlassWrapper>
            <Image
              src={imageSrc}
              alt="Cybersecurity monitoring"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </GlassWrapper>
        </div>
      </div>
    </section>
  );
}
