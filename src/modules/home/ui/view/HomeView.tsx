import { Navbar } from "@/modules/shared/ui/components/Navbar";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { HowItWorks } from "../components/HowItWorks";
import { AppDownload } from "../components/AppDownload";
import { Footer } from "@/modules/shared/ui/components/Footer";

export function HomeView() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <Hero />
                <Features />
                <HowItWorks />
                <AppDownload />
            </main>
            <Footer />
        </div>
    );
}
