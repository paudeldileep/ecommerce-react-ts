import { FunctionComponent } from "react";
import ProductCard from "../components/ProductCard";

import products from "../data/products.json";

interface IStoreProps {}

const Store: FunctionComponent<IStoreProps> = (props) => {
  return (
    <div className="w-full bg-white flex flex-col px-5">
      <h2 className="text-left text-xl text-gray-700 font-semibold mb-5">
        All Products
      </h2>
      <div className="w-[90%] justify-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10">
        {products.map((item, index) => (
          <ProductCard
            key={item.id}
            itemId={item.id}
            itemName={item.name}
            itemImage={item.imgUrl}
            itemPrice={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Store;
