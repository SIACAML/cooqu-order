import Image from "next/image";
import { Link } from "@lexz451/next-nprogress";
import { Button } from "@/components/ui/button";
import { Smartphone, Download, CheckCircle2, ShoppingCart } from "lucide-react";

export function AppDownload() {
    return (
        <section id="app-download" className="py-24 overflow-hidden bg-primary/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-primary rounded-[32px] overflow-hidden relative shadow-2xl shadow-primary/20">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />

                    <div className="flex flex-col lg:flex-row items-center relative z-10">
                        {/* Left Content */}
                        <div className="p-8 md:p-16 lg:w-3/5 space-y-8 text-white">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-md">
                                <Smartphone className="w-4 h-4" />
                                <span>Available for iOS & Android</span>
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                                Get the CooQu App for the <br /> Full Experience
                            </h2>

                            <p className="text-lg text-primary-foreground/90 max-w-xl">
                                The best way to track your orders, receive real-time quotes from cooks,
                                and discover exclusive homemade dining experiences.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    "Real-time Quote Notifications",
                                    "Secure Order Tracking",
                                    "Place Cash on Delivery orders",
                                    "Exclusive App-only Offers"
                                ].map((feature, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-white/80" />
                                        <span className="font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <a href="https://play.google.com/store/apps/details?id=com.cooqu" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-105 active:scale-95">
                                    <div className="bg-black text-white px-6 h-14 rounded-xl border border-white/20 flex items-center gap-3">
                                        <Image
                                            src="/images/play-store.svg"
                                            alt="Google Play"
                                            width={24}
                                            height={24}
                                            className="w-6 h-6 "
                                        />
                                        <div className="flex flex-col items-start leading-none">
                                            <span className="text-[10px] uppercase font-semibold opacity-80">Get it on</span>
                                            <span className="text-xl font-bold">Google Play</span>
                                        </div>
                                    </div>
                                </a>
                                <a href="https://apps.apple.com/us/app/cooqu/id6444360176" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-105 active:scale-95">
                                    <div className="bg-black text-white px-6 h-14 rounded-xl border border-white/20 flex items-center gap-3">
                                        <Image
                                            src="/images/apple.svg"
                                            alt="App Store"
                                            width={24}
                                            height={24}
                                            className="w-6 h-6 "
                                        />
                                        <div className="flex flex-col items-start leading-none">
                                            <span className="text-[10px] opacity-80">Download on the</span>
                                            <span className="text-xl font-bold">App Store</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Right Mockup Decoration */}
                        <div className="lg:w-2/5 p-8 lg:p-0 flex justify-center lg:justify-end relative h-64 lg:h-auto min-h-[400px]">
                            <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full" />
                            <div className="relative z-10 translate-y-20 lg:translate-y-32 scale-110 lg:scale-125">
                                <div className="w-64 h-[500px] bg-zinc-900 rounded-[40px] border-8 border-zinc-800 shadow-2xl relative overflow-hidden">
                                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-zinc-950 to-transparent z-20" />
                                    <Image
                                        src="/images/app-mockup.jpeg"
                                        alt="CooQu App Mockup"
                                        fill
                                        className="object-cover z-10"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
