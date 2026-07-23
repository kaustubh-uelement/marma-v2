"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  MapPin,
  Briefcase,
  Clock,
  CheckCircle2,
  ChevronUp,
} from "lucide-react";
import ApplicationForm from "./ApplicationForm";
import type { Job } from "@/lib/careers";

interface JobBoardProps {
  jobs: Job[];
}

export default function JobBoard({ jobs }: JobBoardProps) {
  const [expandedJobId, setExpandedJobId] = useState<string | number | null>(
    null,
  );

  const toggleJobExpanded = (id: string | number) => {
    setExpandedJobId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="openings" className="py-12 pt-6 bg-[#F8FAFC]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="flex flex-col">
            <h2 className="font-banner text-[32px] md:text-[48px] text-[#1E293B] mb-4">
              Open <span className="text-brand-red">Positions</span>
            </h2>
            <p className="font-title text-[18px] text-[#64748B] max-w-[600px]">
              Explore our current openings and find your place in the future of
              cybersecurity.
            </p>
          </div>
          <div className="flex items-center gap-4 text-brand-red font-title font-medium">
            <span className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" /> {jobs.length} Open Roles
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {jobs.map((job) => {
            const isExpanded = expandedJobId === job.id;

            return (
              <div
                key={job.id}
                className={`group relative bg-white border ${isExpanded ? "border-brand-red shadow-xl" : "border-[#E2E8F0] hover:border-brand-red/30 hover:shadow-xl hover:-translate-y-1"} rounded-[24px] p-6 md:p-8 transition-all duration-300 overflow-hidden`}
              >
                <div
                  className="flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
                  onClick={() => toggleJobExpanded(job.id)}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <span className="bg-brand-red/10 text-brand-red text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1.5 text-[#94A3B8] text-[14px]">
                        <Clock className="w-4 h-4" /> {job.type}
                      </span>
                      {job.isFilled && (
                        <span className="bg-slate-100 text-slate-500 text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 border border-slate-200">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          Filled
                        </span>
                      )}
                    </div>
                    <h3 className="font-banner text-[24px] md:text-[28px] text-[#1E293B] group-hover:text-brand-red transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-4 text-[#64748B] text-[16px]">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-brand-red" />{" "}
                        {job.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleJobExpanded(job.id);
                      }}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-title font-medium transition-all duration-300 ${isExpanded ? "bg-[#F1F5F9] text-[#64748B] hover:bg-[#E2E8F0]" : "bg-brand-red text-white hover:bg-brand-red-hover hover:shadow-lg hover:gap-3 group-hover:translate-x-0"}`}
                    >
                      {isExpanded ? (
                        <>
                          Close Details <ChevronUp className="w-5 h-5" />
                        </>
                      ) : job.isFilled ? (
                        <>
                          Position Filled <CheckCircle2 className="w-5 h-5" />
                        </>
                      ) : (
                        <>
                          Apply Now <ArrowUpRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                <div
                  className={`grid transition-[grid-template-rows,opacity,margin,padding,border] duration-500 ease-in-out ${isExpanded ? "grid-rows-[1fr] opacity-100 mt-8 pt-8 border-t border-[#E2E8F0]" : "grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t-0"}`}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col lg:flex-row gap-12">
                      {/* Left side: Job Details */}
                      <div className="flex-1 flex flex-col gap-8">
                        {/* Description */}
                        <div className="flex flex-col gap-3">
                          <h4 className="font-banner text-[22px] text-[#1E293B]">
                            About the Role
                          </h4>
                          <p className="font-title text-[16px] text-[#64748B] leading-relaxed">
                            {job.description}
                          </p>
                        </div>

                        {/* Responsibilities */}
                        <div className="flex flex-col gap-3">
                          <h4 className="font-banner text-[22px] text-[#1E293B]">
                            Key Responsibilities
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {job.responsibilities?.map(
                              (item: string, i: number) => (
                                <div
                                  key={i}
                                  className="flex gap-3 bg-[#F8FAFC] p-4 rounded-xl border border-[#F1F5F9] hover:border-brand-red/10 transition-colors"
                                >
                                  <CheckCircle2 className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                                  <span className="text-[#475569] leading-relaxed text-[15px]">
                                    {item}
                                  </span>
                                </div>
                              ),
                            )}
                          </div>
                        </div>

                        {/* Requirements */}
                        <div className="flex flex-col gap-3">
                          <h4 className="font-banner text-[22px] text-[#1E293B]">
                            Requirements
                          </h4>
                          <ul className="flex flex-col gap-3">
                            {job.requirements?.map(
                              (item: string, i: number) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-3 text-[#475569] text-[15px]"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-brand-red mt-2 shrink-0" />
                                  <span className="leading-relaxed">
                                    {item}
                                  </span>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>

                        {/* Good to have */}
                        {job.goodToHave && (
                          <div className="flex flex-col gap-3">
                            <h4 className="font-banner text-[22px] text-[#1E293B]">
                              Good to Have
                            </h4>
                            <ul className="flex flex-col gap-3">
                              {job.goodToHave.map((item: string, i: number) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-3 text-[#475569] text-[15px]"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-brand-red/40 mt-2 shrink-0" />
                                  <span className="leading-relaxed italic">
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Right side: Application Form */}
                      <div className="w-full lg:w-[650px] shrink-0">
                        <div className="bg-[#F8FAFC] p-6 lg:p-8 rounded-2xl border border-[#E2E8F0] sticky top-6">
                          <div className="mb-6">
                            <h3 className="font-banner text-[24px] text-[#1E293B] mb-2">
                              Submit Application
                            </h3>
                            <p className="text-[#64748B] text-[15px]">
                              Applying for {job.title}
                            </p>
                          </div>
                          <ApplicationForm
                            job={job}
                            onSuccess={() => {}}
                            isFilled={job.isFilled}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* <div className="mt-16 bg-white border border-[#E2E8F0] rounded-[32px] p-8 md:p-12 text-center shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <h3 className="font-banner text-[28px] text-[#1E293B] mb-4">
            Don't see a role that fits?
          </h3>
          <p className="font-title text-[18px] text-[#64748B] mb-8 max-w-[700px] mx-auto">
            We're always looking for talented individuals who are passionate about cybersecurity. Send us a general application and we'll keep you in mind for future roles.
          </p>
          <Button label="General Application" variant="primary" icon={true} className="mx-auto" />
        </div> */}
      </div>
    </section>
  );
}
