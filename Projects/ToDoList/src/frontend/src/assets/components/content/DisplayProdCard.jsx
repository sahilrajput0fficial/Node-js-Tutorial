import React from "react";

const DisplayProdCard = ({data}) => {
    return (
        <>
        <a href= {`products/${data.slug}`}>
            <div className="bg-[#FAFAFA] rounded-xl pb-2 shadow-sm">
                <div className="relative flex flex-col justify-center items-center object-contain">
                    <span className="font-mono absolute py-0.5 left-0 top-0 px-1 bg-black text-white text-xs rounded-md rounded-l-xl rounded-b-md font-bold">{data.metatitle}</span>
                    <img className="rounded-t-xl w-full h-48" src={data.variants[0].images[0]} alt="boatEnergyShroom" />
                    <div className=" rounded-b-xl bg-[#FCC50B] w-full px-2 flex justify-between items-center gap-2 py-2">
                        <span className="font-medium text-xs">{data.prop[0]}</span>
                        <div className=" flex justify-center items-center gap-1 bg-white h-4 p-2 rounded-sm">
                            <img
                                src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/star-5_20X20.png?v=1722331088"
                                alt="star"
                                width="100"
                                height="100"
                                loading="lazy"
                                style={{"width": "14px","display": "inline-block","verticalAlign": "bottom"}}
                            />
                            <span className="text-xs font-mono ">{parseFloat(data.rating)}</span>
                        </div>
                    </div>
                    <p className="px-2 my-2 w-full text-md font-bold">{data.name}</p>
                    <div className=" border-b-2 border-b-[#d9d9d9] border-dashed w-11/12"></div>
                    <div className="px-2 w-full text-2xl py-0.5 font-semibold">
                        <p>${data.variants[0].price*(1-(data.variants[0].discount/100))}</p>
                    </div>
                    <div className="flex flex-row px-2 w-full gap-1 items-center">
                        <span className="text-gray-400 text-xs original line-through">${data.variants[0].price}</span>
                        <span className="text-xs text-[#12b985] font-semibold ">{data.variants[0].discount}% off</span>
                    </div>

                    

                </div>

            </div>
        </a>
        </>
    );
};

export default DisplayProdCard;
