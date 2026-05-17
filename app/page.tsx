import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { MobileCartBar } from "@/components/layout/MobileCartBar";
import { HeroSection } from "@/components/sections/HeroSection";
import { VideoSection } from "@/components/sections/VideoSection";
import { MenuSection } from "@/components/sections/MenuSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { AboutSection } from "@/components/sections/AboutSection";
import { GiftingSection } from "@/components/sections/GiftingSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { OrderCTASection } from "@/components/sections/OrderCTASection";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <CartDrawer />
      <MobileCartBar />

      <HeroSection />
      <VideoSection />
      <MenuSection />
      <AboutSection />
      <GiftingSection />
      <TestimonialsSection />
      <GallerySection />
      <OrderCTASection />

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
