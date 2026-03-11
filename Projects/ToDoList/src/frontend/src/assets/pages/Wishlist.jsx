import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingCart, Trash2, ArrowLeft, ShoppingBag, ChevronRight } from "lucide-react";

export default function Wishlist() {
    const { items, removeFromWishlist, clearWishlist } = useWishlist();
    const { setCartItems } = useCart();

    const moveToCart = (product) => {
        const id = product._id || product.id;
        setCartItems((prev) => {
            const exists = prev.find((i) => i._id === id);
            if (exists) return prev.map((i) => i._id === id ? { ...i, qty: (i.qty || 1) + 1 } : i);
            return [...prev, { ...product, qty: 1, variant: 0 }];
        });
        removeFromWishlist(id);
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-[#f5f5f5] dark:bg-background">
                <div className="bg-white dark:bg-card border-b border-border">
                    <div className="max-w-6xl mx-auto px-4 py-2.5">
                        <nav className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Link to="/" className="hover:text-primary">Home</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-foreground font-medium">Wishlist</span>
                        </nav>
                    </div>
                </div>
                <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full bg-secondary/40 flex items-center justify-center mb-5">
                        <Heart className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground mb-2">Your Wishlist is Empty</h2>
                    <p className="text-sm text-muted-foreground max-w-xs mb-6">
                        Save items you like by tapping the ♡ icon. They'll appear here.
                    </p>
                    <Link
                        to="/category"
                        className="h-10 px-6 bg-primary text-primary-foreground text-sm font-semibold rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors"
                    >
                        <ShoppingBag className="w-4 h-4" /> Explore Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f5f5f5] dark:bg-background">
            {/* Breadcrumb */}
            <div className="bg-white dark:bg-card border-b border-border">
                <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between">
                    <nav className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Link to="/" className="hover:text-primary">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-foreground font-medium">Wishlist</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
                        <Heart className="w-5 h-5 text-primary fill-primary" />
                        My Wishlist
                        <span className="text-sm font-normal text-muted-foreground">({items.length} {items.length === 1 ? "item" : "items"})</span>
                    </h1>
                    <button
                        onClick={clearWishlist}
                        className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors"
                    >
                        <Trash2 className="w-3.5 h-3.5" /> Clear All
                    </button>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {items.map((product) => {
                        const id = product._id || product.id;
                        return (
                            <div key={id} className="bg-white dark:bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow group">
                                {/* Image */}
                                <Link to={`/products/${product.slug || id}`} className="block relative">
                                    <div className="aspect-square bg-secondary/10 overflow-hidden">
                                        <img
                                            src={product.images?.[0] || product.image || "https://placehold.co/300x300?text=boAt"}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <button
                                        onClick={(e) => { e.preventDefault(); removeFromWishlist(id); }}
                                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white dark:bg-card border border-border flex items-center justify-center shadow-sm hover:border-destructive hover:text-destructive transition-colors"
                                        title="Remove from wishlist"
                                    >
                                        <Heart className="w-4 h-4 fill-primary text-primary" />
                                    </button>
                                </Link>

                                {/* Info */}
                                <div className="p-3">
                                    <p className="text-xs text-muted-foreground mb-0.5">{product.category?.name || "Audio"}</p>
                                    <Link to={`/products/${product.slug || id}`}>
                                        <h3 className="text-sm font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors mb-2">
                                            {product.name || "Product"}
                                        </h3>
                                    </Link>
                                    <p className="text-base font-bold text-foreground mb-3">
                                        ₹{(product.price || 0).toLocaleString("en-IN")}
                                    </p>

                                    <div className="flex flex-col gap-1.5">
                                        <button
                                            onClick={() => moveToCart(product)}
                                            className="w-full h-8 bg-primary text-primary-foreground text-xs font-semibold rounded flex items-center justify-center gap-1.5 hover:bg-primary/90 transition-colors"
                                        >
                                            <ShoppingCart className="w-3.5 h-3.5" /> Move to Cart
                                        </button>
                                        <button
                                            onClick={() => removeFromWishlist(id)}
                                            className="w-full h-8 border border-border text-muted-foreground text-xs font-medium rounded flex items-center justify-center gap-1.5 hover:border-destructive hover:text-destructive transition-colors"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" /> Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Back */}
                <div className="mt-6">
                    <Link to="/category" className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                        <ArrowLeft className="w-4 h-4" /> Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}
