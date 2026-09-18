import type { Partner, RegionKey } from "./partnerData";

export interface FetchActivePartnersOptions {
  forceServer?: boolean;
}

export declare function fetchActivePartners(
  options?: FetchActivePartnersOptions
): Promise<Record<RegionKey | string, Partner[]>>;

declare const _default: {
  fetchActivePartners: typeof fetchActivePartners;
};

export default _default;
