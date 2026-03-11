import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X, Plus, Trash2, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { getCategory } from '@/api/category.api.js';
import { addProduct } from '@/api/products.api.js';
import { useAuth } from '@/contexts/AuthContext';

const steps = [
  { id: 1, title: 'Product Info' },
  { id: 2, title: 'Variants' },
  { id: 3, title: 'Review' },
];

export default function AddProduct() {
  const { accessToken, sellerId } = useAuth();
  const [categoryData, setCategoryData] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    metatitle: '',
    category: '',
    images: [],
    prop: '',
    variants: [],
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategory();
        setCategoryData(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validImages = files.filter(file => file.type.startsWith('image/'));
    if (validImages.length !== files.length) {
      toast({ title: "Invalid File Type", description: "Please select only image files.", variant: "destructive" });
      return;
    }
    setFormData(prev => ({ ...prev, images: [...prev.images, ...validImages] }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const addVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, { colorName: '', hexCode: '#6366f1', images: [], price: '', stock: '', sku: '', discount: '' }],
    }));
  };

  const updateVariant = (index: number, field: string, value: string | number | File[]) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.map((variant, i) => (i === index ? { ...variant, [field]: value } : variant)),
    }));
  };

  const removeVariant = (index: number) => {
    setFormData(prev => ({ ...prev, variants: prev.variants.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category || formData.variants.length === 0) {
      toast({ title: "Validation Error", description: "Please fill in all required fields and add at least one variant.", variant: "destructive" });
      return;
    }
    for (let i = 0; i < formData.variants.length; i++) {
      const variant = formData.variants[i];
      if (!variant.colorName || !variant.hexCode) {
        toast({ title: "Validation Error", description: `Please fill in color name and hex code for variant ${i + 1}.`, variant: "destructive" });
        return;
      }
    }
    try {
      const response = await addProduct(accessToken, formData);
      toast({ title: "Product Added", description: `${formData.name} has been added successfully.` });
      navigate('/dashboard/products');
    } catch (error) {
      console.error("Error adding product:", error);
      toast({ title: "Error", description: "Failed to add product. Please try again.", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate('/dashboard/products')}
          className="h-9 w-9 rounded-lg hover:bg-muted/70"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Add Product</h1>
          <p className="text-sm text-muted-foreground">Create a new product listing</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-2 flex-1">
            <button
              onClick={() => setCurrentStep(step.id)}
              className="flex items-center gap-2 group"
            >
              <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300 ${
                currentStep > step.id
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                  : currentStep === step.id
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {currentStep > step.id ? <Check className="h-3.5 w-3.5" /> : step.id}
              </div>
              <span className={`text-sm font-medium hidden sm:block ${
                currentStep === step.id ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step.title}
              </span>
            </button>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 rounded-full transition-colors duration-300 ${
                currentStep > step.id ? 'bg-emerald-500' : 'bg-border'
              }`} />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Product Info */}
        {currentStep === 1 && (
          <Card className="border-border/50 animate-scale-in">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Product Details</CardTitle>
              <CardDescription className="text-xs">Enter the basic information for your product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Product Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter product name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-10 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger className="h-10 bg-muted/30 border-muted-foreground/20">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryData?.map(({ title }, idx: number) => (
                        <SelectItem key={idx} value={title}>{title}</SelectItem>
                      ))}
                      <SelectItem value="Accessories">Accessories</SelectItem>
                      <SelectItem value="Clothing">Clothing</SelectItem>
                      <SelectItem value="Home">Home</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description" className="text-sm font-medium">Product Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter detailed product description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    className="bg-muted/30 border-muted-foreground/20 focus:border-primary/50 transition-colors resize-none"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="prop" className="text-sm font-medium">Product Features <span className="text-muted-foreground font-normal">(optional)</span></Label>
                  <Textarea
                    id="prop"
                    placeholder="Enter Product Features (one per line)"
                    value={formData.prop}
                    onChange={(e) => setFormData({ ...formData, prop: e.target.value })}
                    rows={3}
                    className="bg-muted/30 border-muted-foreground/20 focus:border-primary/50 transition-colors resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="metatitle" className="text-sm font-medium">Product Tagline <span className="text-muted-foreground font-normal">(optional)</span></Label>
                  <Input
                    id="metatitle"
                    placeholder="Free Delivery"
                    value={formData.metatitle}
                    onChange={(e) => setFormData({ ...formData, metatitle: e.target.value })}
                    className="h-10 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="gap-2 font-semibold shadow-lg shadow-primary/25"
                >
                  Continue to Variants
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Variants */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-scale-in">
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-semibold">Product Variants</CardTitle>
                    <CardDescription className="text-xs">Add color variants with pricing and stock</CardDescription>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={addVariant} className="gap-2 font-medium">
                    <Plus className="h-4 w-4" />
                    Add Variant
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {formData.variants.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="h-14 w-14 rounded-2xl bg-muted/70 flex items-center justify-center mb-3">
                      <Plus className="h-6 w-6 text-muted-foreground/50" />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">No variants yet</p>
                    <p className="text-xs text-muted-foreground/60 mt-1">Add at least one variant to continue</p>
                    <Button type="button" variant="outline" size="sm" className="mt-3 gap-2" onClick={addVariant}>
                      <Plus className="h-4 w-4" />
                      Add Variant
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData.variants.map((variant, index) => (
                      <Card key={index} className="border-border/50 bg-muted/20 animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <div
                                className="h-6 w-6 rounded-full border-2 border-white shadow-sm"
                                style={{ backgroundColor: variant.hexCode || '#6366f1' }}
                              />
                              <span className="text-sm font-semibold">
                                Variant {index + 1}{variant.colorName ? `: ${variant.colorName}` : ''}
                              </span>
                            </div>
                            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => removeVariant(index)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="grid gap-4 md:grid-cols-6">
                            <div className="space-y-1.5">
                              <Label className="text-xs font-medium">Color Name *</Label>
                              <Input placeholder="e.g., Red" value={variant.colorName} onChange={(e) => updateVariant(index, 'colorName', e.target.value)} className="h-9 text-sm bg-card" />
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-xs font-medium">Hex Code *</Label>
                              <Input type="color" value={variant.hexCode} onChange={(e) => updateVariant(index, 'hexCode', e.target.value)} className="h-9 px-1.5" />
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-xs font-medium">Price (₹)</Label>
                              <Input type="number" step="0.01" min="0" placeholder="0.00" value={variant.price} onChange={(e) => updateVariant(index, 'price', e.target.value)} className="h-9 text-sm bg-card" />
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-xs font-medium">Stock</Label>
                              <Input type="number" min="0" placeholder="0" value={variant.stock} onChange={(e) => updateVariant(index, 'stock', e.target.value)} className="h-9 text-sm bg-card" />
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-xs font-medium">SKU</Label>
                              <Input placeholder="SKU-001" value={variant.sku} onChange={(e) => updateVariant(index, 'sku', e.target.value)} className="h-9 text-sm bg-card" />
                            </div>
                            <div className="space-y-1.5">
                              <Label className="text-xs font-medium">Discount (%)</Label>
                              <Input type="number" min="0" max="100" placeholder="0" value={variant.discount} onChange={(e) => updateVariant(index, 'discount', e.target.value)} className="h-9 text-sm bg-card" />
                            </div>
                          </div>

                          {/* Variant Images */}
                          <div className="mt-4">
                            <Label className="text-xs font-medium mb-2 block">Variant Images</Label>
                            <div className="flex items-start gap-3 flex-wrap">
                              <Input
                                id={`variant-images-${index}`}
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => {
                                  const files = Array.from(e.target.files || []);
                                  const validImages = files.filter(file => file.type.startsWith('image/'));
                                  if (validImages.length !== files.length) {
                                    toast({ title: "Invalid File Type", description: "Please select only image files.", variant: "destructive" });
                                    return;
                                  }
                                  updateVariant(index, 'images', validImages);
                                }}
                                className="hidden"
                              />
                              <Label htmlFor={`variant-images-${index}`} className="cursor-pointer">
                                <div className="h-20 w-20 rounded-lg border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-1 transition-colors bg-card">
                                  <Upload className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-[10px] text-muted-foreground">Upload</span>
                                </div>
                              </Label>
                              {variant.images && variant.images.length > 0 && variant.images.map((image, imgIndex) => (
                                <div key={imgIndex} className="relative group">
                                  <div className="h-20 w-20 rounded-lg border overflow-hidden bg-muted">
                                    <img src={URL.createObjectURL(image)} alt={`Variant ${index + 1}`} className="w-full h-full object-cover" />
                                  </div>
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                                    onClick={() => { const newImages = variant.images.filter((_, i) => i !== imgIndex); updateVariant(index, 'images', newImages); }}
                                  >
                                    <X className="h-2.5 w-2.5" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => setCurrentStep(1)} className="font-medium">
                Back
              </Button>
              <Button type="button" onClick={() => setCurrentStep(3)} className="gap-2 font-semibold shadow-lg shadow-primary/25">
                Review & Submit
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-scale-in">
            <Card className="border-border/50 ">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Review Product</CardTitle>
                <CardDescription className="text-xs">Verify everything looks good before submitting</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Product Summary */}
                <div className="rounded-xl border border-border/50 p-4 bg-muted/20 space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground">Product Details</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground text-xs">Name</span>
                      <p className="font-medium mt-0.5">{formData.name || '—'}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">Category</span>
                      <p className="font-medium mt-0.5">{formData.category || '—'}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-muted-foreground text-xs">Description</span>
                      <p className="font-medium mt-0.5 text-sm">{formData.description || '—'}</p>
                    </div>
                    {formData.metatitle && (
                      <div>
                        <span className="text-muted-foreground text-xs">Tagline</span>
                        <p className="font-medium mt-0.5">{formData.metatitle}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Variants Summary */}
                <div className="rounded-xl border border-border/50 p-4 bg-muted/20 space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground">Variants ({formData.variants.length})</h3>
                  <div className="space-y-2">
                    {formData.variants.map((variant, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm p-2.5 rounded-lg bg-card border border-border/30">
                        <div className="h-5 w-5 rounded-full border-2 border-white shadow-sm shrink-0" style={{ backgroundColor: variant.hexCode || '#6366f1' }} />
                        <span className="font-medium flex-1">{variant.colorName || `Variant ${index + 1}`}</span>
                        <span className="text-muted-foreground">₹{variant.price || '0'}</span>
                        <span className="text-muted-foreground">{variant.stock || '0'} units</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => setCurrentStep(2)} className="font-medium">
                Back
              </Button>
              <Button type="submit" className="gap-2 font-semibold shadow-lg shadow-primary/25 bg-emerald-600 hover:bg-emerald-700">
                <Check className="h-4 w-4" />
                Publish Product
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
