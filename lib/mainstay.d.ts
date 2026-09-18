import type { Partner, RegionKey } from "./partnerData";

export declare function fetchActivePartners(): Promise<Record<RegionKey | string, Partner[]>>;

declare const _default: {
  fetchActivePartners: typeof fetchActivePartners;
};

export default _default;
