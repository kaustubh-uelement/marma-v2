"use client";

import React, { useState } from "react";
import Image from "next/image";
import HighlightedText from "../global/HighlightedText";
import Link from "next/link";
import DecorativeLine from "./DecorativeLine";
import Tabs from "../global/TabsComponent";

// ── Types ─────────────────────────────────────────────────────────────────────
interface FeatureItem {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

// ── Tab anchor map ─────────────────────────────────────────────────────────────
const TAB_ANCHORS: Record<string, string> = {
  enterprise: "/products#enterprisesolution",
  smb: "/products#smbsolution",
  home: "/products#homesolution",
};

// ── Tab Features ──────────────────────────────────────────────────────────────
const TAB_FEATURES: Record<string, FeatureItem[]> = {
  enterprise: [
    {
      id: "enterprise-1",
      image: "/images/home/Centralized Security Control.webp",
      title: "Centralized Security Control",
      subtitle: "One dashboard. Total visibility.",
      description:
        "Manage your entire security infrastructure from gateways to endpoints and cloud services through a single unified platform with real-time insights.",
    },
    {
      id: "enterprise-2",
      image: "/images/home/Advanced Threat Protection.webp",
      title: "Advanced Threat Protection",
      subtitle: "Defend against zero-day attacks.",
      description:
        "AI-powered protection detects and blocks phishing, ransomware, and advanced threats across network, email, and endpoints.",
    },
    {
      id: "enterprise-3",
      image: "/images/home/Scalable Enterprise Architecture.webp",
      title: "Scalable Enterprise Architecture",
      subtitle: "Built to grow with your business.",
      description:
        "From branch offices to large campuses, deploy high-performance security software and gateways and scale seamlessly as your organization expands.",
    },
    {
      id: "enterprise-4",
      image: "/images/home/Seamless Integrations.webp",
      title: "Seamless Integrations",
      subtitle: "Works with your existing ecosystem.",
      description:
        "Easily integrate with SIEM and SOC systems to enhance monitoring, compliance, and incident response workflows.",
    },
  ],
  smb: [
    {
      id: "smb-1",
      image: "/images/home/landing-smb solution-1.webp",
      title: "Simple Yet Powerful Security",
      subtitle: "Enterprise-grade protection, simplified.",
      description:
        "Get strong network and endpoint security without the complexity of managing large IT systems.",
    },
    {
      id: "smb-2",
      image: "/images/home/Easy Cloud Management.webp",
      title: "Easy Cloud Management",
      subtitle: "Control everything from anywhere.",
      description:
        "Manage your firewall, users, and security settings through a cloud-based platform designed for minimal IT overhead.",
    },
    {
      id: "smb-3",
      image: "/images/home/Real-Time Alerts & Monitoring.webp",
      title: "Real-Time Alerts & Monitoring",
      subtitle: "Stay informed, stay protected.",
      description:
        "Receive instant alerts and monitor your business security through an intuitive dashboard and mobile app.",
    },
    {
      id: "smb-4",
      image: "/images/home/Quick Deployment.webp",
      title: "Quick Deployment",
      subtitle: "Set up in minutes, not days.",
      description:
        "Deploy security solutions effortlessly without requiring dedicated IT teams or advanced configuration.",
    },
  ],
  home: [
    {
      id: "home-1",
      image: "/images/home/Quick&Effortless.webp",
      title: "Quick & Effortless Setup",
      subtitle: "Get protected in under 5 minutes.",
      description:
        "No technical expertise required simply plug in and your network is secured instantly.",
    },
    {
      id: "home-2",
      image: "/images/home/FullyAutomatedProtection.webp",
      title: "Fully Automated Protection",
      subtitle: "Security that runs itself.",
      description:
        "Your network is continuously monitored and protected in real time, without manual intervention.",
    },
    {
      id: "home-3",
      image: "/images/home/Zero Maintenance Required.webp",
      title: "Zero Maintenance Required",
      subtitle: "Automatic updates, hassle-free.",
      description:
        "All patches, updates, and security improvements happen automatically in the background.",
    },
    {
      id: "home-4",
      image: "/images/home/Family-WideProtection.webp",
      title: "Family-Wide Protection",
      subtitle: "Safe browsing for everyone at home.",
      description:
        "Protect all devices from phones to smart TVs with built-in DNS security, scam protection, and content filtering.",
    },
  ],
};

// ── Learn More Arrow ──────────────────────────────────────────────────────────
function ArrowIcon() {
  return (
    <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
      <path
        d="M1 9L5 5L1 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function HowWeProtect() {
  const [activeTab, setActiveTab] = useState("enterprise");

  const features = TAB_FEATURES[activeTab];
  const learnMoreHref = TAB_ANCHORS[activeTab];

  return (
    <section className="w-full bg-bg-white md:pb-16">
      {/* Header */}
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="relative flex flex-col md:flex-row justify-between items-start mb-8 md:mb-14 gap-4 md:gap-8 text-left w-full sm:h-[80px] md:h-auto">
          {/* Decorative Line — Mobile */}
          <div className="flex md:hidden absolute top-[-50px] right-[-24px] items-start justify-end w-[280px] pointer-events-none overflow-x-clip z-0">
            <div className="w-full flex justify-end">
              <DecorativeLine
                viewBox="0 0 700 80"
                points="100,40 1100,40"
                dots={[{ cx: 100, cy: 40, rippleCount: 3 }]}
                className="w-full h-auto translate-x-[15%]"
                animationDuration={2.8}
              />
            </div>
          </div>

          <h2 className="fl2-2 w-full md:max-w-[520px] relative z-10">
            How we{" "}
            <HighlightedText
              text="protect you?"
              className="font-bold text-text-dark"
              imageClassName="absolute h-auto object-contain pointer-events-none -z-10 bottom-[-10px] md:bottom-[-24px] left-2/4 -translate-x-1/2 w-[70%]"
            />
          </h2>


        </div>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          { label: "Enterprise Solutions", id: "enterprise" },
          { label: "SMB Solutions", id: "smb" },
          { label: "Home Solutions", id: "home" },
        ]}
        activeTabId={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Features List */}
      <div className="flex flex-col w-full pb-8 md:pb-2 gap-10 lg:gap-24 relative overflow-hidden mt-10 md:mt-16">
        {features.map((feature, index) => (
          <div key={`${activeTab}-${feature.id}`} className="w-full relative">
            {index === 1 && (
              <div className="absolute inset-y-[-32px] lg:inset-y-[-48px] w-[200vw] left-1/2 -translate-x-1/2 bg-bg-light -z-10 pointer-events-none" />
            )}

            <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-16 relative z-10">
              {/* MOBILE & TABLET */}
              <div className="grid grid-cols-[1fr_1.1fr] sm:grid-cols-[1fr_1.2fr] md:grid-cols-2 lg:hidden gap-3 sm:gap-6 md:gap-8 items-stretch text-left w-full">
                <div className="flex flex-col mt-2 md:mt-0 gap-0 md:gap-4">
                  <h3 className="fl3-1 whitespace-pre-line text-left">
                    {feature.title}
                  </h3>
                  <div className="relative w-full aspect-[427/237] rounded-[8px] md:rounded-[12px] overflow-hidden shadow-sm mt-2 md:mt-auto border border-[#E5E5E5]/50">
                    <div className="bg-gray-100 w-full h-full absolute inset-0 z-0" />
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 427px"
                      className="object-cover relative z-10"
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-start text-left h-full mt-2">
                  <strong className="fl5-1 block mb-[7px] md:mb-4">
                    {feature.subtitle}
                  </strong>
                  <p className="fl4-1 mb-[10px] md:mb-6">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* DESKTOP */}
              <div className="hidden lg:grid grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[1.2fr_1fr_1fr] gap-4 md:gap-8 lg:gap-12 items-center text-center md:text-left md:items-center">
                <div className="relative w-full max-w-[427px] aspect-[427/237] rounded-[16px] overflow-hidden shadow-sm mb-4 md:mb-0 mx-auto">
                  <div className="bg-gray-200 w-full h-full absolute inset-0 z-0" />
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover relative z-10"
                  />
                </div>
                <div className="flex flex-col justify-start md:pt-5 h-full">
                  <h3 className="fl3-1 whitespace-pre-line">{feature.title}</h3>
                </div>
                <div className="flex flex-col justify-start items-center md:items-start h-full border-l-0 border-t-[1.5px] md:border-t-0 md:border-l-[1.5px] border-[#E5E5E5] pt-6 md:pt-5 pl-0 md:pl-8 lg:pl-10 mt-2 md:mt-0">
                  <div className="flex flex-col justify-center items-center md:items-start w-full">
                    <strong className="fl5-1 block mb-[7px] md:mb-4">
                      {feature.subtitle}
                    </strong>
                    <p className="fl4-1 mb-[10px] md:mb-6">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
