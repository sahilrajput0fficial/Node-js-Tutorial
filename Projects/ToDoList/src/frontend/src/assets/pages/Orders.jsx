import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Package, ShoppingBag, Truck, CheckCircle2, AlertCircle, Clock, ChevronRight, CreditCard, Smartphone, BadgeIndianRupee, Box } from "lucide-react";
import { getOrders } from "../api/order.api";
import { useAuth } from "@/context/AuthContext";

const Badge = ({ children, className, ...props }) => (
    <span
        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${className || ''}`}
        {...props}
    >
        {children}
    </span>
);

const Skeleton = ({ className, ...props }) => (
    <div
        className={`animate-pulse rounded-md bg-secondary/50 ${className || ''}`}
        {...props}
    />
);

const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
        case 'delivered':
            return <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 flex gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> Delivered</Badge>;
        case 'shipped':
            return <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 flex gap-1.5"><Truck className="w-3.5 h-3.5" /> Shipped</Badge>;
        case 'dispatched':
            return <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 flex gap-1.5"><Box className="w-3.5 h-3.5" /> Dispatched</Badge>;
        case 'processing':
            return <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100 flex gap-1.5"><Clock className="w-3.5 h-3.5" /> Processing</Badge>;
        case 'pending':
            return <Badge className="bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100 flex gap-1.5"><Clock className="w-3.5 h-3.5" /> Pending</Badge>;
        case 'cancelled':
            return <Badge className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 flex gap-1.5"><AlertCircle className="w-3.5 h-3.5" /> Cancelled</Badge>;
        default:
            return <Badge className="bg-gray-50 text-gray-700 border-gray-200 flex gap-1.5"><Package className="w-3.5 h-3.5" /> {status || 'Placed'}</Badge>;
    }
};

const getPaymentIcon = (method) => {
    switch (method) {
        case 'card': return <CreditCard className="w-3.5 h-3.5" />;
        case 'upi': return <Smartphone className="w-3.5 h-3.5" />;
        case 'cod': return <BadgeIndianRupee className="w-3.5 h-3.5" />;
        default: return null;
    }
};

const getPaymentLabel = (method) => {
    switch (method) {
        case 'card': return 'Card';
        case 'upi': return 'UPI';
        case 'cod': return 'COD';
        default: return method || '';
    }
};

const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
};

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await getOrders();

                if (response?.orders) {
                    setOrders(response.orders);
                } else if (response?.data?.orders) {
                    setOrders(response.data.orders);
                } else if (Array.isArray(response?.data)) {
                    setOrders(response.data);
                } else if (Array.isArray(response)) {
                    setOrders(response);
                } else {
                    setOrders([]);
                }
            } catch (err) {
                console.error("Error fetching orders:", err);
                if (err?.response?.status === 404 || err?.message?.includes('Network')) {
                    setOrders([]);
                } else {
                    setError("We couldn't load your orders right now. Please try again later.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[70vh] max-w-5xl mx-auto px-4 py-8">
                <div className="flex items-center gap-3 mb-8">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-48" />
                </div>
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="border border-border bg-card rounded-xl p-5 shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-6 w-24 rounded-full" />
                            </div>
                            <Skeleton className="h-px w-full my-4" />
                            <div className="flex gap-4">
                                <Skeleton className="h-20 w-20 rounded-md" />
                                <div className="flex-1 space-y-3 py-2">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-4 w-1/4" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (orders.length === 0 && !error) {
        return (
            <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 py-12 text-center bg-zinc-50/50 dark:bg-background/50">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-12 h-12 text-primary" strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-3">
                    No orders placed yet
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
                    Looks like you haven't made your first purchase yet. Explore our latest products and find something you love!
                </p>
                <Link
                    to="/category"
                    className="inline-flex items-center justify-center h-12 px-8 font-medium rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-200"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-background/95">
            <div className="max-w-5xl mx-auto px-4 py-8 md:py-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
                            <Package className="w-8 h-8 text-primary" />
                            Your Orders
                        </h1>
                        <p className="text-muted-foreground mt-2 text-sm">
                            Check the status of recent orders, manage returns, and discover similar products.
                        </p>
                    </div>
                    <p className="text-sm font-medium bg-secondary/50 px-4 py-2 rounded-full text-foreground/80 border border-border">
                        Total Orders: <span className="font-bold text-foreground">{orders.length}</span>
                    </p>
                </div>

                {error ? (
                    <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-xl p-6 text-center flex flex-col items-center gap-3">
                        <AlertCircle className="w-8 h-8" />
                        <p className="font-medium">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-2 text-sm underline font-semibold hover:text-destructive/80 transition"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => {
                            const orderId = order._id || order.id;
                            const items = order.cartItems || order.items || [];
                            return (
                                <Link
                                    key={orderId || Math.random()}
                                    to={`/orders/${orderId}`}
                                    className="block bg-card border border-border rounded-xl shadow-sm overflow-hidden hover:shadow-md hover:border-primary/30 transition-all duration-300 group"
                                >
                                    {/* Order Header */}
                                    <div className="bg-secondary/30 px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border">
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-2 text-sm flex-1">
                                            <div>
                                                <p className="text-muted-foreground text-xs uppercase font-semibold">Order Placed</p>
                                                <p className="font-medium mt-0.5">{formatDate(order.createdAt || order.date)}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground text-xs uppercase font-semibold">Total</p>
                                                <p className="font-bold mt-0.5 text-primary">₹{(order.total || order.totalAmount || 0).toLocaleString('en-IN')}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground text-xs uppercase font-semibold">Payment</p>
                                                <p className="font-medium mt-0.5 flex items-center gap-1.5 capitalize">
                                                    {getPaymentIcon(order.paymentMethod)}
                                                    {getPaymentLabel(order.paymentMethod)}
                                                </p>
                                            </div>
                                            <div className="col-span-2 sm:col-span-1">
                                                <p className="text-muted-foreground text-xs uppercase font-semibold">Order ID</p>
                                                <p className="font-mono mt-0.5 text-xs/5 break-all">#{(orderId || '').slice(-8).toUpperCase()}</p>
                                            </div>
                                        </div>
                                        <div className="shrink-0">{getStatusBadge(order.paymentStatus)}</div>
                                    </div>

                                    {/* Order Items Preview */}
                                    <div className="divide-y divide-border/50">
                                        {items.slice(0, 2).map((item, index) => (
                                            <div key={index} className="p-4 flex gap-4 items-center">
                                                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary/20">
                                                    <img
                                                        src={item.image || item.images?.[0] || "https://placehold.co/100x100?text=Product"}
                                                        alt={item.name || "Product Image"}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-semibold text-sm text-foreground line-clamp-1">
                                                        {item.name || "Product"}
                                                    </h3>
                                                    <p className="text-xs text-muted-foreground mt-0.5">
                                                        Qty: {item.quantity || item.qty || 1} · ₹{(item.price || 0).toLocaleString('en-IN')}
                                                    </p>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                                            </div>
                                        ))}
                                        {items.length > 2 && (
                                            <div className="px-4 py-2.5 text-xs text-muted-foreground text-center bg-secondary/10">
                                                + {items.length - 2} more item{items.length - 2 > 1 ? 's' : ''}
                                            </div>
                                        )}
                                        {items.length === 0 && (
                                            <div className="p-4 flex gap-4 items-center">
                                                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary/20 flex flex-col items-center justify-center text-muted-foreground">
                                                    <Package className="h-6 w-6 opacity-50" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-sm text-foreground">Your Ordered Item(s)</h3>
                                                    <p className="text-xs text-muted-foreground mt-0.5">Tap to view order details</p>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
                                            </div>
                                        )}
                                    </div>

                                    {/* View Details Footer */}
                                    <div className="px-5 py-2.5 border-t border-border bg-secondary/10 flex items-center justify-end">
                                        <span className="text-xs font-semibold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                                            View Order Details <ChevronRight className="w-3.5 h-3.5" />
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
