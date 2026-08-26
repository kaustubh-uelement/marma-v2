import React from "react";
import Image from "next/image";
import { BottomCardData } from "./constants";
import { handleMouseEnter, handleMouseLeave } from "./utils";

interface EdgeCardProps {
  card: BottomCardData;
}

export default function EdgeCard({ card }: EdgeCardProps) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/3 lg:-translate-y-1/2 z-30 scale-[0.70] sm:scale-75 md:scale-90 xl:scale-100 origin-top"
      style={{ left: card.pos.left, top: card.pos.top }}
    >
      <div className="card-node-inner flex flex-col items-center md:bg-white p-3 md:p-5 rounded-[12px] md:rounded-[20px] shadow-[0px_8px_30px_rgba(0,0,0,0.04)] border border-[#F0F0F0] w-[130px] sm:w-[160px] md:w-[220px] bg-white">
        <h4 className="font-body font-medium text-[12px] md:text-[14px] text-[#333333] mb-3 text-center">
          {card.title}
        </h4>

        {/* Image Placeholder Frame */}
        <div className="relative w-full aspect-video rounded-[8px] mb-3 overflow-hidden flex items-center justify-center">
          {card.img && (
            <Image
              src={card.img}
              alt={card.label}
              fill
              sizes="200px"
              className="object-contain"
            />
          )}
        </div>

        <p className="font-body font-semibold text-[11px] md:text-[13px] text-center text-[#2A2A2A] leading-snug">
          {card.label}
        </p>
      </div>
    </div>
  );
}
