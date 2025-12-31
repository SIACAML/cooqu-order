import Link from "next/link";
import { UtensilsCrossed, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-zinc-950 text-white pt-20 pb-10 border-t border-white/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center group-hover:rotate-12 transition-transform">
                                <UtensilsCrossed className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight">CooQu</span>
                        </Link>
                        <p className="text-zinc-400 leading-relaxed max-w-xs">
                            Empowering home cooks to share their passion and providing you the
                            most authentic homemade food experiences.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <Link key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
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
                            <li><Link href="#features" className="hover:text-primary transition-colors">Services</Link></li>
                            <li><Link href="/custom-order" className="hover:text-primary transition-colors">Place Order</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Explore Cooks</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-bold mb-8">Support</h4>
                        <ul className="space-y-4 text-zinc-400">
                            <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="#" className="hover:text-primary transition-colors">Become a Cook</Link></li>
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
