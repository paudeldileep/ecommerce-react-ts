import { XMarkIcon } from "@heroicons/react/24/solid";
import { FunctionComponent } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/currencyFormatter";
import CartItem from "./CartItem";
import productItems from "../data/products.json";

interface IShoppingCartSidebarProps {
  isOpen: boolean;
}

const ShoppingCartSidebar: FunctionComponent<IShoppingCartSidebarProps> = (
  props
) => {
  const { closeCart, cartItems } = useShoppingCart();

  return (
    <div
      className={`h-full w-[80vw] sm:w-[60vw] md:w-[30vw] opacity-0 rounded-md border-l border-cyan-400 shadow-md absolute top-14 right-0 bg-white bg-opacity-20 backdrop-blur-md backdrop-filter ease-in-out duration-300 ${
        props.isOpen ? "opacity-100" : " opacity-0 hidden"
      }`}
    >
      {cartItems.length > 0 ? (
        <>
          <div className="flex justify-between items-center mx-5 mt-5">
            <h2 className="text-xl font-semibold text-cyan-600">Your Cart</h2>
            <button
              onClick={closeCart}
              className="active:scale-90 shadow-sm active:shadow-md transition-all duration-150 rounded-full"
            >
              <XMarkIcon className="w-6 h-6 text-red-400 font-extrabold" />
            </button>
          </div>
          {/* cart items area */}
          <div className="flex flex-col mx-5 mt-5">
            {cartItems.map((item) => (
              <CartItem id={item.id} quantity={item.quantity} />
            ))}
          </div>
          {/* sub total */}
          <div className="ml-5 mr-7 px-2 mt-4 flex items-center justify-between">
            <span className="text-gray-700 text-lg font-semibold">
              Sub-Total
            </span>
            <span className="text-cyan-600 font-semibold text-xl">
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = productItems.find((i) => i.id === cartItem.id);
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0)
              )}
            </span>
          </div>
          {/* checkout and cancel button */}
          <div className="mt-10 mx-5 flex flex-col items-center">
            <button className="text-lg font-medium text-gray-700 bg-cyan-500 active:bg-cyan-700 active:scale-90 transition-all duration-200 ease-out mb-5 rounded-md w-3/4 py-1 border border-gray-200">
              CHECKOUT
            </button>
            <button
              onClick={closeCart}
              className="text-lg font-medium text-gray-700 bg-gray-50 border border-red-400 active:bg-gray-200 active:scale-90 transition-all duration-200 ease-out mb-2 rounded-md w-3/4 py-1"
            >
              CANCEL
            </button>
          </div>
        </>
      ) : (
        <div className="flex justify-between items-center mx-5 mt-5">
          <h2 className="text-xl font-semibold text-red-400">
            Your Cart is Empty!
          </h2>
          <button
            onClick={closeCart}
            className="active:scale-90 shadow-sm active:shadow-md transition-all duration-150 rounded-full"
          >
            <XMarkIcon className="w-6 h-6 text-red-400 font-extrabold" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCartSidebar;
