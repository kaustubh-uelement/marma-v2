import Link from "next/link";
import HighlightedText from "@/components/global/HighlightedText";
import PartneringMadeEasy from "@/components/partners/PartneringMadeEasy";
import PartnerBenefits from "@/components/partners/PartnerBenefits";
import RegionalPartners from "@/components/partners/RegionalPartners";
import DecorativeLine from "@/components/home/DecorativeLine";
import PartnersHeroActions from "@/components/partners/PartnersHeroActions";

export default function PartnersPage() {
  return (
    <main className="w-full flex-grow flex flex-col items-center">
      <section
        className="relative w-full min-h-[100vh] flex flex-col overflow-x-clip"
        style={{
          backgroundImage: `url('/images/banners/banner-partners.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative z-10 w-full flex-1 px-6 lg:px-16 flex flex-col items-center text-center pt-28 md:pt-40">
          <div className="flex flex-col space-y-6 lg:space-y-8 items-center max-w-[900px] mt-10 md:mt-20">
            <h1 className="fl1 text-white!">
              MSP, MSSP and ITSP{" "}
              <HighlightedText
                text="Partners."
                className="font-bold text-[#FFFFFF]"
                imageClassName="bottom-[-20px] md:bottom-[-20px] right-[-5px]"
              />
            </h1>
            <p className="partners-banner-subtitle max-w-[900px] mx-auto mt-4">
              Marma Security operates a comprehensive partner program designed
              to extend reach and enhance service delivery. Our ecosystem
              enables VARs, MSPs, MSSPs, and System Integrators to offer
              enterprise-grade cybersecurity to all customer segments with
              simplified deployment and strong recurring revenue potential.
            </p>
          </div>

          {/* Only this needs client interactivity */}
          <PartnersHeroActions />
        </div>
      </section>

      <div className="flex flex-col w-[50%] sm:w-[40%] min-[901px]:w-[35%] ml-auto pointer-events-none z-0 mt-4 md:mt-10">
        <DecorativeLine
          viewBox="0 0 500 80"
          points="-3000,40 200,40"
          dots={[{ cx: 200, cy: 40, rippleCount: 3 }]}
          className="w-full h-auto scale-x-[-1]"
          dotRadius={6}
          animationDuration={2.5}
        />
        <DecorativeLine
          viewBox="0 0 500 120"
          points="150,20 210,90 3000,90"
          dots={[{ cx: 150, cy: 20, rippleCount: 4, rippleBaseDelay: 0.9 }]}
          className="w-full h-auto -mt-10 md:-mt-24"
          dotRadius={7}
          animationDuration={3}
        />
      </div>

      <RegionalPartners />
      <PartneringMadeEasy />
      <PartnerBenefits />

      <div className="fl3 text-bold max-w-[1200px] text-center mx-auto pb-8">
        Join the Marma Security Partner Program to gain access to comprehensive
        training,
        <br /> enablement, and co-marketing support.
      </div>
    </main>
  );
}
