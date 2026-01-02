"use client";

import { useState, useEffect } from "react";
import { Link } from "@lexz451/next-nprogress";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
                        <div className="relative h-10 w-28 transition-transform group-hover:scale-105 duration-300">
                            <Image
                                src={isScrolled ? "/images/logo.png" : "/images/white_logo.png"}
                                alt="CooQu Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-10">
                        {[
                            { name: "Services", href: "/#features" },
                            { name: "How it Works", href: "/#how-it-works" },
                            { name: "Get App", href: "/#app-download" },
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium hover:text-primary transition-colors",
                                    isScrolled ? "text-zinc-600" : "text-zinc-200"
                                )}
                            >
                                {item.name}
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
                    {[
                        { name: "Services", href: "/#features" },
                        { name: "How it Works", href: "/#how-it-works" },
                        { name: "Get App", href: "/#app-download" },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="block text-zinc-600 font-medium px-4 py-2 hover:bg-muted rounded-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.name}
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
