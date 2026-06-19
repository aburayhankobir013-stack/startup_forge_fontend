import Banner from "@/components/banner/Banner";
import CTACard from "@/components/ctaCard/CTACard";
import Footer from "@/components/footer/Footer";
import StartupSttistics from "@/components/startupStatistics/StartupStatistics";
import WhyJoinStartupForge from "@/components/whyJoinStartupForge/WhyJoinStartupForge";

export default function HomePage() {
  return (
    <>
      <Banner />
      <WhyJoinStartupForge />
      <StartupSttistics />
      <CTACard />
      <Footer />
    </>
  );
}
