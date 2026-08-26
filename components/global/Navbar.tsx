// @ts-nocheck
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { User } from "lucide-react";

const navLinks = [
  { href: "/solutions", label: "Solutions" },
  { href: "/technology", label: "Technology" },
  { href: "/product", label: "Products" },
  { href: "/partners", label: "Partners" },
  { href: "/careers", label: "Careers" },
  { href: "/about-us", label: "About Us" },
];

const solutionDropdownItems = [
  {
    href: "/solutions/healthcare",
    title: "Healthcare",
    description: "Provide secure patient data management and compliance with industry standards like HIPAA.",
  },
  {
    href: "/solutions/legal",
    title: "Legal",
    description: "Protect sensitive client information with advanced encryption and zero-trust architecture.",
  },
  {
    href: "/solutions/finance",
    title: "Finance",
    description: "Safeguard financial assets and ensure regulatory compliance with real-time threat detection.",
  },
  {
    href: "/solutions/manufacturing",
    title: "Manufacturing",
    description: "Protect production systems, supply chains, and intellectual property with industrial-grade cybersecurity.",
  },
  {
    href: "/solutions/small-and-medium-business",
    title: "Small & Medium Business",
    description: "Affordable, enterprise-grade cybersecurity tailored for SMBs to protect customer data and operations.",
  },
  {
    href: "/solutions/education",
    title: "Education",
    description: "Secure academic institutions, research data, and student privacy across distributed campus networks.",
  },
  {
    href: "/solutions/residential",
    title: "Residential & Commercial Projects",
    description: "Secure residential and commercial projects with advanced cybersecurity solutions.",
  }
];



const frostedGlass = {
  background:
    "linear-gradient(90deg, rgba(255,255,255,0.60) 0%, rgba(255,255,255,0.35) 100%)",
  backdropFilter: "blur(36px)",
  WebkitBackdropFilter: "blur(36px)",
  boxShadow: "0px 4px 24px -1px rgba(0,0,0,0.2)",
  border: "1px solid rgba(255,255,255,0.28)",
} as const;


