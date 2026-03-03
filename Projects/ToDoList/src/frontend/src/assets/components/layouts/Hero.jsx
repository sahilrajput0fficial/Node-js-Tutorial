import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <div className="relative w-full h-[85vh] overflow-hidden bg-background flex items-center">
            {/* Background glowing effects */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-pulse-slow pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] mix-blend-screen opacity-50 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 lg:px-16 w-full relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col items-start gap-6 animate-slide-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-sm font-medium text-primary mb-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                        </span>
                        New Launch: The X-Pro Series
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                        Sound that <br />
                        <span className="text-gradient font-extrabold">Moves You.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
                        Experience immersive audio like never before. Designed for the bold, engineered for perfection.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <Link to="/products" className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-primary-foreground bg-primary rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/30">
                            <span className="relative z-10">Shop Now</span>
                            <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 rounded-full"></div>
                        </Link>

                        <Link to="/category" className="inline-flex items-center justify-center px-8 py-4 font-semibold text-foreground bg-secondary/50 hover:bg-secondary border border-border rounded-full backdrop-blur-sm transition-all hover:shadow-md">
                            Explore Categories
                        </Link>
                    </div>

                    <div className="flex items-center gap-6 mt-8 pt-6 border-t border-border w-full max-w-md">
                        <div>
                            <p className="text-3xl font-bold text-foreground">50M+</p>
                            <p className="text-sm text-muted-foreground font-medium">Happy Customers</p>
                        </div>
                        <div className="w-px h-12 bg-border"></div>
                        <div>
                            <p className="text-3xl font-bold text-foreground">4.8/5</p>
                            <p className="text-sm text-muted-foreground font-medium">Average Rating</p>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex justify-center relative animate-fade-in" style={{ animationDelay: '200ms' }}>
                    <div className="relative w-full aspect-square max-w-[500px] flex items-center justify-center animate-float">
                        {/* Abstract representation of a product/headphones */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-blue-500/40 rounded-full blur-3xl opacity-30"></div>
                        <div className="relative w-3/4 h-3/4 bg-card border border-border/50 rounded-3xl shadow-glass-dark rotate-12 flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]"></div>
                            <div className="text-6xl font-black text-primary/20 -rotate-12 select-none tracking-tighter">PREMIUM</div>
                        </div>

                        <div className="absolute bottom-0 right-0 glass-card p-4 rounded-2xl flex items-center gap-4 animate-slide-up" style={{ animationDelay: '600ms' }}>
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                <span className="text-primary font-bold">ANC</span>
                            </div>
                            <div>
                                <p className="font-semibold text-sm text-foreground">Active Noise</p>
                                <p className="text-xs text-muted-foreground">Cancellation</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
