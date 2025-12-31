import {
    Users,
    ChefHat,
    Truck,
    CalendarCheck,
    ShieldCheck,
    Star
} from "lucide-react";

const features = [
    {
        title: "Custom Orders",
        description: "Personalise every detail, from ingredients to preparation method. Your taste, your way.",
        icon: ChefHat,
        color: "bg-orange-100 text-orange-600",
    },
    {
        title: "Catering Services",
        description: "Make your occasions special with authentic homemade meals for groups large and small.",
        icon: Users,
        color: "bg-blue-100 text-blue-600",
    },
    {
        title: "Delivery & Pickup",
        description: "Enjoy flexible options. Have it delivered to your doorstep or pick it up locally.",
        icon: Truck,
        color: "bg-green-100 text-green-600",
    },
    {
        title: "Daily & Recurring",
        description: "Pre-order weekly or monthly meals. Healthy, homemade food, minus the hassle.",
        icon: CalendarCheck,
        color: "bg-purple-100 text-purple-600",
    },
    {
        title: "Verified Cooks",
        description: "Every CooQu cook is vetted for quality, hygiene, and authentic home-style expertise.",
        icon: ShieldCheck,
        color: "bg-red-100 text-red-600",
    },
    {
        title: "Unique Experiences",
        description: "Explore theme-based dining and forgotten recipes you won&apos;t find in restaurants.",
        icon: Star,
        color: "bg-yellow-100 text-yellow-600",
    },
];

export function Features() {
    return (
        <section id="features" className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-primary font-bold tracking-wider uppercase text-sm">Our Services</h2>
                    <h3 className="text-4xl md:text-5xl font-bold text-zinc-900 leading-tight">
                        Personalize Your Food Experience with CooQu India
                    </h3>
                    <p className="text-lg text-zinc-600">
                        From daily meals to special celebrations, our community of talented home cooks
                        brings authentic flavors directly to your table.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="p-8 rounded-2xl border border-zinc-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all group"
                        >
                            <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <feature.icon className="w-7 h-7" />
                            </div>
                            <h4 className="text-xl font-bold text-zinc-900 mb-3">{feature.title}</h4>
                            <p className="text-zinc-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Subtle Background Decoration */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-50 rounded-full blur-3xl -z-10" />
        </section>
    );
}
