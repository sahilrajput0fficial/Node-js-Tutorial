import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
    ChevronRight, ArrowLeft, Package, Truck, Clock, CheckCircle2,
    ShoppingBag, MapPin, AlertCircle, RotateCcw, CreditCard,
    Smartphone, BadgeIndianRupee, XCircle, Loader2, Box
} from "lucide-react";
import { getOrderById, cancelOrder } from "../api/order.api";

const STEPS = [
    { key: "pending", label: "Placed", icon: ShoppingBag, desc: "We received your order." },
    { key: "processing", label: "Processing", icon: Clock, desc: "Verifying and packing." },
    { key: "dispatched", label: "Dispatched", icon: Box, desc: "Left our warehouse." },
    { key: "shipped", label: "Out for Delivery", icon: Truck, desc: "With delivery partner." },
    { key: "delivered", label: "Delivered", icon: CheckCircle2, desc: "Package delivered." },
];

const STATUS_IDX = { pending: 0, processing: 1, dispatched: 2, shipped: 3, delivered: 4 };

const fmt = (d) => d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "Recently";
const fmtTime = (d) => d ? new Date(d).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "";

const getPaymentMethodInfo = (method) => {
    switch (method) {
        case 'card': return { label: 'Credit / Debit Card', icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' };
        case 'upi': return { label: 'UPI', icon: Smartphone, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' };
        case 'cod': return { label: 'Cash on Delivery', icon: BadgeIndianRupee, color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900/30' };
        default: return { label: method || 'Unknown', icon: CreditCard, color: 'text-gray-600', bg: 'bg-gray-100 dark:bg-gray-900/30' };
    }
};

export default function OrderDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cancelling, setCancelling] = useState(false);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await getOrderById(id);
                if (res?.success && res?.order) {
                    setOrder(res.order);
                } else if (res?.order) {
                    setOrder(res.order);
                } else {
                    setError("Order not found.");
                }
            } catch (err) {
                console.error("Failed to fetch order:", err);
                setError(err?.response?.data?.message || "Could not load order details.");
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    const handleCancelOrder = async () => {
        try {
            setCancelling(true);
            const res = await cancelOrder(id);
            if (res?.success) {
                setOrder(res.order);
                setShowCancelConfirm(false);
            } else {
                alert(res?.message || "Failed to cancel order");
            }
        } catch (err) {
            alert(err?.response?.data?.message || "Failed to cancel order. Please try again.");
        } finally {
            setCancelling(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#f5f5f5] dark:bg-background flex items-center justify-center">
            <div className="text-center space-y-3">
                <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin mx-auto" />
                <p className="text-sm text-muted-foreground">Loading order details...</p>
            </div>
        </div>
    );

    if (error || !order) return (
        <div className="min-h-screen bg-[#f5f5f5] dark:bg-background flex flex-col items-center justify-center text-center px-4">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <h2 className="text-lg font-bold text-foreground mb-2">{error || "Order Not Found"}</h2>
            <Link to="/orders" className="text-sm text-primary hover:underline flex items-center gap-1 mt-3">
                <ArrowLeft className="w-4 h-4" /> Back to Orders
            </Link>
        </div>
    );

    const status = (order.status || "Processing").toLowerCase();
    const isCancelled = status === "cancelled";
    const stepIdx = isCancelled ? -1 : (STATUS_IDX[status] ?? 1);
    const items = order.cartItems || order.items || [];
    const paymentInfo = getPaymentMethodInfo(order.paymentMethod);
    const PaymentIcon = paymentInfo.icon;

    return (
        <div className="min-h-screen bg-[#f5f5f5] dark:bg-background pb-10">
            {/* Breadcrumb */}
            <div className="bg-white dark:bg-card border-b border-border">
                <div className="max-w-5xl mx-auto px-4 py-2.5">
                    <nav className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Link to="/" className="hover:text-primary">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link to="/orders" className="hover:text-primary">My Orders</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-foreground font-medium truncate max-w-[120px]">#{id?.slice(-8).toUpperCase()}</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-5 space-y-3">
                {/* Order Header Card */}
                <div className="bg-white dark:bg-card border border-border rounded-lg p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-border">
                        <div>
                            <p className="text-xs text-muted-foreground mb-0.5">Order ID</p>
                            <p className="text-sm font-mono font-semibold text-foreground">#{order._id || order.id || id}</p>
                        </div>
                        <div className="text-left sm:text-right">
                            <p className="text-xs text-muted-foreground mb-0.5">Placed On</p>
                            <p className="text-sm font-semibold text-foreground">{fmt(order.createdAt || order.date)}</p>
                        </div>
                        <div className="text-left sm:text-right">
                            <p className="text-xs text-muted-foreground mb-0.5">Order Total</p>
                            <p className="text-base font-bold text-foreground">₹{(order.total || 0).toLocaleString("en-IN")}</p>
                        </div>
                        <div className="text-left sm:text-right">
                            <p className="text-xs text-muted-foreground mb-0.5">Status</p>
                            {isCancelled ? (
                                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600">
                                    <XCircle className="w-4 h-4" /> Cancelled
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary capitalize">
                                    {order.status || "Processing"}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Tracking Timeline */}
                    {!isCancelled ? (
                        <>
                            <h2 className="text-sm font-bold text-foreground mb-5">Shipment Tracking</h2>
                            <div className="flex items-start justify-between relative">
                                {/* Background progress bar */}
                                <div className="absolute left-5 right-5 top-5 h-0.5 bg-border" style={{ zIndex: 0 }} />
                                <div
                                    className="absolute left-5 top-5 h-0.5 bg-primary transition-all duration-700"
                                    style={{ width: `${(stepIdx / (STEPS.length - 1)) * 100}%`, maxWidth: 'calc(100% - 40px)', zIndex: 1 }}
                                />
                                {STEPS.map((step, i) => {
                                    const done = i <= stepIdx;
                                    const active = i === stepIdx;
                                    return (
                                        <div key={step.key} className="flex flex-col items-center text-center relative z-10 flex-1">
                                            <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2 transition-all ${done ? "bg-primary border-primary text-primary-foreground" : "bg-white dark:bg-card border-border text-muted-foreground"} ${active ? "ring-4 ring-primary/20" : ""}`}>
                                                <step.icon className="w-4 h-4" />
                                            </div>
                                            <p className={`text-xs font-semibold ${done ? "text-foreground" : "text-muted-foreground"}`}>{step.label}</p>
                                            <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">{step.desc}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                            <XCircle className="w-6 h-6 text-red-500 shrink-0" />
                            <div>
                                <p className="text-sm font-semibold text-red-700 dark:text-red-400">This order has been cancelled</p>
                                <p className="text-xs text-red-600/70 dark:text-red-400/70 mt-0.5">
                                    If you were charged, a refund will be processed within 5-7 business days.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {/* Delivery Address */}
                    <div className="bg-white dark:bg-card border border-border rounded-lg p-4">
                        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" /> Delivery Address
                        </h3>
                        <p className="text-sm font-semibold text-foreground">
                            {order.firstName}{order.lastName ? ` ${order.lastName}` : ''}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                            {order.address}
                            {order.locality ? `, ${order.locality}` : ""}
                            {order.landmark ? `, ${order.landmark}` : ""}
                            {order.city ? `, ${order.city}` : ""}
                            {order.state ? `, ${order.state}` : ""}
                            {order.pincode ? ` - ${order.pincode}` : ""}
                        </p>
                        {order.mobile && (
                            <p className="text-sm text-muted-foreground mt-2">📞 +91 {order.mobile}</p>
                        )}
                        {order.email && (
                            <p className="text-sm text-muted-foreground mt-1">✉️ {order.email}</p>
                        )}
                    </div>

                    {/* Payment & Price Summary */}
                    <div className="bg-white dark:bg-card border border-border rounded-lg p-4">
                        {/* Payment Method */}
                        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border">
                            <div className={`w-9 h-9 rounded-full ${paymentInfo.bg} flex items-center justify-center shrink-0`}>
                                <PaymentIcon className={`w-4 h-4 ${paymentInfo.color}`} />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Payment Method</p>
                                <p className="text-sm font-semibold text-foreground">{paymentInfo.label}</p>
                            </div>
                            <div className="ml-auto text-right">
                                <p className="text-xs text-muted-foreground">Payment Status</p>
                                <p className={`text-sm font-semibold ${order.paymentStatus === 'Completed' ? 'text-green-600' : order.paymentStatus === 'Failed' ? 'text-red-600' : 'text-yellow-600'}`}>
                                    {order.paymentStatus || 'Pending'}
                                </p>
                            </div>
                        </div>

                        {/* Price Details */}
                        <h3 className="text-sm font-bold text-foreground mb-3">Price Details</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-muted-foreground">
                                <span>Subtotal ({items.length} item{items.length !== 1 ? 's' : ''})</span>
                                <span>₹{(order.subtotal || 0).toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span>Delivery</span>
                                {(order.shipping === 0 || !order.shipping) ? (
                                    <span className="text-green-600 font-medium">FREE</span>
                                ) : (
                                    <span>₹{order.shipping}</span>
                                )}
                            </div>
                            {order.discount > 0 && (
                                <div className="flex justify-between text-green-600">
                                    <span>Discount</span>
                                    <span className="font-medium">−₹{order.discount}</span>
                                </div>
                            )}
                            <div className="flex justify-between font-bold text-foreground border-t border-border pt-2 mt-1">
                                <span>Total</span>
                                <span>₹{(order.total || 0).toLocaleString("en-IN")}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Items */}
                <div className="bg-white dark:bg-card border border-border rounded-lg overflow-hidden">
                    <div className="px-4 py-3 border-b border-border">
                        <h3 className="text-sm font-bold text-foreground">Items in this Order ({items.length})</h3>
                    </div>
                    {items.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground">
                            <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
                            <p className="text-sm">Item details are being fetched…</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-border/50">
                            {items.map((item, i) => (
                                <div key={i} className="flex gap-4 p-4 items-center">
                                    <div className="w-16 h-16 shrink-0 rounded-md border border-border bg-secondary/20 overflow-hidden">
                                        <img src={item.image || item.images?.[0] || "https://placehold.co/80x80?text=boAt"} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-foreground line-clamp-1">{item.name || "Product"}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">Qty: {item.quantity || item.qty || 1}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-sm font-bold text-foreground">₹{((item.price || 0) * (item.quantity || item.qty || 1)).toLocaleString("en-IN")}</p>
                                        <Link to={`/products/${item.slug || item.product || item.id}`} className="text-xs text-primary hover:underline flex items-center gap-0.5 justify-end mt-1">
                                            Buy Again <ChevronRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Cancel Order Button — only for Processing orders */}
                {order.status === "Processing" && (
                    <div className="bg-white dark:bg-card border border-border rounded-lg p-4">
                        {!showCancelConfirm ? (
                            <button
                                onClick={() => setShowCancelConfirm(true)}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-semibold text-red-600 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            >
                                <XCircle className="w-4 h-4" /> Cancel This Order
                            </button>
                        ) : (
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-red-700 dark:text-red-400">Are you sure you want to cancel this order?</p>
                                    <p className="text-xs text-red-600/70 dark:text-red-400/70 mt-0.5">This action cannot be undone. Any payment will be refunded within 5-7 business days.</p>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <button
                                        onClick={() => setShowCancelConfirm(false)}
                                        disabled={cancelling}
                                        className="px-4 py-2 text-sm font-medium text-foreground border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                                    >
                                        Keep Order
                                    </button>
                                    <button
                                        onClick={handleCancelOrder}
                                        disabled={cancelling}
                                        className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-60"
                                    >
                                        {cancelling ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
                                        {cancelling ? "Cancelling..." : "Yes, Cancel"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Returns note */}
                {!isCancelled && (
                    <div className="bg-white dark:bg-card border border-border rounded-lg px-4 py-3 flex items-center gap-2 text-sm text-muted-foreground">
                        <RotateCcw className="w-4 h-4 text-primary shrink-0" />
                        Returns accepted within 7 days of delivery. <Link to="/about" className="text-primary hover:underline ml-1">View return policy</Link>
                    </div>
                )}

                {/* Order Timeline */}
                <div className="bg-white dark:bg-card border border-border rounded-lg p-4">
                    <h3 className="text-sm font-bold text-foreground mb-3">Order Timeline</h3>
                    <div className="space-y-3">
                        {order.updatedAt && order.updatedAt !== order.createdAt && (
                            <div className="flex items-start gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                                <div>
                                    <p className="text-sm font-medium text-foreground capitalize">
                                        {isCancelled ? "Order Cancelled" : `Order ${order.status || 'Updated'}`}
                                    </p>
                                    <p className="text-xs text-muted-foreground">{fmtTime(order.updatedAt)}</p>
                                </div>
                            </div>
                        )}
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-foreground">Order Placed</p>
                                <p className="text-xs text-muted-foreground">{fmtTime(order.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
