"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/global/Button";
import BookDemoModal from "@/components/home/BookDemoModal";

interface SolutionButtonsProps {
  ctaLink: string;
  buttonText: string;
}

export default function SolutionButtons({ ctaLink, buttonText }: SolutionButtonsProps) {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Button 
          icon
          label="Book a Demo" 
          onClick={() => setIsDemoModalOpen(true)} 
          textContainer="whitespace-nowrap"
        />
      </div>
      <BookDemoModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />
    </>
  );
}
