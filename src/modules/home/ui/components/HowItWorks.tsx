import { ArrowRight, ClipboardList, MessageSquareText, ThumbsUp, Heart } from "lucide-react";

const steps = [
    {
        title: "Request Your Meal",
        description: "Tell us what you&apos;re craving. Specify ingredients, portion size, and dietary needs.",
        icon: ClipboardList,
    },
    {
        title: "Receive Custom Quotes",
        description: "Talented local home cooks will review your request and send their best price quotes.",
        icon: MessageSquareText,
    },
    {
        title: "Accept & Confirm",
        description: "Choose the cook that fits your needs and confirm your order via the Cooqu app.",
        icon: ThumbsUp,
    },
    {
        title: "Enjoy Homemade Goodness",
        description: "Savor your authentic, freshly prepared meal delivered right to your door.",
        icon: Heart,
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-zinc-50 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <h2 className="text-4xl font-bold text-zinc-900">How It Works</h2>
                    <p className="text-lg text-zinc-600">
                        Getting authentic homemade food is simpler than ever. Follow these four easy steps.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {steps.map((step, idx) => (
                        <div key={idx} className="relative group text-center">
                            {/* Connector Line (Desktop Only) */}
                            {idx < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-zinc-200 z-0">
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-zinc-300" />
                                </div>
                            )}

                            <div className="relative z-10 flex flex-col items-center">
                                <div className="w-24 h-24 rounded-full bg-white border-4 border-primary/10 shadow-lg flex items-center justify-center mb-6 group-hover:border-primary/30 group-hover:scale-105 transition-all duration-300">
                                    <step.icon className="w-10 h-10 text-primary" />
                                </div>

                                <div className="absolute top-0 right-1/2 translate-x-12 w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center shadow-md">
                                    {idx + 1}
                                </div>

                                <h4 className="text-xl font-bold text-zinc-900 mb-3">{step.title}</h4>
                                <p className="text-zinc-600 leading-relaxed max-w-[200px] mx-auto">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
