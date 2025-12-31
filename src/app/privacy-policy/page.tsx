import { Navbar } from "@/modules/shared/ui/components/Navbar";
import { Footer } from "@/modules/shared/ui/components/Footer";

export default function PrivacyPolicy() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50/50">
            <Navbar />
            <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-slate-100">
                    <h1 className="text-4xl font-extrabold text-zinc-900 mb-4 tracking-tight">Privacy Policy</h1>
                    <p className="text-zinc-500 mb-12 italic border-b pb-8">Last Updated: December 31, 2025</p>

                    <div className="space-y-12 text-zinc-600 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 mb-4">1. Introduction</h2>
                            <p>
                                This Privacy Policy (Privacy Policy or Policy) outlines how your information is collected, used and disclosed when you access or use our Services as defined in our Terms. This information is collected, used and disclosed in accordance with the Privacy Act 1988 (Cth) (Privacy Act).
                            </p>
                            <p className="mt-4">
                                This Privacy Policy is incorporated by reference into our Terms. Any capitalized terms not defined in this Policy are defined in the Terms. You agree to comply with all Terms when accessing or using our Services, including this Privacy Policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 mb-4">2. What information do we collect and how is it collected?</h2>
                            <p>
                                We collect Personal Information, as defined in the Privacy Act (including Sensitive Information as defined in the Privacy Act), when you access or use our Services.
                            </p>

                            <div className="mt-6 space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-zinc-900 mb-2">2.1. Personal Information provided by you</h3>
                                    <p>
                                        We collect information that you provide to us through our Services and any other means of contact. The kinds of Personal Information we collect include information such as your name, email address, organization, address, phone or mobile number, bank account, and payment details.
                                    </p>
                                    <p className="mt-2 text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
                                        We reserve the right to maintain, store, and use any information or data where we reasonably believe that such action is required to comply with any legal or regulatory obligations, to prevent criminal or other unlawful activity, whether immediate or in the future, or where we have a legitimate business reason to do so, including collecting amounts owed, resolving disputes, enforcing our Terms, or for record-keeping integrity.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-zinc-900 mb-2">2.2. Automatically collected Personal Information</h3>
                                    <p>
                                        When you access our Services, we automatically record information from your device and its software, including your IP address, browser and device type, internet service provider, mobile phone carrier, platform type, the website from which you came and the website to which you are going when you leave our Services, date and time stamp, and cookies that may uniquely identify your browser or account.
                                    </p>
                                    <p className="mt-2 text-sm italic">
                                        When accessing our Services using a mobile device, we may also receive and collect identification numbers associated with your device, mobile carrier, device type and manufacturer, and, if enabled, geographical location data (including GPS).
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-zinc-900 mb-2">2.3. Personal Information collected via cookies</h3>
                                    <p>
                                        Our Services may use small pieces of data called cookies to identify a user who engages with our Services and to compile records of a user’s history of engaging with our Services. If you wish to disable cookies, you may do so through your browser settings, however please be aware that if you choose to do this, some functionality of our Website will not be available to you.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-zinc-900 mb-2">2.4. Personal Information collected via Google Analytics</h3>
                                    <p>
                                        CooQu India may use Google Analytics, which allows us to anonymously track the use of our Services by recording the number of users who have visited, the number of pages viewed, navigation patterns, and technical data. This information is collected for statistical purposes only and cannot be used to identify you.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-zinc-900 mb-2">2.5. Third Party Payment Processor</h3>
                                    <p>
                                        CooQu India uses third party payment processors and gateways to process payments. CooQu India does not store or retain any sensitive financial/billing information (being credit card numbers, bank account details, etc.), obtained in connection with processing such payments.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 mb-4">3. For what purposes do we collect and use Personal Information?</h2>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>For provision of the Services;</li>
                                <li>For communication with you regarding features and messaging;</li>
                                <li>For announcements, technical notices, and administrative updates;</li>
                                <li>For analysis, monitoring, and improvement of our Services;</li>
                                <li>For security purposes and fraud protection;</li>
                                <li>For sending marketing communications and promotional offers;</li>
                                <li>To comply with relevant laws and regulations.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 mb-4">4. How do we store and protect your information?</h2>
                            <h3 className="text-lg font-semibold text-zinc-900 mb-2">4.1. Storage of Personal Information</h3>
                            <p>
                                The Personal Information we collect from you is transferred and stored electronically within a secure cloud server which is SSL Encrypted located in Australia. You agree and consent to CooQu India storing your Personal Information on such servers.
                            </p>

                            <h3 className="text-lg font-semibold text-zinc-900 mt-6 mb-2">4.2. Who can access your Personal Information?</h3>
                            <p>
                                Your Personal Information is accessible to our employees, contractors and our third-party service providers such as our website host and technical support providers.
                            </p>
                            <p className="mt-4 font-medium text-amber-700 bg-amber-50 p-4 rounded-xl border border-amber-100 italic">
                                Please note that no method of electronic transmission or storage is 100% secure and we cannot guarantee the absolute security of your Personal Information. Transmission over the Internet is at your own risk.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 mb-4">5. To whom your Personal Information is disclosed?</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-zinc-900 mb-2">5.1. CooQu and Related Bodies Corporate</h3>
                                    <p>Your Personal Information may be accessed by our directors, employees, officers and contractors.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-zinc-900 mb-2">5.2. Parties required by law</h3>
                                    <p>Your Personal Information may be disclosed to any party to whom we are required by law to provide it, including court orders or investigations.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-zinc-900 mb-2">5.3. Direct marketing</h3>
                                    <p>You agree to us using your Personal Information to keep you informed about our products and services. You can opt-out at any time.</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 mb-4">6. Third party websites and social media</h2>
                            <p>
                                Our Services may contain links to third party websites. We have no control over, and shall not be liable for, the privacy practices or content of these third party platforms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 mb-4">7. How can you access or update your Personal Information?</h2>
                            <p>
                                At any time, you may request access to Personal Information we hold about you. You may also request that we delete, update or correct any Personal Information by setting out your request in writing.
                            </p>
                        </section>

                        <section className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
                            <h2 className="text-2xl font-bold text-zinc-900 mb-6">10. Contact us</h2>
                            <div className="space-y-4">
                                <p>All requests for access or corrections to your Personal Information and complaints should be directed to our Privacy Officer:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                                        <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">Website</p>
                                        <p className="font-medium text-zinc-900">www.cooqu.co.in</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                                        <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">Email</p>
                                        <p className="font-medium text-primary">admin@cooqu.co.in</p>
                                    </div>
                                </div>
                                <p className="text-sm text-zinc-500 mt-6 pt-6 border-t border-primary/10">
                                    If you are not satisfied with our handling of your complaint, you are entitled to make a complaint to the Office of the Indian Information Commissioner.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
