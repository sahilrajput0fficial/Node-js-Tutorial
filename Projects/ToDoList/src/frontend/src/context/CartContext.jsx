import React , {useState , useContext , createContext , useEffect}from 'react'

export const CartContext = createContext();

export function useCart(){
    return useContext(CartContext);
}
export const CartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
  const savedCart = JSON.parse(localStorage.getItem("cart-items")) || [];
  setCartItems(savedCart);
}, []);
  return (
    <CartContext.Provider
      value={{
        isOpen,
        setIsOpen,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
