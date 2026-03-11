import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, MoreHorizontal, Package as PackageIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { getSellerProduct } from "@/./api/products.api.js";
import { useAuth } from '@/contexts/AuthContext';

export default function Products() {
  const { toast } = useToast();
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      if (!accessToken) {
        navigate("/auth");
      }

      try {
        const { prod: productData } = await getSellerProduct(accessToken);
        setProducts(productData);
        return productData;
      } catch (err) {
        toast({
          title: "Internal Server Error",
          description: `Not able to fetch the products at current time.`,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  const getStockLevel = (stock: number) => {
    if (stock === 0) return { label: 'Out of Stock', bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' };
    if (stock <= 10) return { label: 'Low Stock', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' };
    return { label: 'In Stock', bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' };
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-slide-up">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground text-sm">Manage your product inventory</p>
          </div>
          {products?.length > 0 && (
            <Badge variant="secondary" className="bg-primary/10 text-primary font-semibold h-6 text-xs">
              {products.length} items
            </Badge>
          )}
        </div>
        <Button
          onClick={() => navigate('/dashboard/products/add')}
          className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 font-semibold gap-2 h-10"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Products Table Card */}
      <Card className="animate-slide-up border-border/50" style={{ animationDelay: '100ms' }}>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base font-semibold">All Products</CardTitle>
              <CardDescription className="text-xs">{products?.length || 0} products in your store</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-9 h-9 bg-muted/50 border-transparent focus:border-primary/30 focus:bg-card transition-all text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredProducts?.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="h-16 w-16 rounded-2xl bg-muted/70 flex items-center justify-center mb-4">
                <PackageIcon className="h-7 w-7 text-muted-foreground/40" />
              </div>
              <p className="font-medium text-muted-foreground">No products found</p>
              <p className="text-xs text-muted-foreground/60 mt-1 max-w-[280px]">
                {searchQuery ? 'Try adjusting your search query' : 'Start by adding your first product'}
              </p>
              {!searchQuery && (
                <Button
                  size="sm"
                  className="mt-4 gap-2"
                  onClick={() => navigate('/dashboard/products/add')}
                >
                  <Plus className="h-4 w-4" />
                  Add Product
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Product</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Category</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Price</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Stock</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Status</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts?.map((product, idx) => {
                  const stock = product.variants[0]?.stock || 0;
                  const stockLevel = getStockLevel(stock);

                  return (
                    <TableRow key={idx} className="hover:bg-muted/40 transition-colors duration-150 group">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-11 w-11 rounded-lg border border-border/50 overflow-hidden bg-muted/30 shrink-0">
                            <img
                              src={product.variants[0]?.images[0]}
                              alt={product.variants[0]?.name}
                              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <span className="font-medium text-sm">{product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{product.category.title}</TableCell>
                      <TableCell className="font-semibold text-sm">₹{(product.variants[0]?.price || 0).toLocaleString('en-IN')}</TableCell>
                      <TableCell>
                        <span className={cn(
                          'text-sm font-medium',
                          stock === 0 ? 'text-red-600' : stock <= 10 ? 'text-amber-600' : 'text-foreground'
                        )}>
                          {stock}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={cn(
                          'text-[11px] font-semibold gap-1.5 pl-2 pr-2.5 py-0.5 border-0',
                          stockLevel.bg, stockLevel.text
                        )}>
                          <span className={cn('h-1.5 w-1.5 rounded-full', stockLevel.dot)} />
                          {stockLevel.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-36">
                            <DropdownMenuItem className="text-sm">Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-sm">Duplicate</DropdownMenuItem>
                            <DropdownMenuItem className="text-sm text-destructive focus:text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
