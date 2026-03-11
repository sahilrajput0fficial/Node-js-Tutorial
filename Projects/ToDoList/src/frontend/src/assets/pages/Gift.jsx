import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Gift as GiftIcon, ShoppingCart, Tag, Truck, RotateCcw } from "lucide-react";

const OCCASIONS = ["All", "Birthday", "Anniversary", "Festive", "Corporate", "Just Because"];

const BUNDLES = [
    { id: 1, title: "Music Lover's Pack", for: "Birthday", emoji: "🎂", desc: "True wireless earbuds + carry pouch + care kit. Perfect birthday surprise.", price: 2999, mrp: 3999, tag: "Best Seller", tagColor: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800", image: "https://placehold.co/300x200/fcfcfc/999?text=Gift+Set" },
    { id: 2, title: "Anniversary Date Set", for: "Anniversary", emoji: "💕", desc: "Over-ear headphones in signature gift box. Shared music, shared memories.", price: 5499, mrp: 7499, tag: "Trending", tagColor: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800", image: "https://placehold.co/300x200/fcfcfc/999?text=Gift+Set" },
    { id: 3, title: "Festive Audio Box", for: "Festive", emoji: "🎁", desc: "Speaker + earbuds combo in festive packaging. For Diwali, Holi, and beyond.", price: 3999, mrp: 5499, tag: "Limited", tagColor: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800", image: "https://placehold.co/300x200/fcfcfc/999?text=Gift+Set" },
    { id: 4, title: "Corporate Thank You Kit", for: "Corporate", emoji: "🏢", desc: "ANC earbuds in professional packaging. Make an impression with every gift.", price: 1999, mrp: 2799, tag: "Bulk Available", tagColor: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800", image: "https://placehold.co/300x200/fcfcfc/999?text=Gift+Set" },
    { id: 5, title: "Spontaneous Gift Box", for: "Just Because", emoji: "🎀", desc: "Sporty earbuds + personalised card. Because you need no reason to make someone smile.", price: 1499, mrp: 1999, tag: "New", tagColor: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800", image: "https://placehold.co/300x200/fcfcfc/999?text=Gift+Set" },
    { id: 6, title: "Premium Couple Set", for: "Anniversary", emoji: "👫", desc: "Matching wireless earbuds for two — because the best connections are in sync.", price: 6999, mrp: 9999, tag: "Top Rated", tagColor: "bg-primary/10 text-primary dark:text-primary border border-primary/20", image: "https://placehold.co/300x200/fcfcfc/999?text=Gift+Set" },
];

const PERKS = [
    { icon: "🎀", title: "Free Gift Wrapping", desc: "Every bundle ships in premium gift packaging." },
    { icon: "✍️", title: "Personalised Message Card", desc: "Add a handwritten-style note for free." },
    { icon: "⚡", title: "Express Delivery", desc: "Same-day gifting delivery available." },
    { icon: "🔁", title: "30-Day Easy Returns", desc: "Receiver didn't love it? Hassle-free returns." },
];

export default function Gift() {
    const [activeOccasion, setActiveOccasion] = useState("All");

    const filtered = activeOccasion === "All" ? BUNDLES : BUNDLES.filter(b => b.for === activeOccasion);

    return (
        <div className="min-h-screen bg-[#f5f5f5] dark:bg-background">
            {/* Breadcrumb */}
            <div className="bg-white dark:bg-card border-b border-border">
                <div className="max-w-6xl mx-auto px-4 py-2.5">
                    <nav className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Link to="/" className="hover:text-primary">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-foreground font-medium">Gifting Store</span>
                    </nav>
                </div>
            </div>

            {/* Banner */}
            <div className="bg-[#1a0a0a] text-white py-10">
                <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1">
                        <p className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-1.5">
                            <GiftIcon className="w-3.5 h-3.5" /> Gifting Store
                        </p>
                        <h1 className="text-3xl md:text-4xl font-black mb-3">
                            Give the Gift of Sound 🎁
                        </h1>
                        <p className="text-white/70 text-sm leading-relaxed max-w-lg">
                            Curated gift bundles for every occasion. Beautifully packed, personalised, and delivered fast.
                        </p>
                    </div>
                    <div className="flex gap-3 flex-wrap justify-center">
                        {PERKS.map((p, i) => (
                            <div key={i} className="bg-white/10 rounded-lg px-4 py-3 text-center min-w-[100px]">
                                <p className="text-lg mb-0.5">{p.icon}</p>
                                <p className="text-xs font-semibold text-white">{p.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-5 space-y-4">
                {/* Occasion Tabs */}
                <div className="bg-white dark:bg-card border border-border rounded-lg px-4 py-3 flex items-center gap-2 flex-wrap">
                    <p className="text-xs font-semibold text-muted-foreground mr-1">Filter by occasion:</p>
                    {OCCASIONS.map(occ => (
                        <button
                            key={occ}
                            onClick={() => setActiveOccasion(occ)}
                            className={`px-3 py-1.5 rounded text-xs font-semibold border transition-colors ${activeOccasion === occ ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground hover:border-primary hover:text-primary"}`}
                        >
                            {occ}
                        </button>
                    ))}
                </div>

                {/* Bundle Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filtered.map(bundle => (
                        <div key={bundle.id} className="bg-white dark:bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow group">
                            {/* Image */}
                            <div className="relative aspect-video bg-secondary/20">
                                <img src={bundle.image} alt={bundle.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${bundle.tagColor}`}>{bundle.tag}</span>
                                </div>
                                <span className="absolute top-2 right-2 text-xl">{bundle.emoji}</span>
                            </div>

                            {/* Info */}
                            <div className="p-4">
                                <p className="text-xs text-muted-foreground mb-1">{bundle.for}</p>
                                <h3 className="text-sm font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{bundle.title}</h3>
                                <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">{bundle.desc}</p>

                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-base font-bold text-foreground">₹{bundle.price.toLocaleString("en-IN")}</span>
                                    <span className="text-xs text-muted-foreground line-through">₹{bundle.mrp.toLocaleString("en-IN")}</span>
                                    <span className="text-xs font-bold text-primary">{Math.round((1 - bundle.price / bundle.mrp) * 100)}% off</span>
                                </div>

                                <div className="flex gap-2">
                                    <button className="flex-1 h-8 bg-primary text-primary-foreground text-xs font-semibold rounded flex items-center justify-center gap-1.5 hover:bg-primary/90 transition-colors">
                                        <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                                    </button>
                                    <button className="h-8 px-3 border border-border text-muted-foreground text-xs font-medium rounded hover:border-primary hover:text-primary transition-colors flex items-center gap-1.5">
                                        <Tag className="w-3.5 h-3.5" /> Gift This
                                    </button>
                                </div>
                            </div>

                            {/* Delivery info */}
                            <div className="border-t border-border/50 bg-secondary/10 px-4 py-2 text-xs text-muted-foreground flex items-center gap-1.5">
                                <Truck className="w-3.5 h-3.5 text-green-600" />
                                <span className="text-green-600 font-medium">Free delivery</span> + Free gift wrapping
                            </div>
                        </div>
                    ))}
                </div>

                {/* Gift Card Banner */}
                <div className="bg-white dark:bg-card border border-border rounded-lg p-5 flex flex-col sm:flex-row items-center gap-5">
                    <div className="text-4xl">🎟️</div>
                    <div className="flex-1 text-center sm:text-left">
                        <p className="text-base font-bold text-foreground mb-1">Not sure what to gift?</p>
                        <p className="text-sm text-muted-foreground">Send a digital gift card from ₹500 to ₹10,000. Let them choose their perfect audio companion.</p>
                    </div>
                    <button className="h-10 px-6 bg-primary text-primary-foreground text-sm font-bold rounded hover:bg-primary/90 transition-colors flex items-center gap-2 shrink-0">
                        <GiftIcon className="w-4 h-4" /> Buy Gift Card
                    </button>
                </div>

                {/* Returns note */}
                <div className="bg-white dark:bg-card border border-border rounded-lg px-4 py-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <RotateCcw className="w-4 h-4 text-primary shrink-0" />
                    30-day easy returns on all gift bundles. Receiver can exchange for a different product if needed.
                </div>
            </div>
        </div>
    );
}
