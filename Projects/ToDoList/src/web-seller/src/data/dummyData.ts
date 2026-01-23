export const dashboardStats = {
  totalRevenue: 45231.89,
  totalOrders: 2350,
  totalProducts: 156,
  totalCustomers: 1893,
  revenueChange: 20.1,
  ordersChange: 12.5,
  productsChange: 3,
  customersChange: 8.2,
};

export const recentOrders = [
  { id: '#ORD-001', customer: 'Sarah Johnson', product: 'Wireless Headphones', amount: 129.99, status: 'completed', date: '2024-01-15' },
  { id: '#ORD-002', customer: 'Mike Chen', product: 'Smart Watch Pro', amount: 299.99, status: 'processing', date: '2024-01-15' },
  { id: '#ORD-003', customer: 'Emma Wilson', product: 'Laptop Stand', amount: 49.99, status: 'shipped', date: '2024-01-14' },
  { id: '#ORD-004', customer: 'James Brown', product: 'USB-C Hub', amount: 79.99, status: 'completed', date: '2024-01-14' },
  { id: '#ORD-005', customer: 'Lisa Davis', product: 'Mechanical Keyboard', amount: 159.99, status: 'pending', date: '2024-01-13' },
];

export const topProducts = [
  { name: 'Wireless Headphones', sales: 423, revenue: 54777.77, stock: 45 },
  { name: 'Smart Watch Pro', sales: 312, revenue: 93597.88, stock: 23 },
  { name: 'Laptop Stand', sales: 287, revenue: 14346.13, stock: 89 },
  { name: 'USB-C Hub', sales: 256, revenue: 20477.44, stock: 67 },
  { name: 'Mechanical Keyboard', sales: 198, revenue: 31678.02, stock: 34 },
];

export const salesData = [
  { month: 'Jan', sales: 4000, orders: 240 },
  { month: 'Feb', sales: 3000, orders: 198 },
  { month: 'Mar', sales: 5000, orders: 300 },
  { month: 'Apr', sales: 4500, orders: 280 },
  { month: 'May', sales: 6000, orders: 350 },
  { month: 'Jun', sales: 5500, orders: 320 },
  { month: 'Jul', sales: 7000, orders: 400 },
];

export const products = [
  { id: '1', name: 'Wireless Headphones', price: 129.99, stock: 45, category: 'Electronics', status: 'active', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop' },
  { id: '2', name: 'Smart Watch Pro', price: 299.99, stock: 23, category: 'Electronics', status: 'active', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop' },
  { id: '3', name: 'Laptop Stand', price: 49.99, stock: 89, category: 'Accessories', status: 'active', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop' },
  { id: '4', name: 'USB-C Hub', price: 79.99, stock: 67, category: 'Accessories', status: 'active', image: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=100&h=100&fit=crop' },
  { id: '5', name: 'Mechanical Keyboard', price: 159.99, stock: 34, category: 'Electronics', status: 'active', image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=100&h=100&fit=crop' },
  { id: '6', name: 'Webcam HD', price: 89.99, stock: 0, category: 'Electronics', status: 'out_of_stock', image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=100&h=100&fit=crop' },
  { id: '7', name: 'Mouse Pad XL', price: 24.99, stock: 156, category: 'Accessories', status: 'active', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=100&h=100&fit=crop' },
  { id: '8', name: 'Monitor Light Bar', price: 69.99, stock: 28, category: 'Electronics', status: 'active', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=100&h=100&fit=crop' },
];

export const orders = [
  { id: '#ORD-001', customer: 'Sarah Johnson', email: 'sarah@email.com', products: 2, amount: 229.98, status: 'completed', date: '2024-01-15', paymentMethod: 'Credit Card' },
  { id: '#ORD-002', customer: 'Mike Chen', email: 'mike@email.com', products: 1, amount: 299.99, status: 'processing', date: '2024-01-15', paymentMethod: 'PayPal' },
  { id: '#ORD-003', customer: 'Emma Wilson', email: 'emma@email.com', products: 3, amount: 149.97, status: 'shipped', date: '2024-01-14', paymentMethod: 'Credit Card' },
  { id: '#ORD-004', customer: 'James Brown', email: 'james@email.com', products: 1, amount: 79.99, status: 'completed', date: '2024-01-14', paymentMethod: 'Credit Card' },
  { id: '#ORD-005', customer: 'Lisa Davis', email: 'lisa@email.com', products: 2, amount: 289.98, status: 'pending', date: '2024-01-13', paymentMethod: 'PayPal' },
  { id: '#ORD-006', customer: 'Tom Harris', email: 'tom@email.com', products: 4, amount: 459.96, status: 'completed', date: '2024-01-12', paymentMethod: 'Credit Card' },
  { id: '#ORD-007', customer: 'Anna Lee', email: 'anna@email.com', products: 1, amount: 129.99, status: 'cancelled', date: '2024-01-11', paymentMethod: 'PayPal' },
];

export const customers = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@email.com', orders: 12, totalSpent: 1456.88, joinDate: '2023-06-15', status: 'active' },
  { id: '2', name: 'Mike Chen', email: 'mike@email.com', orders: 8, totalSpent: 892.45, joinDate: '2023-08-22', status: 'active' },
  { id: '3', name: 'Emma Wilson', email: 'emma@email.com', orders: 23, totalSpent: 2890.12, joinDate: '2023-03-10', status: 'active' },
  { id: '4', name: 'James Brown', email: 'james@email.com', orders: 5, totalSpent: 456.78, joinDate: '2023-11-05', status: 'active' },
  { id: '5', name: 'Lisa Davis', email: 'lisa@email.com', orders: 15, totalSpent: 1789.34, joinDate: '2023-05-18', status: 'inactive' },
];
