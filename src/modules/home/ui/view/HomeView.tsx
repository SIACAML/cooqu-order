import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { HowItWorks } from "../components/HowItWorks";
import { AppDownload } from "../components/AppDownload";
import { Footer } from "../components/Footer";

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
