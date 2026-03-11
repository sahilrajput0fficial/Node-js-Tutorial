import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, Store, ChevronRight } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const menuItems = [
  { title: 'Overview', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Products', url: '/dashboard/products', icon: Package },
  { title: 'Orders', url: '/dashboard/orders', icon: ShoppingCart },
  { title: 'Customers', url: '/dashboard/customers', icon: Users },
  { title: 'Settings', url: '/dashboard/settings', icon: Settings },
];

export function DashboardSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <Sidebar className="border-r-0">
      {/* Brand Header */}
      <SidebarHeader className="p-5 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-indigo shadow-lg shadow-primary/25">
            <Store className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-sidebar-accent-foreground truncate">
              {user?.storeName || 'My Store'}
            </span>
            <span className="text-[11px] text-sidebar-foreground/60 truncate">Seller Dashboard</span>
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] uppercase tracking-wider font-semibold text-sidebar-foreground/40 px-3 mb-2">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === '/dashboard'}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/70 hover:text-sidebar-accent-foreground hover:bg-sidebar-accent transition-all duration-200 group"
                      activeClassName="bg-primary/15 text-primary font-semibold shadow-sm"
                    >
                      <item.icon className="h-[18px] w-[18px] shrink-0" />
                      <span className="text-[13px]">{item.title}</span>
                      <ChevronRight className="h-3.5 w-3.5 ml-auto opacity-0 -translate-x-1 group-hover:opacity-50 group-hover:translate-x-0 transition-all duration-200" />
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User Footer */}
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-3 px-1">
          <Avatar className="h-9 w-9 shrink-0">
            <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="text-[13px] font-semibold text-sidebar-accent-foreground truncate">
              {user?.name || 'Seller'}
            </span>
            <span className="text-[11px] text-sidebar-foreground/50 truncate">
              {user?.email}
            </span>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-sidebar-foreground/60 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 h-9 text-[13px]"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
