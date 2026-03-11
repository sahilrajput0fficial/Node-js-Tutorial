import Logo from "../content/Logo";
import { NavLink, Link } from "react-router-dom";
import Search from "../content/Search";
import { Heart } from "lucide-react";
import { memo } from "react";
import TopBar from "../content/TopBar";
import UserProfile from "../content/UserProfile";
import CartSheet from "../content/CartSheet";
import { UserMenu } from "../content/UserMenu";
import { useWishlist } from "@/context/WishlistContext";

const Navbar = memo(function () {
  const { count } = useWishlist();
  return (
    <>
      <div className="sticky top-0 z-50">
        <TopBar />
        <div className="glass border-b border-border shadow-sm">
          <nav className="w-full max-w-7xl mx-auto px-6 lg:px-16 flex justify-between h-20">
            <div className="flex flex-row justify-center items-center gap-8 lg:gap-12">
              <Logo className="max-w-24 transition-transform hover:scale-105 duration-300" />
              <div className="hidden md:flex justify-center items-center gap-6 whitespace-nowrap text-sm font-semibold text-muted-foreground">
                <NavLink
                  className={({ isActive }) => `transition-all duration-300 ease-in-out hover:text-primary ${isActive ? 'text-primary' : ''}`}
                  to="/category"
                >
                  Categories
                </NavLink >
                <NavLink
                  className={({ isActive }) => `transition-all duration-300 ease-in-out hover:text-primary ${isActive ? 'text-primary' : ''}`}
                  to="/collection/boat-personal"
                >
                  Personalisation
                </NavLink>
                <NavLink
                  className={({ isActive }) => `transition-all duration-300 ease-in-out hover:text-primary ${isActive ? 'text-primary' : ''}`}
                  to="/corporate"
                >
                  Corporate
                </NavLink>
                <NavLink
                  className={({ isActive }) => `transition-all duration-300 ease-in-out hover:text-primary ${isActive ? 'text-primary' : ''}`}
                  to="/gift"
                >
                  Gifting
                </NavLink>
              </div>
            </div>
            <div className="flex flex-row items-center gap-4 lg:gap-6">
              <Search />
              {/* Wishlist Icon */}
              <Link to="/wishlist" className="relative inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-secondary/60 transition-colors" aria-label="Wishlist">
                <Heart className="w-5 h-5 text-muted-foreground hover:text-rose-500 transition-colors" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </Link>
              <div>
                <UserProfile />
              </div>
              <CartSheet />
            </div>
          </nav>
        </div>
      </div>
    </>
  );
});

export default Navbar;
