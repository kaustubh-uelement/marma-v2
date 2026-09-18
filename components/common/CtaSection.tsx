import Link from "next/link";
import React from "react";

export interface CtaSectionProps {
  eyebrow?: string;
  title?: React.ReactNode;
  lede?: React.ReactNode;
  primaryText?: string;
  primaryHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
}

export default function CtaSection({
  eyebrow = "Get started",
  title = "See what's already getting through.",
  lede = "Run Marma alongside what you have for 30 days. Most teams find their first real exposure within the first hour of the cloud data scan.",
  primaryText = "Start 30-day trial →",
  primaryHref = "/contact",
  secondaryText = "Talk to an engineer",
  secondaryHref = "/contact",
}: CtaSectionProps) {
  return (
    <section className="cta">
      <div className="wrap">
        <div className="cta-card glass glass-hi rv">
          <div className="eyebrow center">{eyebrow}</div>
          <h2>{title}</h2>
          <p className="lede" style={{ textAlign: "center" }}>
            {lede}
          </p>
          <div className="phero-cta">
            <Link className="btn btn-red" href={primaryHref}>
              {primaryText}
            </Link>
            <Link className="btn btn-glass" href={secondaryHref}>
              {secondaryText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
