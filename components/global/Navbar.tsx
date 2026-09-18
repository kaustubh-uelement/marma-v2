// @ts-nocheck
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { User, Phone, ShoppingBag, ChevronDown } from "lucide-react";

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
    description: "Patient records, connected devices and HIPAA evidence in one control set.",
  },
  {
    href: "/solutions/finance",
    title: "Finance",
    description: "Payment fraud and vendor impersonation caught before funds move.",
  },
  {
    href: "/solutions/legal",
    title: "Legal",
    description: "Matter files monitored for external sharing and link exposure.",
  },
  {
    href: "/solutions/manufacturing",
    title: "Manufacturing",
    description: "Plant networks and OT segments protected without touching uptime.",
  },
  {
    href: "/solutions/small-and-medium-business",
    title: "Small & Medium Business",
    description: "The full stack for organisations with no dedicated IT function.",
  },
  {
    href: "/solutions/education",
    title: "Education",
    description: "Distributed campuses, unmanaged devices, research data kept separate.",
  },
  {
    href: "/solutions/residential",
    title: "Residential & Commercial",
    description: "Building-wide protection for CCTV, access control and IoT.",
  },
  {
    href: "/solutions/enterprise",
    title: "Enterprise",
    description: "Multi-site estates, private-DC hosting and SIEM integration.",
  },
];

