import { CustomOrderForm } from "../components/CustomOrderForm";
import { Navbar } from "@/modules/shared/ui/components/Navbar";
import { Footer } from "@/modules/shared/ui/components/Footer";

export function CustomOrderView() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-muted/30 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <CustomOrderForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
