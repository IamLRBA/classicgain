import { EarnPlayground } from "@/components/EarnPlayground";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Regions } from "@/components/Regions";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <EarnPlayground />
        <HowItWorks />
        <Regions />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
