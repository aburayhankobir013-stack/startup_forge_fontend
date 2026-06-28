import Banner from "@/components/banner/Banner";
import CTACard from "@/components/ctaCard/CTACard";
import FeaturedOpportunities from "@/components/featuredOpportunities/FeaturedOpportunities";
import FeaturedStartups from "@/components/featuredStartups/FeaturedStartups";
import LiveMessage from "@/components/liveMessage/LiveMessage";
import StartupSttistics from "@/components/startupStatistics/StartupStatistics";
import WhyJoinStartupForge from "@/components/whyJoinStartupForge/WhyJoinStartupForge";

export default function HomePage() {
  return (
    <>
    <LiveMessage />
      <Banner />
      <FeaturedStartups />
      <FeaturedOpportunities />
      <WhyJoinStartupForge />
      <StartupSttistics />
      <CTACard />
    </>
  );
}
