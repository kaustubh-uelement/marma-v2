import React from "react";

export interface FaqItem {
  q: string;
  a: React.ReactNode;
}

export interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className="faq rv">
      {items.map((item, idx) => (
        <details className="glass glass-hover" key={idx}>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
