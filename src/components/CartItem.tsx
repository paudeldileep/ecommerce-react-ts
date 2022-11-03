import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { FunctionComponent } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import productItems from "../data/products.json";
import { formatCurrency } from "../utilities/currencyFormatter";

interface ICartItemProps {
  id: number;
  quantity: number;
}

const CartItem: FunctionComponent<ICartItemProps> = (props) => {
  const { id, quantity } = props;

  const { removeItem, increaseItemQuantity, decreaseItemQuantity } =
    useShoppingCart();

  const product = productItems.find((item) => item.id === id);

  const handleRemoveItem = () => {
    removeItem(id);
  };

  const totalPrice = quantity * (product?.price || 0);

  return (
    <div className="flex p-2 border-b border-gray-100 h-20 mb-2">
      <div className="h-16 w-16 relative rounded-md shadow-md">
        <img
          src={product?.imgUrl}
          alt={product?.name}
          className="h-16 object-contain object-center mx-auto p-1"
        />
        <button
          onClick={handleRemoveItem}
          className="rounded-full bg-cyan-100 absolute -top-1 -left-1 hover:scale-110 hover:border hover:border-red-400 active:scale-90 transition-all duration-150 ease-out"
        >
          <XMarkIcon className="w-4 h-4 text-red-400 font-extrabold" />
        </button>
      </div>
      <div className="flex flex-col w-full mx-2">
        <div className="flex justify-between items-center text-gray-400">
          <span className="text-sm">{product?.name}</span>
          <span className="text-xs">{formatCurrency(product?.price || 0)}</span>
        </div>
        <div className="flex text-gray-600 font-semibold items-center space-x-1 mt-1">
          <span>{quantity}</span>
          <span>
            <XMarkIcon className="w-3 h-3" />
          </span>
          <span>{product?.name}</span>
          <div className="flex flex-col space-y-1">
            <button
              className="rounded-sm bg-gray-100"
              onClick={() => increaseItemQuantity(id)}
            >
              <ChevronUpIcon className="text-cyan-600 h-2 w-6" />
            </button>
            <button
              className="rounded-sm bg-gray-100"
              onClick={() => decreaseItemQuantity(id)}
            >
              <ChevronDownIcon className="text-red-400 h-2 w-6" />
            </button>
          </div>
        </div>
        <p className="text-right mb-1 text-gray-800">
          {formatCurrency(totalPrice)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
