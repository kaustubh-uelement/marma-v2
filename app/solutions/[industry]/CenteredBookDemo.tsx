"use client";

import { useState } from "react";
import Button from "@/components/global/Button";
import BookDemoModal from "@/components/home/BookDemoModal";

export default function CenteredBookDemo() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-center w-full pt-10">
        <Button 
          icon
          variant="primary" 
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
