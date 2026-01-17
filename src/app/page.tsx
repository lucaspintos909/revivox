import { Metadata } from "next";
import CTA from "@/app/(site)/Cta";
import FAQ from "@/app/(site)/Faq";
import Footer from "@/app/(site)/Footer";
import HeroSection from "@/app/(site)/Hero";
import MakerIntro from "@/app/(site)/MakerIntro";
import MissionVision from "@/app/(site)/MissionVision";
import Navbar from "@/app/(site)/Navbar";
import TestimonialsPage from "@/app/(site)/Testimonials";

// required by Nextra
export const metadata: Metadata = {
  title: "RevivoX",
};

export default function Home() {
  return (
    <div className="bg-[#212121]">
      <Navbar />
      <HeroSection />
      <MakerIntro />
      <MissionVision />
      <FAQ />
      <TestimonialsPage />
      <CTA />
      <Footer />
    </div>
  );
}
