import React from "react";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import Logo from "../content/Logo";

const Footer = () => {
    return (
        <footer className="bg-card w-full mt-24 border-t border-border pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 lg:px-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <Logo className="max-w-32 mb-6" />
                        <p className="text-muted-foreground text-sm max-w-sm mb-8 leading-relaxed">
                            Elevate your audio experience with premium sound quality and sleek designs. Crafted for the modern lifestyle, designed for you.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                                <Youtube size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground mb-6">Shop</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><a href="/category" className="hover:text-primary transition-colors">Categories</a></li>
                            <li><a href="/collection/personal" className="hover:text-primary transition-colors">Personalisation</a></li>
                            <li><a href="/corporate" className="hover:text-primary transition-colors">Corporate Orders</a></li>
                            <li><a href="/gift" className="hover:text-primary transition-colors">Gifting Store</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-foreground mb-6">Support</h4>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Track Order</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Return Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center py-6 border-t border-border mt-8 gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Modern Store. All Rights Reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-muted-foreground">
                        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
