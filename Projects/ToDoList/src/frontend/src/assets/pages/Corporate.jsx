import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Building2, CheckCircle2, BadgeCheck, Truck, ShieldCheck, Headphones, Users, Zap, ArrowRight } from "lucide-react";

const BENEFITS = [
    { icon: BadgeCheck, title: "Dedicated Account Manager", desc: "A personal point of contact for all your orders and after-sales." },
    { icon: Truck, title: "Priority Shipping", desc: "Your bulk orders are dispatched first with real-time tracking." },
    { icon: ShieldCheck, title: "Extended Warranty", desc: "Exclusive warranty plans to protect your team's gear." },
    { icon: Zap, title: "Volume Discounts", desc: "Tiered pricing starting from just 10 units. The more you order, the more you save." },
    { icon: Headphones, title: "Custom Branding", desc: "Logo engraving, custom packaging, and company-branded accessories." },
    { icon: Users, title: "Flexible Billing", desc: "GST invoicing, Net-30 payment terms, and flexible billing cycles." },
];

const TIERS = [
    { name: "Starter", units: "10–49 units", discount: "5% off", perks: ["Free shipping", "GST invoice", "Email support"], popular: false },
    { name: "Business", units: "50–199 units", discount: "12% off", perks: ["Priority shipping", "Account manager", "Custom packaging", "30-day terms"], popular: true },
    { name: "Enterprise", units: "200+ units", discount: "Up to 20% off", perks: ["White-glove delivery", "Logo branding", "24/7 support", "Extended warranty"], popular: false },
];

export default function Corporate() {
    const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", units: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        await new Promise(r => setTimeout(r, 800)); // simulate API
        setSubmitted(true);
        setSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5] dark:bg-background">
            {/* Breadcrumb */}
            <div className="bg-white dark:bg-card border-b border-border">
                <div className="max-w-6xl mx-auto px-4 py-2.5">
                    <nav className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Link to="/" className="hover:text-primary">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-foreground font-medium">Corporate</span>
                    </nav>
                </div>
            </div>

            {/* Page Hero — simple banner like Flipkart/Amazon */}
            <div className="bg-[#1a1a2e] text-white py-12">
                <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                            <Building2 className="w-5 h-5 text-blue-400" />
                            <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Corporate Solutions</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black leading-tight mb-4">
                            Equip Your Team with<br />Premium Audio Gear
                        </h1>
                        <p className="text-white/70 text-sm leading-relaxed max-w-lg mb-6">
                            Bulk pricing, dedicated account management, and custom branding solutions for businesses of all sizes. Trusted by 500+ companies across India.
                        </p>
                        <a href="#contact-form" className="inline-flex items-center gap-2 h-10 px-6 bg-primary text-primary-foreground text-sm font-bold rounded hover:bg-primary/90 transition-colors">
                            Get a Quote <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                    <div className="hidden md:grid grid-cols-2 gap-3 text-center shrink-0">
                        {[["500+", "Companies"], ["50M+", "Users Served"], ["24/7", "Support"], ["1 Yr", "Warranty"]].map(([val, label]) => (
                            <div key={label} className="bg-white/10 rounded-lg px-5 py-4">
                                <p className="text-2xl font-black text-white">{val}</p>
                                <p className="text-xs text-white/60 mt-0.5">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-6 space-y-5">
                {/* Benefits */}
                <div className="bg-white dark:bg-card border border-border rounded-lg overflow-hidden">
                    <div className="px-5 py-3 border-b border-border">
                        <h2 className="text-base font-bold text-foreground">Why Choose Corporate?</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
                        {BENEFITS.map((b, i) => (
                            <div key={i} className={`p-5 flex gap-4 items-start ${i >= 3 ? "sm:border-t border-border" : ""}`}>
                                <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                                    <b.icon className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-foreground mb-1">{b.title}</p>
                                    <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Volume Pricing */}
                <div className="bg-white dark:bg-card border border-border rounded-lg overflow-hidden">
                    <div className="px-5 py-3 border-b border-border">
                        <h2 className="text-base font-bold text-foreground">Volume Pricing</h2>
                        <p className="text-xs text-muted-foreground mt-0.5">Transparent pricing with no hidden charges.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
                        {TIERS.map((tier, i) => (
                            <div key={i} className={`p-5 relative ${tier.popular ? "bg-primary/5" : ""}`}>
                                {tier.popular && (
                                    <span className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded">
                                        Most Popular
                                    </span>
                                )}
                                <p className="text-xs text-muted-foreground font-medium mb-1">{tier.units}</p>
                                <p className="text-2xl font-black text-foreground mb-1">{tier.discount}</p>
                                <p className="text-sm font-bold text-foreground mb-4">{tier.name}</p>
                                <ul className="space-y-2 mb-5">
                                    {tier.perks.map((p, j) => (
                                        <li key={j} className="flex items-center gap-2 text-sm text-foreground/80">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-green-600 shrink-0" />
                                            {p}
                                        </li>
                                    ))}
                                </ul>
                                <a href="#contact-form" className={`block text-center text-sm font-semibold py-2 rounded border transition-colors ${tier.popular ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90" : "border-border text-foreground hover:border-primary hover:text-primary"}`}>
                                    Get Started
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Inquiry Form */}
                <div id="contact-form" className="bg-white dark:bg-card border border-border rounded-lg overflow-hidden">
                    <div className="px-5 py-3 border-b border-border">
                        <h2 className="text-base font-bold text-foreground">Request a Quote</h2>
                        <p className="text-xs text-muted-foreground mt-0.5">Our corporate team will contact you within 24 hours.</p>
                    </div>

                    {submitted ? (
                        <div className="p-12 text-center">
                            <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-7 h-7 text-green-600" />
                            </div>
                            <h3 className="text-base font-bold text-foreground mb-1">Inquiry Submitted!</h3>
                            <p className="text-sm text-muted-foreground">Thanks, <strong>{form.name}</strong>. We'll reach out to <strong>{form.email}</strong> within 24 hours.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { label: "Full Name *", name: "name", type: "text", placeholder: "Rahul Sharma", required: true },
                                { label: "Company Name *", name: "company", type: "text", placeholder: "Acme Corp", required: true },
                                { label: "Work Email *", name: "email", type: "email", placeholder: "rahul@company.com", required: true },
                                { label: "Phone", name: "phone", type: "tel", placeholder: "+91 98765 43210" },
                                { label: "Units Required", name: "units", type: "number", placeholder: "e.g. 100" },
                            ].map(f => (
                                <div key={f.name}>
                                    <label className="block text-xs font-semibold text-foreground mb-1.5">{f.label}</label>
                                    <input
                                        type={f.type} name={f.name} value={form[f.name]}
                                        onChange={handleChange} placeholder={f.placeholder} required={f.required}
                                        className="w-full h-9 px-3 text-sm border border-border rounded bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
                                    />
                                </div>
                            ))}
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-semibold text-foreground mb-1.5">Additional Requirements</label>
                                <textarea
                                    name="message" value={form.message} onChange={handleChange} rows={3}
                                    placeholder="Custom branding, specific models, special requirements..."
                                    className="w-full px-3 py-2 text-sm border border-border rounded bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                                />
                            </div>
                            <div className="sm:col-span-2 flex justify-end">
                                <button
                                    type="submit" disabled={submitting}
                                    className="h-10 px-8 bg-primary text-primary-foreground text-sm font-bold rounded hover:bg-primary/90 transition-colors disabled:opacity-60"
                                >
                                    {submitting ? "Submitting…" : "Submit Inquiry"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
