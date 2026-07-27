import { EarnPlayground } from "@/components/EarnPlayground";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Regions } from "@/components/Regions";
import { Services } from "@/components/Services";
import { Stats } from "@/components/Stats";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        <EarnPlayground />
        <HowItWorks />
        <Testimonials />
        <Regions />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
