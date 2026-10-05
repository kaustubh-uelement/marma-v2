"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  ShieldCheck,
  LayoutGrid,
  BarChart3,
  Network,
  Settings,
  SlidersHorizontal,
  Moon,
  MoreHorizontal,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Activity,
  CheckCircle2,
  Lock,
  Zap,
} from "lucide-react";
import BookDemoModal from "./BookDemoModal";

interface SaaSHeroProps {
  onBookDemo?: () => void;
}

const VIEWS = [
  {
    id: 0,
    title: "Enterprise Protection",
    totalBalance: "$14,090,090.00",
    balanceGrowth: "+2.4% Safe",
    income: "$1,083,043.00",
    incomeGrowth: "+14.8% Neutralized",
    streamLabel: "Live Threat Telemetry",
    streamStatus: "Active Shield",
    streamRate: "0.012s Latency",
  },
  {
    id: 1,
    title: "Cloud Infrastructure",
    totalBalance: "$8,420,150.00",
    balanceGrowth: "+4.1% Monitored",
    income: "$942,650.00",
    incomeGrowth: "+18.2% Auto-Blocked",
    streamLabel: "Zero-Trust Mesh Sync",
    streamStatus: "100% Verified",
    streamRate: "24/24 Clusters",
  },
  {
    id: 2,
    title: "Endpoint Fleet",
    totalBalance: "$5,669,940.00",
    balanceGrowth: "99.99% Uptime",
    income: "$621,390.00",
    incomeGrowth: "+9.6% Filtered",
    streamLabel: "Agent Telemetry Stream",
    streamStatus: "5,200 Connected",
    streamRate: "Real-time AI",
  },
];

// Bar heights for the monthly activity chart
const CHART_BARS = [
  { height: 28, isRed: false, label: "Jan 02", val: "24.1k" },
  { height: 35, isRed: false, label: "Jan 04", val: "31.4k" },
  { height: 22, isRed: false, label: "Jan 06", val: "18.8k" },
  { height: 42, isRed: false, label: "Jan 08", val: "44.2k" },
  { height: 58, isRed: false, label: "Jan 10", val: "59.0k" },
  { height: 75, isRed: true, label: "Jan 12", val: "88.5k" },
  { height: 95, isRed: true, label: "Jan 14", val: "112.3k" },
  { height: 85, isRed: true, label: "Jan 16", val: "97.4k" },
  { height: 60, isRed: true, label: "Jan 18", val: "68.2k" },
  { height: 45, isRed: false, label: "Jan 20", val: "46.1k" },
  { height: 38, isRed: false, label: "Jan 22", val: "39.5k" },
  { height: 50, isRed: false, label: "Jan 24", val: "52.8k" },
  { height: 32, isRed: false, label: "Jan 26", val: "33.6k" },
  { height: 40, isRed: false, label: "Jan 28", val: "41.9k" },
];

