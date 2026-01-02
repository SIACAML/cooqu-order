import { Link } from "@lexz451/next-nprogress";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-zinc-950 text-white pt-20 pb-10 border-t border-white/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="relative h-10 w-28">
                                <Image
                                    src="/images/white_logo.png"
                                    alt="CooQu Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </Link>
                        <p className="text-zinc-400 leading-relaxed max-w-xs">
                            Empowering home cooks to share their passion and providing you the
                            most authentic homemade food experiences.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { Icon: Facebook, href: "https://www.facebook.com/p/CooQu-India-100082511023670/" },
                                { Icon: Instagram, href: "https://www.instagram.com/cooquapp/" },
                                { Icon: Youtube, href: "https://www.youtube.com/@cooquapp" }
                            ].map(({ Icon, href }, i) => (
                                <Link key={i} href={href} target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                                    <Icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-8">Quick Links</h4>
                        <ul className="space-y-4 text-zinc-400">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/#features" className="hover:text-primary transition-colors">Services</Link></li>
                            <li><Link href="/#how-it-works" className="hover:text-primary transition-colors">How it Works</Link></li>
                            <li><Link href="/custom-order" className="hover:text-primary transition-colors">Place Order</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-bold mb-8">Support</h4>
                        <ul className="space-y-4 text-zinc-400">
                            <li><Link href="/help-center" className="hover:text-primary transition-colors">Help Center</Link></li>
                            <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="/#app-download" className="hover:text-primary transition-colors">Get the App</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-8">Contact Us</h4>
                        <ul className="space-y-6 text-zinc-400">
                            <li className="flex gap-3 items-start">
                                <MapPin className="w-5 h-5 text-primary shrink-0" />
                                <span>Ahemadabad, Gujarat, India</span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                <span>admin@cooqu.co.in</span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <Phone className="w-5 h-5 text-primary shrink-0" />
                                <span>+91 6353 593 662</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-white/10 text-center text-zinc-500 text-sm">
                    <p>© {new Date().getFullYear()} CooQu India. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
