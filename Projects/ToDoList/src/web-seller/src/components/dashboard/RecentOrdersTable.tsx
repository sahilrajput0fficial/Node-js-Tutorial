import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Order {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: string;
  date: string;
}

interface RecentOrdersTableProps {
  orders: Order[];
}

const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
  completed: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  delivered: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500' },
  processing: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  dispatched: { bg: 'bg-indigo-50', text: 'text-indigo-700', dot: 'bg-indigo-500' },
  shipped: { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
  pending: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
  cancelled: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
};

const avatarColors = [
  'bg-primary/15 text-primary',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-sky-100 text-sky-700',
];

const formatDate = (dateString: string) => {
  if (!dateString) return '—';
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
  });
};

export function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Order</TableHead>
          <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Customer</TableHead>
          <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Product</TableHead>
          <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Amount</TableHead>
          <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order, index) => {
          const status = statusConfig[order.status] || statusConfig.pending;
          const colorClass = avatarColors[index % avatarColors.length];
          const initials = order.customer.split(' ').map(n => n[0]).join('').slice(0, 2);

          return (
            <TableRow key={order.id} className="hover:bg-muted/40 transition-colors duration-150 group cursor-default">
              <TableCell className="font-mono text-xs font-semibold text-muted-foreground">{order.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className={cn('text-[10px] font-bold', colorClass)}>
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{order.customer}</span>
                </div>
              </TableCell>
              <TableCell className="max-w-[180px] truncate text-sm text-muted-foreground">{order.product}</TableCell>
              <TableCell className="font-semibold text-sm">₹{order.amount.toLocaleString('en-IN')}</TableCell>
              <TableCell>
                <Badge variant="secondary" className={cn(
                  'capitalize text-[11px] font-semibold gap-1.5 pl-2 pr-2.5 py-0.5 border-0',
                  status.bg, status.text
                )}>
                  <span className={cn('h-1.5 w-1.5 rounded-full', status.dot)} />
                  {order.status}
                </Badge>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
