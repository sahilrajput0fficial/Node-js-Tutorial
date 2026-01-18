import React from "react";
import DisplayProdCard from "./DisplayProdCard"; // assuming same folder

const ProductList = () => {
  return (
    <div className="grid grid-cols-6 md:grid-cols-6 sm:grid-cols-3 gap-4 p-4">
      {products.map((prod, index) => (
        <DisplayProdCard
          key={index}
          img={prod.img}
          title={prod.title}
          battery={prod.battery}
          rating={prod.rating}
        />
      ))}
    </div>
  );
};

export default ProductList;
