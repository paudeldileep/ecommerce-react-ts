import { FunctionComponent, useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/currencyFormatter";

interface IProductCardProps {
  itemId: number;
  itemName: string;
  itemImage: string;
  itemPrice: number;
}

const ProductCard: FunctionComponent<IProductCardProps> = (props) => {
  const { itemId, itemName, itemImage, itemPrice } = props;

  const {
    getItemQuantity,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItem,
  } = useShoppingCart();

  const quantity = getItemQuantity(itemId);

  const handleMinus = () => {
    decreaseItemQuantity(itemId);
  };

  const handlePlus = () => {
    increaseItemQuantity(itemId);
  };

  return (
    <div className=" w-60 h-80 shadow-md hover:shadow-lg relative hover:scale-105 transition-all duration-200 ease-in-out">
      <div className="h-52 relative bg-gray-100 rounded-md p-1">
        <img
          alt={itemImage}
          src={itemImage}
          className="w-full h-full object-center object-contain"
        />
      </div>
      <div className="flex justify-between m-1 items-center">
        <h4 className="text-xl font-semibold text-cyan-600">{itemName}</h4>
        <span className="text-sm font-semibold text-gray-700">
          {formatCurrency(itemPrice)}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 mb-3 text-center flex flex-col items-center">
        {/* render add to cart if quantity zero and plus minus buttons if quantity not zero */}
        {quantity === 0 ? (
          <button
            onClick={() => increaseItemQuantity(itemId)}
            className=" w-max border-2 bg-cyan-200 border-cyan-300 px-5 py-1 rounded-md text-gray-700 active:scale-95 transition-all duration-200 ease-out"
          >
            Add to Cart
          </button>
        ) : (
          <>
            <div className="flex space-x-4 py-1 items-center">
              <button
                onClick={handleMinus}
                className="text-lg font-bold text-red-400 active:shadow-sm active:scale-90 transition-all duration-100 w-5 rounded-full bg-gray-200"
              >
                -
              </button>
              <span className=" w-10">{quantity}</span>
              <button
                onClick={handlePlus}
                className="text-lg font-bold text-cyan-500 active:shadow-sm active:scale-90 transition-all duration-100 w-5 rounded-full bg-gray-200"
              >
                +
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
