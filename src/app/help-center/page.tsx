import { Navbar } from "@/modules/shared/ui/components/Navbar";
import { Footer } from "@/modules/shared/ui/components/Footer";

export default function HelpCenter() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-zinc-900 mb-8 text-center text-primary">Help Center</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                        <div className="p-6 border border-zinc-200 rounded-2xl bg-zinc-50">
                            <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
                            <ul className="space-y-4 text-zinc-600">
                                <li>
                                    <p className="font-semibold">How do I place an order?</p>
                                    <p className="text-sm">Submit your meal request, receive quotes from cooks, and accept the best one.</p>
                                </li>
                                <li>
                                    <p className="font-semibold">Are the cooks verified?</p>
                                    <p className="text-sm">Yes, every cook on CooQu undergoes a quality and hygiene check.</p>
                                </li>
                            </ul>
                        </div>

                        <div className="p-6 border border-zinc-200 rounded-2xl bg-zinc-50">
                            <h2 className="text-xl font-bold mb-4">Support Contact</h2>
                            <p className="text-zinc-600 mb-6">Need more help? Our team is available to assist you with any questions or issues.</p>
                            <div className="space-y-3">
                                <p className="text-sm font-medium">Email: <span className="text-primary">admin@cooqu.co.in</span></p>
                                <p className="text-sm font-medium">WhatsApp: <span className="text-primary">+91 6353 593 662</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
