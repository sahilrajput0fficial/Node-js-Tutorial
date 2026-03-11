import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
    CheckCircle2,
    Package,
    ShoppingBag,
    ArrowRight,
    Loader2,
    AlertCircle,
    Truck,
    Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getOrderById } from "../api/order.api";
import { useCart } from "@/context/CartContext";

export default function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get("order_id");

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { setCartItems } = useCart();

    useEffect(() => {
        // Clear cart on payment success
        setCartItems([]);
        localStorage.removeItem("cart-items");

        const fetchOrder = async () => {
            if (!orderId) {
                setError("No order ID found");
                setLoading(false);
                return;
            }

            try {
                const response = await getOrderById(orderId);
                if (response.success) {
                    setOrder(response.order);
                } else {
                    setError("Could not find order details");
                }
            } catch (err) {
                console.error("Failed to fetch order:", err);
                // Still show success even if order fetch fails
                setOrder(null);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f5f5f5] dark:bg-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Loader2 className="h-10 w-10 text-primary animate-spin mx-auto" />
                    <p className="text-muted-foreground text-sm">Confirming your payment...</p>
                </div>
            </div>
        );
    }

    if (error && !orderId) {
        return (
            <div className="min-h-screen bg-[#f5f5f5] dark:bg-background flex items-center justify-center px-4">
                <div className="bg-card border border-border rounded-xl p-8 max-w-md w-full text-center space-y-5">
                    <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto">
                        <AlertCircle className="h-8 w-8 text-red-600" />
                    </div>
                    <h1 className="text-xl font-bold text-foreground">Something went wrong</h1>
                    <p className="text-muted-foreground text-sm">{error}</p>
                    <Button asChild className="w-full h-11 rounded-lg font-semibold">
                        <Link to="/">Go Home</Link>
                    </Button>
                </div>
            </div>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return "Just now";
        return new Date(dateString).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5] dark:bg-background">
            {/* Top Bar */}
            <header className="bg-white dark:bg-card border-b border-border">
                <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
                    <span className="text-base font-semibold text-foreground">Order Confirmation</span>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Shield className="h-3.5 w-3.5 text-green-600" />
                        <span className="text-green-700 dark:text-green-500 font-medium">Payment Verified</span>
                    </div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
                {/* Success Hero */}
                <div className="bg-white dark:bg-card border border-border rounded-xl p-8 text-center space-y-5">
                    {/* Animated checkmark */}
                    <div className="relative mx-auto w-20 h-20">
                        <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center animate-in zoom-in duration-500">
                            <CheckCircle2 className="h-10 w-10 text-green-600" />
                        </div>
                        {/* Pulse ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-green-400/40 animate-ping" />
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-foreground">Payment Successful!</h1>
                        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                            Your order has been placed successfully. You'll receive a confirmation shortly.
                        </p>
                    </div>

                    {orderId && (
                        <div className="inline-flex items-center gap-2 bg-secondary/30 border border-border rounded-lg px-4 py-2.5">
                            <Package className="h-4 w-4 text-primary" />
                            <span className="text-sm text-muted-foreground">Order ID:</span>
                            <span className="text-sm font-mono font-semibold text-foreground">
                                #{orderId.slice(-8).toUpperCase()}
                            </span>
                        </div>
                    )}
                </div>

                {/* Order Details */}
                {order && (
                    <div className="bg-white dark:bg-card border border-border rounded-xl overflow-hidden">
                        <div className="px-5 py-4 border-b border-border bg-secondary/20">
                            <h2 className="font-semibold text-sm text-foreground flex items-center gap-2">
                                <ShoppingBag className="h-4 w-4 text-primary" />
                                Order Details
                            </h2>
                        </div>

                        {/* Items */}
                        <div className="divide-y divide-border">
                            {(order.cartItems || []).map((item, i) => (
                                <div key={i} className="flex gap-3 px-5 py-3.5">
                                    <div className="w-14 h-14 rounded border border-border bg-secondary/20 overflow-hidden shrink-0">
                                        <img
                                            src={item.image || "https://placehold.co/100"}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-foreground line-clamp-1">{item.name}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            Qty: {item.quantity || 1}
                                        </p>
                                    </div>
                                    <p className="text-sm font-semibold text-foreground shrink-0">
                                        ₹{(item.price * (item.quantity || 1)).toLocaleString("en-IN")}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Price Breakdown */}
                        <div className="border-t border-border px-5 py-4 space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Subtotal</span>
                                <span className="text-foreground">₹{(order.subtotal || 0).toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Shipping</span>
                                {order.shipping === 0 ? (
                                    <span className="text-green-600 font-medium">FREE</span>
                                ) : (
                                    <span className="text-foreground">₹{order.shipping}</span>
                                )}
                            </div>
                            {order.discount > 0 && (
                                <div className="flex justify-between text-green-600">
                                    <span>Discount</span>
                                    <span className="font-medium">− ₹{order.discount}</span>
                                </div>
                            )}
                            <div className="border-t border-border pt-2 mt-1 flex justify-between font-bold text-base">
                                <span className="text-foreground">Total Paid</span>
                                <span className="text-primary">₹{(order.total || 0).toLocaleString("en-IN")}</span>
                            </div>
                        </div>

                        {/* Delivery Info */}
                        <div className="border-t border-border px-5 py-4 bg-secondary/10">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0 mt-0.5">
                                    <Truck className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-foreground">Delivering to</p>
                                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                        {order.firstName} {order.lastName}
                                        {order.address && `, ${order.address}`}
                                        {order.locality && `, ${order.locality}`}
                                        {order.city && `, ${order.city}`}
                                        {order.state && ` - ${order.state}`}
                                        {order.pincode && ` ${order.pincode}`}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Ordered on {formatDate(order.createdAt)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button
                        asChild
                        className="h-12 text-base font-bold rounded-lg shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
                    >
                        <Link to="/orders">
                            <Package className="h-4 w-4 mr-2" />
                            View My Orders
                        </Link>
                    </Button>
                    <Button
                        asChild
                        variant="outline"
                        className="h-12 text-base font-semibold rounded-lg border-2 hover:bg-secondary transition-all"
                    >
                        <Link to="/">
                            Continue Shopping
                            <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                    </Button>
                </div>

                {/* Trust Bar */}
                <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1.5 pb-4">
                    <Shield className="h-3.5 w-3.5 text-green-600" />
                    Safe and Secure Payments. Easy returns. 100% Authentic products.
                </p>
            </main>
        </div>
    );
}
