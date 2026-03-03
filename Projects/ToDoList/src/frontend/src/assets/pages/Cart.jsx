import { useState } from "react";
import {
    ArrowLeft,
    ShoppingBag,
    Trash2,
    Tag,
    Shield,
    ChevronRight,
    Plus,
    Minus,
    CheckCircle2,
    PackageOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const OFFERS = [
    "Free delivery on orders above ₹999",
    "Use code BOAT200 to get ₹200 off",
    "No cost EMI available on cards above ₹3,000",
];

const Cart = () => {
    const { cartItems, setCartItems } = useCart();
    const navigate = useNavigate();
    const [couponCode, setCouponCode] = useState("");
    const [couponApplied, setCouponApplied] = useState(false);
    const [couponError, setCouponError] = useState("");

    /* ── helpers ── */
    const getItemPrice = (item) =>
        item.variants?.[item.variant]?.price ?? item.price ?? 0;

    const getItemColor = (item) =>
        item.variants?.[item.variant]?.color?.name ?? item.variant ?? "";

    const getItemImage = (item) =>
        item.images?.[0] ?? item.image ?? "https://placehold.co/200x200?text=boAt";

    const updateQty = (id, variant, delta) => {
        const updated = cartItems
            .map((item) =>
                item._id === id && item.variant === variant
                    ? { ...item, qty: Math.max(1, (item.qty || 1) + delta) }
                    : item
            );
        setCartItems(updated);
        localStorage.setItem("cart-items", JSON.stringify(updated));
    };

    const removeItem = (id, variant) => {
        const updated = cartItems.filter(
            (item) => !(item._id === id && item.variant === variant)
        );
        setCartItems(updated);
        localStorage.setItem("cart-items", JSON.stringify(updated));
    };

    const handleApplyCoupon = () => {
        setCouponError("");
        if (couponCode.trim().toUpperCase() === "BOAT200") {
            setCouponApplied(true);
            setCouponError("");
        } else {
            setCouponError("Invalid coupon code. Try BOAT200.");
        }
    };

    const handleRemoveCoupon = () => {
        setCouponApplied(false);
        setCouponCode("");
        setCouponError("");
    };

    /* ── price math ── */
    const subtotal = cartItems.reduce(
        (acc, item) => acc + getItemPrice(item) * (item.qty || 1),
        0
    );
    const totalQty = cartItems.reduce((acc, item) => acc + (item.qty || 1), 0);
    const shipping = subtotal > 999 ? 0 : 99;
    const discount = couponApplied ? 200 : 0;
    const total = subtotal + shipping - discount;

    /* ── empty state ── */
    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-[#f5f5f5] dark:bg-background flex flex-col">
                {/* Header */}
                <header className="bg-white dark:bg-card border-b border-border sticky top-0 z-50">
                    <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-3">
                        <Link
                            to="/"
                            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Continue Shopping
                        </Link>
                        <span className="text-border mx-1">|</span>
                        <span className="text-base font-semibold text-foreground flex items-center gap-2">
                            <ShoppingBag className="h-4 w-4" />
                            My Cart
                        </span>
                    </div>
                </header>

                {/* Empty */}
                <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-4">
                    <div className="w-20 h-20 rounded-full bg-secondary/40 flex items-center justify-center">
                        <PackageOpen className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-foreground">
                            Your cart is empty
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Looks like you haven't added anything yet.
                        </p>
                    </div>
                    <Button
                        onClick={() => navigate("/")}
                        className="mt-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-10 rounded-md"
                    >
                        Shop Now
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f5f5f5] dark:bg-background">

            {/* ── Top Bar ── */}
            <header className="bg-white dark:bg-card border-b border-border sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-3">
                    <Link
                        to="/"
                        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Continue Shopping
                    </Link>
                    <span className="text-border mx-1">|</span>
                    <span className="text-base font-semibold text-foreground flex items-center gap-2">
                        <ShoppingBag className="h-4 w-4" />
                        My Cart
                        <span className="text-sm font-normal text-muted-foreground">
                            ({totalQty} item{totalQty !== 1 ? "s" : ""})
                        </span>
                    </span>
                </div>
            </header>

            {/* ── Progress Steps ── */}
            <div className="bg-white dark:bg-card border-b border-border">
                <div className="max-w-6xl mx-auto px-4">
                    <ol className="flex text-xs font-medium text-muted-foreground h-10 items-center gap-1">
                        {["Cart", "Address", "Payment", "Confirmation"].map((step, i) => (
                            <li key={step} className="flex items-center gap-1">
                                {i > 0 && <ChevronRight className="h-3 w-3" />}
                                <span
                                    className={
                                        i === 0
                                            ? "text-primary font-semibold"
                                            : ""
                                    }
                                >
                                    {step}
                                </span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>

            {/* ── Offers Ticker ── */}
            <div className="bg-primary/5 border-b border-primary/10 overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 h-8 flex items-center gap-6 overflow-x-auto no-scrollbar">
                    {OFFERS.map((o, i) => (
                        <p key={i} className="text-xs text-primary font-medium whitespace-nowrap shrink-0">
                            🎁 {o}
                        </p>
                    ))}
                </div>
            </div>

            {/* ── Main ── */}
            <main className="max-w-6xl mx-auto px-4 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                    {/* ── LEFT: Cart Items ── */}
                    <div className="lg:col-span-2 space-y-3">

                        {/* Item count banner */}
                        <div className="bg-white dark:bg-card border border-border rounded-lg px-5 py-3 flex items-center justify-between">
                            <p className="text-sm font-semibold text-foreground">
                                {totalQty} item{totalQty !== 1 ? "s" : ""} in your cart
                            </p>
                            <button
                                onClick={() => {
                                    setCartItems([]);
                                    localStorage.removeItem("cart-items");
                                }}
                                className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                                Clear All
                            </button>
                        </div>

                        {/* Items */}
                        {cartItems.map((item) => {
                            const price = getItemPrice(item);
                            const color = getItemColor(item);
                            const image = getItemImage(item);
                            const qty = item.qty || 1;

                            return (
                                <div
                                    key={`${item._id}-${item.variant}`}
                                    className="bg-white dark:bg-card border border-border rounded-lg overflow-hidden"
                                >
                                    <div className="flex gap-4 p-4">
                                        {/* Image */}
                                        <div className="w-24 h-24 rounded-md border border-border bg-secondary/20 overflow-hidden shrink-0">
                                            <img
                                                src={image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">
                                                {item.name}
                                            </p>
                                            {color && (
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    Colour:{" "}
                                                    <span className="font-medium text-foreground">
                                                        {color}
                                                    </span>
                                                </p>
                                            )}

                                            <div className="flex items-center gap-2 mt-3">
                                                <span className="text-base font-bold text-foreground">
                                                    ₹{price * qty}
                                                </span>
                                                {qty > 1 && (
                                                    <span className="text-xs text-muted-foreground">
                                                        (₹{price} × {qty})
                                                    </span>
                                                )}
                                            </div>

                                            {/* Qty control + Remove */}
                                            <div className="flex items-center gap-4 mt-3">
                                                <div className="flex items-center border border-border rounded-md overflow-hidden">
                                                    <button
                                                        onClick={() => updateQty(item._id, item.variant, -1)}
                                                        className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-secondary/40 transition-colors disabled:opacity-40"
                                                        disabled={qty <= 1}
                                                    >
                                                        <Minus className="h-3.5 w-3.5" />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-semibold text-foreground select-none">
                                                        {qty}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQty(item._id, item.variant, 1)}
                                                        className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:bg-secondary/40 transition-colors"
                                                    >
                                                        <Plus className="h-3.5 w-3.5" />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeItem(item._id, item.variant)}
                                                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
                                                >
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Delivery info */}
                                    <div className="border-t border-border/50 bg-secondary/10 px-4 py-2 text-xs text-muted-foreground flex items-center gap-1.5">
                                        {subtotal > 999 ? (
                                            <span className="text-green-600 font-medium flex items-center gap-1">
                                                <CheckCircle2 className="h-3 w-3" />
                                                Free delivery on this order
                                            </span>
                                        ) : (
                                            <span>
                                                Add ₹{999 - subtotal} more for free delivery
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* ── RIGHT: Summary ── */}
                    <div className="space-y-4 lg:sticky lg:top-20">

                        {/* Coupon */}
                        <div className="bg-white dark:bg-card border border-border rounded-lg p-4">
                            <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                                <Tag className="h-4 w-4 text-primary" />
                                Apply Coupon
                            </p>
                            {couponApplied ? (
                                <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md px-3 py-2">
                                    <p className="text-xs text-green-700 dark:text-green-400 font-medium flex items-center gap-1.5">
                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                        BOAT200 — ₹200 off applied!
                                    </p>
                                    <button
                                        onClick={handleRemoveCoupon}
                                        className="text-xs text-muted-foreground hover:text-destructive ml-2 transition-colors"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Enter coupon code"
                                            value={couponCode}
                                            onChange={(e) =>
                                                setCouponCode(e.target.value.toUpperCase())
                                            }
                                            className="h-9 text-sm rounded-md border-border bg-background uppercase"
                                        />
                                        <Button
                                            onClick={handleApplyCoupon}
                                            disabled={!couponCode.trim()}
                                            variant="outline"
                                            className="h-9 px-4 text-sm font-semibold border-primary text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
                                        >
                                            Apply
                                        </Button>
                                    </div>
                                    {couponError && (
                                        <p className="text-xs text-destructive mt-1.5">
                                            {couponError}
                                        </p>
                                    )}
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Try:{" "}
                                        <span className="font-mono font-medium">BOAT200</span>
                                    </p>
                                </>
                            )}
                        </div>

                        {/* Price Breakdown */}
                        <div className="bg-white dark:bg-card border border-border rounded-lg p-4">
                            <p className="text-sm font-semibold text-foreground mb-4">
                                Price Details
                            </p>

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Price ({totalQty} item{totalQty !== 1 ? "s" : ""})
                                    </span>
                                    <span className="text-foreground">₹{subtotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">
                                        Delivery Charges
                                    </span>
                                    {shipping === 0 ? (
                                        <span className="text-green-600 font-medium">FREE</span>
                                    ) : (
                                        <span className="text-foreground">₹{shipping}</span>
                                    )}
                                </div>
                                {couponApplied && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Coupon Discount</span>
                                        <span className="font-medium">− ₹{discount}</span>
                                    </div>
                                )}

                                <div className="border-t border-border pt-3 flex justify-between text-base font-bold">
                                    <span className="text-foreground">Total Amount</span>
                                    <span className="text-foreground">₹{total}</span>
                                </div>
                            </div>

                            {subtotal > 999 && (
                                <p className="text-xs text-green-600 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded px-2.5 py-1.5 mt-3">
                                    🎉 You're saving ₹99 on delivery charges!
                                </p>
                            )}
                            {couponApplied && (
                                <p className="text-xs text-green-600 mt-2">
                                    You save a total of{" "}
                                    <span className="font-semibold">
                                        ₹{discount + (shipping === 0 ? 99 : 0)}
                                    </span>{" "}
                                    on this order.
                                </p>
                            )}
                        </div>

                        {/* CTA */}
                        <Button
                            onClick={() => navigate("/checkout")}
                            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base rounded-lg transition-colors"
                        >
                            Proceed to Checkout
                        </Button>

                        {/* Trust strip */}
                        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                            <Shield className="h-3.5 w-3.5 text-green-600" />
                            Safe and Secure Payments. 100% Authentic Products.
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Cart;
