import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/landing/Navbar"));
const Hero = dynamic(() => import("@/components/landing/Hero"));
const ProblemSection = dynamic(() => import("@/components/landing/ProblemSection"));
const ComparisonTable = dynamic(() => import("@/components/landing/ComparisonTable"));
const StatsSection = dynamic(() => import("@/components/landing/StatsSection"));
const PlansSection = dynamic(() => import("@/components/landing/PlansSection"));
const CoverageMap = dynamic(() => import("@/components/landing/CoverageMap"));
const CommunitySection = dynamic(() => import("@/components/landing/CommunitySection"));
const AppShowcase = dynamic(() => import("@/components/landing/AppShowcase"));
const Testimonials = dynamic(() => import("@/components/landing/Testimonials"));
const FAQ = dynamic(() => import("@/components/landing/FAQ"));
const CTA = dynamic(() => import("@/components/landing/CTA"));
const Footer = dynamic(() => import("@/components/landing/Footer"));
const ComboCounter = dynamic(() => import("@/components/gamification/ComboCounter"));
const FullPageHighway = dynamic(() => import("@/components/three/FullPageHighway"));

export default function Home() {
  return (
    <main className="flex-1 relative">
      <FullPageHighway />
      <Navbar />
      <Hero />
      <ProblemSection />
      <ComparisonTable />
      <StatsSection />
      <PlansSection />
      <CoverageMap />
      <CommunitySection />
      <AppShowcase />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
      <ComboCounter />
    </main>
  );
}
