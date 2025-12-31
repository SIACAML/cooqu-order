"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, UtensilsCrossed } from "lucide-react";

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/hero-food.png"
                    alt="Premium Homemade Food"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent lg:from-black/70 lg:via-black/30 lg:to-transparent" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-2xl text-white space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md text-primary-foreground text-sm font-medium">
                        <UtensilsCrossed className="w-4 h-4 text-primary" />
                        <span>Discover Authentic Home Cooking</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
                        Authentic <span className="text-primary">Homemade</span> Flavors, Crafted with Love.
                    </h1>

                    <p className="text-lg md:text-xl text-zinc-200 max-w-lg leading-relaxed">
                        CooQu connects you with passionate home cooks for custom meals,
                        gourmet catering, and unique dining experiences you won&apos;t find anywhere else.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button asChild size="lg" className="h-14 px-8 text-lg font-semibold shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:shadow-[0_0_30px_rgba(255,107,0,0.5)] transition-all">
                            <Link href="/custom-order" className="flex items-center gap-2">
                                Place Custom Order <ArrowRight className="w-5 h-5" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white transition-all">
                            <Link href="#features">Explore Services</Link>
                        </Button>
                    </div>

                    <div className="flex items-center gap-6 pt-8 text-sm text-zinc-300">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center text-[10px] font-bold">
                                    U{i}
                                </div>
                            ))}
                            <div className="w-10 h-10 rounded-full border-2 border-zinc-900 bg-primary flex items-center justify-center text-[10px] font-bold text-white">
                                500+
                            </div>
                        </div>
                        <p>Joined by 2000+ food lovers in your city</p>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
                <div className="w-6 h-10 rounded-full border-2 border-white flex justify-center pt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                </div>
            </div>
        </section>
    );
}
