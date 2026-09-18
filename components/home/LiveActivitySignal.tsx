"use client";

import { useState, useEffect } from "react";

export interface SignalItem {
  time: string;
  title: string;
  source: string;
  tag: string;
  tagClass: "tag-block" | "tag-quar" | "tag-iso";
}

const DEFAULT_SIGNALS: SignalItem[] = [
  {
    time: "09:41:07",
    title: "Credential harvesting page",
    source: "Endpoint agent · DNS layer",
    tag: "Blocked",
    tagClass: "tag-block",
  },
  {
    time: "09:40:52",
    title: "Vendor payment change request",
    source: "Email security · multi-LLM",
    tag: "Quarantined",
    tagClass: "tag-quar",
  },
  {
    time: "09:40:18",
    title: "Finance folder shared by public link",
    source: "Cloud data protection",
    tag: "Revoked",
    tagClass: "tag-iso",
  },
  {
    time: "09:39:44",
    title: "Unmanaged camera scanning subnet",
    source: "Network gateway · IoT",
    tag: "Isolated",
    tagClass: "tag-iso",
  },
  {
    time: "09:39:02",
    title: "Encryption burst on file server",
    source: "Endpoint agent · behaviour",
    tag: "Stopped",
    tagClass: "tag-block",
  },
];

export default function LiveActivitySignal() {
  const [clock, setClock] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      setClock(new Date().toLocaleTimeString([], { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="signal glass glass-hi glass-hover">
      <div className="signal-hd">
        <span>
          <span className="pulse-dot" />
          Live activity
        </span>
        <span id="sig-clock">{clock || "--:--:--"}</span>
      </div>
      {DEFAULT_SIGNALS.map((sig, idx) => (
        <div className="signal-row" key={idx}>
          <time>{sig.time}</time>
          <span>
            <b>{sig.title}</b>
            <span className="src">{sig.source}</span>
          </span>
          <span className={`tag ${sig.tagClass}`}>{sig.tag}</span>
        </div>
      ))}
    </div>
  );
}
