import { Navbar } from "@/modules/shared/ui/components/Navbar";
import { Footer } from "@/modules/shared/ui/components/Footer";

export default function PrivacyPolicy() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto prose prose-zinc prose-orange lg:prose-lg">
                    <h1 className="text-4xl font-bold text-zinc-900 mb-8">Privacy Policy</h1>
                    <p className="text-zinc-500 mb-8 italic">Last Updated: December 31, 2025</p>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-zinc-900 mb-4">1. Introduction</h2>
                        <p className="text-zinc-600 leading-relaxed">
                            At CooQu, we value your privacy and are committed to protecting your personal data.
                            This Privacy Policy explains how we collect, use, and safeguard your information
                            when you use our website and services.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-zinc-900 mb-4">2. Information We Collect</h2>
                        <p className="text-zinc-600 leading-relaxed">
                            We collect information that you provide to us directly, such as your name, email address,
                            phone number, and delivery address when you place an order or create an account.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-zinc-900 mb-4">3. How We Use Your Information</h2>
                        <ul className="list-disc pl-6 text-zinc-600 space-y-2">
                            <li>To facilitate and process your homemade food orders.</li>
                            <li>To connect you with talented home cooks in your area.</li>
                            <li>To improve our services and user experience.</li>
                            <li>To communicate with you about your orders and promotional offers.</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-zinc-900 mb-4">4. Data Security</h2>
                        <p className="text-zinc-600 leading-relaxed">
                            We implement industry-standard security measures to protect your data from unauthorized access,
                            alteration, or disclosure. However, no method of transmission over the internet is 100% secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-zinc-900 mb-4">5. Contact Us</h2>
                        <p className="text-zinc-600 leading-relaxed">
                            If you have any questions about this Privacy Policy, please contact us at
                            <span className="font-semibold text-primary ml-1">admin@cooqu.co.in</span>.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
