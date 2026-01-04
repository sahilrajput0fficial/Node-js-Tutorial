import React, { useEffect, useState } from "react";
import DisplayProdCard from "../content/DisplayProdCard";
import ProductList from "../content/ProductList";
import HomeHeadings from "../content/HomeHeadings";
import { ViewAll } from "@/components/ui/view-all";
import { getSaleLiveData } from "@/assets/api/products.api";
import Logo from "../content/Logo";
const SaleIsLive = () => {
  const [productList, setproductList] = useState([]);
  const [filter, setfilter] = useState(["New Launches"])
  useEffect(() => {
    const fetchProd = async () => {
      const { data } = await getSaleLiveData();
      setproductList(data);
      console.log(data);
    };
    fetchProd();
  }, []);

  return (
    <>
      <div className="w-full px-12 my-8">
        <div className="flex justify-between items-center ">
          <div>
            <HomeHeadings H1="Top Picks" H2="For You" />
          </div>
          <ViewAll />
        </div>
        <div className="flex gap-6">
          <span className={`p-2 cursor-pointer transition-all ease-in-out ${ filter === "New Launches" ? "rounded-full bg-gray-100": ""}`} onClick={()=>{

            setfilter("New Launches")
            console.log("New Launches");
            
          }}>New Launches</span>
          <span onClick={()=>{
            setfilter("Personalisation")
            console.log("Personalisation");
          }}>Personalisation</span>
        </div>
        <div className="grid grid-cols-6 md:grid-cols-6 sm:grid-cols-3 gap-1 p-4">
        {filter === "New Launches" ? (
        productList.map((data, idx) => (
          <DisplayProdCard key={idx} data={data} />
        ))
        ) : filter === "Personalisation" ? (
        <Logo />
        ) : null}

        </div>
      </div>
    </>
  );
};

export default SaleIsLive;
