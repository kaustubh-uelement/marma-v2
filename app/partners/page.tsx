import { getPartners, FALLBACK_PARTNERS } from "@/lib/partnerData";
import PartnersClientView from "@/components/partners/PartnersClientView";

export const revalidate = 30;

export const metadata = {
  title: "Partners | Marma Security",
  description:
    "MSP, MSSP, VAR and system integrator programme: 25% resale discount, 10% referral, Tier III support and co-sell.",
};

export default async function PartnersPage() {
  const initialPartners = await getPartners();
  const partnersData = initialPartners && Object.keys(initialPartners).length > 0
    ? initialPartners
    : FALLBACK_PARTNERS;

  return <PartnersClientView partnersData={partnersData} />;
}
