import { useState } from "react";
import { Plus, Trash2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


interface Variant {
  id: string;
  color: string;
  images: string[];
  price: number;
  stock: number;
  sku: string;
  discount: number;
}

interface ProductData {
  slug: string;
  name: string;
  description: string;
  metatitle: string;
  category: string;
  rating: number;
  prop: string[];
  variants: Variant[];
}

const initialVariant: Variant = {
  id: crypto.randomUUID(),
  color: "",
  images: [""],
  price: 0,
  stock: 0,
  sku: "",
  discount: 0,
};

const initialProduct: ProductData = {
  slug: "",
  name: "",
  description: "",
  metatitle: "",
  category: "",
  rating: 0,
  prop: [""],
  variants: [{ ...initialVariant }],
};

const AddProductForm = () => {
  const [product, setProduct] = useState<ProductData>(initialProduct);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof ProductData, value: string | number) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const updateProp = (index: number, value: string) => {
    const newProps = [...product.prop];
    newProps[index] = value;
    setProduct((prev) => ({ ...prev, prop: newProps }));
  };

  const addProp = () => {
    setProduct((prev) => ({ ...prev, prop: [...prev.prop, ""] }));
  };

  const removeProp = (index: number) => {
    const newProps = product.prop.filter((_, i) => i !== index);
    setProduct((prev) => ({ ...prev, prop: newProps }));
  };

  const updateVariant = (variantIndex: number, field: keyof Variant, value: string | number | string[]) => {
    const newVariants = [...product.variants];
    newVariants[variantIndex] = { ...newVariants[variantIndex], [field]: value };
    setProduct((prev) => ({ ...prev, variants: newVariants }));
  };

  const updateVariantImage = (variantIndex: number, imageIndex: number, value: string) => {
    const newVariants = [...product.variants];
    const newImages = [...newVariants[variantIndex].images];
    newImages[imageIndex] = value;
    newVariants[variantIndex] = { ...newVariants[variantIndex], images: newImages };
    setProduct((prev) => ({ ...prev, variants: newVariants }));
  };

  const addVariantImage = (variantIndex: number) => {
    const newVariants = [...product.variants];
    newVariants[variantIndex] = {
      ...newVariants[variantIndex],
      images: [...newVariants[variantIndex].images, ""],
    };
    setProduct((prev) => ({ ...prev, variants: newVariants }));
  };

  const removeVariantImage = (variantIndex: number, imageIndex: number) => {
    const newVariants = [...product.variants];
    const newImages = newVariants[variantIndex].images.filter((_, i) => i !== imageIndex);
    newVariants[variantIndex] = { ...newVariants[variantIndex], images: newImages };
    setProduct((prev) => ({ ...prev, variants: newVariants }));
  };

  const addVariant = () => {
    setProduct((prev) => ({
      ...prev,
      variants: [...prev.variants, { ...initialVariant, id: crypto.randomUUID() }],
    }));
  };

  const removeVariant = (index: number) => {
    const newVariants = product.variants.filter((_, i) => i !== index);
    setProduct((prev) => ({ ...prev, variants: newVariants }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    console.log("Product Data:", JSON.stringify(product, null, 2));
    
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Product added successfully! Check console for data.");
    }, 1000);
  };

  return (
    <div className="bg-background border-t border-border">
      <div className="max-w-4xl mx-auto px-4 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">Add New Product</h2>
          <p className="text-muted-foreground mt-1">Fill in the product details below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-5">
            <h3 className="text-lg font-semibold text-foreground border-b border-border pb-3">
              Basic Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  placeholder="boAt Stone 350 Pro"
                  value={product.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  placeholder="boat-stone-pro"
                  value={product.slug}
                  onChange={(e) => updateField("slug", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Portable Bluetooth Speaker with 14W boAt Signature Sound..."
                value={product.description}
                onChange={(e) => updateField("description", e.target.value)}
                rows={3}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="metatitle">Meta Title / Badge</Label>
                <Input
                  id="metatitle"
                  placeholder="🎉 Engraving Available"
                  value={product.metatitle}
                  onChange={(e) => updateField("metatitle", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category ID *</Label>
                <Input
                  id="category"
                  placeholder="6959ed0dd6621216dd1314e2"
                  value={product.category}
                  onChange={(e) => updateField("category", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">Rating (0-5)</Label>
              <Input
                id="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                placeholder="4.6"
                value={product.rating || ""}
                onChange={(e) => updateField("rating", parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          {/* Properties */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-lg font-semibold text-foreground">Properties / Features</h3>
              <Button type="button" variant="outline" size="sm" onClick={addProp}>
                <Plus className="w-4 h-4 mr-1" />
                Add Property
              </Button>
            </div>

            <div className="space-y-3">
              {product.prop.map((prop, index) => (
                <div key={index} className="flex gap-3">
                  <Input
                    placeholder="12 hours playback"
                    value={prop}
                    onChange={(e) => updateProp(index, e.target.value)}
                    className="flex-1"
                  />
                  {product.prop.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeProp(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Variants */}
          <div className="bg-card border border-border rounded-xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="text-lg font-semibold text-foreground">Product Variants</h3>
              <Button type="button" variant="outline" size="sm" onClick={addVariant}>
                <Plus className="w-4 h-4 mr-1" />
                Add Variant
              </Button>
            </div>

            <div className="space-y-6">
              {product.variants.map((variant, variantIndex) => (
                <div
                  key={variant.id}
                  className="border border-border rounded-lg p-5 bg-muted/30 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-boat-teal">
                      Variant {variantIndex + 1}
                    </span>
                    {product.variants.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeVariant(variantIndex)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Remove
                      </Button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Color ID *</Label>
                      <Input
                        placeholder="695e789bbb7d6aef4449aa96"
                        value={variant.color}
                        onChange={(e) => updateVariant(variantIndex, "color", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>SKU *</Label>
                      <Input
                        placeholder="BOAT-STONE-PRO-BLACK"
                        value={variant.sku}
                        onChange={(e) => updateVariant(variantIndex, "sku", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Price (₹) *</Label>
                      <Input
                        type="number"
                        min="0"
                        placeholder="4990"
                        value={variant.price || ""}
                        onChange={(e) => updateVariant(variantIndex, "price", parseFloat(e.target.value) || 0)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Stock *</Label>
                      <Input
                        type="number"
                        min="0"
                        placeholder="10"
                        value={variant.stock || ""}
                        onChange={(e) => updateVariant(variantIndex, "stock", parseInt(e.target.value) || 0)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Discount (%)</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="62"
                        value={variant.discount || ""}
                        onChange={(e) => updateVariant(variantIndex, "discount", parseFloat(e.target.value) || 0)}
                      />
                    </div>
                  </div>

                  {/* Variant Images */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Images (URLs)</Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => addVariantImage(variantIndex)}
                      >
                        <Upload className="w-4 h-4 mr-1" />
                        Add Image
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {variant.images.map((image, imageIndex) => (
                        <div key={imageIndex} className="flex gap-2">
                          <Input
                            placeholder="https://res.cloudinary.com/..."
                            value={image}
                            onChange={(e) => updateVariantImage(variantIndex, imageIndex, e.target.value)}
                            className="flex-1"
                          />
                          {variant.images.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeVariantImage(variantIndex, imageIndex)}
                              className="text-destructive hover:text-destructive"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => setProduct(initialProduct)}
            >
              Reset Form
            </Button>
            <Button type="submit" size="lg" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? "Adding Product..." : "Add Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
