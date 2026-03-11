import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  gradient?: string;
  delay?: number;
}

export function StatsCard({ title, value, change, icon: Icon, gradient = 'gradient-indigo', delay = 0 }: StatsCardProps) {
  const isPositive = change >= 0;

  return (
    <Card className="animate-slide-up hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-border/50 overflow-hidden group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-[13px] font-medium text-muted-foreground">{title}</CardTitle>
        <div className={cn(
          'h-10 w-10 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110',
          gradient
        )}>
          <Icon className="h-[18px] w-[18px] text-white" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-3xl font-bold tracking-tight animate-count-up" style={{ animationDelay: `${delay + 200}ms` }}>
          {value}
        </div>
        {change !== 0 && (
          <div className={cn(
            "flex items-center gap-1.5 text-xs mt-2 font-medium",
            isPositive ? "text-emerald-600" : "text-red-500"
          )}>
            <div className={cn(
              "flex items-center justify-center h-5 w-5 rounded-full",
              isPositive ? "bg-emerald-100" : "bg-red-100"
            )}>
              {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            </div>
            <span>{isPositive ? '+' : ''}{change}% from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
