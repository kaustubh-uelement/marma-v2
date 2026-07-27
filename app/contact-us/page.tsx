"use client";

import React, { useState } from "react";
import ContactSection from "@/components/contact/ContactSection";
import ContactModal from "@/components/contact/ContactModal";
import Banner from "@/components/global/Banner";
import Link from "next/link";
import Button from "@/components/global/Button";

export default function ContactUsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <main className="flex min-h-screen flex-col bg-[#FFFFFF]">
      <section
        className="relative w-full min-h-[100vh] flex flex-col overflow-x-clip"
        style={{
          backgroundImage: `url('/images/banners/product-banner.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Main Content Container — fills entire banner height */}
        <div className="relative z-10 w-full flex-1 px-6 lg:px-16 flex flex-col items-center text-center pt-28 md:pt-40">
          {/* Title + Subtitle group — sits near the top-center */}
          <div className="flex flex-col space-y-6 lg:space-y-8 items-center max-w-[900px] mt-10 md:mt-20">
            {/* Title text */}
            <h1 className="fl1 text-white!">
              We’re here to help you secure <br className="block " /> what
              matters most.
            </h1>

            {/* Subtitle */}
            <p className="partners-banner-subtitle max-w-[900px] mx-auto mt-4">
              Have questions about Marma or want to learn how our solutions fit
              your needs? Our team is ready to assist you with product details,
              deployment guidance, and support. Reach out to us today, and let’s
              build a safer digital environment together.
            </p>
          </div>

          {/* Buttons — vertically centered in the remaining space below subtitle */}
          <div className="flex-1 flex flex-col items-center justify-center gap-6 w-full mt-4 sm:mt-0">
            <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 w-full ">
              {/* Get Started Button */}
              <Link href="#" className="w-full sm:w-auto">
                <Button
                  onClick={toggleModal}
                  icon
                  label="Contact Us"
                  className="w-full sm:w-auto whitespace-nowrap"
                />
              </Link>
            </div>
            <p className="text-white/80 text-sm md:text-base text-center">
              For product information and support in Asia, reach us at{" "}
              <a
                href="tel:+919175511808"
                className="font-semibold hover:text-white transition-colors"
              >
                +91 9175511808
              </a>{" "}
              and for the USA at{" "}
              <a
                href="tel:+14085828962"
                className="font-semibold hover:text-white transition-colors"
              >
                +1-408-582-8962
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <ContactSection />

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
