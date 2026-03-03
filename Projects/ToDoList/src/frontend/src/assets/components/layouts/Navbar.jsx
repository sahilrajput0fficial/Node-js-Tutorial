import Logo from "../content/Logo";
import { NavLink } from "react-router-dom";
import Search from "../content/Search";
import { ShoppingBag, ShoppingBagIcon, User } from "lucide-react";
import { memo } from "react";
import TopBar from "../content/TopBar";
import UserProfile from "../content/UserProfile";
import CartSheet from "../content/CartSheet";
import { UserMenu } from "../content/UserMenu";

const Navbar = memo(function () {
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
