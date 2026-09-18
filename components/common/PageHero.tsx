import Link from "next/link";
import React from "react";

export interface Crumb {
  label: string;
  href?: string;
}

export interface PageHeroProps {
  crumbs?: Crumb[];
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lede?: React.ReactNode;
  primaryCta?: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
  children?: React.ReactNode;
}

export default function PageHero({
  crumbs,
  eyebrow,
  title,
  lede,
  primaryCta = { text: "Start 30-day trial →", href: "/contact" },
  secondaryCta = { text: "Talk to an engineer", href: "/contact" },
  children,
}: PageHeroProps) {
  return (
    <section className="phero">
      <div className="wrap">
        {crumbs && crumbs.length > 0 && (
          <div className="crumb">
            {crumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && " > "}
                {crumb.href ? (
                  <Link href={crumb.href}>{crumb.label}</Link>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
        {lede && <p className="lede">{lede}</p>}
        {(primaryCta || secondaryCta) && (
          <div className="phero-cta">
            {primaryCta && (
              <Link className="btn btn-red" href={primaryCta.href}>
                {primaryCta.text}
              </Link>
            )}
            {secondaryCta && (
              <Link className="btn btn-glass" href={secondaryCta.href}>
                {secondaryCta.text}
              </Link>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
