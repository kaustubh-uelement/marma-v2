"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import SaaSHero from "@/components/home/SaaSHero";
import TrustedByStrip from "@/components/home/TrustedByStrip";
import FeatureCards from "@/components/home/FeatureCards";
import BookDemoModal from "@/components/home/BookDemoModal";
import DashboardShowcase from "@/components/home/DashboardShowcase";

// Dynamic imports for below-the-fold sections
const Challengestab = dynamic(() => import("@/components/home/Challengestab"));
const HowWeProtect = dynamic(() => import("@/components/home/HowWeProtect"));
const AdvancedArchitecture = dynamic(
  () => import("@/components/technology/AdvancedArchitecture"),
);

export default function Home() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <div className="flex flex-col bg-[#FFFFFF] min-h-screen overflow-x-clip">
      {/* ── SECTION 1: SaaS Hero ───────────────────────────────────────────── */}
      <SaaSHero onBookDemo={() => setIsDemoModalOpen(true)} />

      {/* ── SECTION 2: Trusted By Strip ────────────────────────────────────── */}
      <TrustedByStrip />

      {/* ── SECTION 3: Feature Cards Grid ──────────────────────────────────── */}
      <FeatureCards />

      {/* ── SECTION 4: Dashboard Showcase ──────────────────────────────────── */}
      <DashboardShowcase />

      {/* ── SECTION 5: Challenges Tab ──────────────────────────────────────── */}
      <Challengestab />

      {/* ── SECTION 6: How We Protect ──────────────────────────────────────── */}
      <HowWeProtect />

      {/* ── SECTION 7: Advanced Architecture ───────────────────────────────── */}
      <AdvancedArchitecture />

      {/* Book a Demo Modal */}
      <BookDemoModal
        isOpen={isDemoModalOpen}
        bookDemoTitle="Start your free trial"
        onClose={() => setIsDemoModalOpen(false)}
      />
    </div>
  );
}
