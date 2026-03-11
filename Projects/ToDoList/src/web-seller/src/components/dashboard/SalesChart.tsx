import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SalesData {
  month: string;
  sales: number;
  orders: number;
}

interface SalesChartProps {
  data: SalesData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-xl px-4 py-3 shadow-xl">
        <p className="text-xs font-semibold text-foreground mb-1">{label}</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Sales:</span>
            <span className="text-xs font-bold text-foreground">₹{payload[0].value.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export function SalesChart({ data }: SalesChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          <linearGradient id="colorSalesGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(245, 58%, 51%)" stopOpacity={0.25} />
            <stop offset="50%" stopColor="hsl(265, 58%, 56%)" stopOpacity={0.1} />
            <stop offset="100%" stopColor="hsl(265, 58%, 56%)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 500 }}
          tickLine={false}
          axisLine={false}
          dy={8}
        />
        <YAxis
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
          dx={-4}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '4 4' }} />
        <Area
          type="monotone"
          dataKey="sales"
          stroke="hsl(245, 58%, 51%)"
          fillOpacity={1}
          fill="url(#colorSalesGradient)"
          strokeWidth={2.5}
          dot={false}
          activeDot={{
            r: 5,
            fill: 'hsl(245, 58%, 51%)',
            stroke: 'white',
            strokeWidth: 2,
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
