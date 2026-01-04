import Logo from "../content/Logo";
import { NavLink } from "react-router-dom";
import Search from "../content/Search";
import { ShoppingBag, ShoppingBagIcon, User } from "lucide-react";
import { memo } from "react";
const Navbar = memo(function () {


  return (
    <>
    <div className=" border-b border-b-[#DBDBDB] ">
      <nav className="sticky w-full px-16 flex justify-between h-20">
        <div className="flex flex-row justify-center items-center gap-6">
          <Logo className="max-w-20" />
          <div className="flex justify-center items-center gap-4 whitespace-nowrap text-xl">
            <NavLink className="transition-all duration-300 ease-in-out hover:font-bold hover:underline hover:underline-offset-6" to="/category" >Categories</NavLink >
            <NavLink className="transition-all duration-300 ease-in-out hover:font-bold hover:underline hover:underline-offset-6" to="/collection/boat-personal">boAt Personalisation</NavLink>
            <NavLink className="transition-all duration-300 ease-in-out hover:font-bold hover:underline hover:underline-offset-6" to="/corporate">Corporate Orders</NavLink>
            <NavLink className="transition-all duration-300 ease-in-out hover:font-bold hover:underline hover:underline-offset-6" to="/gift" >Gifting Store</NavLink>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4">
            <Search />

            
            <User size="40" />
            <ShoppingBag size="40"/>
        </div>
      </nav>
    </div>
    </>
  );
});

export default Navbar;
