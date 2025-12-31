import { Navbar } from "@/modules/shared/ui/components/Navbar";
import { Footer } from "@/modules/shared/ui/components/Footer";

export default function TermsOfService() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50/50">
            <Navbar />
            <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-slate-100">
                    <h1 className="text-4xl font-extrabold text-zinc-900 mb-4 tracking-tight">Terms and Conditions</h1>
                    <p className="text-zinc-500 mb-12 italic border-b pb-8">Last Updated: 05 April 2022</p>

                    <div className="space-y-12 text-zinc-600 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 mb-4">1. Introduction</h2>
                            <div className="space-y-4">
                                <p>
                                    1.1. By using this website (located at https://www.cooqu.com.au/), any related website, applications or URLs, social media platforms owned or operated by us (Platform) and our Services as defined in paragraph 2, you agree to be legally bound by these Terms and Conditions (Terms).
                                </p>
                                <p>
                                    1.2. By agreeing to these Terms, you are entering into an agreement with CooQu Pty Ltd (ACN 658 611 299) trading as CooQu, including its successors, assignees and related bodies corporate (defined in the Corporations Act 2001 (Cth)) (CooQu or we or us), and agree to comply with any and all applicable laws and regulations, whether domestic or international.
                                </p>
                                <p>
                                    1.3. Our Services, including but not limited to the registration of an account with us or placing of an Order, is not intended to be used by children under the age of 18.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 mb-4">2. Use of the Services</h2>
                            <div className="space-y-4">
                                <p>2.1. We will provide the Services to you in accordance with these Terms.</p>
                                <p>2.2. You agree that you are responsible for your access to our Services and that the Services are made available to you for your personal, non-commercial use unless otherwise agreed in writing by us.</p>

                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold text-zinc-900 mb-4">User Conduct - You agree that you will not:</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Engage in unlawful or harassing conduct</li>
                                            <li>Share your password or login info</li>
                                            <li>Damage or disrupt the Services</li>
                                            <li>Impersonate any other person</li>
                                            <li>Post personal info without permission</li>
                                            <li>Engage in illegal or unlawful activity</li>
                                            <li>Defraud, scam, or hack other users</li>
                                        </ul>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Use automated technology to scrape data</li>
                                            <li>Resell or make commercial use of Services</li>
                                            <li>Gain unauthorised access to our servers</li>
                                            <li>Introduce viruses or malicious programs</li>
                                            <li>Use the Services for unsolicited spam</li>
                                            <li>Mislead others as to information origin</li>
                                            <li>Use robots or data mining methods</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 mb-4">3. User Content</h2>
                            <div className="space-y-4">
                                <p>
                                    3.1. By providing User Content, you grant us a non-exclusive, royalty-free, perpetual, worldwide right to use, reproduce, modify, and display such content in any form without attribution.
                                </p>
                                <p>
                                    3.2. You warrant that you hold all intellectual property rights to the User Content and that our use will not infringe any third-party rights.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 mb-4">5. Intellectual Property</h2>
                            <p>
                                5.1. CooQu owns, controls or licences all materials contained on our Services, including text, graphics, logos, and arrangement (CooQu IP). CooQu IP is protected by copyright and trade mark laws and must not be used without prior written consent.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 mb-4">9. Limitation of Liability</h2>
                            <p className="bg-amber-50 p-6 rounded-2xl border border-amber-100 italic text-amber-900">
                                To the maximum extent permitted by law, neither CooQu, nor any of its employees or agents, will be liable for any loss, damage or injury whatsoever (including negligence, death, injury or illness) arising from or in connection with the use of the Services or Goods supplied.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 mb-4">11. Release and Indemnity</h2>
                            <p>
                                You agree to release and indemnify and hold us harmless from any claims, demands, or losses arising from your purchase or use of Goods services purchased from the Platform or your breach of these Terms.
                            </p>
                        </section>

                        <section className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
                            <h2 className="text-2xl font-bold text-zinc-900 mb-6">13. General</h2>
                            <div className="space-y-4 text-sm">
                                <p><strong>13.3. Severability:</strong> If any part of these Terms is found to be invalid, it will be severed without affecting the remaining provisions.</p>
                                <p><strong>13.6. Jurisdiction:</strong> These Terms are governed by the laws of Victoria, Australia. You submit to the exclusive jurisdiction of the courts in Victoria.</p>

                                <div className="mt-8 pt-6 border-t border-primary/10">
                                    <p className="font-medium">Questions about our Terms?</p>
                                    <p className="text-zinc-500">Contact us at <span className="text-primary font-bold">admin@cooqu.co.in</span></p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