export default function Navbar() {
  const [dropdownItems, setDropdownItems] = useState(solutionDropdownItems);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsHovered, setIsSolutionsHovered] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const { isAuthenticated, openAuthModal } = useAuth();

  useEffect(() => {
    let isMounted = true;
    async function fetchActiveIndustries() {
      try {
        const res = await fetch("/api/industries");

        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0 && isMounted) {
            const mapped = data.map((item: any) => {
              const extra = item.extra_field || {};
              return {
                href: `/solutions/${item.slug}`,
                title: extra.nav_title || item.title || item.heading || "Industry",
                description:
                  extra.nav_description ||
                  item.subtitle ||
                  extra.hero_description ||
                  item.heading ||
                  "Enterprise cybersecurity solutions tailored for your industry.",
              };
            });
            setDropdownItems(mapped);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch active industries for Navbar:", err);
      }
    }

    fetchActiveIndustries();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsSolutionsHovered(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <header
      ref={headerRef}
      className="fixed top-6 left-1/2 -translate-x-1/2 w-[93%] max-w-[1400px] z-50"
    >
      {/* Main Navbar Container */}
      <div
        style={frostedGlass}
        className="flex items-center justify-between gap-4 lg:gap-6 px-3 py-1 md:py-2 ps-3 md:ps-10 rounded-full relative z-50 transition-all duration-300"
      >
        {/* Left Side: Logo */}
        <div className="flex flex-1 items-center min-w-0">
          <Link href="/" onClick={() => setIsSolutionsHovered(false)}>
            <Image
              src="/images/global/logo.svg"
              alt="Marma Security"
              width={1000}
              height={1000}
              className="nav-logo"
              priority
            />
          </Link>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center lg:space-x-4 xl:space-x-10 whitespace-nowrap">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href === "/solutions" && pathname.startsWith("/solutions"));
            const isSolutions = link.href === "/solutions";

            if (isSolutions) {
              return (
                <button
                  key={link.href}
                  onClick={() => {
                    setIsSolutionsHovered(!isSolutionsHovered);
                  }}
                  className={`fl2-nav transition-colors flex items-center gap-1.5 focus:outline-none ${isActive ? "!font-bold !text-[#000000]" : ""}`}
                >
                  <span>{link.label}</span>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-transform duration-300 ${isSolutionsHovered ? 'rotate-180' : ''}`}>
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`fl2-nav ${isActive ? "!font-bold !text-[#000000]" : ""}`}
                onClick={() => setIsSolutionsHovered(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Icons & Mobile Toggle */}
        <div className="flex flex-1 items-center gap-3 justify-end min-w-0">
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact-us"
              className="flex items-center justify-center transition-transform hover:scale-105"
              aria-label="Contact Us"
              onClick={() => setIsSolutionsHovered(false)}
            >
              <Image
                src="/images/global/call-nav.svg"
                alt="Call"
                width={34}
                height={34}
                className="nav-icon"
              />
            </Link>

            <Link
              href="/store"
              className="flex items-center justify-center transition-transform hover:scale-105"
              aria-label="Store"
            >
              <Image
                src="/images/global/shop-nav.svg"
                alt="Store"
                width={34}
                height={34}
                className="nav-icon"
              />
            </Link>

            {/* Profile / Sign In */}
            {isAuthenticated ? (
              <Link
                href="/profile"
                className="flex items-center justify-center transition-transform hover:scale-105"
                aria-label="Profile"
              >
                <span className="nav-icon w-[24px] h-[24px] sm:w-[28px] sm:h-[28px] lg:w-[34px] lg:h-[34px] rounded-full bg-[#3B3B3B] flex items-center justify-center">
                  <User className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] lg:w-[18px] lg:h-[18px] text-white" strokeWidth={2} />
                </span>
              </Link>
            ) : (
              <button
                onClick={openAuthModal}
                className="flex items-center justify-center transition-transform hover:scale-105"
                aria-label="Sign In"
              >
                <span className="nav-icon w-[24px] h-[24px] sm:w-[28px] sm:h-[28px] lg:w-[34px] lg:h-[34px] rounded-full bg-[#3B3B3B] flex items-center justify-center">
                  <User className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] lg:w-[18px] lg:h-[18px] text-white" strokeWidth={2} />
                </span>
              </button>
            )}
          </div>

          {/* Hamburger Menu Toggle (Mobile Only) */}
          <button
            className="lg:hidden p-1 sm:p-2 text-nav-text focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Solutions Mega Menu Dropdown */}
      <div
        className={`hidden lg:block absolute top-[100%] left-0 w-full pt-4 origin-top pointer-events-none ${isSolutionsHovered ? 'visible' : 'invisible'}`}
      >
        <div
          className={`bg-[#0d0d0d]/50 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 lg:p-8 shadow-[0_20px_40px_-5px_rgba(0,0,0,0.4)] overflow-y-auto max-h-[calc(100vh-8rem)] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full relative will-change-[backdrop-filter] transition-opacity duration-200 ${isSolutionsHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Subtle glow effect behind */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#4A90E2]/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Inner content */}
          <div
            className={`transition-all duration-300 ease-out pointer-events-auto ${isSolutionsHovered ? 'opacity-100 translate-y-0 delay-[80ms]' : 'opacity-0 -translate-y-2 delay-0'}`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-4 lg:gap-y-6 relative z-10">
              {dropdownItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSolutionsHovered(false)}
                  className="group flex flex-col p-3 rounded-xl transition-all duration-300 hover:bg-white/[0.04] hover:shadow-[0_4px_20px_-5px_rgba(255,255,255,0.05)] border border-transparent hover:border-white/5"
                >
                  <span className="text-white font-semibold text-[17px] mb-1.5 group-hover:text-brand-red transition-colors duration-300">
                    {item.title}
                  </span>
                  <span className="text-gray-400 font-light text-[14px] leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {item.description}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div
          style={frostedGlass}
          className="lg:hidden absolute top-[110%] left-0 w-full rounded-2xl py-5 px-6 shadow-xl flex flex-col space-y-4 z-40 max-h-[80vh] overflow-y-auto"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href === "/solutions" && pathname.startsWith("/solutions"));
            const isSolutions = link.href === "/solutions";
            return (
              <div key={link.href} className="border-b border-gray-200/30 pb-3 flex flex-col gap-3">
                {isSolutions ? (
                  /* Solutions: toggle accordion */
                  <button
                    type="button"
                    onClick={() => setIsMobileSolutionsOpen((prev) => !prev)}
                    className={`fl2-nav flex items-center justify-between w-full text-left ${isActive ? "!font-bold !text-[#000000]" : ""}`}
                  >
                    <span>{link.label}</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`transform transition-transform duration-300 ${isMobileSolutionsOpen ? 'rotate-180' : 'rotate-0'}`}
                    >
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                ) : (
                  <Link
                    href={link.href}
                    className={`fl2-nav ${isActive ? "!font-bold !text-[#000000]" : ""}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Mobile Solutions accordion */}
                {isSolutions && (
                  <div
                    className={`pl-4 flex flex-col gap-4 overflow-hidden transition-all duration-300 ease-in-out ${isMobileSolutionsOpen ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
                      }`}
                  >
                    {dropdownItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => { setIsMobileMenuOpen(false); setIsMobileSolutionsOpen(false); }}
                        className="flex flex-col group"
                      >
                        <span className="text-gray-800 font-medium text-[15px] group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </span>
                        <span className="text-gray-500 text-[13px] leading-tight mt-1 line-clamp-2">
                          {item.description}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}


              </div>
            );
          })}

          <Link
            href="/contact-us"
            className="flex items-center gap-3 fl2-nav border-b border-gray-200/30 pb-3"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Image
              src="/images/global/call-nav.svg"
              alt="Call"
              width={24}
              height={24}
              className="nav-icon"
            />
            <span>Contact us</span>
          </Link>

          <Link
            href="/store"
            className="flex items-center gap-3 fl2-nav border-b border-gray-200/30 pb-3"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Image
              src="/images/global/shop-nav.svg"
              alt="Store"
              width={24}
              height={24}
              className="nav-icon"
            />
            <span>Store</span>
          </Link>

          {/* Profile / Sign In (Mobile) */}
          {isAuthenticated ? (
            <Link
              href="/profile"
              className="flex items-center gap-3 fl2-nav border-b border-gray-200/30 pb-3"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="w-[24px] h-[24px] rounded-full bg-[#3B3B3B] flex items-center justify-center flex-shrink-0">
                <User className="w-[14px] h-[14px] text-white" strokeWidth={2} />
              </span>
              <span>My Profile</span>
            </Link>
          ) : (
            <button
              onClick={() => { setIsMobileMenuOpen(false); openAuthModal(); }}
              className="flex items-center gap-3 fl2-nav border-b border-gray-200/30 pb-3 w-full text-left"
            >
              <span className="w-[24px] h-[24px] rounded-full bg-[#3B3B3B] flex items-center justify-center flex-shrink-0">
                <User className="w-[14px] h-[14px] text-white" strokeWidth={2} />
              </span>
              <span>Sign In</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
}
