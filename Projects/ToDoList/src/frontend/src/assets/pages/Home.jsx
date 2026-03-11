import React from 'react'
import ShopByCategory from '../components/layouts/ShopByCategory'
import SaleIsLive from '../components/layouts/SaleIsLive'
import Hero from '../components/layouts/Hero'
import { Link } from 'react-router-dom'
import { BadgeCheck, Truck, Headphones, Sparkles, Star, Building2, Gift } from 'lucide-react'

const FEATURE_STRIP = [
  { icon: BadgeCheck, label: "Genuine Products", sub: "100% authentic" },
  { icon: Truck, label: "Free Delivery", sub: "On orders ₹999+" },
  { icon: Headphones, label: "24/7 Support", sub: "Always available" },
  { icon: Sparkles, label: "Premium Packaging", sub: "Eco-friendly boxes" },
];

const TESTIMONIALS = [
  { name: "Arjun S.", rating: 5, text: "Sound quality is insane. Best purchase I've made this year!", role: "Music Producer" },
  { name: "Priya M.", rating: 5, text: "Used the gift bundle for my bestie's birthday — she loved it! 🎉", role: "Student" },
  { name: "Rohan K.", rating: 5, text: "ANC is a game changer for work from home. Super comfy.", role: "Remote Worker" },
  { name: "Sneha R.", rating: 5, text: "Sweat-proof, fast charging, incredible bass. My gym friends are jealous!", role: "Fitness Enthusiast" },
];

const Home = () => {
  return (
    <>
      <main className="w-full">
        <Hero />

        {/* Feature Strip */}
        <div className="bg-white dark:bg-card border-y border-border">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {FEATURE_STRIP.map((f, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-4">
                <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                  <f.icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{f.label}</p>
                  <p className="text-xs text-muted-foreground">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ShopByCategory />
        <SaleIsLive />

        {/* Promotion Banners */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-16 mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Corporate */}
          <Link to="/corporate" className="group relative overflow-hidden rounded-lg bg-[#0d1b2a] text-white flex items-center gap-6 px-6 py-8 hover:opacity-95 transition-opacity">
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2">Corporate Solutions</p>
              <h2 className="text-xl font-black mb-2">Equip Your Entire Team</h2>
              <p className="text-white/65 text-xs leading-relaxed mb-4">Bulk pricing, custom branding, and dedicated account management for your business.</p>
              <span className="inline-flex items-center gap-1.5 h-8 px-4 bg-blue-500 text-white text-xs font-bold rounded hover:bg-blue-600 transition-colors">
                <Building2 className="w-3.5 h-3.5" /> Get a Quote
              </span>
            </div>
            <div className="hidden md:flex items-center justify-center text-5xl opacity-40">🏢</div>
          </Link>

          {/* Gifting */}
          <Link to="/gift" className="group relative overflow-hidden rounded-lg bg-[#1a0a0a] text-white flex items-center gap-6 px-6 py-8 hover:opacity-95 transition-opacity">
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2">Gifting Store</p>
              <h2 className="text-xl font-black mb-2">Gift the Sound of Joy 🎁</h2>
              <p className="text-white/65 text-xs leading-relaxed mb-4">Curated bundles for birthdays, anniversaries, and every occasion. Beautifully packaged.</p>
              <span className="inline-flex items-center gap-1.5 h-8 px-4 bg-rose-500 text-white text-xs font-bold rounded hover:bg-rose-600 transition-colors">
                <Gift className="w-3.5 h-3.5" /> Shop Gifts
              </span>
            </div>
            <div className="hidden md:flex items-center justify-center text-5xl opacity-40">🎀</div>
          </Link>
        </div>

        {/* Testimonials */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-16 mt-8 mb-8">
          <div className="bg-white dark:bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b border-border">
              <h2 className="text-base font-bold text-foreground">What Our Customers Say</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border">
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="p-5">
                  <div className="flex items-center gap-0.5 mb-2">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed mb-3">"{t.text}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-16 mb-12">
          <div className="bg-[#1a1a2e] rounded-lg px-6 py-8 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl font-black text-white mb-1">Stay in the Loop 🎧</h2>
              <p className="text-white/60 text-sm">Early access to launches, exclusive deals, and audio tips.</p>
            </div>
            <form className="flex gap-2 w-full md:w-auto" onSubmit={(e) => { e.preventDefault(); }}>
              <input
                type="email" required placeholder="Enter your email"
                className="flex-1 md:w-64 h-10 px-4 text-sm border border-white/20 rounded bg-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button type="submit" className="h-10 px-5 bg-primary text-primary-foreground text-sm font-bold rounded hover:bg-primary/90 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home