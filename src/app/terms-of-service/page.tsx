import { Navbar } from "@/modules/shared/ui/components/Navbar";
import { Footer } from "@/modules/shared/ui/components/Footer";

export default function TermsOfService() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto prose prose-zinc prose-orange lg:prose-lg">
                    <h1 className="text-4xl font-bold text-zinc-900 mb-8">Terms of Service</h1>
                    <p className="text-zinc-500 mb-8 italic">Last Updated: December 31, 2025</p>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-zinc-900 mb-4">1. Acceptance of Terms</h2>
                        <p className="text-zinc-600 leading-relaxed">
                            By accessing and using CooQu, you agree to comply with and be bound by these Terms of Service.
                            If you do not agree, please do not use our services.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-zinc-900 mb-4">2. Description of Service</h2>
                        <p className="text-zinc-600 leading-relaxed">
                            CooQu is a platform that connects customers with local home cooks for the preparation and
                            delivery of homemade meals. We act as an intermediary and are not responsible for the
                            actual food preparation or delivery, which is handled by the cooks.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-zinc-900 mb-4">3. User Conduct</h2>
                        <p className="text-zinc-600 leading-relaxed">
                            Users agree to provide accurate information and to use the service in a lawful manner.
                            Any misuse of the platform or harassment of cooks/customers may result in account termination.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-zinc-900 mb-4">4. Payments and Refunds</h2>
                        <p className="text-zinc-600 leading-relaxed">
                            All payments for orders must be made through our authorized payment gateways.
                            Refund policies are subject to the specific terms of the order and the cook's agreement.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-zinc-900 mb-4">5. Limitation of Liability</h2>
                        <p className="text-zinc-600 leading-relaxed">
                            CooQu shall not be liable for any indirect, incidental, or consequential damages arising
                            from your use of the service or any food-related issues.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
