import React, { useEffect, useState } from 'react'
import api from '../api/axios';
import { getProfile } from '../api/auth.api';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Shield, Package, Settings, LogOut, ChevronRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const { isAuthenticated, logout } = useAuth();
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) {
            setLoading(false);
            return;
        }
        const fetchProfile = async () => {
            try {
                const response = await getProfile();
                setProfileData(response.data);
            } catch (err) {
                console.error("Error fetching profile:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [isAuthenticated]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <p className="mt-4 text-muted-foreground font-medium animate-pulse">Loading your profile...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center animate-fade-in">
                <div className="w-24 h-24 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-6">
                    <Shield className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Authentication Required</h2>
                <p className="text-muted-foreground max-w-md pb-8">You need to log in to view your profile and manage your orders.</p>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 rounded-xl shadow-lg shadow-primary/20 transition-all hover:-translate-y-1">
                    Log In Now
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-24 animate-fade-in">
            {/* Header / Hero Area */}
            <div className="relative overflow-hidden bg-card border-b border-border">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/10 to-transparent"></div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 lg:px-16 pt-20 pb-16 relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                    <div className="w-32 h-32 rounded-full border-4 border-background shadow-glass-dark bg-secondary/50 flex items-center justify-center relative group overflow-hidden">
                        <img
                            src={profileData?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData?.name || 'User'}&backgroundColor=e2e8f0`}
                            alt="Profile"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <span className="text-white text-xs font-semibold">Change</span>
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
                            {profileData?.name || "Welcome Back"}
                        </h1>
                        <div className="flex flex-col md:flex-row gap-4 mt-4 text-muted-foreground items-center md:items-start justify-center md:justify-start">
                            <span className="flex items-center gap-2 bg-secondary/30 px-3 py-1.5 rounded-full border border-border/50 text-sm">
                                <Mail className="w-4 h-4 text-primary" />
                                {profileData?.email || "user@example.com"}
                            </span>
                            {profileData?.phone && (
                                <span className="flex items-center gap-2 bg-secondary/30 px-3 py-1.5 rounded-full border border-border/50 text-sm">
                                    <Shield className="w-4 h-4 text-primary" />
                                    {profileData.phone}
                                </span>
                            )}
                        </div>
                    </div>

                    <Button
                        onClick={logout}
                        variant="destructive"
                        className="rounded-xl font-semibold shadow-sm hover:shadow-md transition-all gap-2"
                    >
                        <LogOut className="w-4 h-4" /> Sign Out
                    </Button>
                </div>
            </div>

            {/* Main Content Dashboard */}
            <main className="max-w-7xl mx-auto px-6 lg:px-16 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left navigation sidebar */}
                <div className="lg:col-span-1 space-y-4 animate-slide-up">
                    {[
                        { title: "Personal Information", icon: User, active: true },
                        { title: "My Orders", icon: Package, active: false },
                        { title: "Saved Addresses", icon: MapPin, active: false },
                        { title: "Account Settings", icon: Settings, active: false },
                    ].map((item, index) => (
                        <button
                            key={index}
                            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 border ${item.active
                                ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20 scale-[1.02]"
                                : "bg-card text-foreground border-border/50 hover:border-primary/30 hover:bg-secondary/20"
                                }`}
                        >
                            <div className="flex items-center gap-3 font-semibold">
                                <item.icon className="w-5 h-5" />
                                {item.title}
                            </div>
                            <ChevronRight className={`w-5 h-5 ${item.active ? "opacity-100" : "opacity-40"}`} />
                        </button>
                    ))}
                </div>

                {/* Right content view */}
                <div className="lg:col-span-2 space-y-8 animate-slide-up animate-stagger-2">

                    {/* User Info Card */}
                    <div className="bg-card shadow-sm rounded-3xl p-8 border border-border/50 transition-all hover:shadow-md">
                        <h2 className="text-xl font-bold text-foreground mb-6 pb-4 border-b border-border/40">
                            Personal Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-1">Full Name</p>
                                <p className="text-lg font-medium text-foreground">{profileData?.name || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-1">Email Address</p>
                                <p className="text-lg font-medium text-foreground">{profileData?.email || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-1">Phone Number</p>
                                <p className="text-lg font-medium text-foreground">{profileData?.phone || "Not provided"}</p>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-1">Account Created</p>
                                <p className="text-lg font-medium text-foreground">{profileData?.createdAt ? new Date(profileData.createdAt).toLocaleDateString() : "Recently"}</p>
                            </div>
                        </div>

                        <div className="pt-8 mt-8 border-t border-border/40">
                            <Button variant="outline" className="font-semibold rounded-xl border-border/60 hover:bg-primary/5 hover:text-primary transition-all">
                                Edit Details
                            </Button>
                        </div>
                    </div>

                    {/* Recent Orders Preview */}
                    <div className="bg-card shadow-sm rounded-3xl p-8 border border-border/50 transition-all hover:shadow-md relative overflow-hidden">
                        <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none"></div>

                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-border/40">
                            <h2 className="text-xl font-bold text-foreground">
                                Recent Orders
                            </h2>
                            <Button variant="link" className="text-primary font-semibold hover:no-underline hover:opacity-80 p-0">
                                View All
                            </Button>
                        </div>

                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="w-16 h-16 bg-secondary/30 rounded-full flex items-center justify-center mb-4">
                                <Package className="w-8 h-8 text-muted-foreground opacity-50" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">No orders yet</h3>
                            <p className="text-muted-foreground max-w-sm">When you buy products, your order history will appear here.</p>
                            <Button className="mt-6 bg-foreground hover:bg-foreground/90 text-background font-semibold rounded-xl shadow-sm">
                                Start Shopping
                            </Button>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
}

export default Profile