import { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X, Plus, Trash2 } from 'lucide-react';
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

export default function AddProduct() {
  const {accessToken , sellerId} = useAuth()
  const [categoryData, setCategoryData] = useState(null)
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    metatitle:'',
    category: '',
    images:[],
    prop: '',
    variants: []
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
      toast({
        title: "Invalid File Type",
        description: "Please select only image files.",
        variant: "destructive",
      });
      return;
    }

    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...validImages]
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, { colorName: '', hexCode: '', images: [], price: '', stock: '', sku: '', discount: '' }]
    }));
  };

  const updateVariant = (index: number, field: string, value: string | number | File[]) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant
      )
    }));
  };

  const removeVariant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);

    // Validate form
    if (!formData.name || !formData.category || formData.variants.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields and add at least one variant.",
        variant: "destructive",
      });
      return;
    }

    // Validate variants
    for (let i = 0; i < formData.variants.length; i++) {
      const variant = formData.variants[i];
      if (!variant.colorName || !variant.hexCode) {
        toast({
          title: "Validation Error",
          description: `Please fill in color name and hex code for variant ${i + 1}.`,
          variant: "destructive",
        });
        return;
      }
    }

    try {
      const response = await addProduct(accessToken, formData);
      console.log(response);
      toast({
        title: "Product Added",
        description: `${formData.name} has been added successfully.`,
      });
      navigate('/dashboard/products');
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard/products')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Add Product</h1>
          <p className="text-muted-foreground">Create a new product listing</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>Enter the information for your new product</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter product name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryData?.map(({title},idx:number)=>{
                      return(
                        <SelectItem key={idx} value={title}>{title}</SelectItem>

                      )
                    })}

                    <SelectItem value="Accessories">Accessories</SelectItem>
                    <SelectItem value="Clothing">Clothing</SelectItem>
                    <SelectItem value="Home">Home</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Product Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Enter detailed product description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="prop">Product Features (optional)</Label>
                <Textarea
                  id="prop"
                  placeholder="Enter Product Features (one per line)"
                  value={formData.prop}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      prop: e.target.value})
                    }
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metatitle">Product Tagline (optional)</Label>
                <Input
                  id="metatitle"
                  placeholder="Free Delivery"
                  value={formData.metatitle}
                  onChange={(e) => setFormData({ ...formData, metatitle: e.target.value })}
                />
              </div>
            </div>

            {/* Product Variants Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-medium">Product Variants *</Label>
                <Button type="button" variant="outline" size="sm" onClick={addVariant}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Variant
                </Button>
              </div>

              {formData.variants.length > 0 && (
                <div className="space-y-4">
                  {formData.variants.map((variant, index) => (
                    <Card key={index} className="p-4">
                      <div className="grid gap-4 md:grid-cols-7">
                        <div className="space-y-2">
                          <Label htmlFor={`variant-colorName-${index}`}>Color Name *</Label>
                          <Input
                            id={`variant-colorName-${index}`}
                            placeholder="e.g., Red"
                            value={variant.colorName}
                            onChange={(e) => updateVariant(index, 'colorName', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`variant-hexCode-${index}`}>Hex Code *</Label>
                          <Input
                            id={`variant-hexCode-${index}`}
                            type="color"
                            value={variant.hexCode}
                            onChange={(e) => updateVariant(index, 'hexCode', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`variant-price-${index}`}>Price ($)</Label>
                          <Input
                            id={`variant-price-${index}`}
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            value={variant.price}
                            onChange={(e) => updateVariant(index, 'price', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`variant-stock-${index}`}>Stock</Label>
                          <Input
                            id={`variant-stock-${index}`}
                            type="number"
                            min="0"
                            placeholder="0"
                            value={variant.stock}
                            onChange={(e) => updateVariant(index, 'stock', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`variant-sku-${index}`}>SKU</Label>
                          <Input
                            id={`variant-sku-${index}`}
                            placeholder="BOAT-STONE-PRO-BLACK"
                            value={variant.sku}
                            onChange={(e) => updateVariant(index, 'sku', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`variant-discount-${index}`}>Discount (%)</Label>
                          <Input
                            id={`variant-discount-${index}`}
                            type="number"
                            min="0"
                            max="100"
                            placeholder="0"
                            value={variant.discount}
                            onChange={(e) => 
                              updateVariant(index,'discount',e.target.value)
                            }
                          />
                        </div>
                        <div className="flex items-center">
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={() => removeVariant(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <Label htmlFor={`variant-images-${index}`}>Variant Images</Label>
                        <div className="flex items-center gap-4">
                          <Input
                            id={`variant-images-${index}`}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                              const files = Array.from(e.target.files || []);
                              const validImages = files.filter(file => file.type.startsWith('image/'));
                              if (validImages.length !== files.length) {
                                toast({
                                  title: "Invalid File Type",
                                  description: "Please select only image files.",
                                  variant: "destructive",
                                });
                                return;
                              }
                              updateVariant(index, 'images', validImages);
                            }}
                            className="hidden"
                          />
                          <Label htmlFor={`variant-images-${index}`} className="cursor-pointer">
                            <div className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                              <Upload className="h-4 w-4" />
                              <span>Upload Variant Images</span>
                            </div>
                          </Label>
                        </div>
                        {variant.images && variant.images.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                            {variant.images.map((image, imgIndex) => (
                              <div key={imgIndex} className="relative group">
                                <div className="w-20 h-20 rounded border overflow-hidden bg-muted">
                                  <img
                                    src={URL.createObjectURL(image)}
                                    alt={`Variant ${index + 1} image ${imgIndex + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-0 right-0 h-5 w-5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => {
                                    const newImages = variant.images.filter((_, i) => i !== imgIndex);
                                    updateVariant(index, 'images', newImages);
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <Button type="submit">Add Product</Button>
              <Button type="button" variant="outline" onClick={() => navigate('/dashboard/products')}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
