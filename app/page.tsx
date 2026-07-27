import Logo from "@/components/Logo";
import JsonLd from "@/components/JsonLd";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import ForWho from "@/components/landing/ForWho";
import HowItWorks from "@/components/landing/HowItWorks";
import DemoPreview from "@/components/landing/DemoPreview";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <>
      <JsonLd />
      <nav aria-label="Navigasi utama" className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" aria-label="CDPS - Beranda">
            <Logo size="sm" />
          </a>
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="#fitur" className="text-sm text-gray-500 hover:text-[#6741D9] font-medium hidden sm:block transition-colors">
              Fitur
            </a>
            <a href="#kontak" className="text-sm text-gray-500 hover:text-[#6741D9] font-medium hidden sm:block transition-colors">
              FAQ
            </a>
            <a
              href="/demo"
              className="bg-[#FBD321] hover:bg-[#D4A800] text-[#6741D9] text-sm font-bold px-5 py-2 rounded-full transition-all hover:shadow-lg hover:shadow-[#FBD321]/30"
            >
              Coba Demo
            </a>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <div className="pt-16">
          <Hero />
          <Features />
          <ForWho />
          <HowItWorks />
          <DemoPreview />
          <FAQ />
        </div>
      </main>

      <Footer />
    </>
  );
}
