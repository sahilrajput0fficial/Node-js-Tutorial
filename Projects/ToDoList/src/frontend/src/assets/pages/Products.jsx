import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  Star,
  Heart,
  Share2,
  MapPin,
  Truck,
  Gift,
  Tag,
  ChevronRight,
  Check,
} from "lucide-react";
import { getProductData } from "../api/products.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import discount from "../utils/discount";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Spinner } from "@radix-ui/themes";
import { getAvail } from "../api/delivery.api";
import { useCart } from "@/context/CartContext";
const Products = () => {
  const {cartItems, setCartItems} = useCart();
  const params = useParams();
  //const [data, setdata] = useState({});
  const [availability, setAvailability] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [pincode, setPincode] = useState("");
  const [variantIdx, setVariantIdx] = useState(0);

  const {
    data: product = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["prod-detail", params.slug],
    queryFn: async() => {
      return await getProductData(params.slug);
    },
  });


  const handleChange = async () => {
    if (!pincode) return alert("Enter pincode");
    if (!variantData) return;

    const data = await getAvail(product._id, variantData._id, pincode);

    const etaDate = new Date(data.eta);

    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    const formattedETA = {
      day: days[etaDate.getDay()],
      date: etaDate.getDate().toString(),
      month: etaDate.toLocaleString("en-IN", { month: "short" }),
      year: etaDate.getFullYear(),
      time: etaDate.toLocaleString("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };

    console.log( {...data,
      formattedETA})

    setAvailability({
      ...data,
      formattedETA,
    });
  };
const AddtoCart = (prod, variantId) => {
  setCartItems((prev) => {
    const exists = prev.find(
      (item) =>
        item._id.toString() === prod._id.toString() &&
        item.variant === variantId
    );

    if (exists) {
      return prev.map((item) =>
        item._id.toString() === prod._id.toString() &&
        item.variant === variantId
          ? { ...item, qty: item.qty + 1 }
          : item
      );
    }

    return [
      ...prev,
      {
        ...prod,
        qty: 1,
        variant: variantId,
      },
    ];
  });
};




  const variantData = useMemo(() => {
    if (isLoading || !product?.variants?.length) return null;
    return product.variants[variantIdx];
  }, [product, variantIdx, isLoading]);
  const colorOptions = product.variants
    ? product.variants.map((item) => item.color)
    : [];
  const thumbnails = {};
  product?.variants?.forEach((item, key) => {
    let imageArray = item.images;
    thumbnails[key] = imageArray;
  });

  const activeOffers = [
    {
      tag: "MOST POPULAR",
      label: "Buy 2 or more",
      discount: "Get RS 60 OFF",
      code: "BOAT2",
    },
    {
      tag: "BEST VALUE",
      label: "Buy 5 or more",
      discount: "Get RS 200 OFF",
      code: "BOAT5",
    },
    {
      tag: "MOST SAVINGS",
      label: "Buy 10 or more",
      discount: "Get RS 500 OFF",
      code: "BOAT10",
    },
  ];

  if (isLoading) return <Spinner />;
  if (isError) return <p>Failed to load products</p>;

  return (
    <>
      <div className="min-h-screen mt-10 bg-background">
        {/* Header */}

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 text-sm">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/category">All Collections</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/category/${product.category.title}`}>
                    {product.category.title || "Hello"}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage>
                  <b>{product.name}</b>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Image Gallery */}
            <div className="sticky flex gap-4">
              {/* Thumbnails */}
              <div className="flex flex-col gap-3">
                {thumbnails[variantIdx].map((thumb, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <img
                      src={thumb}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 bg-muted rounded-2xl  flex  justify-center relative">
                <img
                  src={thumbnails[variantIdx][selectedImage] || ""}
                  alt="boAt Stone 350 Pro"
                  className="max-w-full max-h-150 object-cover rounded-2xl"
                />
                <span className="absolute bottom-4 left-4 text-xs text-muted-foreground flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full bg-muted-foreground/20 flex items-center justify-center text-[10px]">
                    360°
                  </span>
                  View Product
                </span>
              </div>
            </div>

            {/* Right: Product Info */}
            <div className=" space-y-5">
              {/* Badge & Rating */}
              <div className="flex items-center gap-3">
                {/* <span className="px-2 py-1 bg-boat-teal text-primary-foreground text-xs font-semibold rounded">
                  #1 SELLING
                </span> */}
                <div className="flex gap-2 items-center ">
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating}
                    </span>
                    <span className="text-sm flex items-center gap-x-0.5 text-muted-foreground">
                      (9
                      <img
                        src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Mask_group-10.png?v=1677571152"
                        style={{
                          width: "12px",
                          height: "12px",
                          verticalAlign: "middle",
                        }}
                        alt="verified reviews"
                      ></img>
                      )
                    </span>
                  </div>
                  <div className="border border-[#D73334] text-[#D73334] bg-[#FCF3F3] px-2 py-1 rounded-full">
                    <p className="text-boat-teal text-sm font-medium mb-1">
                      Earn upto 94 boAt reward points on this product!
                    </p>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                  {product.name}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {product.description}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-center gap-1">
                <span className="text-3xl font-bold text-foreground">
                  ₹{discount(variantData.price, variantData.discount)}
                </span>
                <span className="text-md text-gray-500 text-muted-foreground line-through">
                  ₹{variantData.price}
                </span>
                <span className="px-2 py-1 text-[#00C68C] text-success text-sm font-medium rounded">
                  {variantData.discount}% OFF
                </span>
              </div>

              {/* EMI Options */}
              <div className="bg-[#f0f3f8] rounded-lg p-2 text-sm w-4/5">
                <span className="font-medium">Pay </span>
                <span className="bg-[#00C68C] text-white px-1 py-0.5 rounded-md font-semibold">
                  ₹633
                </span>
                <span className="text-muted-foreground">
                  {" "}
                  now. Rest in 0% Interest EMIs via{" "}
                </span>
                <span className="font-medium">Simpl</span>
                <span className="text-muted-foreground"> Pay Later</span>
                <p className="text-sm text-muted-foreground mt-1">
                  UPI & Cards Accepted • Powered by Simpl
                </p>
              </div>

              {/* Color Options */}
              <div>
                <p className="text-sm font-semibold mb-3">
                  Choose your colour:{" "}
                  <span className="font-medium">
                    {colorOptions[selectedColor].name}
                  </span>
                </p>
                <div className="flex gap-3">
                  {colorOptions.map((option, index) => (
                    <button
                      key={option.name}
                      onClick={() => {
                        setSelectedColor(index);
                        setVariantIdx(index);
                      }}
                      style={{ backgroundColor: option.code }}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === index
                          ? "border-primary ring-2 ring-primary/30"
                          : "border-border hover:border-muted-foreground"
                      }`}
                      aria-label={option.name}
                    />
                  ))}
                </div>
              </div>

              {/* Check Delivery */}
              <div className="flex justify-between items-center bg-[#F6F6F8] rounded-lg p-4 w-9/12">
                <div>
                  <p className="text-sm font-medium mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Check Delivery
                  </p>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Enter Pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleChange();
                      }}
                      className=" bg-black text-white cursor-pointer"
                    >
                      Change
                    </Button>
                  </div>
                  <div>
                    {availability ? (
                      availability.deliverable ?(
                        <>
                        <p className="text-sm mt-3 flex items-center gap-2 font-semibold text-success">
                      {availability?.shipping==0 || availability?.shipping=='FREE'? (
                      <span className="text-[#00C68C] ">Free Delivery</span>
                      ) : 
                      <span className="text-black ">${availability?.shipping}</span>

                      }
                      | By {" "}
                      {availability?.formattedETA?.day}, {availability?.formattedETA?.date} {availability?.formattedETA?.month}
                    </p>
                        </>

                      ):(
                        <>
                        <p className="text-sm mt-3 flex items-center gap-2 font-semibold text-red-900">Sorry ! Not Deliverable At your address right now</p>
                        </>

                      )
                      
                    ):(
                      <div></div>
                    )}
                  </div>
                  <div className={(!availability ? (availability?.deliverable ? 'bg-red-400':'bg-green-300'):'hidden')}>
                    
                </div>
                </div>
                <div>
                  <img className="w-16 pr-2"src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Layer_1_2_da487286-f7ce-4762-87ca-5e9ebebbc3b5.png?v=1730964519" alt="delivery"></img>
                </div>
              </div>

              {/* Rewards */}
              <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Gift className="w-4 h-4  " />
                  Rewards and Payment Offers
              </p>
              <div className="rounded-lg w-10/12 p-4">
                
                <div className="flex items-center justify-between border-b border-b-gray-400  bg-[#F6F6F8] rounded-lg p-3">
                  <span className="text-sm font-semibold">
                    Redeem upto 10% off additionally with boAt rewards
                  </span>
                  <div>
                    <img className="max-h-10" src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/boAt_Rewards_logo.png?v=1694079279" loading="lazy" alt="boAt Rewards"  width="40" height="40"></img>
                  </div>
                  
                </div>
              </div>

              {/* Active Offers */}
              <div>
                <p className="text-sm font-medium mb-3">Active Offers</p>
                <div className="grid grid-cols-3 gap-3 ">
                  {activeOffers.map((offer) => (
                    <div
                      key={offer.code}
                      className="bg-activeBg border border-gray-400 rounded-lg p-3 text-center hover:border-primary transition-colors cursor-pointer"
                    >
                      <span className="absolute top-0 text-[10px] px-2 py-0.5 bg-boat-teal text-primary-foreground rounded-full font-medium">
                        {offer.tag}
                      </span>
                      <p className="text-sm font-medium mt-2">{offer.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {offer.discount}
                      </p>
                      <p className="text-xs font-medium text-boat-teal mt-1">
                        Code: {offer.code}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4 pt-2">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1 text-base py-6"
                  onClick = {()=>{
                    AddtoCart(product,variantIdx);
                  }}
                >
                  Add To Cart
                </Button>
                <Button size="lg" className="flex-1  py-6 ">
                  Buy Now
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-6 pt-4 border-t border-border">
                {[
                  { icon: Truck, label: "Free Shipping" },
                  { icon: Check, label: "1 Year Warranty" },
                  { icon: Gift, label: "Easy Returns" },
                ].map((badge) => (
                  <div
                    key={badge.label}
                    className="flex items-center gap-2 text-muted-foreground text-sm"
                  >
                    <badge.icon className="w-4 h-4" />
                    <span>{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
      </div>
      <div>Done redirected to product page</div>
      <div>{params.slug}</div>
    </>
  );
};

export default Products;
