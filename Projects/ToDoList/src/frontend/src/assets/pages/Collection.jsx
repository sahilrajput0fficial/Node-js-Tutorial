import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, SlidersHorizontal, Star, Heart, ShoppingCart, X, ChevronDown } from "lucide-react";
import { getSaleLiveData } from "../api/products.api";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

const collectionMeta = {
    "boat-personal": { title: "Personalisation", desc: "Customise your audio gear with engravings, colours, and accessories." },
    "trending": { title: "Trending Now", desc: "The most popular products right now, loved by our community." },
    "new-arrivals": { title: "New Arrivals", desc: "The latest drops — be the first to own them." },
    "earbuds": { title: "Earbuds", desc: "True wireless earbuds for every lifestyle." },
    "headphones": { title: "Headphones", desc: "Over-ear and on-ear headphones for immersive listening." },
    "speakers": { title: "Speakers", desc: "Portable and home speakers to fill every room with sound." },
};

const SORT_OPTIONS = [
    { label: "Relevance", value: "relevant" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Rating", value: "rating" },
    { label: "Newest", value: "newest" },
];

const PRICE_FILTERS = [
    { label: "Under ₹1,000", min: 0, max: 999 },
    { label: "₹1,000 – ₹3,000", min: 1000, max: 3000 },
    { label: "₹3,000 – ₹7,000", min: 3000, max: 7000 },
    { label: "Above ₹7,000", min: 7000, max: Infinity },
];

function ProductCard({ product }) {
    const { toggleWishlist, isWishlisted } = useWishlist();
    const { setCartItems } = useCart();
    const id = product._id || product.id;
    const wished = isWishlisted(id);

    const addToCart = (e) => {
        e.preventDefault();
        setCartItems((prev) => {
            const exists = prev.find((i) => i._id === id);
            if (exists) return prev.map((i) => i._id === id ? { ...i, qty: (i.qty || 1) + 1 } : i);
            return [...prev, { ...product, qty: 1, variant: 0 }];
        });
    };

    return (
        <div className="bg-white dark:bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow group">
            {/* Image */}
            <Link to={`/products/${product.slug || id}`} className="block relative">
                <div className="aspect-square bg-secondary/10 overflow-hidden">
                    <img
                        src={product.images?.[0] || product.image || "https://placehold.co/300x300?text=boAt"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                {product.discount && (
                    <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs font-bold px-1.5 py-0.5 rounded">
                        {product.discount}% OFF
                    </span>
                )}
                <button
                    onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
                    className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-white dark:bg-card border border-border flex items-center justify-center shadow-sm hover:border-primary transition-colors`}
                >
                    <Heart className={`w-4 h-4 ${wished ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                </button>
            </Link>

            {/* Info */}
            <div className="p-3">
                <p className="text-xs text-muted-foreground mb-0.5">{product.category?.name || "Audio"}</p>
                <Link to={`/products/${product.slug || id}`}>
                    <h3 className="text-sm font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors mb-1">
                        {product.name}
                    </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center gap-0.5 bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                        {(product.rating || 4.3).toFixed(1)} <Star className="w-2.5 h-2.5 fill-white ml-0.5" />
                    </div>
                    <span className="text-xs text-muted-foreground">(1.2k)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-base font-bold text-foreground">₹{(product.price || 0).toLocaleString("en-IN")}</span>
                    {product.mrp && (
                        <span className="text-xs text-muted-foreground line-through">₹{product.mrp.toLocaleString("en-IN")}</span>
                    )}
                </div>

                <button
                    onClick={addToCart}
                    className="w-full h-8 border border-primary text-primary text-xs font-semibold rounded hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center gap-1.5"
                >
                    <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                </button>
            </div>
        </div>
    );
}

export default function Collection() {
    const { slug } = useParams();
    const meta = collectionMeta[slug] || { title: slug?.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) || "Collection", desc: "Products from this collection." };

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState("relevant");
    const [priceFilter, setPriceFilter] = useState(null);
    const [filtersOpen, setFiltersOpen] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await getSaleLiveData();
                const data = res?.data?.products || res?.data || [];
                setProducts(Array.isArray(data) ? data : []);
            } catch { setProducts([]); }
            finally { setLoading(false); }
        })();
    }, [slug]);

    let results = priceFilter
        ? products.filter(p => (p.price || 0) >= priceFilter.min && (p.price || 0) <= priceFilter.max)
        : products;

    results = [...results].sort((a, b) => {
        if (sort === "price_asc") return (a.price || 0) - (b.price || 0);
        if (sort === "price_desc") return (b.price || 0) - (a.price || 0);
        return 0;
    });

    return (
        <div className="min-h-screen bg-[#f5f5f5] dark:bg-background">
            {/* Breadcrumb */}
            <div className="bg-white dark:bg-card border-b border-border">
                <div className="max-w-7xl mx-auto px-4 py-2.5">
                    <nav className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link to="/category" className="hover:text-primary transition-colors">Categories</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-foreground font-medium">{meta.title}</span>
                    </nav>
                </div>
            </div>

            {/* Header */}
            <div className="bg-white dark:bg-card border-b border-border">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <h1 className="text-xl font-bold text-foreground">{meta.title}</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">{meta.desc}</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-4 flex gap-5 items-start">
                {/* Sidebar Filters */}
                <aside className="hidden lg:block w-56 shrink-0 space-y-3">
                    <div className="bg-white dark:bg-card border border-border rounded-lg overflow-hidden">
                        <div className="px-4 py-3 border-b border-border">
                            <h3 className="text-sm font-bold text-foreground">Filters</h3>
                        </div>

                        {/* Price */}
                        <div className="px-4 py-3 border-b border-border">
                            <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Price Range</p>
                            <ul className="space-y-1.5">
                                {PRICE_FILTERS.map((f) => (
                                    <li key={f.label}>
                                        <label className="flex items-center gap-2 text-sm text-foreground/80 cursor-pointer hover:text-primary">
                                            <input
                                                type="radio"
                                                name="price"
                                                className="accent-primary"
                                                checked={priceFilter?.label === f.label}
                                                onChange={() => setPriceFilter(priceFilter?.label === f.label ? null : f)}
                                            />
                                            {f.label}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Clear */}
                        {priceFilter && (
                            <div className="px-4 py-2">
                                <button onClick={() => setPriceFilter(null)} className="text-xs text-primary hover:underline flex items-center gap-1">
                                    <X className="w-3 h-3" /> Clear filters
                                </button>
                            </div>
                        )}
                    </div>
                </aside>

                {/* Main */}
                <div className="flex-1 min-w-0 space-y-3">
                    {/* Sort + Count Bar */}
                    <div className="bg-white dark:bg-card border border-border rounded-lg px-4 py-2.5 flex items-center justify-between gap-4">
                        <p className="text-sm text-muted-foreground">
                            {loading ? "Loading…" : <><span className="font-medium text-foreground">{results.length}</span> products</>}
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground hidden sm:inline">Sort by:</span>
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="text-sm border border-border rounded px-2 py-1 bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Grid */}
                    {loading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="bg-white dark:bg-card border border-border rounded-lg animate-pulse aspect-[3/4]" />
                            ))}
                        </div>
                    ) : results.length === 0 ? (
                        <div className="bg-white dark:bg-card border border-border rounded-lg p-12 text-center">
                            <div className="w-16 h-16 rounded-full bg-secondary/40 flex items-center justify-center mx-auto mb-4">
                                <SlidersHorizontal className="w-8 h-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-base font-semibold text-foreground mb-1">No products found</h3>
                            <p className="text-sm text-muted-foreground mb-4">Try adjusting your filters or browse other categories.</p>
                            <button onClick={() => setPriceFilter(null)} className="text-sm text-primary hover:underline">Clear filters</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                            {results.map((p, i) => <ProductCard key={p._id || p.id || i} product={p} />)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