export default function Navbar() {
  const [dropdownItems, setDropdownItems] = useState(solutionDropdownItems);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
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
      if (window.innerWidth >= 980) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsSolutionsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSolutionsOpen(false);
  }, [pathname]);

  return (
    <header className="nav" ref={headerRef}>
      <div className="nav-in glass glass-hi">
        <Link className="logo" href="/" onClick={() => setIsSolutionsOpen(false)} aria-label="Marma Security">
          <Image
            src="/logo.png"
            alt="Marma Security"
            width={188}
            height={25}
            priority
            className="logo-img"
          />
        </Link>

        {/* Desktop navigation links */}
        <nav className="nav-links" aria-label="Primary navigation">
          {navLinks.map((link) => {
            const isSolutions = link.href === "/solutions";
            const isActive =
              pathname === link.href ||
              (isSolutions && (pathname.startsWith("/solutions") || pathname.startsWith("/solution-")));

            if (isSolutions) {
              return (
                <div key={link.href} className="relative flex items-center">
                  <button
                    type="button"
                    className={`flex items-center gap-1.5 cursor-pointer bg-transparent border-0 font-inherit p-0 ${
                      isActive ? "on" : ""
                    }`}
                    style={{ color: isActive ? "var(--ink)" : undefined }}
                    onClick={() => setIsSolutionsOpen((prev) => !prev)}
                    aria-expanded={isSolutionsOpen}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${isSolutionsOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={isActive ? "on" : ""}
                onClick={() => setIsSolutionsOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action icons & CTA */}
        <div className="nav-cta">
          <Link
            href="/store"
            className="flex items-center justify-center p-2 rounded-full transition-colors hover:text-[#D81E2C]"
            title="Store"
            aria-label="Store"
          >
            <ShoppingBag size={18} strokeWidth={1.8} />
          </Link>

          <Link
            href="/contact-us"
            className="flex items-center justify-center p-2 rounded-full transition-colors hover:text-[#D81E2C]"
            title="Contact Us"
            aria-label="Contact Us"
          >
            <Phone size={17} strokeWidth={1.8} />
          </Link>

          {/* Profile / Sign In */}
          {isAuthenticated ? (
            <Link
              href="/profile"
              className="flex items-center justify-center p-1.5 rounded-full bg-[rgba(23,10,12,0.08)] hover:bg-[#D81E2C] hover:text-white transition-colors"
              title="My Profile"
              aria-label="My Profile"
            >
              <User size={16} strokeWidth={2} />
            </Link>
          ) : (
            <button
              onClick={openAuthModal}
              className="flex items-center justify-center p-1.5 rounded-full bg-[rgba(23,10,12,0.08)] hover:bg-[#D81E2C] hover:text-white transition-colors cursor-pointer border-0"
              title="Sign In"
              aria-label="Sign In"
            >
              <User size={16} strokeWidth={2} />
            </button>
          )}

          <Link className="btn btn-red hidden min-[1100px]:inline-flex" href="/contact-us">
            Start trial
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="burger"
          aria-label="Toggle Menu"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            {isMobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Solutions Dropdown Menu (Desktop) */}
      {isSolutionsOpen && (
        <div className="wrap mt-2">
          <div
            className="glass glass-hi p-6 md:p-8 rounded-2xl shadow-xl border border-[var(--line-soft)] animate-in fade-in slide-in-from-top-2 duration-200"
            style={{ backdropFilter: "var(--g-blur)" }}
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--line-soft)]">
              <div>
                <span className="eyebrow">Solutions by Industry</span>
                <h4 style={{ margin: "6px 0 0", fontSize: "1.1rem" }}>Tailored defenses for your sector</h4>
              </div>
              <Link
                href="/solutions"
                className="btn btn-glass"
                style={{ padding: "8px 16px", fontSize: "0.68rem" }}
                onClick={() => setIsSolutionsOpen(false)}
              >
                All Solutions &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {dropdownItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSolutionsOpen(false)}
                  className="group p-3.5 rounded-xl transition-all hover:bg-[var(--red-wash)] border border-transparent hover:border-[var(--red-line)]"
                >
                  <span className="block font-semibold text-[0.95rem] text-[var(--ink)] group-hover:text-[var(--red)] transition-colors mb-1">
                    {item.title}
                  </span>
                  <span className="block text-[0.8rem] text-[var(--mute)] line-clamp-2 leading-relaxed">
                    {item.description}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      <div className="wrap">
        <div className={`mobile glass glass-hi ${isMobileMenuOpen ? "open" : ""}`}>
          {navLinks.map((link) => {
            const isSolutions = link.href === "/solutions";
            const isActive =
              pathname === link.href ||
              (isSolutions && (pathname.startsWith("/solutions") || pathname.startsWith("/solution-")));

            if (isSolutions) {
              return (
                <div key={link.href} className="border-b border-[var(--line-soft)] pb-2">
                  <div className="flex items-center justify-between py-2.5">
                    <Link
                      href="/solutions"
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{ color: isActive ? "var(--red)" : "var(--ink)", fontWeight: isActive ? 600 : 400 }}
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      className="p-1.5 text-[var(--mute)] hover:text-[var(--red)] border-0 bg-transparent cursor-pointer"
                      onClick={() => setIsMobileSolutionsOpen((prev) => !prev)}
                      aria-label="Toggle solutions list"
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${isMobileSolutionsOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>

                  {isMobileSolutionsOpen && (
                    <div className="pl-4 py-2 flex flex-col gap-2 bg-[rgba(255,255,255,0.4)] rounded-xl my-1">
                      {dropdownItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsMobileSolutionsOpen(false);
                          }}
                          className="text-[0.85rem] py-1 text-[var(--mute)] hover:text-[var(--red)]"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ color: isActive ? "var(--red)" : "var(--mute)" }}
              >
                {link.label}
              </Link>
            );
          })}

          <Link href="/store" onClick={() => setIsMobileMenuOpen(false)}>
            Store
          </Link>
          <Link href="/contact-us" onClick={() => setIsMobileMenuOpen(false)}>
            Contact Us
          </Link>
          <Link href="/support" onClick={() => setIsMobileMenuOpen(false)}>
            Support
          </Link>

          {isAuthenticated ? (
            <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
              My Profile
            </Link>
          ) : (
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openAuthModal();
              }}
              className="text-left w-full border-0 bg-transparent p-0 cursor-pointer text-[var(--red)] font-medium pt-3"
            >
              Sign In / Account
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
