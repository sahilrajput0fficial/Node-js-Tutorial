import React from "react";
import { Link } from "react-router-dom";

const DisplayProdCard = ({ data }) => {
    return (
        <Link to={`/products/${data.slug}`} className="block h-full outline-none group rounded-2xl">
            <div className="bg-card bg-[#fafafa] rounded-2xl pb-1  shadow-sm border border-border h-full overflow-hidden transition-all duration-300 hover:shadow-xl  relative flex flex-col">
                <div className="relative w-full aspect-square  overflow-hidden bg-secondary/30">
                    {data.metatitle && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 bg-black backdrop-blur-md text-primary-foreground text-[10px] font-bold tracking-wider uppercase rounded-full z-10 shadow-sm">
                            {data.metatitle}
                        </span>
                    )}
                    <img
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        src={data.variants?.[0]?.images?.[0] || 'https://via.placeholder.com/400'}
                        alt={data.name}
                        loading="lazy"
                    />
                </div>

                {data.prop?.[0] && (
                    <div className="bg-[#FCC50B] border-b border-border/50 rounded-b-lg w-full px-4 py-2 flex justify-between items-center">
                        <span className="font-semibold text-xs tracking-wider text-black lowercase truncate">{data.prop[0]}</span>
                        <div className="flex items-center gap-1 bg-background shadow-sm px-2 py-0.5 rounded-full border border-border/50 shrink-0">
                            <svg className="w-3 h-3 text-yellow-500 fill-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                            <span className="text-[10px] font-bold text-foreground">{parseFloat(data.rating || 0).toFixed(1)}</span>
                        </div>
                    </div>
                )}

                <div className="px-4 pt-4 flex bg-[#fafafa] flex-col flex-1">
                    <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-tight overflow-x-hideen text-ellipsis mb-3 transition-colors">
                        {data.name}
                    </h3>
                    <div className="border-b-2 border-dashed border-gray-200 h-1"></div>
                    <div className="mt-auto">
                        {data.variants?.[0]?.discount ? (
                            <div className="space-y-0.5">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-lg font-bold text-foreground">
                                        ₹{Math.round(data.variants[0].price * (1 - (data.variants[0].discount / 100)))}
                                    </span>
                                    <span className="text-xs text-muted-foreground line-through decoration-muted-foreground/50">
                                        ₹{data.variants[0].price}
                                    </span>
                                    <span className="inline-block text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                                        {data.variants[0].discount}% OFF
                                    </span>
                                </div>

                            </div>
                        ) : (
                            <div className="text-lg font-bold text-foreground">
                                ₹{data.variants?.[0]?.price || 0}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default DisplayProdCard;
