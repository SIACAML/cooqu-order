import { Navbar } from "@/modules/shared/ui/components/Navbar";
import { Footer } from "@/modules/shared/ui/components/Footer";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactUs() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-bold text-zinc-900 mb-4">Contact CooQu</h1>
                        <p className="text-lg text-zinc-600">We're here to help you enjoy the best homemade food.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-8 text-center border border-zinc-100 rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                                <Mail className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Email Us</h3>
                            <p className="text-primary font-medium">admin@cooqu.co.in</p>
                        </div>

                        <div className="p-8 text-center border border-zinc-100 rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Phone className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">WhatsApp</h3>
                            <p className="text-green-600 font-medium">+91 6353 593 662</p>
                        </div>

                        <div className="p-8 text-center border border-zinc-100 rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Office</h3>
                            <p className="text-zinc-600 font-medium text-sm">Ahemadabad, Gujarat, India</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
