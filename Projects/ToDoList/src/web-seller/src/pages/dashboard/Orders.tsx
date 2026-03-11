import { useState, useEffect } from 'react';
import { Search, Filter, Loader2, Eye, ChevronDown, Package, AlertCircle, ShoppingCart, Truck, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { getAllOrders, updateOrderStatus } from '@/api/order.api';

const statusConfig: Record<string, { bg: string; text: string; dot: string; icon: any }> = {
  Processing: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500', icon: Clock },
  Dispatched: { bg: 'bg-indigo-50', text: 'text-indigo-700', dot: 'bg-indigo-500', icon: Package },
  Shipped: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500', icon: Truck },
  Delivered: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', icon: CheckCircle2 },
  Pending: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500', icon: Clock },
  Cancelled: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500', icon: XCircle },
};

const STATUS_FLOW = ['Processing', 'Dispatched', 'Shipped', 'Delivered'];

const paymentMethodLabels: Record<string, string> = {
  card: 'Card',
  upi: 'UPI',
  cod: 'COD',
};

const formatDate = (dateString: string) => {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const formatTime = (dateString: string) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

export default function Orders() {
  const { toast } = useToast();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllOrders();
      if (response?.success) {
        setOrders(response.orders || []);
      } else {
        setOrders([]);
      }
    } catch (err: any) {
      console.error('Error fetching orders:', err);
      setError(err?.response?.data?.message || 'Failed to fetch orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      setUpdatingId(orderId);
      const response = await updateOrderStatus(orderId, newStatus);
      if (response?.success) {
        setOrders(prev => prev.map(o => (o._id === orderId ? { ...o, status: newStatus } : o)));
        if (selectedOrder?._id === orderId) {
          setSelectedOrder((prev: any) => ({ ...prev, status: newStatus }));
        }
        toast({ title: 'Status Updated', description: `Order status changed to ${newStatus}` });
      }
    } catch (err: any) {
      toast({ title: 'Update Failed', description: err?.response?.data?.message || 'Could not update status', variant: 'destructive' });
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter(order => {
    const name = `${order.firstName || ''} ${order.lastName || ''}`.toLowerCase();
    const id = (order._id || '').toLowerCase();
    const matchesSearch = name.includes(searchQuery.toLowerCase()) || id.includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status?.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // Status summary counts
  const statusCounts = orders.reduce((acc: Record<string, number>, order) => {
    const s = order.status || 'Pending';
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-sm text-muted-foreground">View and manage customer orders</p>
        </div>
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-red-50 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{error}</p>
              <p className="text-sm text-muted-foreground mt-1">Make sure you're logged in as a seller.</p>
            </div>
            <Button onClick={fetchOrders} variant="outline" className="font-medium">Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-slide-up">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-sm text-muted-foreground">View and manage customer orders</p>
      </div>

      {/* Status Summary Cards */}
      {orders.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 animate-slide-up" style={{ animationDelay: '50ms' }}>
          {['Pending', 'Processing', 'Dispatched', 'Shipped', 'Delivered', 'Cancelled'].map((status) => {
            const config = statusConfig[status] || statusConfig.Pending;
            const StatusIcon = config.icon;
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(statusFilter === status ? 'all' : status)}
                className={cn(
                  'flex items-center gap-2.5 p-3 rounded-xl border transition-all duration-200 text-left',
                  statusFilter === status
                    ? `${config.bg} border-current ${config.text} shadow-sm`
                    : 'bg-card border-border/50 hover:bg-muted/40'
                )}
              >
                <StatusIcon className={cn('h-4 w-4 shrink-0', statusFilter === status ? '' : 'text-muted-foreground')} />
                <div>
                  <p className="text-lg font-bold leading-none">{statusCounts[status] || 0}</p>
                  <p className="text-[11px] font-medium mt-0.5 opacity-70">{status}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Orders Table */}
      <Card className="border-border/50 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base font-semibold">All Orders</CardTitle>
              <CardDescription className="text-xs">{orders.length} total orders</CardDescription>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or ID..."
                  className="pl-9 h-9 bg-muted/50 border-transparent focus:border-primary/30 focus:bg-card transition-all text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36 h-9 bg-muted/50 border-transparent text-sm">
                  <Filter className="h-3.5 w-3.5 mr-1.5" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Dispatched">Dispatched</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
              <div className="h-14 w-14 rounded-2xl bg-muted/70 flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-muted-foreground/40" />
              </div>
              <p className="font-medium text-muted-foreground">
                {searchQuery || statusFilter !== 'all' ? 'No orders match your filters' : 'No orders yet'}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Order</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Customer</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Date</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Items</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Amount</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Payment</TableHead>
                  <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Status</TableHead>
                  <TableHead className="w-16"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => {
                  const items = order.cartItems || [];
                  const canUpdate = order.status !== 'Delivered' && order.status !== 'Cancelled';
                  const currentIdx = STATUS_FLOW.indexOf(order.status);
                  const nextStatuses = canUpdate ? STATUS_FLOW.filter((_, i) => i > currentIdx) : [];
                  const config = statusConfig[order.status] || statusConfig.Pending;

                  return (
                    <TableRow key={order._id} className="hover:bg-muted/40 transition-colors duration-150 group">
                      <TableCell className="font-mono text-xs font-semibold text-muted-foreground">
                        #{(order._id || '').slice(-8).toUpperCase()}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{order.firstName}{order.lastName ? ` ${order.lastName}` : ''}</p>
                          <p className="text-xs text-muted-foreground">{order.email || order.mobile || '—'}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</TableCell>
                      <TableCell className="text-sm">{items.length} item{items.length !== 1 ? 's' : ''}</TableCell>
                      <TableCell className="font-semibold text-sm">₹{(order.total || 0).toLocaleString('en-IN')}</TableCell>
                      <TableCell>
                        <span className="text-xs font-medium text-muted-foreground capitalize bg-muted/50 px-2 py-1 rounded-md">
                          {paymentMethodLabels[order.paymentMethod] || order.paymentMethod || '—'}
                        </span>
                      </TableCell>
                      <TableCell>
                        {canUpdate && nextStatuses.length > 0 ? (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                disabled={updatingId === order._id}
                                className={cn(
                                  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all cursor-pointer border-0',
                                  config.bg, config.text
                                )}
                              >
                                {updatingId === order._id ? (
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                  <>
                                    <span className={cn('h-1.5 w-1.5 rounded-full', config.dot)} />
                                    {order.status}
                                    <ChevronDown className="h-3 w-3 opacity-60" />
                                  </>
                                )}
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {nextStatuses.map((s) => (
                                <DropdownMenuItem key={s} onClick={() => handleStatusUpdate(order._id, s)} className="text-sm">
                                  Mark as {s}
                                </DropdownMenuItem>
                              ))}
                              <DropdownMenuItem className="text-destructive focus:text-destructive text-sm" onClick={() => handleStatusUpdate(order._id, 'Cancelled')}>
                                Cancel Order
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : (
                          <Badge variant="secondary" className={cn('text-[11px] font-semibold gap-1.5 pl-2 pr-2.5 py-0.5 border-0', config.bg, config.text)}>
                            <span className={cn('h-1.5 w-1.5 rounded-full', config.dot)} />
                            {order.status}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto scrollbar-thin">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-lg">
                  <Package className="h-5 w-5 text-primary" />
                  Order #{(selectedOrder._id || '').slice(-8).toUpperCase()}
                </DialogTitle>
                <DialogDescription className="text-xs">
                  Placed on {formatTime(selectedOrder.createdAt)}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5 mt-2">
                {/* Order Timeline */}
                <div className="flex items-center gap-0 overflow-x-auto pb-1">
                  {STATUS_FLOW.map((step, index) => {
                    const currentIdx = STATUS_FLOW.indexOf(selectedOrder.status);
                    const isCompleted = index <= currentIdx && selectedOrder.status !== 'Cancelled';
                    const isCurrent = index === currentIdx;
                    const stepConfig = statusConfig[step] || statusConfig.Pending;
                    const StepIcon = stepConfig.icon;

                    return (
                      <div key={step} className="flex items-center flex-1 min-w-0">
                        <div className="flex flex-col items-center gap-1.5">
                          <div className={cn(
                            'h-9 w-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300',
                            isCurrent ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-110'
                              : isCompleted ? 'bg-emerald-500 text-white'
                              : 'bg-muted text-muted-foreground'
                          )}>
                            {isCompleted && !isCurrent ? <CheckCircle2 className="h-4 w-4" /> : <StepIcon className="h-4 w-4" />}
                          </div>
                          <span className={cn('text-[10px] font-medium text-center', isCurrent ? 'text-foreground' : 'text-muted-foreground')}>
                            {step}
                          </span>
                        </div>
                        {index < STATUS_FLOW.length - 1 && (
                          <div className={cn('flex-1 h-0.5 rounded-full mx-1 mt-[-16px]', isCompleted && index < currentIdx ? 'bg-emerald-500' : 'bg-border')} />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Status + Payment Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                  <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Status</p>
                    <Badge variant="secondary" className={cn('text-[11px] font-semibold gap-1 pl-1.5 pr-2 py-0.5 border-0',
                      statusConfig[selectedOrder.status]?.bg, statusConfig[selectedOrder.status]?.text
                    )}>
                      <span className={cn('h-1.5 w-1.5 rounded-full', statusConfig[selectedOrder.status]?.dot)} />
                      {selectedOrder.status}
                    </Badge>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Payment</p>
                    <p className="font-semibold capitalize">{paymentMethodLabels[selectedOrder.paymentMethod] || selectedOrder.paymentMethod}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Pay Status</p>
                    <p className={cn('font-semibold',
                      selectedOrder.paymentStatus === 'Completed' ? 'text-emerald-600'
                        : selectedOrder.paymentStatus === 'Failed' ? 'text-red-600' : 'text-amber-600'
                    )}>
                      {selectedOrder.paymentStatus || 'Pending'}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Total</p>
                    <p className="font-bold text-base">₹{(selectedOrder.total || 0).toLocaleString('en-IN')}</p>
                  </div>
                </div>

                {/* Customer */}
                <div className="rounded-xl border border-border/50 p-4 bg-muted/10">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Customer Details</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground text-xs">Name</span>
                      <p className="font-medium">{selectedOrder.firstName} {selectedOrder.lastName}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">Mobile</span>
                      <p className="font-medium">+91 {selectedOrder.mobile}</p>
                    </div>
                    {selectedOrder.email && (
                      <div className="col-span-2">
                        <span className="text-muted-foreground text-xs">Email</span>
                        <p className="font-medium">{selectedOrder.email}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="rounded-xl border border-border/50 p-4 bg-muted/10">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Shipping Address</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedOrder.address}
                    {selectedOrder.locality ? `, ${selectedOrder.locality}` : ''}
                    {selectedOrder.landmark ? `, ${selectedOrder.landmark}` : ''}
                    {selectedOrder.city ? `, ${selectedOrder.city}` : ''}
                    {selectedOrder.state ? `, ${selectedOrder.state}` : ''}
                    {selectedOrder.pincode ? ` - ${selectedOrder.pincode}` : ''}
                  </p>
                </div>

                {/* Items */}
                <div className="rounded-xl border border-border/50 overflow-hidden">
                  <div className="px-4 py-3 bg-muted/30 border-b border-border/30">
                    <p className="text-xs font-semibold uppercase tracking-wider">Items ({(selectedOrder.cartItems || []).length})</p>
                  </div>
                  <div className="divide-y divide-border/30">
                    {(selectedOrder.cartItems || []).map((item: any, i: number) => (
                      <div key={i} className="flex gap-3 px-4 py-3 items-center hover:bg-muted/20 transition-colors">
                        <div className="w-12 h-12 rounded-lg border border-border/50 bg-muted/20 overflow-hidden shrink-0">
                          <img src={item.image || 'https://placehold.co/48x48?text=img'} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity || 1}</p>
                        </div>
                        <p className="text-sm font-bold shrink-0">₹{(item.price || 0).toLocaleString('en-IN')}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="rounded-xl border border-border/50 p-4 space-y-2 text-sm bg-muted/10">
                  <p className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-3">Price Breakdown</p>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{(selectedOrder.subtotal || 0).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    {(selectedOrder.shipping === 0 || !selectedOrder.shipping) ? (
                      <span className="text-emerald-600 font-semibold">FREE</span>
                    ) : (
                      <span className="font-medium">₹{selectedOrder.shipping}</span>
                    )}
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount</span>
                      <span className="font-semibold">−₹{selectedOrder.discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold border-t border-border/50 pt-3 mt-2 text-base">
                    <span>Total</span>
                    <span>₹{(selectedOrder.total || 0).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Update Status */}
                {selectedOrder.status !== 'Delivered' && selectedOrder.status !== 'Cancelled' && (
                  <div className="flex gap-2 pt-1 flex-wrap">
                    {STATUS_FLOW.filter((_, i) => i > STATUS_FLOW.indexOf(selectedOrder.status)).map((s) => (
                      <Button
                        key={s}
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusUpdate(selectedOrder._id, s)}
                        disabled={updatingId === selectedOrder._id}
                        className="font-medium text-xs"
                      >
                        {updatingId === selectedOrder._id ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : null}
                        Mark as {s}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
