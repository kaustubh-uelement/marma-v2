import React from 'react';
import { CircleCheck } from 'lucide-react';

const CARD_CLASSES = "bg-[#FAFAFA] rounded-[16px] p-6 md:p-8 flex flex-col border border-[#FF0000]/20 shadow-[0px_16px_32px_rgba(255,0,0,0.05)] relative overflow-hidden group transition-all duration-500";
const TITLE_CLASSES = "text-xl md:text-2xl font-medium text-[#FF0000] mb-4 transition-colors duration-500";

const PARTNER_CARDS = [
  {
    title: "Program Requirements",
    items: [
      "Signed Partnership Agreement",
      "Establish Customer Base",
      "Strong GTM/ Revenue Plan"
    ]
  },
  {
    title: "Marma Support",
    items: [
      "Marketing Support",
      "Enablement (Sales & Technical)",
      "Co-Sell (Select Opportunities)",
      "Technical Support – Tier III"
    ]
  },
  {
    title: "Traditional Resell Pricing",
    text: "Buy Price 25% off list, partner marks up pricing and adds manages service pricing"
  },
  {
    title: "Referral Pricing",
    text: "Partner buys at List from Marma, referrer gets 10% commission."
  }
];

export default function PartneringMadeEasy() {
  return (
    <section className="relative w-full md:pt-24 pb-0 flex flex-col items-center overflow-hidden font-body">
      {/* Faded Background Text */}
      <div className="w-full absolute top-0 left-1/2 -translate-x-1/2 flex justify-center items-center z-0 select-none pointer-events-none max-w-[1440px] overflow-hidden">
        <span
          className="solutions-info-bg-text text-[#e8e8e8]! w-full text-center whitespace-nowrap text-[clamp(18px,6vw,90px)] tracking-[10px] opacity-50"
        >
          Partnering Made Easy!
        </span>
      </div>

      {/* Main Content Container (Style matching SolutionsInfo) */}
      <div className="w-full max-w-[1440px] bg-[#e8e8e8] mx-auto px-6 lg:px-16 flex flex-col py-8 lg:py-16 relative z-10 items-center rounded-sm">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full md:w-[85%] lg:w-[70%] relative">
          {PARTNER_CARDS.map((card, index) => (
            <div key={index} className={CARD_CLASSES}>
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#FF0000]/0 via-[#FF0000]/80 to-[#FF0000]/0 origin-center scale-x-100"></div>

              {/* Interior Glow */}
              <div className="absolute top-[-30px] left-[-30px] w-[140px] h-[140px] bg-[#FF0000]/10 blur-[45px] rounded-full pointer-events-none opacity-100"></div>

              <h3 className={TITLE_CLASSES}>
                {card.title}
              </h3>
              {card.items ? (
                <ul className="space-y-3 flex-1 list-disc pl-5 md:pl-6 marker:text-[#555555]">
                  {card.items.map((item, idx) => (
                    <li key={idx} className="text-[#555555]">
                      <span className="text-base md:text-lg font-medium leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-base md:text-md text-[#555555] leading-relaxed font-medium">
                  {card.text}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
