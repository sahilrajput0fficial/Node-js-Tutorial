import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search as SearchIcon, X, Star, Heart, ShoppingCart, SlidersHorizontal, ChevronRight } from "lucide-react";
import { getSaleLiveData } from "../api/products.api";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

const SORT_OPTIONS = [
    { label: "Relevance", value: "relevant" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Rating", value: "rating" },
];

const PRICE_FILTERS = [
    { label: "Under ₹1,000", min: 0, max: 999 },
    { label: "₹1,000 – ₹3,000", min: 1000, max: 3000 },
    { label: "₹3,000 – ₹7,000", min: 3000, max: 7000 },
    { label: "Above ₹7,000", min: 7000, max: Infinity },
];

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const [inputVal, setInputVal] = useState(query);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sort, setSort] = useState("relevant");
    const [priceFilter, setPriceFilter] = useState(null);

    const { toggleWishlist, isWishlisted } = useWishlist();
    const { setCartItems } = useCart();

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await getSaleLiveData();
                setAllProducts(Array.isArray(res?.data?.products || res?.data) ? (res?.data?.products || res?.data) : []);
            } catch { setAllProducts([]); }
            finally { setLoading(false); }
        })();
    }, []);

    // Sync input with URL param
    useEffect(() => { setInputVal(query); }, [query]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams(inputVal.trim() ? { q: inputVal.trim() } : {});
    };

    const addToCart = (product) => {
        const id = product._id || product.id;
        setCartItems(prev => {
            const exists = prev.find(i => i._id === id);
            if (exists) return prev.map(i => i._id === id ? { ...i, qty: (i.qty || 1) + 1 } : i);
            return [...prev, { ...product, qty: 1, variant: 0 }];
        });
    };

    let results = allProducts.filter(p => {
        if (!query) return true;
        const q = query.toLowerCase();
        return p.name?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q) || p.category?.name?.toLowerCase().includes(q);
    });

    if (priceFilter) results = results.filter(p => (p.price || 0) >= priceFilter.min && (p.price || 0) <= priceFilter.max);

    results = [...results].sort((a, b) => {
        if (sort === "price_asc") return (a.price || 0) - (b.price || 0);
        if (sort === "price_desc") return (b.price || 0) - (a.price || 0);
        return 0;
    });

    return (
        <div className="min-h-screen bg-[#f5f5f5] dark:bg-background">
            {/* Search Bar */}
            <div className="bg-white dark:bg-card border-b border-border sticky top-[80px] z-30">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <form onSubmit={handleSearch} className="flex gap-2">
                        <div className="relative flex-1">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                value={inputVal}
                                onChange={e => setInputVal(e.target.value)}
                                placeholder="Search for products, brands and more"
                                className="w-full pl-9 pr-8 py-2.5 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
                                autoFocus
                            />
                            {inputVal && (
                                <button type="button" onClick={() => { setInputVal(""); setSearchParams({}); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        <button type="submit" className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-md hover:bg-primary/90 transition-colors">
                            Search
                        </button>
                    </form>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="bg-white dark:bg-card border-b border-border">
                <div className="max-w-7xl mx-auto px-4 py-2.5">
                    <nav className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Link to="/" className="hover:text-primary">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        {query ? (
                            <span className="text-foreground font-medium">Results for "{query}"</span>
                        ) : (
                            <span className="text-foreground font-medium">Search</span>
                        )}
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-4 flex gap-5 items-start">
                {/* Sidebar */}
                <aside className="hidden lg:block w-56 shrink-0">
                    <div className="bg-white dark:bg-card border border-border rounded-lg overflow-hidden">
                        <div className="px-4 py-3 border-b border-border flex items-center gap-2">
                            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
                            <h3 className="text-sm font-bold text-foreground">Filters</h3>
                        </div>
                        <div className="px-4 py-3">
                            <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Price</p>
                            <ul className="space-y-1.5">
                                {PRICE_FILTERS.map(f => (
                                    <li key={f.label}>
                                        <label className="flex items-center gap-2 text-sm text-foreground/80 cursor-pointer hover:text-primary">
                                            <input type="radio" name="price" className="accent-primary" checked={priceFilter?.label === f.label} onChange={() => setPriceFilter(priceFilter?.label === f.label ? null : f)} />
                                            {f.label}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            {priceFilter && (
                                <button onClick={() => setPriceFilter(null)} className="mt-3 text-xs text-primary hover:underline flex items-center gap-1">
                                    <X className="w-3 h-3" /> Clear
                                </button>
                            )}
                        </div>
                    </div>
                </aside>

                {/* Main */}
                <div className="flex-1 min-w-0 space-y-3">
                    {/* Controls */}
                    <div className="bg-white dark:bg-card border border-border rounded-lg px-4 py-2.5 flex items-center justify-between gap-3 flex-wrap">
                        <p className="text-sm text-muted-foreground">
                            {loading ? "Searching…" : (
                                <>
                                    {query && <span className="font-medium text-foreground">"{query}"</span>}
                                    {" — "}<span className="font-medium text-foreground">{results.length}</span> result{results.length !== 1 ? "s" : ""}
                                </>
                            )}
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Sort:</span>
                            <select value={sort} onChange={e => setSort(e.target.value)} className="text-sm border border-border rounded px-2 py-1 bg-background focus:outline-none focus:ring-1 focus:ring-primary">
                                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Results */}
                    {loading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="bg-white dark:bg-card border border-border rounded-lg animate-pulse aspect-[3/4]" />
                            ))}
                        </div>
                    ) : results.length === 0 ? (
                        <div className="bg-white dark:bg-card border border-border rounded-lg p-12 text-center">
                            <SearchIcon className="w-10 h-10 text-muted-foreground/30 mx-auto mb-4" />
                            <h3 className="text-base font-bold text-foreground mb-1">No results found</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                {query ? `We couldn't find anything for "${query}". Try a different keyword.` : "Search for products, brands, or categories."}
                            </p>
                            <Link to="/category" className="text-sm text-primary hover:underline">Browse all categories</Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                            {results.map((product, i) => {
                                const id = product._id || product.id;
                                const wished = isWishlisted(id);
                                return (
                                    <div key={id || i} className="bg-white dark:bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow group">
                                        <Link to={`/products/${product.slug || id}`} className="block relative">
                                            <div className="aspect-square bg-secondary/10 overflow-hidden">
                                                <img src={product.images?.[0] || product.image || "https://placehold.co/300x300?text=boAt"} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                            </div>
                                            <button
                                                onClick={e => { e.preventDefault(); toggleWishlist(product); }}
                                                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white dark:bg-card border border-border flex items-center justify-center shadow-sm hover:border-primary transition-colors"
                                            >
                                                <Heart className={`w-4 h-4 ${wished ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                                            </button>
                                        </Link>
                                        <div className="p-3">
                                            <p className="text-xs text-muted-foreground mb-0.5">{product.category?.name || "Audio"}</p>
                                            <Link to={`/products/${product.slug || id}`}>
                                                <h3 className="text-sm font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors mb-1">
                                                    {product.name}
                                                </h3>
                                            </Link>
                                            <div className="flex items-center gap-1 mb-2">
                                                <span className="flex items-center gap-0.5 bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                                                    {(product.rating || 4.3).toFixed(1)} <Star className="w-2.5 h-2.5 fill-white ml-0.5" />
                                                </span>
                                            </div>
                                            <div className="flex items-baseline gap-2 mb-3">
                                                <span className="text-base font-bold text-foreground">₹{(product.price || 0).toLocaleString("en-IN")}</span>
                                                {product.mrp && <span className="text-xs text-muted-foreground line-through">₹{product.mrp.toLocaleString("en-IN")}</span>}
                                            </div>
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="w-full h-8 border border-primary text-primary text-xs font-semibold rounded hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center gap-1.5"
                                            >
                                                <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
