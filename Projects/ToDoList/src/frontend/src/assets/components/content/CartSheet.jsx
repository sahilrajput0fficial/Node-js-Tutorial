import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartSheet() {
  const { cartItems, setCartItems, isOpen, setIsOpen } = useCart();

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems?.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <>
      {/* Cart Button (Trigger) */}
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        <ShoppingCart className="w-5 h-5 mr-2" />
        Cart ({cartItems?.length})
      </Button>

      {/* Cart Sheet */}
      <Sheet open={isOpen} onOpenChange={()=>setIsOpen(false)}>
        <SheetContent side="right" className="bg-white w-96 p-6">
          <SheetHeader>
            <SheetTitle>Your Shopping Cart</SheetTitle>
          </SheetHeader>

          <div className="mt-4 space-y-4">
            {cartItems?.length === 0 && (
              <p className="text-gray-500 text-sm text-center">
                Your cart is empty
              </p>
            )}

            {cartItems?.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    ₹{item.price} × {item.qty}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeItem(item.id)}
                  className="text-red-500"
                >
                  ×
                </Button>
              </div>
            ))}
          </div>

          {cartItems?.length > 0 && (
            <>
              <div className="mt-6 border-t pt-4 flex justify-between font-semibold">
                <span>Total:</span>
                <span>₹{totalPrice}</span>
              </div>
              <Button className="w-full mt-4">Checkout</Button>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
