import { useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  Truck,
  Tag,
  Shield,
  CheckCircle2,
  Smartphone,
  BadgeIndianRupee,
  Lock,
  ChevronRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { placeOrder, getCouponStatus } from "../api/order.api";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const INDIAN_STATES = [
  // States (28)
  { code: "AP", name: "Andhra Pradesh" },
  { code: "AR", name: "Arunachal Pradesh" },
  { code: "AS", name: "Assam" },
  { code: "BR", name: "Bihar" },
  { code: "CT", name: "Chhattisgarh" },
  { code: "GA", name: "Goa" },
  { code: "GJ", name: "Gujarat" },
  { code: "HR", name: "Haryana" },
  { code: "HP", name: "Himachal Pradesh" },
  { code: "JH", name: "Jharkhand" },
  { code: "KA", name: "Karnataka" },
  { code: "KL", name: "Kerala" },
  { code: "MP", name: "Madhya Pradesh" },
  { code: "MH", name: "Maharashtra" },
  { code: "MN", name: "Manipur" },
  { code: "ML", name: "Meghalaya" },
  { code: "MZ", name: "Mizoram" },
  { code: "NL", name: "Nagaland" },
  { code: "OD", name: "Odisha" },
  { code: "PB", name: "Punjab" },
  { code: "RJ", name: "Rajasthan" },
  { code: "SK", name: "Sikkim" },
  { code: "TN", name: "Tamil Nadu" },
  { code: "TS", name: "Telangana" },
  { code: "TR", name: "Tripura" },
  { code: "UP", name: "Uttar Pradesh" },
  { code: "UK", name: "Uttarakhand" },
  { code: "WB", name: "West Bengal" },
  // Union Territories (8)
  { code: "AN", name: "Andaman and Nicobar Islands" },
  { code: "CH", name: "Chandigarh" },
  { code: "DN", name: "Dadra and Nagar Haveli and Daman and Diu" },
  { code: "DL", name: "Delhi" },
  { code: "JK", name: "Jammu and Kashmir" },
  { code: "LA", name: "Ladakh" },
  { code: "LD", name: "Lakshadweep" },
  { code: "PY", name: "Puducherry" },
];

const PAYMENT_METHODS = [
  {
    value: "card",
    label: "Credit / Debit Card",
    desc: "Visa, Mastercard, Rupay",
    icon: CreditCard,
  },
  {
    value: "upi",
    label: "UPI",
    desc: "GPay, PhonePe, Paytm, BHIM",
    icon: Smartphone,
  },
  {
    value: "cod",
    label: "Cash on Delivery",
    desc: "Pay when your order arrives",
    icon: BadgeIndianRupee,
  },
];



const FormField = ({ label, required, children }) => (
  <div className="space-y-1">
    <Label className="text-sm font-medium text-foreground">
      {label} {required && <span className="text-primary">*</span>}
    </Label>
    {children}
  </div>
);

const sectionClass =
  "bg-card border border-border rounded-lg overflow-hidden mb-4";
const sectionHeaderClass =
  "flex items-center gap-3 px-5 py-4 border-b border-border bg-secondary/20";
const inputClass =
  "h-10 rounded-md border-border bg-background text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-colors";

const Checkout = () => {
  const navigate = useNavigate()
  useAuth(); // Keeping hook if it's needed for side effects, but removed unused destructure
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    address: "",
    locality: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
    upi: ""
  });
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [ModalLink, setModalLink] = useState("/");
  const [ModalLinkText, setModalLinkText] = useState("Continue Shopping");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalStatus, setModalStatus] = useState("none"); // none, loading, success, error
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const { cartItems, setCartItems } = useCart();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.qty || item.quantity || 1),
    0
  );
  const shipping = subtotal > 999 ? 0 : 99;
  const discount = couponApplied ? couponDiscount : 0;
  const total = subtotal + shipping - discount;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(false);
    setCouponCode("");
    setCouponDiscount(0);
  };

  const handleApplyCoupon = async () => {
    try {
      const response = await getCouponStatus(couponCode);
      if (response.success) {
        setCouponCode(response.data.code);
        setCouponDiscount(response.data.discount_value);
        setCouponApplied(true);
        setModalStatus("success");
        setModalTitle("Coupon Applied!");
        setModalMessage(`Success! Coupon ${response.data.code} has been applied to your order.`);
        setShowModal(true);
        setModalLink("/checkout");
        setModalLinkText("Proceed to Payment");
      } else {
        setCouponApplied(false);
        setModalStatus("error");
        setModalTitle("Invalid Coupon!");
        setModalMessage("The coupon is either not exists or expired!");
        setShowModal(true);
        setModalLink("/checkout");
        setModalLinkText("Try Again");
      }
    } catch (error) {
      console.error("Coupon application failed:", error);
      setCouponApplied(false);
      setModalStatus("error");
      setModalTitle("Invalid Coupon!");
      setModalMessage(
        "The coupon is either not exists or expired!"
      );
      setShowModal(true);
      setModalLink("/checkout");
      setModalLinkText("Try Again");
    }
  };

  const handlePlaceOrder = async () => {
    if (
      !formData.firstName ||
      !formData.city ||
      !formData.state ||
      !formData.pincode ||
      !formData.mobile ||
      !formData.address
    ) {
      setModalStatus("error");
      setModalTitle("Wait!");
      setModalMessage(
        "Please fill all required fields to proceed with your order."
      );
      setShowModal(true);
      return;
    }

    if (paymentMethod === "card") {
      if (
        !formData.cardNumber ||
        !formData.cardName ||
        !formData.expiry ||
        !formData.cvv
      ) {
        setModalStatus("error");
        setModalTitle("Wait!");
        setModalMessage(
          "Please fill all required fields to proceed with your order."
        );
        setShowModal(true);
        return;
      }
    }
    else if (paymentMethod === "upi") {
      if (!formData.upi) {
        setModalStatus("error");
        setModalTitle("Wait!");
        setModalMessage(
          "Please fill to proceed with your order."
        );
        setShowModal(true);
        return;
      }
    }

    setModalStatus("loading");
    setModalTitle("Placing Order...");
    setShowModal(true);

    const orderData = {
      ...formData,
      paymentMethod,
      cartItems,
      subtotal,
      shipping,
      discount,
      total,
    };

    try {
      const response = await placeOrder(orderData);
      console.log(response);

      setModalStatus("success");
      setModalTitle("Order Successful!");
      setModalMessage(
        `Thank you for your purchase! Your order has been placed successfully. Order ID: ${response?.data?.order?._id || "#" + Math.random().toString(36).substr(2, 9).toUpperCase()
        }`
      );
      setModalLink("/orders");
      setModalLinkText("View Orders");



      // Clear cart
      setCartItems([]);
      localStorage.removeItem("cart-items");

    } catch (error) {
      console.error("Order placement failed:", error);
      setModalStatus("error");
      setModalTitle("Order Failed");
      setModalMessage(
        error.response?.data?.message ||
        "Something went wrong while placing your order. Please try again."
      );
    }
  };
  if (cartItems.length === 0) {
    navigate("/")
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-background">

      {/* ── Top Bar ── */}
      <header className="bg-white dark:bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link
            to="/cart"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Link>

          <span className="text-border mx-1">|</span>

          <span className="text-base font-semibold text-foreground">
            Checkout
          </span>

          <div className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5 text-green-600" />
            <span className="text-green-700 dark:text-green-500 font-medium">
              100% Secure Checkout
            </span>
          </div>
        </div>
      </header>

      {/* ── Progress Steps ── */}
      <div className="bg-white dark:bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <ol className="flex text-xs font-medium text-muted-foreground h-10 items-center gap-1">
            {["Cart", "Address", "Payment", "Confirmation"].map((step, i) => (
              <li key={step} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3 w-3" />}
                <span
                  className={
                    i === 1 || i === 2
                      ? "text-primary font-semibold"
                      : i < 1
                        ? "text-foreground/60 line-through"
                        : ""
                  }
                >
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* ── Main Content ── */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── LEFT: Address + Payment ── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Delivery Address */}
            <div className={sectionClass}>
              <div className={sectionHeaderClass}>
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  1
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    Delivery Address
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Enter your shipping details
                  </p>
                </div>
                <Truck className="h-4 w-4 text-muted-foreground ml-auto" />
              </div>

              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField label="First Name" required>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Rahul"
                    className={inputClass}
                  />
                </FormField>
                <FormField label="Last Name" >
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Sharma"
                    className={inputClass}
                  />
                </FormField>
                <FormField label="Mobile Number" required>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-muted-foreground bg-secondary border border-r-0 border-border rounded-l-md">
                      +91
                    </span>
                    <Input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="98765 43210"
                      className={`${inputClass} rounded-l-none`}
                    />
                  </div>
                </FormField>
                <FormField label="Email Address" >
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="rahul@example.com"
                    className={inputClass}
                  />
                </FormField>
                <FormField label="Flat / House No. / Building" required>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House No. 12, Block B"
                    className={`${inputClass} md:col-span-2`}
                  />
                </FormField>
                <FormField label="Area / Locality / Street">
                  <Input
                    name="locality"
                    value={formData.locality}
                    onChange={handleChange}
                    placeholder="Connaught Place"
                    className={inputClass}
                  />
                </FormField>
                <FormField label="Landmark">
                  <Input
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    placeholder="Near Metro Station"
                    className={inputClass}
                  />
                </FormField>
                <FormField label="City / Town" required>
                  <Input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="New Delhi"
                    className={inputClass}
                  />
                </FormField>
                <FormField label="State" required>
                  <Select
                    value={formData.state}
                    onValueChange={(val) =>
                      setFormData((prev) => ({ ...prev, state: val }))
                    }
                  >
                    <SelectTrigger className={inputClass}>
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border rounded-md max-h-60">
                      {INDIAN_STATES.map((state) => (
                        <SelectItem key={state.code} value={state.name}>
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="PIN Code" required>
                  <Input
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="110001"
                    maxLength={6}
                    className={inputClass}
                  />
                </FormField>
              </div>
            </div>

            {/* Payment Method */}
            <div className={sectionClass}>
              <div className={sectionHeaderClass}>
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  2
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">
                    Payment Method
                  </p>
                  <p className="text-xs text-muted-foreground">
                    All transactions are 256-bit encrypted
                  </p>
                </div>
                <Shield className="h-4 w-4 text-muted-foreground ml-auto" />
              </div>

              <div className="flex flex-col md:flex-row">
                {/* Method tabs */}
                <div className="md:w-56 border-b md:border-b-0 md:border-r border-border bg-secondary/10">
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    {PAYMENT_METHODS.map(({ value, label, desc, icon: Icon }) => (
                      <label
                        key={value}
                        className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer border-b border-border/50 transition-colors ${paymentMethod === value
                          ? "bg-primary/5 border-l-2 border-l-primary"
                          : "hover:bg-secondary/30"
                          }`}
                      >
                        <RadioGroupItem
                          value={value}
                          className="border-primary text-primary"
                        />
                        <Icon
                          className={`h-4 w-4 shrink-0 ${paymentMethod === value
                            ? "text-primary"
                            : "text-muted-foreground"
                            }`}
                        />
                        <div>
                          <p
                            className={`text-sm font-medium ${paymentMethod === value
                              ? "text-primary"
                              : "text-foreground"
                              }`}
                          >
                            {label}
                          </p>
                          <p className="text-xs text-muted-foreground leading-tight">
                            {desc}
                          </p>
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                {/* Method detail panel */}
                <div className="flex-1 p-5">
                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-semibold text-foreground">
                          Card Details
                        </p>
                        <div className="flex items-center gap-1.5 opacity-70">
                          {["VISA", "MC", "RUPAY"].map((n) => (
                            <span
                              key={n}
                              className="text-[10px] font-bold border border-border rounded px-1.5 py-0.5 text-muted-foreground"
                            >
                              {n}
                            </span>
                          ))}
                        </div>
                      </div>
                      <FormField label="Card Number" required>
                        <Input required
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          placeholder="0000  0000  0000  0000"
                          maxLength={19}
                          className={inputClass}
                        />
                      </FormField>
                      <FormField label="Name on Card" required>
                        <Input required
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          placeholder="RAHUL SHARMA"
                          className={`${inputClass} uppercase`}
                        />
                      </FormField>
                      <div className="grid grid-cols-2 gap-4">
                        <FormField label="Expiry Date" required>
                          <Input required
                            name="expiry"
                            value={formData.expiry}
                            onChange={handleChange}
                            placeholder="MM / YY"
                            maxLength={7}
                            className={inputClass}
                          />
                        </FormField>
                        <FormField label="CVV" required>
                          <Input required
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            placeholder="• • •"
                            type="password"
                            maxLength={3}
                            className={inputClass}
                          />
                        </FormField>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Lock className="h-3 w-3" />
                        Your card data is never stored on our servers.
                      </p>
                    </div>
                  )}

                  {paymentMethod === "upi" && (
                    <div className="space-y-4">
                      <p className="text-sm font-semibold text-foreground mb-2">
                        Pay via UPI
                      </p>
                      <FormField label="UPI ID (VPA)" required>
                        <div className="flex">
                          <Input required
                            name="upi"
                            value={formData.upi}
                            onChange={handleChange}
                            placeholder="yourname@okicici"
                            className={`${inputClass} rounded-r-none`}
                          />
                          <Button
                            variant="secondary"
                            className="rounded-l-none h-10 px-4 border border-l-0 border-border text-sm font-medium"
                          >
                            Verify
                          </Button>
                        </div>
                      </FormField>
                      <p className="text-xs text-muted-foreground">
                        Enter your UPI ID and click Verify. You'll receive a
                        payment request on your UPI app.
                      </p>
                      <div className="flex flex-wrap gap-3 pt-1">
                        {["GPay", "PhonePe", "Paytm", "BHIM"].map((app) => (
                          <span
                            key={app}
                            className="text-xs border border-border rounded-full px-3 py-1 text-muted-foreground bg-secondary/30"
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {paymentMethod === "cod" && (
                    <div className="flex flex-col items-center justify-center h-full py-8 text-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                        <BadgeIndianRupee className="h-6 w-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">
                          Cash on Delivery
                        </p>
                        <p className="text-xs text-muted-foreground mt-1 max-w-[220px]">
                          Pay with cash when your order is delivered to your
                          doorstep. No extra charges.
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground bg-secondary/30 border border-border rounded px-3 py-2">
                        ⚠️ COD may not be available for all pin codes.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Order Summary ── */}
          <div className="lg:sticky lg:top-20 h-fit space-y-4">

            {/* Cart Items */}
            <div className="bg-white dark:bg-card border border-border rounded-lg overflow-hidden">
              <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                <h2 className="font-semibold text-sm text-foreground">
                  Order Summary
                </h2>
                <span className="text-xs text-muted-foreground">
                  {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="divide-y divide-border max-h-[260px] overflow-y-auto">
                {cartItems.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6 px-4">
                    Your cart is empty.
                  </p>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item._id || item.id}
                      className="flex gap-3 px-4 py-3"
                    >
                      <div className="w-14 h-14 rounded border border-border bg-secondary/20 overflow-hidden shrink-0">
                        <img
                          src={
                            item.images?.[0] ||
                            item.image ||
                            "https://placehold.co/100"
                          }
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground line-clamp-2 leading-snug">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Qty: {item.qty || item.quantity || 1}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-foreground shrink-0">
                        ₹{item.price * (item.qty || item.quantity || 1)}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Coupon */}
            <div className="bg-white dark:bg-card border border-border rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <Tag className="h-4 w-4 text-primary" />
                Apply Coupon
              </p>
              {couponApplied ? (
                <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md px-3 py-2 mt-3">
                  <p className="text-xs text-green-900 dark:text-green-600 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {couponCode} — ₹{couponDiscount} off applied!
                  </p>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-xs text-muted-foreground hover:text-destructive ml-2 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="h-9 text-sm rounded-md border-border bg-background uppercase"
                    />
                    <Button
                      onClick={handleApplyCoupon}
                      disabled={!couponCode.trim()}
                      variant="outline"
                      className="h-9 px-4 text-sm font-semibold border-primary text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-60"
                    >
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Try: <span className="font-mono font-medium">BOAT200</span>
                  </p>
                </>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="bg-white dark:bg-card border border-border rounded-lg p-4 text-sm">
              <p className="font-semibold text-foreground mb-3">
                Price Details
              </p>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Price ({cartItems.length} item
                    {cartItems.length !== 1 ? "s" : ""})
                  </span>
                  <span className="text-foreground">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Charges</span>
                  {shipping === 0 ? (
                    <span className="text-green-600 font-medium">
                      FREE
                    </span>
                  ) : (
                    <span className="text-foreground">₹{shipping}</span>
                  )}
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coupon Discount</span>
                    <span className="font-medium">− ₹{discount}</span>
                  </div>
                )}
                <div className="border-t border-border pt-2.5 mt-1 flex justify-between font-bold text-base">
                  <span className="text-foreground">Total Amount</span>
                  <span className="text-foreground">₹{total}</span>
                </div>
              </div>

              {shipping === 0 && (
                <p className="text-xs text-green-600 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded px-2.5 py-1.5 mt-3">
                  🎉 You're saving ₹99 on delivery!
                </p>
              )}
            </div>

            {/* Place Order CTA */}
            <Button
              onClick={handlePlaceOrder}
              disabled={cartItems.length === 0}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base rounded-lg transition-colors disabled:opacity-50"
            >
              Place Order · ₹{total}
            </Button>

            <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1.5 pb-2">
              <Shield className="h-3.5 w-3.5 text-green-600" />
              Safe and Secure Payments. Easy returns. 100% Authentic products.
            </p>
          </div>
        </div>
      </main>

      {/* Status Modal */}
      <Dialog open={showModal} onOpenChange={modalStatus !== 'loading' ? setShowModal : undefined}>
        <DialogContent className="sm:max-w-md border-none p-0 overflow-hidden bg-card rounded-2xl shadow-2xl">
          <div className="p-8 text-center space-y-6">
            {/* dynamic icon */}
            <div className="flex justify-center">
              {modalStatus === "loading" && (
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-4 border-primary/20 animate-pulse" />
                  <Loader2 className="h-10 w-10 text-primary animate-spin absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
              )}
              {modalStatus === "success" && (
                <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center animate-in zoom-in duration-300">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
              )}
              {modalStatus === "error" && (
                <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center animate-in zoom-in duration-300">
                  <AlertCircle className="h-10 w-10 text-red-600" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <DialogTitle className={`text-2xl font-bold ${modalStatus === 'error' ? 'text-red-600' :
                modalStatus === 'success' ? 'text-green-600' : 'text-foreground'
                }`}>
                {modalTitle}
              </DialogTitle>
              <DialogDescription className="text-base text-muted-foreground max-w-[280px] mx-auto">
                {modalMessage}
              </DialogDescription>
            </div>

            {modalStatus !== "loading" && (
              <div className="pt-4">
                {modalStatus === "success" ? (
                  <Button
                    asChild
                    className="w-full h-12 text-base font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
                  >
                    <Link to={ModalLink}>{ModalLinkText}</Link>
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowModal(false)}
                    variant="outline"
                    className="w-full h-12 text-base font-semibold border-2 rounded-xl hover:bg-secondary transition-all"
                  >
                    Close
                  </Button>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Checkout;