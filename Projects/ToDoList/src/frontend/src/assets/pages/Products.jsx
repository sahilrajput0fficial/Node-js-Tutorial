import React, { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
  ShieldCheck,
  RotateCcw,
  ShoppingCart,
  Zap,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
} from "lucide-react";
import { getProductData } from "../api/products.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { getAvail } from "../api/delivery.api";
import { useCart } from "@/context/CartContext";

/* ── Static mock reviews ── */
const MOCK_REVIEWS = [
  { id: 1, name: "Arjun S.", rating: 5, date: "Jan 2025", title: "Absolutely love it!", body: "Sound quality is amazing. The bass is deep and the clarity is top-notch. Battery life is great too. Highly recommended for the price!", helpful: 42 },
  { id: 2, name: "Priya M.", rating: 4, date: "Dec 2024", title: "Great value for money", body: "Build quality is solid and the fit is comfortable. ANC works well in moderate noise environments. Minor issue with touch controls initially but got used to it.", helpful: 28 },
  { id: 3, name: "Rahul K.", rating: 5, date: "Nov 2024", title: "Best purchase this year!", body: "Incredible product. Paired instantly with my phone, sounds great during workouts, and the case charges quickly. Will definitely buy again.", helpful: 61 },
];

const StarRow = ({ rating, size = 4 }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star key={s} className={`w-${size} h-${size} ${s <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))}
  </div>
);

const RatingBar = ({ label, pct, count }) => (
  <div className="flex items-center gap-2 text-xs">
    <span className="w-8 text-right text-muted-foreground shrink-0">{label}★</span>
    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
      <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${pct}%` }} />
    </div>
    <span className="w-6 text-muted-foreground shrink-0">{count}</span>
  </div>
);

