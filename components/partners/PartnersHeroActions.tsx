"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/global/Button";
import ContactModal from "@/components/contact/ContactModal";

export default function PartnersHeroActions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return (
    <>
      <div className="flex-1 flex items-center">
        <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 w-full">
          <Link href="#" className="w-full sm:w-auto">
            <Button
              onClick={toggleModal}
              icon
              label="Get Started"
              className="w-full sm:w-auto whitespace-nowrap"
            />
          </Link>
        </div>
      </div>
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
