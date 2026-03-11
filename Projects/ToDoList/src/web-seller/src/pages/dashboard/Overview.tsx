import { useState, useEffect } from 'react';
import { DollarSign, ShoppingCart, Package, Users, Loader2, CalendarDays } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentOrdersTable } from '@/components/dashboard/RecentOrdersTable';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { salesData, topProducts } from '@/data/dummyData';
import { getAllOrders } from '@/api/order.api';
import { getSellerProduct } from '@/api/products.api';
import { useAuth } from '@/contexts/AuthContext';

export default function Overview() {
  const { accessToken, user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [ordersRes, productsRes] = await Promise.allSettled([
          getAllOrders(),
          accessToken ? getSellerProduct(accessToken) : Promise.resolve({ prod: [] }),
        ]);

        if (ordersRes.status === 'fulfilled' && ordersRes.value?.success) {
          setOrders(ordersRes.value.orders || []);
        }
        if (productsRes.status === 'fulfilled') {
          const prods = (productsRes.value as any)?.prod || [];
          setProductCount(prods.length || 0);
        }
      } catch (err) {
        console.error('Overview fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [accessToken]);

  // Compute real stats
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrders = orders.length;
  const uniqueCustomers = new Set(orders.map(o => o.user)).size;

  const recentOrders = orders.slice(0, 5).map(o => ({
    id: `#${(o._id || '').slice(-6).toUpperCase()}`,
    customer: `${o.firstName || ''} ${o.lastName || ''}`.trim() || 'Customer',
    product: (o.cartItems || []).length > 0
      ? `${o.cartItems[0]?.name || 'Item'}${o.cartItems.length > 1 ? ` +${o.cartItems.length - 1}` : ''}`
      : 'Items',
    amount: o.total || 0,
    status: (o.status || 'Processing').toLowerCase(),
    date: o.createdAt,
  }));

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="animate-slide-up">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Welcome back, <span className="text-primary">{user?.name?.split(' ')[0] || 'Seller'}</span> 👋
            </h1>
            <p className="text-muted-foreground mt-1">Here's what's happening with your store today.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>{today}</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value={`₹${totalRevenue.toLocaleString('en-IN')}`}
          change={0}
          icon={DollarSign}
          gradient="gradient-emerald"
          delay={50}
        />
        <StatsCard
          title="Total Orders"
          value={totalOrders.toLocaleString()}
          change={0}
          icon={ShoppingCart}
          gradient="gradient-indigo"
          delay={100}
        />
        <StatsCard
          title="Products"
          value={productCount.toString()}
          change={0}
          icon={Package}
          gradient="gradient-amber"
          delay={150}
        />
        <StatsCard
          title="Customers"
          value={uniqueCustomers.toLocaleString()}
          change={0}
          icon={Users}
          gradient="gradient-rose"
          delay={200}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4 animate-slide-up border-border/50" style={{ animationDelay: '250ms' }}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Sales Overview</CardTitle>
                <CardDescription className="text-xs">Revenue performance over the last 7 months</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <SalesChart data={salesData} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 animate-slide-up border-border/50" style={{ animationDelay: '300ms' }}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Top Products</CardTitle>
            <CardDescription className="text-xs">Best performing products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.slice(0, 5).map((product, index) => (
                <div key={product.name} className="flex items-center justify-between group hover:bg-muted/40 -mx-2 px-2 py-1.5 rounded-lg transition-colors duration-150">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary text-sm font-bold shrink-0">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium leading-tight">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-foreground">₹{product.revenue.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="animate-slide-up border-border/50" style={{ animationDelay: '350ms' }}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-semibold">Recent Orders</CardTitle>
              <CardDescription className="text-xs">Your latest orders at a glance</CardDescription>
            </div>
            {recentOrders.length > 0 && (
              <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                {orders.length} total
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-14 w-14 rounded-2xl bg-muted/70 flex items-center justify-center mb-3">
                <ShoppingCart className="h-6 w-6 text-muted-foreground/50" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">No orders yet</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Orders will appear here once customers start purchasing.</p>
            </div>
          ) : (
            <RecentOrdersTable orders={recentOrders} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
