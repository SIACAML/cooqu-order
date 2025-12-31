"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
            isScrolled
                ? "bg-white/80 backdrop-blur-md border-zinc-200 py-3"
                : "bg-transparent border-transparent py-5"
        )}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
                            <UtensilsCrossed className="w-6 h-6 text-white" />
                        </div>
                        <span className={cn(
                            "text-2xl font-bold tracking-tight transition-colors",
                            isScrolled ? "text-zinc-900" : "text-white"
                        )}>CooQu</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-10">
                        {["Services", "How it Works", "About"].map((item) => (
                            <Link
                                key={item}
                                href={`/#${item.toLowerCase().replace(" ", "-")}`}
                                className={cn(
                                    "text-sm font-medium hover:text-primary transition-colors",
                                    isScrolled ? "text-zinc-600" : "text-zinc-200"
                                )}
                            >
                                {item}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <Button asChild className="rounded-full px-6 shadow-lg shadow-primary/20">
                            <Link href="/custom-order">Place Order</Link>
                        </Button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className={cn("md:hidden p-2 rounded-lg transition-colors", isScrolled ? "text-zinc-900" : "text-white")}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-zinc-200 p-4 space-y-4 animate-in slide-in-from-top-4">
                    {["Services", "How it Works", "About"].map((item) => (
                        <Link
                            key={item}
                            href={`/#${item.toLowerCase().replace(" ", "-")}`}
                            className="block text-zinc-600 font-medium px-4 py-2 hover:bg-muted rounded-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item}
                        </Link>
                    ))}
                    <Button asChild className="w-full rounded-xl" onClick={() => setIsMobileMenuOpen(false)}>
                        <Link href="/custom-order">Place Custom Order</Link>
                    </Button>
                </div>
            )}
        </nav>
    );
}
