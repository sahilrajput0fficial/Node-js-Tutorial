import { useState } from "react";
import { Star, Heart, Share2, MapPin, Truck, Gift, Tag, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import speakerMain from "@@/boat-speaker-main.png";
// import speakerThumb1 from "@@/boat-speaker-thumb1.png";
// import speakerThumb2 from "@@/boat-speaker-thumb2.png";
// import speakerThumb3 from "@@/boat-speaker-thumb3.png";
// import speakerThumb4 from "@@/boat-speaker-thumb4.png";

const thumbnails = ["/boat-speaker-main.png", "/boat-speaker-thumb1.png", "/boat-speaker-thumb1.png", "/boat-speaker-thumb1.png", "/boat-speaker-thumb1.png"];

const colorOptions = [
  { name: "Raging Black", color: "bg-zinc-900", selected: true },
  { name: "Navy Blue", color: "bg-blue-900" },
  { name: "Teal", color: "bg-teal-500" },
];

const activeOffers = [
  { tag: "MOST POPULAR", label: "Buy 2 or more", discount: "Get RS 60 OFF", code: "BOAT2" },
  { tag: "BEST VALUE", label: "Buy 5 or more", discount: "Get RS 200 OFF", code: "BOAT5" },
  { tag: "MOST SAVINGS", label: "Buy 10 or more", discount: "Get RS 500 OFF", code: "BOAT10" },
];

const BoatProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [pincode, setPincode] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}

      {/* Breadcrumb */}


      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Image Gallery */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-3">
              {thumbnails.map((thumb, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-border hover:border-muted-foreground"
                  }`}
                >
                  <img src={thumb} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 bg-muted rounded-2xl p-8 flex items-center justify-center relative">
              <img
                src={thumbnails[selectedImage] || speakerMain}
                alt="boAt Stone 350 Pro"
                className="max-w-full max-h-125 object-contain"
              />
              <span className="absolute bottom-4 left-4 text-xs text-muted-foreground flex items-center gap-1">
                <span className="w-4 h-4 rounded-full bg-muted-foreground/20 flex items-center justify-center text-[10px]">360°</span>
                View Product
              </span>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-5">
            {/* Badge & Rating */}
            <div className="flex items-center gap-3">
              <span className="px-2 py-1 bg-boat-teal text-primary-foreground text-xs font-semibold rounded">
                #1 SELLING
              </span>
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(2,847 reviews)</span>
              </div>
            </div>

            {/* Title */}
            <div>
              <p className="text-boat-teal text-sm font-medium mb-1">
                Earn upto 94 boAt reward points on this product!
              </p>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                boAt Stone 350 Pro
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Portable Bluetooth Speaker with 14W boAt Signature Sound, 12 Hours Playback, RGB LEDs
              </p>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-foreground">₹1,899</span>
              <span className="text-lg text-muted-foreground line-through">₹3,290</span>
              <span className="px-2 py-1 bg-green-100 text-success text-sm font-semibold rounded">
                42% OFF
              </span>
            </div>

            {/* EMI Options */}
            <div className="bg-muted rounded-lg p-3 text-sm">
              <span className="font-medium">Pay </span>
              <span className="text-boat-teal font-semibold">₹633</span>
              <span className="text-muted-foreground"> now. Rest in 0% Interest EMIs via </span>
              <span className="font-medium">Simpl</span>
              <span className="text-muted-foreground"> Pay Later</span>
              <p className="text-xs text-muted-foreground mt-1">
                UPI & Cards Accepted • Powered by Simpl
              </p>
            </div>

            {/* Color Options */}
            <div>
              <p className="text-sm font-medium mb-3">
                Choose your colour: <span className="font-semibold">{colorOptions[selectedColor].name}</span>
              </p>
              <div className="flex gap-3">
                {colorOptions.map((option, index) => (
                  <button
                    key={option.name}
                    onClick={() => setSelectedColor(index)}
                    className={`w-10 h-10 rounded-full ${option.color} border-2 transition-all ${
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
            <div className="border border-border rounded-lg p-4">
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
                <Button variant="outline">Change</Button>
              </div>
              <p className="text-sm mt-3 flex items-center gap-2 text-success">
                <Truck className="w-4 h-4" />
                Free delivery | By Thursday, 9 Jan
              </p>
            </div>

            {/* Rewards */}
            <div className="border border-border rounded-lg p-4">
              <p className="text-sm font-medium mb-2 flex items-center gap-2">
                <Gift className="w-4 h-4 text-boat-teal" />
                Rewards and Payment Offers
              </p>
              <div className="flex items-center justify-between bg-muted rounded-lg p-3">
                <span className="text-sm">Redeem upto 10% off additionally with boAt rewards</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            {/* Active Offers */}
            <div>
              <p className="text-sm font-medium mb-3">Active Offers</p>
              <div className="grid grid-cols-3 gap-3">
                {activeOffers.map((offer) => (
                  <div
                    key={offer.code}
                    className="border border-border rounded-lg p-3 text-center hover:border-primary transition-colors cursor-pointer"
                  >
                    <span className="text-[10px] px-2 py-0.5 bg-boat-teal text-primary-foreground rounded-full font-medium">
                      {offer.tag}
                    </span>
                    <p className="text-sm font-medium mt-2">{offer.label}</p>
                    <p className="text-xs text-muted-foreground">{offer.discount}</p>
                    <p className="text-xs font-medium text-boat-teal mt-1">Code: {offer.code}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 pt-2">
              <Button variant="outline" size="lg" className="flex-1 text-base py-6">
                Add To Cart
              </Button>
              <Button size="lg" className="flex-1 text-base py-6">
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
                <div key={badge.label} className="flex items-center gap-2 text-muted-foreground text-sm">
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
  );
};

export default BoatProductPage;