const Products = () => {
  const { cartItems, setCartItems } = useCart();
  const params = useParams();
  const navigate = useNavigate();

  const [availability, setAvailability] = useState(null);
  const [availLoading, setAvailLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [pincode, setPincode] = useState("");
  const [variantIdx, setVariantIdx] = useState(0);
  const [wishlist, setWishlist] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [specsOpen, setSpecsOpen] = useState(true);
  const [helpfulVotes, setHelpfulVotes] = useState({});

  const { data: product = {}, isLoading, isError } = useQuery({
    queryKey: ["prod-detail", params.slug],
    queryFn: () => getProductData(params.slug),
  });

  const variantData = useMemo(() => {
    if (isLoading || !product?.variants?.length) return null;
    return product.variants[variantIdx];
  }, [product, variantIdx, isLoading]);

  const colorOptions = product.variants ? product.variants.map((v) => v.color) : [];
  const thumbnails = {};
  product?.variants?.forEach((v, k) => { thumbnails[k] = v.images; });

  const effectivePrice = variantData?.discount
    ? discount(variantData.price, variantData.discount)
    : variantData?.price ?? 0;
  const savings = variantData?.discount
    ? Math.round((variantData.price * variantData.discount) / 100)
    : 0;

  /* ── feature highlights built from product data ── */
  const highlights = useMemo(() => {
    const specs = product?.specifications || {};
    const items = [];
    if (specs.batteryLife) items.push({ value: specs.batteryLife, unit: "Hr", label: "Total Battery", sub: "Playtime + Case" });
    if (specs.earbudLife) items.push({ value: specs.earbudLife, unit: "Hr", label: "Earbud Life", sub: "Per charge" });
    if (specs.latency) items.push({ value: specs.latency, unit: "ms", label: "Low Latency", sub: "Gaming mode" });
    if (specs.driverSize) items.push({ value: specs.driverSize, unit: "mm", label: "Driver Size", sub: "For rich audio" });
    // fallbacks if no specs
    if (items.length === 0) {
      items.push(
        { value: "24", unit: "Hr", label: "Total Battery", sub: "Earbud + Case" },
        { value: "65", unit: "dB", label: "Active Noise", sub: "Cancellation" },
        { value: "50", unit: "ms", label: "Low Latency", sub: "Gaming mode" }
      );
    }
    return items;
  }, [product]);

  /* ── Delivery check ── */
  const handleCheckDelivery = async () => {
    if (pincode.length < 6 || !variantData) return;
    setAvailLoading(true);
    try {
      const data = await getAvail(product._id, variantData._id, pincode);
      const etaDate = new Date(data.eta);
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      setAvailability({
        ...data,
        formattedETA: {
          day: days[etaDate.getDay()],
          date: etaDate.getDate(),
          month: etaDate.toLocaleString("en-IN", { month: "short" }),
        },
      });
    } catch { setAvailability({ deliverable: false }); }
    finally { setAvailLoading(false); }
  };

  /* ── Cart ── */
  const AddtoCart = (prod, vId) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i._id === prod._id && i.variant === vId);
      console.log(exists);


      let updated = exists
      if (updated) {
        updated = prev
          .map((item) =>
            item._id === prod._id && item.variant === vId
              ? { ...item, qty: Math.max(1, (item.qty || 1) + 1) }
              : item
          );
        //console.log(updated);

      }
      else {
        let { variants, ...item } = prod;
        // Destructure to exclude the variant's _id so it doesn't overwrite the product's _id
        const { _id: _, ...variantDetails } = variants[vId];
        updated = [...prev, { ...item, ...variantDetails, qty: 1, variant: vId }];
      }
      localStorage.setItem("cart-items", JSON.stringify(updated));
      return updated;
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (isLoading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-4 border-border border-t-primary animate-spin" />
    </div>
  );
  if (isError) return (
    <p className="text-center text-destructive my-20 font-medium">
      Failed to load product. Please try again.
    </p>
  );

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-background">

      {/* ───── Breadcrumb ───── */}
      <div className="bg-white dark:bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-2.5">
          <Breadcrumb>
            <BreadcrumbList className="text-xs">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/category" className="text-muted-foreground hover:text-primary transition-colors">
                    {product.category?.title || "Products"}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  <span className="text-foreground font-medium truncate max-w-[240px] inline-block align-bottom">
                    {product.name}
                  </span>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">

        {/* ═══════════════════════════════════════════
            SECTION 1 — Images + Core Info (2-col)
        ═══════════════════════════════════════════ */}
        <div className="grid lg:grid-cols-2 gap-5">

          {/* ── Images ── */}
          <div className="lg:sticky lg:top-20 h-fit space-y-2">
            {/* Main image */}
            <div className="bg-white dark:bg-card border border-border rounded-lg overflow-hidden relative flex justify-center aspect-square ">
              <img
                src={thumbnails[variantIdx]?.[selectedImage] || ""}
                alt={product.name || "Product"}
                className="max-h-full max-w-full object-cover"
              />
              {/* Overlay buttons */}
              <button
                onClick={() => setWishlist(!wishlist)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white dark:bg-card border border-border shadow-sm flex items-center justify-center hover:border-primary transition-colors"
              >
                <Heart className={`w-4 h-4 ${wishlist ? "fill-primary text-primary" : "text-muted-foreground"}`} />
              </button>
              <button className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white dark:bg-card border border-border shadow-sm flex items-center justify-center hover:border-primary transition-colors">
                <Share2 className="w-4 h-4 text-muted-foreground" />
              </button>
              {variantData?.discount > 0 && (
                <div className="absolute bottom-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded">
                  {variantData.discount}% OFF
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {(thumbnails[variantIdx]?.length ?? 0) > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {thumbnails[variantIdx].map((thumb, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-14 h-14 shrink-0 rounded-md border-2 overflow-hidden transition-all ${selectedImage === i ? "border-primary" : "border-border opacity-60 hover:opacity-100"
                      }`}
                  >
                    <img src={thumb} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Info ── */}
          <div className="space-y-3">

            {/* Title + Rating */}
            <div className="bg-white dark:bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <div className="flex items-center gap-1 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                  {parseFloat(product.rating || 4.5).toFixed(1)} <Star className="w-3 h-3 fill-white ml-0.5" />
                </div>
                <span className="text-xs text-muted-foreground">2,348 ratings</span>
                {variantData?.discount > 0 && (
                  <span className="ml-auto text-xs font-semibold bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded">
                    Special Offer
                  </span>
                )}
              </div>
              <h1 className="text-lg font-bold text-foreground leading-snug">{product.name}</h1>
              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                {product.description || "Experience premium quality and performance."}
              </p>
            </div>

            {/* Price */}
            <div className="bg-white dark:bg-card border border-border rounded-lg p-4">
              {variantData?.discount ? (
                <div className="space-y-1">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-foreground">₹{effectivePrice}</span>
                    <span className="text-lg text-muted-foreground line-through">₹{variantData.price}</span>
                    <span className="text-sm font-bold text-primary">{variantData.discount}% off</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-green-600 font-medium">
                    <Tag className="w-3.5 h-3.5" /> You save ₹{savings}
                  </div>
                </div>
              ) : (
                <span className="text-3xl font-black text-foreground">₹{variantData?.price}</span>
              )}
              <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes</p>
              <p className="text-xs text-muted-foreground border-t border-border mt-2.5 pt-2.5">
                EMI from ₹{Math.round((effectivePrice || 999) / 12)}/mo •{" "}
                <span className="text-primary cursor-pointer hover:underline">View plans</span>
              </p>
            </div>

            {/* Colour */}
            {colorOptions.length > 0 && (
              <div className="bg-white dark:bg-card border border-border rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-3">
                  Colour: <span className="text-muted-foreground font-normal">{colorOptions[selectedColor]?.name}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((opt, i) => (
                    <button
                      key={opt.name}
                      onClick={() => { setSelectedColor(i); setVariantIdx(i); setSelectedImage(0); setAvailability(null); }}
                      title={opt.name}
                      className={`relative w-11 h-11 rounded-full border-2 transition-all ${selectedColor === i ? "border-primary scale-110 shadow" : "border-border hover:border-gray-400"
                        }`}
                    >
                      <span className="w-8 h-8 rounded-full block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{ backgroundColor: opt.code || "#333" }} />
                      {selectedColor === i && (
                        <Check className="w-3.5 h-3.5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="bg-white dark:bg-card border border-border rounded-lg p-4 flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base rounded-md"
                onClick={() => { AddtoCart(product, variantIdx); navigate("/cart"); }}
              >
                <Zap className="w-4 h-4 mr-1.5" /> Buy Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className={`flex-1 h-12 text-base font-bold rounded-md border-2 transition-all ${addedToCart
                  ? "border-green-500 text-green-600 bg-green-50 dark:bg-green-900/20"
                  : "border-primary/40 text-primary hover:bg-primary/5 hover:border-primary"
                  }`}
                onClick={() => AddtoCart(product, variantIdx)}
              >
                {addedToCart ? <><Check className="w-4 h-4 mr-1.5" /> Added!</> : <><ShoppingCart className="w-4 h-4 mr-1.5" /> Add to Cart</>}
              </Button>
            </div>

            {/* Delivery */}
            <div className="bg-white dark:bg-card border border-border rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" /> Check Delivery
              </p>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Enter 6-digit pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  onKeyDown={(e) => e.key === "Enter" && handleCheckDelivery()}
                  className="h-9 text-sm rounded-md border-border"
                />
                <Button
                  onClick={handleCheckDelivery}
                  disabled={pincode.length < 6 || availLoading}
                  variant="outline"
                  className="h-9 px-5 text-sm font-semibold border-primary text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
                >
                  {availLoading ? "..." : "Check"}
                </Button>
              </div>

              {availability ? (
                <div className={`mt-3 text-sm rounded-md px-3 py-2 flex items-start gap-2 border ${availability.deliverable
                  ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-700 dark:text-green-400"
                  : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-destructive"
                  }`}>
                  <Truck className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    {availability.deliverable ? (
                      <>
                        <p className="font-semibold">
                          {availability.shipping === 0 || availability.shipping === "FREE" ? "Free Delivery" : `Delivery ₹${availability.shipping}`}
                        </p>
                        {availability.formattedETA && (
                          <p className="text-xs mt-0.5 opacity-80">
                            Expected by <span className="font-medium">{availability.formattedETA.day}, {availability.formattedETA.date} {availability.formattedETA.month}</span>
                          </p>
                        )}
                      </>
                    ) : (<p className="font-semibold">Not deliverable to this pincode</p>)}
                  </div>
                </div>
              ) : (
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-green-600" /> Free on orders ₹999+</span>
                  <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> Cash on Delivery</span>
                  <span className="flex items-center gap-1"><RotateCcw className="w-3.5 h-3.5 text-orange-500" /> 7-Day Returns</span>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* ═══════════════════════════════════════════
            SECTION 2 — Feature Highlight Banners
        ═══════════════════════════════════════════ */}
        <div>
          {/* Hero banner with product name */}
          <div className="rounded-xl overflow-hidden bg-[#1a1a1a] text-white relative min-h-[200px] flex items-center justify-between px-8 md:px-16 py-10">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent pointer-events-none" />
            {/* Left text */}
            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">boAt Originals</p>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none text-white">
                {product.name?.split(" ").slice(0, 2).join(" ") || "SUPREME"}
              </h2>
              <p className="text-sm text-white/60 mt-3 max-w-sm">
                {product.description?.substring(0, 90) || "Engineered for the bold. Crafted for the music lover in you."}...
              </p>
            </div>
            {/* Right product image */}
            <div className="relative z-10 hidden md:block">
              <img
                src={thumbnails[variantIdx]?.[0] || ""}
                alt={product.name}
                className="h-40 object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Stat tiles */}
          <div className="grid grid-cols-3 gap-3 mt-3">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="rounded-xl bg-[#1a1a1a] text-white flex flex-col items-center justify-center py-8 px-4 text-center"
              >
                <div className="flex items-end leading-none">
                  <span className="text-5xl md:text-6xl font-black text-white">{h.value}</span>
                  <span className="text-2xl font-bold text-primary ml-1 mb-1">{h.unit}</span>
                </div>
                <p className="text-sm font-semibold text-white mt-2">{h.label}</p>
                <p className="text-xs text-white/50 mt-0.5">{h.sub}</p>
              </div>
            ))}
          </div>

          {/* Marketing row — 2 banners */}
          <div className="grid md:grid-cols-2 gap-3 mt-3">
            <div className="rounded-xl bg-gradient-to-br from-[#2a1a0a] to-[#1a1a1a] text-white p-6 flex items-center gap-4 min-h-[130px]">
              <img src={thumbnails[variantIdx]?.[1] || thumbnails[variantIdx]?.[0] || ""} alt="" className="w-24 object-contain drop-shadow-xl" />
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-bold mb-1">Feature</p>
                <p className="text-xl font-black">Active Noise<br />Cancellation</p>
                <p className="text-xs text-white/50 mt-1">Block out the world</p>
              </div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-[#0a0a2a] to-[#1a1a1a] text-white p-6 flex items-center gap-4 min-h-[130px]">
              <img src={thumbnails[variantIdx]?.[2] || thumbnails[variantIdx]?.[0] || ""} alt="" className="w-24 object-contain drop-shadow-xl" />
              <div>
                <p className="text-xs uppercase tracking-widest text-blue-400 font-bold mb-1">Performance</p>
                <p className="text-xl font-black">Super Extra<br />Bass™</p>
                <p className="text-xs text-white/50 mt-1">Feel every beat</p>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            SECTION 3 — Product Specifications
        ═══════════════════════════════════════════ */}
        <div className="bg-white dark:bg-card border border-border rounded-lg overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-5 py-4 border-b border-border text-left"
            onClick={() => setSpecsOpen(!specsOpen)}
          >
            <span className="text-base font-bold text-foreground">Product Specifications</span>
            {specsOpen ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
          </button>

          {specsOpen && (
            <div className="divide-y divide-border/50">
              {[
                ["Brand", "boAt"],
                ["Model", product.name || "—"],
                ["Category", product.category?.title || "—"],
                ["Colour Options", colorOptions.map((c) => c.name).join(", ") || "—"],
                ["Price", `₹${effectivePrice}`],
                ...(product.specifications
                  ? Object.entries(product.specifications).map(([k, v]) => [
                    k.replace(/([A-Z])/g, " $1").trim(),
                    v,
                  ])
                  : [
                    ["Driver Size", "13mm"],
                    ["Frequency Response", "20Hz – 20kHz"],
                    ["Impedance", "32 Ω"],
                    ["Battery (Earbuds)", "Up to 8 Hr"],
                    ["Battery (Case)", "Up to 16 Hr"],
                    ["Charging Time", "1.5 Hr"],
                    ["Bluetooth Version", "v5.3"],
                    ["Connectivity Range", "10m"],
                    ["Water Resistance", "IPX5"],
                    ["Warranty", "1 Year"],
                  ]),
              ].map(([key, val], i) => (
                <div key={i} className={`flex text-sm ${i % 2 === 0 ? "bg-secondary/20" : ""}`}>
                  <span className="w-48 shrink-0 px-5 py-3 font-medium text-muted-foreground">{key}</span>
                  <span className="flex-1 px-5 py-3 text-foreground border-l border-border/40">{val}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ═══════════════════════════════════════════
            SECTION 4 — Ratings & Reviews
        ═══════════════════════════════════════════ */}
        <div className="bg-white dark:bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-base font-bold text-foreground">Ratings & Reviews</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-border">
            {/* Average score */}
            <div className="flex flex-col items-center justify-center p-6 gap-2">
              <span className="text-6xl font-black text-foreground">{parseFloat(product.rating || 4.5).toFixed(1)}</span>
              <StarRow rating={Math.round(product.rating || 4.5)} size={5} />
              <span className="text-sm text-muted-foreground">2,348 ratings</span>
            </div>

            {/* Rating bars */}
            <div className="p-6 space-y-2.5">
              <RatingBar label="5" pct={68} count={1596} />
              <RatingBar label="4" pct={18} count={422} />
              <RatingBar label="3" pct={7} count={164} />
              <RatingBar label="2" pct={4} count={94} />
              <RatingBar label="1" pct={3} count={72} />
            </div>

            {/* Summary */}
            <div className="p-6 flex flex-col gap-3">
              {[
                { label: "Sound Quality", pct: 92 },
                { label: "Battery Life", pct: 88 },
                { label: "Comfort", pct: 85 },
                { label: "Build Quality", pct: 80 },
              ].map(({ label, pct }) => (
                <div key={label}>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>{label}</span>
                    <span>{pct}%</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Individual reviews */}
          <div className="divide-y divide-border/60">
            {MOCK_REVIEWS.map((rev) => (
              <div key={rev.id} className="px-5 py-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-xs font-bold text-primary">
                        {rev.name[0]}
                      </div>
                      <span className="text-sm font-semibold text-foreground">{rev.name}</span>
                      <span className="text-xs text-muted-foreground">{rev.date}</span>
                    </div>
                    <StarRow rating={rev.rating} size={3} />
                    <p className="text-sm font-semibold text-foreground mt-2">{rev.title}</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{rev.body}</p>
                  </div>
                </div>
                <button
                  onClick={() => setHelpfulVotes((prev) => ({ ...prev, [rev.id]: !prev[rev.id] }))}
                  className={`mt-3 flex items-center gap-1.5 text-xs transition-colors ${helpfulVotes[rev.id] ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  Helpful ({rev.helpful + (helpfulVotes[rev.id] ? 1 : 0)})
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            SECTION 5 — Sticky Buy Bar (mobile)
        ═══════════════════════════════════════════ */}
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white dark:bg-card border-t border-border px-4 py-3 flex gap-3">
          <Button
            variant="outline"
            className="flex-1 h-11 font-bold border-2 border-primary text-primary hover:bg-primary/5"
            onClick={() => AddtoCart(product, variantIdx)}
          >
            <ShoppingCart className="w-4 h-4 mr-1.5" />
            {addedToCart ? "Added!" : "Add to Cart"}
          </Button>
          <Button
            className="flex-1 h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
            onClick={() => { AddtoCart(product, variantIdx); navigate("/cart"); }}
          >
            <Zap className="w-4 h-4 mr-1.5" /> Buy Now
          </Button>
        </div>

      </main>

      {/* bottom padding for mobile sticky bar */}
      <div className="h-20 lg:hidden" />
    </div>
  );
};

export default Products;
