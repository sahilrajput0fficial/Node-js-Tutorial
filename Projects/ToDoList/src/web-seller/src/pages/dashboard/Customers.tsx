import { useState } from 'react';
import { Search, Mail, Users as UsersIcon, UserCheck, UserX } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { customers } from '@/data/dummyData';
import { cn } from '@/lib/utils';

const avatarColors = [
  'bg-primary/15 text-primary',
  'bg-emerald-100 text-emerald-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
  'bg-sky-100 text-sky-700',
  'bg-violet-100 text-violet-700',
  'bg-teal-100 text-teal-700',
];

export default function Customers() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCount = customers.filter(c => c.status === 'active').length;
  const inactiveCount = customers.filter(c => c.status === 'inactive').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-slide-up">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Customers</h1>
        <p className="text-sm text-muted-foreground">Manage your customer relationships</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-3 animate-slide-up" style={{ animationDelay: '50ms' }}>
        <Card className="border-border/50">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="h-10 w-10 rounded-xl gradient-indigo flex items-center justify-center shadow-lg shadow-primary/20">
              <UsersIcon className="h-[18px] w-[18px] text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold">{customers.length}</p>
              <p className="text-xs text-muted-foreground font-medium">Total</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="h-10 w-10 rounded-xl gradient-emerald flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <UserCheck className="h-[18px] w-[18px] text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold">{activeCount}</p>
              <p className="text-xs text-muted-foreground font-medium">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">
              <UserX className="h-[18px] w-[18px] text-gray-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">{inactiveCount}</p>
              <p className="text-xs text-muted-foreground font-medium">Inactive</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Table */}
      <Card className="border-border/50 animate-slide-up" style={{ animationDelay: '100ms' }}>
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-base font-semibold">All Customers</CardTitle>
              <CardDescription className="text-xs">{customers.length} customers</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search customers..."
                className="pl-9 h-9 bg-muted/50 border-transparent focus:border-primary/30 focus:bg-card transition-all text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Customer</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Email</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Orders</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Total Spent</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Joined</TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Status</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer, index) => {
                const colorClass = avatarColors[index % avatarColors.length];
                const initials = customer.name.split(' ').map(n => n[0]).join('').slice(0, 2);

                return (
                  <TableRow key={customer.id} className="hover:bg-muted/40 transition-colors duration-150 group">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className={cn('text-[11px] font-bold', colorClass)}>
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm">{customer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{customer.email}</TableCell>
                    <TableCell>
                      <span className="text-sm font-semibold">{customer.orders}</span>
                    </TableCell>
                    <TableCell className="font-semibold text-sm">₹{customer.totalSpent.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(customer.joinDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={cn(
                          'text-[11px] font-semibold gap-1.5 pl-2 pr-2.5 py-0.5 border-0 capitalize',
                          customer.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-gray-100 text-gray-600'
                        )}
                      >
                        <span className={cn(
                          'h-1.5 w-1.5 rounded-full',
                          customer.status === 'active' ? 'bg-emerald-500' : 'bg-gray-400'
                        )} />
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-primary"
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
