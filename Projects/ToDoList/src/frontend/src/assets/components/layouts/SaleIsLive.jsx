import DisplayProdCard from "../content/DisplayProdCard";
import HomeHeadings from "../content/HomeHeadings";
import { ViewAll } from "@/components/ui/view-all";
import { useQuery } from "@tanstack/react-query";
import { getSaleLiveData } from "@/assets/api/products.api";
import { useState } from "react";

const SaleIsLive = () => {
  const [filter, setFilter] = useState("New Launches");

  const {
    data: productList = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getSaleLiveData, // MUST return data
  });
  

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Failed to load products</p>;

  const newLaunchData = productList.data.filter(
    (p) => p.metatitle === "🎉 New Launch"
  );

  const personalisationData = productList.data.filter(
    (p) => p.metatitle === "🎉 Engraving Available"
  );

  return (
    <div className="w-full px-12 my-8">
      <div className="flex justify-between items-center">
        <div>
        <HomeHeadings H1="Top Picks" H2="For You" />
        </div>
        <ViewAll />
      </div>

      <div className="flex gap-4 mt-4">
        <span
          className={`p-2 cursor-pointer ${
            filter === "New Launches"
              ? "rounded-full bg-[#E7EBEC] font-medium"
              : "text-[#9EA0A2]"
          }`}
          onClick={() => setFilter("New Launches")}
        >
          New Launches
        </span>

        <span
          className={`p-2 cursor-pointer ${
            filter === "Personalisation"
              ? "rounded-full bg-[#E7EBEC] font-medium"
              : "text-[#9EA0A2]"
          }`}
          onClick={() => setFilter("Personalisation")}
        >
          Personalisation
        </span>
      </div>

      <div className="grid grid-cols-6 gap-1 p-4">
        {(filter === "New Launches"
          ? newLaunchData
          : personalisationData
        ).map((item) => (
          <DisplayProdCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default SaleIsLive;
