import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { MobileCartBar } from "@/components/layout/MobileCartBar";
import { MenuSection } from "@/components/sections/MenuSection";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";

export default function MenuPage() {
  return (
    <main className="bg-white min-h-screen pt-20">
      <Navbar />
      <CartDrawer />
      <MobileCartBar />
      <MenuSection />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
