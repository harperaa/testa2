import HeroSection from "./hero-section";
import SecurityMonitoring from "./security-monitoring";
import Testimonials from "./testimonials";
import CallToAction from "./call-to-action";
import FAQs from "./faqs";
import Footer from "./footer";
// modules:imports
import CustomClerkPricing from "@/components/custom-clerk-pricing";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <SecurityMonitoring />
      <section id="pricing" className="bg-muted/50 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 mx-auto max-w-2xl space-y-4 text-center">
            <h1 className="text-center text-4xl font-semibold lg:text-5xl">Simple plans for serious progress</h1>
            <p className="text-muted-foreground">Start free, then unlock deeper insights, custom goals, and advanced logging when you are ready to level up with Grok Fit.</p>
          </div>
          <CustomClerkPricing />
        </div>
      </section>
      {/* modules:sections */}
      <Testimonials />
      <CallToAction />
      <FAQs />
      <Footer />
    </div>
  );
}