export default function SaaSHero({ onBookDemo }: SaaSHeroProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [activeViewIdx, setActiveViewIdx] = useState(0);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [isInternalModalOpen, setIsInternalModalOpen] = useState(false);

  const currentView = VIEWS[activeViewIdx];

  const handleNextView = () => {
    setActiveViewIdx((prev) => (prev + 1) % VIEWS.length);
  };

  const handlePrevView = () => {
    setActiveViewIdx((prev) => (prev - 1 + VIEWS.length) % VIEWS.length);
  };

  const handleCtaClick = () => {
    if (onBookDemo) {
      onBookDemo();
    } else {
      setIsInternalModalOpen(true);
    }
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;

      // Animate badge, headline, subtitle and button entrance
      gsap.fromTo(
        ".hero-header-elem",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
        }
      );

      // Animate the main device mockup container
      gsap.fromTo(
        ".hero-mockup-frame",
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          delay: 0.35,
          ease: "power3.out",
        }
      );

      // Subtle pulse on the side red ambient beams
      gsap.to(".hero-beam-left", {
        opacity: 0.85,
        scaleX: 1.08,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".hero-beam-right", {
        opacity: 0.85,
        scaleX: 1.08,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#000000] text-white overflow-hidden pt-32 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 flex flex-col items-center"
    >
      {/* ── Background Glow Effects (Black & Red Theme) ────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Left Horizontal Red Flare Beam */}
        <div
          className="hero-beam-left absolute -left-[280px] sm:-left-[240px] md:-left-[180px] top-[46%] -translate-y-1/2 w-[550px] sm:w-[700px] md:w-[850px] h-[220px] sm:h-[300px] md:h-[360px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 45% at 20% 50%, rgba(255, 0, 30, 0.48) 0%, rgba(220, 20, 40, 0.28) 35%, rgba(180, 0, 20, 0.12) 65%, transparent 85%)",
            filter: "blur(60px)",
          }}
        />

        {/* Right Horizontal Red Flare Beam */}
        <div
          className="hero-beam-right absolute -right-[280px] sm:-right-[240px] md:-right-[180px] top-[46%] -translate-y-1/2 w-[550px] sm:w-[700px] md:w-[850px] h-[220px] sm:h-[300px] md:h-[360px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 65% 45% at 80% 50%, rgba(255, 0, 30, 0.48) 0%, rgba(220, 20, 40, 0.28) 35%, rgba(180, 0, 20, 0.12) 65%, transparent 85%)",
            filter: "blur(60px)",
          }}
        />

        {/* Center Backlight Halo behind Mockup */}
        <div
          className="absolute top-[62%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-[950px] h-[350px] sm:h-[480px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(239, 35, 60, 0.22) 0%, rgba(180, 10, 30, 0.10) 45%, transparent 75%)",
            filter: "blur(80px)",
          }}
        />

        {/* Subtle dark vignette on top edge to ensure smooth transition from fixed navbar */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none" />
      </div>

      {/* ── Hero Center Content ───────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Tagline Badge with Decorative Gradient Lines */}
        <div className="hero-header-elem flex items-center justify-center gap-3 sm:gap-4 mb-5 sm:mb-6">
          {/* Left Decorative Line */}
          <div className="hidden xs:flex items-center">
            <div className="w-10 sm:w-20 md:w-28 h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-red-500/80" />
            <div className="w-1.5 h-1.5 rotate-45 bg-red-500 shadow-[0_0_8px_#ef4444] -ml-[3px]" />
          </div>

          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 rounded-full border border-white/10 bg-[#16161c]/80 backdrop-blur-md shadow-[0_0_20px_rgba(255,0,0,0.12)]">
            <span className="font-body text-[12px] sm:text-[13px] tracking-tight text-neutral-300 font-normal">
              Simplify your workflow
            </span>
          </div>

          {/* Right Decorative Line */}
          <div className="hidden xs:flex items-center">
            <div className="w-1.5 h-1.5 rotate-45 bg-red-500 shadow-[0_0_8px_#ef4444] -mr-[3px]" />
            <div className="w-10 sm:w-20 md:w-28 h-[1px] bg-gradient-to-l from-transparent via-red-500/30 to-red-500/80" />
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="hero-header-elem font-banner font-bold text-[34px] xs:text-[40px] sm:text-[52px] md:text-[62px] lg:text-[70px] leading-[1.08] tracking-[-0.03em] text-white max-w-[900px]">
          Enhance your security <br />
          control with Marma
        </h1>

        {/* Subtitle */}
        <p className="hero-header-elem font-body font-light text-[14px] xs:text-[15px] sm:text-[17px] md:text-[18px] text-neutral-400 max-w-[560px] mx-auto mt-4 sm:mt-5 leading-relaxed">
          Streamline your enterprise cybersecurity with our intuitive, scalable SaaS platform. Designed for modern enterprises.
        </p>

        {/* CTA Button */}
        <div className="hero-header-elem mt-6 sm:mt-7 mb-10 sm:mb-14">
          <button
            onClick={handleCtaClick}
            className="group relative inline-flex items-center justify-center px-7 sm:px-8 py-3 rounded-full bg-white text-black font-semibold text-[14px] sm:text-[15px] tracking-tight transition-all duration-300 hover:bg-neutral-200 hover:shadow-[0_0_28px_rgba(255,255,255,0.4)] hover:scale-[1.03] active:scale-[0.98]"
          >
            Get started
          </button>
        </div>

        {/* ── Hero Mockup Container (Device Frame) ────────────────────────── */}
        <div className="hero-mockup-frame w-full max-w-[1040px] mx-auto relative">
          {/* Subtle Ambient Red Halo hugging the bezel */}
          <div className="absolute -inset-1 rounded-[30px] sm:rounded-[36px] bg-gradient-to-b from-red-500/30 via-red-600/15 to-transparent blur-xl opacity-75 pointer-events-none" />

          {/* Device Outer Chassis */}
          <div className="relative rounded-[26px] sm:rounded-[34px] border border-white/[0.14] bg-[#0c0c12]/95 backdrop-blur-2xl shadow-[0_25px_80px_-15px_rgba(0,0,0,0.9),0_0_40px_-5px_rgba(239,68,68,0.25)] p-2.5 sm:p-5 md:p-6 overflow-hidden">
            {/* Screen Glass Reflection Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent pointer-events-none rounded-[26px] sm:rounded-[34px]" />

            {/* Mockup Header Bar */}
            <div className="relative z-10 flex items-center justify-between pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-white/[0.06] px-1 sm:px-2">
              {/* Left Greeting & Status */}
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
                </span>
                <span className="font-body text-xs sm:text-sm font-medium text-white tracking-tight">
                  Welcome back, Admin!
                </span>
              </div>

              {/* Right Action Icons */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  aria-label="Filter"
                  className="p-1.5 sm:p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-neutral-400 hover:text-white transition-colors border border-white/[0.06]"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button
                  aria-label="Toggle Theme"
                  className="p-1.5 sm:p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-neutral-400 hover:text-white transition-colors border border-white/[0.06]"
                >
                  <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button
                  aria-label="Options"
                  className="p-1.5 sm:p-2 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-neutral-400 hover:text-white transition-colors border border-white/[0.06]"
                >
                  <MoreHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>

            {/* Mockup Workspace Body */}
            <div className="relative z-10 flex gap-2.5 sm:gap-4 md:gap-5 items-stretch">
              {/* Left Vertical Icon Rail */}
              <div className="hidden xs:flex flex-col items-center justify-between w-10 sm:w-12 bg-[#121219]/90 border border-white/[0.06] rounded-xl sm:rounded-2xl py-3 px-1.5 shrink-0">
                <div className="flex flex-col gap-2.5 sm:gap-3 w-full items-center">
                  {/* Active Item 1 (Red Accent) */}
                  <button
                    onClick={() => setActiveTab(0)}
                    aria-label="Shield Overview"
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all ${
                      activeTab === 0
                        ? "bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.7)]"
                        : "text-neutral-400 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4" />
                  </button>

                  {/* Item 2 */}
                  <button
                    onClick={() => setActiveTab(1)}
                    aria-label="Dashboard Grid"
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all ${
                      activeTab === 1
                        ? "bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.7)]"
                        : "text-neutral-400 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>

                  {/* Item 3 */}
                  <button
                    onClick={() => setActiveTab(2)}
                    aria-label="Analytics Chart"
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all ${
                      activeTab === 2
                        ? "bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.7)]"
                        : "text-neutral-400 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    <BarChart3 className="w-4 h-4" />
                  </button>

                  {/* Item 4 */}
                  <button
                    onClick={() => setActiveTab(3)}
                    aria-label="Network Devices"
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-all ${
                      activeTab === 3
                        ? "bg-red-600 text-white shadow-[0_0_12px_rgba(220,38,38,0.7)]"
                        : "text-neutral-400 hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    <Network className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom Setting Item */}
                <button
                  aria-label="Settings"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-neutral-500 hover:text-white hover:bg-white/[0.05] transition-colors"
                >
                  <Settings className="w-4 h-4" />
                </button>
              </div>

              {/* Main Content Workspace */}
              <div className="flex-1 flex flex-col gap-3 sm:gap-4 min-w-0">
                {/* 2 Main Top Cards (Side by Side) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {/* CARD 1: Total Protected Assets */}
                  <div className="relative rounded-2xl bg-[#14141d]/90 border border-white/[0.08] p-4 sm:p-5 flex flex-col justify-between overflow-hidden group hover:border-white/[0.16] transition-all">
                    {/* Top Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                          <Lock className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-body text-xs sm:text-[13px] text-neutral-400 font-medium">
                          Total Protected Assets
                        </span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                    </div>

                    {/* Big Metric & Badge */}
                    <div className="mt-3 mb-4">
                      <div className="font-banner font-bold text-2xl sm:text-[28px] md:text-[32px] text-white tracking-tight">
                        {currentView.totalBalance}
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 mt-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {currentView.balanceGrowth}
                      </div>
                    </div>

                    {/* Sub Rows (Mastercard & Paypal style items adapted for Marma) */}
                    <div className="space-y-2 pt-2 border-t border-white/[0.05]">
                      {/* Sub-row 1: Mastercard style */}
                      <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] transition-colors">
                        <div className="flex items-center gap-2.5">
                          {/* Dual overlapping circles icon */}
                          <div className="relative w-6 h-4 flex items-center shrink-0">
                            <span className="w-3.5 h-3.5 rounded-full bg-red-500 absolute left-0" />
                            <span className="w-3.5 h-3.5 rounded-full bg-amber-500/90 absolute left-2" />
                          </div>
                          <div>
                            <p className="font-body text-xs font-medium text-white tracking-tight">
                              Cloud Infrastructure
                            </p>
                            <p className="font-body text-[10px] text-neutral-400">
                              24 Active Clusters
                            </p>
                          </div>
                        </div>
                        <span className="font-body text-xs font-semibold text-white tracking-tight">
                          $80,240.00
                        </span>
                      </div>

                      {/* Sub-row 2: Paypal style */}
                      <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] transition-colors">
                        <div className="flex items-center gap-2.5">
                          {/* Blue pill/shield icon */}
                          <div className="w-6 h-6 rounded-lg bg-blue-600/25 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                            <Zap className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <p className="font-body text-xs font-medium text-white tracking-tight">
                              Endpoint Agent Fleet
                            </p>
                            <p className="font-body text-[10px] text-neutral-400">
                              5,200 Connected Devices
                            </p>
                          </div>
                        </div>
                        <span className="font-body text-xs font-semibold text-white tracking-tight">
                          $135,000.00
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CARD 2: Monthly Threats Blocked (With Glowing Red Bar Chart) */}
                  <div className="relative rounded-2xl bg-[#14141d]/90 border border-white/[0.08] p-4 sm:p-5 flex flex-col justify-between overflow-hidden group hover:border-white/[0.16] transition-all">
                    {/* Top Row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                          <Activity className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-body text-xs sm:text-[13px] text-neutral-400 font-medium">
                          Monthly Threats Blocked
                        </span>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                    </div>

                    {/* Big Metric & Badge */}
                    <div className="mt-3 mb-2">
                      <div className="font-banner font-bold text-2xl sm:text-[28px] md:text-[32px] text-white tracking-tight">
                        {currentView.income}
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 mt-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        {currentView.incomeGrowth}
                      </div>
                    </div>

                    {/* Timeframe Label */}
                    <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-2 pt-1 border-t border-white/[0.05]">
                      <span>Real-Time Prevention Activity</span>
                      <span className="text-neutral-300 font-medium">January 2026</span>
                    </div>

                    {/* Vertical Bar Chart with Glowing Red Peak Bars */}
                    <div className="relative h-24 sm:h-28 flex items-end justify-between gap-1 sm:gap-1.5 pt-4 px-1">
                      {CHART_BARS.map((bar, idx) => {
                        const isHovered = hoveredBar === idx;
                        return (
                          <div
                            key={idx}
                            className="relative flex-1 flex flex-col items-center justify-end h-full group/bar cursor-pointer"
                            onMouseEnter={() => setHoveredBar(idx)}
                            onMouseLeave={() => setHoveredBar(null)}
                          >
                            {/* Bar Tooltip on Hover */}
                            {isHovered && (
                              <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-1.5 py-0.5 bg-black/90 border border-white/20 rounded text-[9px] text-white whitespace-nowrap z-30 shadow-lg">
                                {bar.val}
                              </div>
                            )}

                            {/* The Bar Itself */}
                            <div
                              className={`w-full max-w-[14px] rounded-t-sm transition-all duration-300 ${
                                bar.isRed
                                  ? "bg-gradient-to-t from-red-700 via-red-600 to-red-400 shadow-[0_0_14px_rgba(239,68,68,0.75)]"
                                  : "bg-[#252532] hover:bg-[#343445]"
                              }`}
                              style={{
                                height: `${bar.height}%`,
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Bottom Row inside Mockup: Telemetry Strip & Pagination Dots */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 rounded-xl bg-[#14141d]/70 border border-white/[0.06]">
                  {/* Telemetry Status */}
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="text-white font-medium">{currentView.streamLabel}:</span>
                    <span className="text-emerald-400">{currentView.streamStatus}</span>
                    <span className="hidden md:inline text-neutral-500">•</span>
                    <span className="hidden md:inline text-neutral-400">{currentView.streamRate}</span>
                  </div>

                  {/* Centered Pagination Slider Controls (< ● ○ ○ >) */}
                  <div className="flex items-center gap-2">
                    {/* Previous Button */}
                    <button
                      onClick={handlePrevView}
                      aria-label="Previous View"
                      className="w-6 h-6 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>

                    {/* Pagination Dots */}
                    <div className="flex items-center gap-1.5">
                      {VIEWS.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveViewIdx(idx)}
                          aria-label={`Switch to slide ${idx + 1}`}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            idx === activeViewIdx
                              ? "w-6 bg-red-600 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                              : "w-2 bg-neutral-600 hover:bg-neutral-500"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={handleNextView}
                      aria-label="Next View"
                      className="w-6 h-6 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Internal Demo Modal if no parent handler is passed */}
      <BookDemoModal
        isOpen={isInternalModalOpen}
        onClose={() => setIsInternalModalOpen(false)}
        bookDemoTitle="Start your free trial"
      />
    </section>
  );
}
