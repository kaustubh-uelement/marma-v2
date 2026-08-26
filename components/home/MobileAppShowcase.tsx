import React from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/global/Button";

import { Shield, Lock, AlertTriangle, Smartphone, Mail, Cloud, Database, Activity, FileText, EyeOff, Radio, UserCheck } from "lucide-react";

export default function MobileAppShowcase() {
  const features = [
    { text: "Zero Day Phishing protection", Icon: Shield },
    { text: "Scam Protection Service", Icon: AlertTriangle },
    { text: "Smart Devices Protection", Icon: Smartphone },
    { text: "Dark Web Protection", Icon: EyeOff },
    { text: "Email Protection Service", Icon: Mail },
    { text: "Cloud Data Protection", Icon: Cloud },
    { text: "Predictive Risk Scoring", Icon: Activity },
    { text: "PCI, HIPAA Compliance", Icon: FileText },
    { text: "AI Data Leak Protection / DLP", Icon: Database },
    { text: "IOT Behavior Anomaly Detection", Icon: Radio },
    { text: "User Behavior Anomaly Detection", Icon: UserCheck },
    { text: "Zero Day Malware / Ransomware Protection", Icon: Lock },
  ];

  return (
    <section className="w-full bg-[#FFFFFF] pb-12 md:pb-24 px-4 sm:px-6 lg:px-16">
      <div className="max-w-[1440px] mx-auto bg-[#F7F7F7] rounded-[32px] p-8 md:p-12 lg:p-16">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 justify-between">

          {/* Left Column */}
          <div className="flex-1 max-w-[750px] flex flex-col justify-start">
            <h2 className="fl2 font-bold mb-10 md:mb-16">
              AI-Powered SASE Cybersecurity Platform
            </h2>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
              {features.map((feature, idx) => {
                const IconComponent = feature.Icon;
                return (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-[32px] h-[32px] bg-brand-red/5 rounded-md flex items-center justify-center flex-shrink-0">
                      <IconComponent size={18} color="#FF0000" strokeWidth={2.5} />
                    </div>
                    <span className="fl5 mt-1">
                      {feature.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex-1 w-full max-w-[400px] h-full! flex flex-col justify-between items-end gap-10 lg:ml-auto">
            {/* Image Placeholder Frame */}
            <div className="w-full relative rounded-[20px] overflow-hidden aspect-9/12 lg:aspect-9/12 flex-shrink-0 shadow-xl border border-[rgba(0,0,0,0.05)] bg-[#E5E5E5] flex items-center justify-center">
              <Image src="/images/solutions/ai_tech3.webp" alt="Marma Mobile App" fill className="object-fill scale-y-125" sizes="(max-width: 1024px) 100vw, 400px" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
