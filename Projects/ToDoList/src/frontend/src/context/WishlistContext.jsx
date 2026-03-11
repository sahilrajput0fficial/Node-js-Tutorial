import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const WishlistContext = createContext(null);

const STORAGE_KEY = "wishlist_items";

export function WishlistProvider({ children }) {
    const [items, setItems] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const isWishlisted = useCallback(
        (id) => items.some((item) => (item._id || item.id) === id),
        [items]
    );

    const addToWishlist = useCallback((product) => {
        setItems((prev) => {
            const id = product._id || product.id;
            if (prev.some((p) => (p._id || p.id) === id)) return prev;
            return [...prev, product];
        });
    }, []);

    const removeFromWishlist = useCallback((id) => {
        setItems((prev) => prev.filter((p) => (p._id || p.id) !== id));
    }, []);

    const toggleWishlist = useCallback(
        (product) => {
            const id = product._id || product.id;
            if (isWishlisted(id)) {
                removeFromWishlist(id);
            } else {
                addToWishlist(product);
            }
        },
        [isWishlisted, addToWishlist, removeFromWishlist]
    );

    const clearWishlist = useCallback(() => setItems([]), []);

    return (
        <WishlistContext.Provider
            value={{ items, isWishlisted, addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist, count: items.length }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export const useWishlist = () => {
    const ctx = useContext(WishlistContext);
    if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
    return ctx;
};
