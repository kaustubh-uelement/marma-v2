"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getAvatarColor, getInitials, type Partner } from "@/lib/partnerData";

export function PartnerLogo({
  partner,
  index,
}: {
  partner: Partner;
  index: number;
}) {
  const [imgError, setImgError] = useState(false);

  if (imgError || !partner.logo) {
    return (
      <div
        className="w-full h-full rounded-xl flex items-center justify-center"
        style={{ backgroundColor: getAvatarColor(index) }}
      >
        <span className="text-white font-bold text-xl select-none">
          {getInitials(partner.name)}
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Image
        src={partner.logo}
        alt={`${partner.name} logo`}
        fill
        className="object-contain"
        onError={() => setImgError(true)}
        unoptimized
      />
    </div>
  );
}
