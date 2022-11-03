import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { useShoppingCart } from "../context/ShoppingCartContext";

interface INavbarProps {}

const Navbar: FunctionComponent<INavbarProps> = (props) => {
  const { openCart, cartItemQuantity } = useShoppingCart();

  return (
    <div className="w-full h-14 shadow-sm flex justify-between items-center px-8 sticky top-0 mb-7">
      {/* logo */}
      <div className=" w-14">
        <h2>
          <Link to={"/"}>Home</Link>
        </h2>
      </div>
      {/* search bar */}
      <div className=" border-2 bg-gray-200 rounded-md max-w-md w-72 p-1">
        <input
          type="text"
          className="outline-none bg-transparent border-b border-gray-300"
        />
      </div>
      {/* nav links */}
      <div className="flex items-center justify-center space-x-4">
        <span>
          <Link to={"/store"}>Store</Link>
        </span>
        <span>
          <Link to={"/about"}>About</Link>
        </span>
        <button
          className="relative rounded-full border-2 border-cyan-500 p-1"
          onClick={openCart}
        >
          <ShoppingBagIcon className="h-6 w-6 text-cyan-500" />
          <span className=" absolute bottom-0 translate-x-1/4 translate-y-1/4 transform bg-cyan-700 text-white rounded-full px-1 text-xs">
            {cartItemQuantity || 0}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
