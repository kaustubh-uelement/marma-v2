import Image from "next/image";

interface EndpointProductCardProps {
  name: string;
  tagline: string;
  subTitle?: React.ReactNode;
  primaryFeature: React.ReactNode;
  features: string[];
  image?: string;
  imageAlt?: string;
  imageClass?: string;
  onBookDemo?: () => void;
  bookDemoLabel?: string;
}

export default function EndpointProductCard({
  name,
  tagline,
  subTitle,
  primaryFeature,
  features,
  image,
  imageAlt,
  imageClass = "",
  onBookDemo,
  bookDemoLabel,
}: EndpointProductCardProps) {
  return (
    <div className="w-full h-full rounded-2xl bg-[#F5F5F5] p-5 sm:p-6 lg:p-7 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="fl5-1">
              {name}
            </span>
            <span className="text-text-dark font-light text-[20px] leading-none">
              |
            </span>
            <span className="fl5-1">
              {tagline}
            </span>
          </div>
          {subTitle && (
            <h4 className="text-[20px] md:text-[24px] font-bold leading-tight text-text-dark">
              {subTitle}
            </h4>
          )}
        </div>
        {onBookDemo && (
          <button
            onClick={onBookDemo}
            className="shrink-0 flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF0000] text-white font-banner text-[14px] md:text-[16px] tracking-[-0.01em] hover:bg-[#E10000] transition-colors hover:scale-[1.02] active:scale-[0.98]"
          >
            {bookDemoLabel || "Book a Demo"}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </button>
        )}
      </div>

      {/* Body — features left, image right */}
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
        {/* Content */}
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          <p className="fl5-1">
            Features
          </p>
          <p className="fl4-1">
            {primaryFeature}
          </p>
          {features.length > 0 && (
            <ul className="flex flex-col gap-1.5 mt-2">
              {features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 fl4-1 leading-snug"
                >
                  <span className="mt-[5px] md:mt-[8px] w-1.5 h-1.5 rounded-full bg-[#3A3A3A] shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Image */}
        <div className="relative w-full sm:w-[45%] lg:w-[40%] aspect-4/3 rounded-xl overflow-hidden shrink-0">
          {image ? (
            <Image
              src={image}
              alt={imageAlt ?? name}
              fill
              sizes="(max-width: 640px) 100vw, 45vw"
              className={`object-contain rounded-xl aspect-auto ${imageClass}`}
            />
          ) : (
            <div aria-hidden="true" className="h-full w-full bg-[#D9D9D9]" />
          )}
        </div>
      </div>
    </div>
  );
}
