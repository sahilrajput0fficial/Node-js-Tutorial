import React from "react";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className=" sticky z-50 top-0  bg-gray-600 text-xs py-1">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-center">
        <span className="text-white font-medium">
          Get Extra 5% Off On Prepaid Orders | Code:{" "}
          <span className="font-bold">HOLIDAYS</span> |{" "}
          <Link
            to="/shop"
            className="font-bold underline hover:text-boat-yellow transition"
          >
            Shop Now
          </Link>
        </span>
      </div>
    </div>
  );
};

export default TopBar;
