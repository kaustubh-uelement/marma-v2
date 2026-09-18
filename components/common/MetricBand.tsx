export interface MetricItem {
  count: string | number;
  dec?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface MetricBandProps {
  metrics?: MetricItem[];
}

export default function MetricBand({
  metrics = [
    { count: "99.99", dec: 2, suffix: "%", label: "Uptime service level" },
    { count: "2450", suffix: "+", label: "Threats blocked daily" },
    { count: "5", prefix: "<", suffix: " min", label: "Time to first protection" },
    { count: "86", suffix: "%", label: "Of SMBs are under-protected" },
  ],
}: MetricBandProps) {
  return (
    <div className="sec-sm">
      <div className="wrap">
        <div className="band-in glass glass-hi rv">
          {metrics.map((m, idx) => (
            <div className="metric" key={idx}>
              <b
                data-count={m.count}
                data-dec={m.dec !== undefined ? m.dec : undefined}
                data-prefix={m.prefix || undefined}
                data-suffix={m.suffix || undefined}
              >
                {m.prefix || ""}0{m.suffix || ""}
              </b>
              <span>{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
