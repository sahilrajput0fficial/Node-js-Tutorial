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

  if (isLoading) return <div className="flex justify-center my-24"><div className="w-10 h-10 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div></div>;
  if (isError) return <p className="text-center text-destructive my-12">Failed to load products. Please try again later.</p>;

  const newLaunchData = productList.data?.filter(
    (p) => p.metatitle === "🎉 New Launch"
  ) || [];

  const personalisationData = productList.data?.filter(
    (p) => p.metatitle === "🎉 Engraving Available"
  ) || [];

  return (
    <section className="w-full max-w-9xl mx-auto px-6 lg:px-16 my-16 md:my-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <HomeHeadings H1="Top Picks" H2="For You" />
        </div>
        <ViewAll />
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <button
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${filter === "New Launches"
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          onClick={() => setFilter("New Launches")}
        >
          New Launches
        </button>

        <button
          className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${filter === "Personalisation"
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            }`}
          onClick={() => setFilter("Personalisation")}
        >
          Personalisation
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 animate-fade-in">
        {(filter === "New Launches"
          ? newLaunchData
          : personalisationData
        ).map((item, index) => (
          <div key={item.id} className={`animate-slide-up animate-stagger-${(index % 4) + 1}`}>
            <DisplayProdCard data={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SaleIsLive;
