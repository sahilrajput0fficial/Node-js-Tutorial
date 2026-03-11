import React, { useEffect, useState } from 'react'
import { getProfile } from '../api/auth.api';
import { useAuth } from '@/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Shield, Package, Settings, LogOut, ChevronRight, MapPin, Heart, Clock, CreditCard, HelpCircle, Bell } from 'lucide-react';

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const { isAuthenticated, logout } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [activeSection, setActiveSection] = useState("personal");
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) { setLoading(false); return; }
        (async () => {
            try {
                const response = await getProfile();
                setProfileData(response.data);
            } catch (err) { console.error("Error fetching profile:", err); }
            finally { setLoading(false); }
        })();
    }, [isAuthenticated]);

    if (loading) return (
        <div className="min-h-screen bg-[#f5f5f5] dark:bg-background flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin" />
        </div>
    );

    if (!isAuthenticated) return (
        <div className="min-h-screen bg-[#f5f5f5] dark:bg-background flex flex-col items-center justify-center text-center px-4">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-destructive" />
            </div>
            <h2 className="text-lg font-bold text-foreground mb-2">Authentication Required</h2>
            <p className="text-sm text-muted-foreground max-w-xs mb-5">You need to log in to view your profile and manage your orders.</p>
            <button onClick={() => navigate('/login')} className="h-10 px-6 bg-primary text-primary-foreground text-sm font-bold rounded hover:bg-primary/90 transition-colors">
                Log In Now
            </button>
        </div>
    );

    const MENU = [
        { key: "personal", icon: User, label: "Personal Information" },
        { key: "orders", icon: Package, label: "My Orders", link: "/orders" },
        { key: "wishlist", icon: Heart, label: "My Wishlist", link: "/wishlist" },
        { key: "addresses", icon: MapPin, label: "Saved Addresses" },
        { key: "payments", icon: CreditCard, label: "Payment Methods" },
        { key: "notifications", icon: Bell, label: "Notifications" },
        { key: "help", icon: HelpCircle, label: "Help & Support" },
    ];

    const createdDate = profileData?.createdAt
        ? new Date(profileData.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
        : "Recently";

    return (
        <div className="min-h-screen bg-[#f5f5f5] dark:bg-background pb-12">
            {/* Breadcrumb */}
            <div className="bg-white dark:bg-card border-b border-border">
                <div className="max-w-6xl mx-auto px-4 py-2.5">
                    <nav className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-foreground font-medium">My Account</span>
                    </nav>
                </div>
            </div>

            {/* Profile Header */}
            <div className="bg-white dark:bg-card border-b border-border">
                <div className="max-w-6xl mx-auto px-4 py-5 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full border-2 border-border bg-secondary/30 overflow-hidden shrink-0">
                        <img
                            src={profileData?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData?.name || 'User'}&backgroundColor=e2e8f0`}
                            alt="Profile" className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h1 className="text-lg font-bold text-foreground">{profileData?.name || "Welcome Back"}</h1>
                        <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                            <Mail className="w-3.5 h-3.5" /> {profileData?.email || "user@example.com"}
                        </p>
                    </div>
                    <button
                        onClick={logout}
                        className="hidden sm:flex items-center gap-1.5 h-9 px-4 border border-border text-sm font-medium text-muted-foreground rounded hover:border-destructive hover:text-destructive transition-colors"
                    >
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-5">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-start">

                    {/* Left Sidebar Menu */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-card border border-border rounded-lg overflow-hidden">
                            <div className="px-4 py-3 border-b border-border">
                                <p className="text-sm font-bold text-foreground">My Account</p>
                            </div>
                            <nav className="divide-y divide-border/50">
                                {MENU.map(item => (
                                    <button
                                        key={item.key}
                                        onClick={() => item.link ? navigate(item.link) : setActiveSection(item.key)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${activeSection === item.key && !item.link
                                                ? "bg-primary/5 text-primary font-semibold border-l-2 border-primary"
                                                : "text-foreground hover:bg-secondary/30"
                                            }`}
                                    >
                                        <item.icon className="w-4 h-4 shrink-0" />
                                        <span className="flex-1 text-left">{item.label}</span>
                                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                                    </button>
                                ))}
                            </nav>
                            {/* Mobile Sign Out */}
                            <div className="sm:hidden border-t border-border">
                                <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-destructive hover:bg-destructive/5 transition-colors">
                                    <LogOut className="w-4 h-4" /> Sign Out
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="lg:col-span-3 space-y-4">

                        {/* Personal Details Card */}
                        {activeSection === "personal" && (
                            <div className="bg-white dark:bg-card border border-border rounded-lg overflow-hidden">
                                <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                                    <h2 className="text-sm font-bold text-foreground">Personal Information</h2>
                                    <button className="text-xs text-primary font-semibold hover:underline">Edit</button>
                                </div>
                                <div className="divide-y divide-border/50">
                                    {[
                                        { label: "Full Name", value: profileData?.name || "N/A", icon: User },
                                        { label: "Email Address", value: profileData?.email || "N/A", icon: Mail },
                                        { label: "Phone Number", value: profileData?.phone || "Not provided", icon: Phone },
                                        { label: "Member Since", value: createdDate, icon: Clock },
                                    ].map((field, i) => (
                                        <div key={i} className={`flex items-center gap-4 px-5 py-3.5 ${i % 2 === 0 ? "bg-secondary/10" : ""}`}>
                                            <field.icon className="w-4 h-4 text-muted-foreground shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs text-muted-foreground">{field.label}</p>
                                                <p className="text-sm font-medium text-foreground">{field.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Addresses */}
                        {activeSection === "addresses" && (
                            <div className="bg-white dark:bg-card border border-border rounded-lg overflow-hidden">
                                <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                                    <h2 className="text-sm font-bold text-foreground">Saved Addresses</h2>
                                    <button className="text-xs text-primary font-semibold hover:underline">+ Add New</button>
                                </div>
                                <div className="p-8 text-center">
                                    <MapPin className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                                    <p className="text-sm font-semibold text-foreground mb-1">No saved addresses</p>
                                    <p className="text-xs text-muted-foreground">Add an address for faster checkout.</p>
                                </div>
                            </div>
                        )}

                        {/* Payments */}
                        {activeSection === "payments" && (
                            <div className="bg-white dark:bg-card border border-border rounded-lg overflow-hidden">
                                <div className="px-5 py-3 border-b border-border">
                                    <h2 className="text-sm font-bold text-foreground">Payment Methods</h2>
                                </div>
                                <div className="p-8 text-center">
                                    <CreditCard className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                                    <p className="text-sm font-semibold text-foreground mb-1">No saved payment methods</p>
                                    <p className="text-xs text-muted-foreground">Your saved cards and UPI IDs will appear here.</p>
                                </div>
                            </div>
                        )}

                        {/* Notifications */}
                        {activeSection === "notifications" && (
                            <div className="bg-white dark:bg-card border border-border rounded-lg overflow-hidden">
                                <div className="px-5 py-3 border-b border-border">
                                    <h2 className="text-sm font-bold text-foreground">Notification Preferences</h2>
                                </div>
                                <div className="divide-y divide-border/50">
                                    {[
                                        { title: "Order Updates", desc: "Get notified about order status changes.", on: true },
                                        { title: "Promotional Emails", desc: "Receive deals, offers, and new launch alerts.", on: false },
                                        { title: "Price Drop Alerts", desc: "Get notified when wishlist items go on sale.", on: true },
                                    ].map((pref, i) => (
                                        <div key={i} className="flex items-center justify-between px-5 py-3.5">
                                            <div>
                                                <p className="text-sm font-semibold text-foreground">{pref.title}</p>
                                                <p className="text-xs text-muted-foreground mt-0.5">{pref.desc}</p>
                                            </div>
                                            <div className={`w-10 h-5.5 rounded-full relative cursor-pointer transition-colors ${pref.on ? "bg-primary" : "bg-border"}`}>
                                                <div className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow transition-transform ${pref.on ? "translate-x-5" : "translate-x-0.5"}`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Help */}
                        {activeSection === "help" && (
                            <div className="bg-white dark:bg-card border border-border rounded-lg overflow-hidden">
                                <div className="px-5 py-3 border-b border-border">
                                    <h2 className="text-sm font-bold text-foreground">Help & Support</h2>
                                </div>
                                <div className="divide-y divide-border/50">
                                    {[
                                        { q: "How do I track my order?", a: "Go to My Orders and click on the order to see live tracking." },
                                        { q: "What is the return policy?", a: "We accept returns within 7 days of delivery for all products." },
                                        { q: "How do I contact support?", a: "Email us at support@boat.com or call 1800-200-9898 (Mon-Sat, 9am-6pm)." },
                                    ].map((item, i) => (
                                        <div key={i} className="px-5 py-3.5">
                                            <p className="text-sm font-semibold text-foreground mb-1">{item.q}</p>
                                            <p className="text-xs text-muted-foreground leading-relaxed">{item.a}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quick Links (always visible) */}
                        <div className="bg-white dark:bg-card border border-border rounded-lg overflow-hidden">
                            <div className="px-5 py-3 border-b border-border">
                                <h3 className="text-sm font-bold text-foreground">Quick Links</h3>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-border">
                                {[
                                    { icon: Package, label: "My Orders", link: "/orders" },
                                    { icon: Heart, label: "Wishlist", link: "/wishlist" },
                                    { icon: MapPin, label: "Addresses", action: () => setActiveSection("addresses") },
                                    { icon: HelpCircle, label: "Help", action: () => setActiveSection("help") },
                                ].map((q, i) => (
                                    <button
                                        key={i}
                                        onClick={() => q.link ? navigate(q.link) : q.action?.()}
                                        className="flex flex-col items-center gap-2 py-4 text-muted-foreground hover:text-primary hover:bg-secondary/20 transition-colors"
                                    >
                                        <q.icon className="w-5 h-5" />
                                        <span className="text-xs font-medium">{q.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile