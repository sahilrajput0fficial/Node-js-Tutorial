import api from "./axios";

// These will call the backend once wishlist endpoints are ready.
// For now, localStorage is used via WishlistContext as the primary store.

export const getWishlist = async () => {
    try {
        const { data } = await api.get("/wishlist");
        return data;
    } catch {
        return { items: [] };
    }
};

export const addToWishlistAPI = async (productId) => {
    const { data } = await api.post("/wishlist/add", { productId });
    return data;
};

export const removeFromWishlistAPI = async (productId) => {
    const { data } = await api.delete(`/wishlist/${productId}`);
    return data;
};

export const clearWishlistAPI = async () => {
    const { data } = await api.delete("/wishlist");
    return data;
};
