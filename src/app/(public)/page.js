import Banner from "@/components/banner/Banner";
import CTACard from "@/components/ctaCard/CTACard";
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
      <WhyJoinStartupForge />
      <StartupSttistics />
      <CTACard />
    </>
  );
}
