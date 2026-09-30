// @ts-nocheck
"use client";

import React, { useState } from "react";
import { ChevronDown, MapPin, Briefcase } from "lucide-react";
import ApplicationForm from "./ApplicationForm";
import type { JobWithSubmitUrl } from "@/lib/careers";

interface JobBoardProps {
  jobs: JobWithSubmitUrl[];
}

export default function JobBoard({ jobs }: JobBoardProps) {
  const [expandedJobId, setExpandedJobId] = useState<string | number | null>(null);

  const toggleJobExpanded = (id: string | number) => {
    setExpandedJobId((prev) => (prev === id ? null : id));
  };

  if (jobs.length === 0) {
    return (
      <div className="card glass glass-hi text-center py-12">
        <p className="text-[var(--mute)]">No open positions at this moment. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {jobs.map((job) => {
        const isExpanded = expandedJobId === job.id;

        return (
          <div
            key={job.id}
            className={`card glass glass-hi transition-all duration-300 ${
              isExpanded ? "border-[var(--red-line)] shadow-lg" : "glass-hover"
            }`}
          >
            <div
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
              onClick={() => toggleJobExpanded(job.id)}
            >
              <div>
                <span className="idx block mb-1">{job.department}</span>
                <h3 style={{ margin: "4px 0 8px", fontSize: "1.2rem" }}>{job.title}</h3>
                <p className="text-[0.88rem] text-[var(--mute)] max-w-[70ch]">{job.description}</p>
                <div className="chips" style={{ marginTop: "12px" }}>
                  <span className="chip">{job.location}</span>
                  <span className="chip">{job.type}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-start md:self-center mt-2 md:mt-0">
                <button
                  type="button"
                  className={`btn ${isExpanded ? "btn-red" : "btn-glass"}`}
                  style={{ padding: "8px 18px", fontSize: "0.7rem" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleJobExpanded(job.id);
                  }}
                >
                  {isExpanded ? "Hide Details" : "View & Apply"}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
            </div>

            {/* Expanded section: requirements & ApplicationForm */}
            {isExpanded && (
              <div className="mt-8 pt-6 border-t border-[var(--line-soft)] animate-in fade-in duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {job.requirements && job.requirements.length > 0 && (
                    <div>
                      <div className="eyebrow mb-2">Requirements</div>
                      <ul className="dots">
                        {job.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {job.responsibilities && job.responsibilities.length > 0 && (
                    <div>
                      <div className="eyebrow mb-2">Responsibilities</div>
                      <ul className="dots">
                        {job.responsibilities.map((resp, i) => (
                          <li key={i}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-6 rounded-2xl bg-[rgba(255,255,255,0.6)] border border-[var(--line-soft)]">
                  <div className="eyebrow mb-2">Apply for this role</div>
                  <h4 style={{ margin: "0 0 16px", fontSize: "1.1rem" }}>
                    Application Form: {job.title}
                  </h4>
                  <ApplicationForm
                    jobId={job.id}
                    jobTitle={job.title}
                    submitUrl={job.submitUrl}
                    onClose={() => setExpandedJobId(null)}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
