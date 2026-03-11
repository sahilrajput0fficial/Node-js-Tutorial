import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Store, Bell, Shield, AlertTriangle } from 'lucide-react';

export default function Settings() {
  const { user } = useAuth();

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-slide-up">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your store settings and preferences</p>
      </div>

      {/* Profile Summary Card */}
      <Card className="border-border/50 animate-slide-up" style={{ animationDelay: '50ms' }}>
        <CardContent className="flex items-center gap-4 p-5">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold truncate">{user?.name || 'Seller'}</h2>
            <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1.5 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                <Store className="h-3 w-3" />
                {user?.storeName || 'My Store'}
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="font-medium shrink-0">
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      {/* Tabbed Settings */}
      <Tabs defaultValue="store" className="animate-slide-up" style={{ animationDelay: '100ms' }}>
        <TabsList className="bg-muted/70 h-10">
          <TabsTrigger value="store" className="gap-1.5 text-sm font-medium data-[state=active]:shadow-sm">
            <Store className="h-3.5 w-3.5" />
            Store
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-1.5 text-sm font-medium data-[state=active]:shadow-sm">
            <Bell className="h-3.5 w-3.5" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-1.5 text-sm font-medium data-[state=active]:shadow-sm">
            <Shield className="h-3.5 w-3.5" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Store Tab */}
        <TabsContent value="store" className="mt-4">
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">Store Information</CardTitle>
              <CardDescription className="text-xs">Basic information about your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="storeName" className="text-sm font-medium">Store Name</Label>
                  <Input
                    id="storeName"
                    defaultValue={user?.storeName}
                    className="h-10 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Contact Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user?.email}
                    className="h-10 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>
              <Button className="font-semibold shadow-lg shadow-primary/25 mt-2">Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="mt-4">
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">Notifications</CardTitle>
              <CardDescription className="text-xs">Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-0">
              <div className="flex items-center justify-between py-4">
                <div className="space-y-0.5 pr-4">
                  <Label className="text-sm font-medium">Email Notifications</Label>
                  <p className="text-xs text-muted-foreground">Receive order notifications via email</p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-primary" />
              </div>
              <Separator className="bg-border/50" />
              <div className="flex items-center justify-between py-4">
                <div className="space-y-0.5 pr-4">
                  <Label className="text-sm font-medium">Low Stock Alerts</Label>
                  <p className="text-xs text-muted-foreground">Get notified when products are low on stock</p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-primary" />
              </div>
              <Separator className="bg-border/50" />
              <div className="flex items-center justify-between py-4">
                <div className="space-y-0.5 pr-4">
                  <Label className="text-sm font-medium">Marketing Emails</Label>
                  <p className="text-xs text-muted-foreground">Receive tips and updates about selling</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="mt-4 space-y-4">
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">Change Password</CardTitle>
              <CardDescription className="text-xs">Update your account password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Current Password</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="h-10 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 transition-colors max-w-md"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2 max-w-md">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">New Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-10 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Confirm Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-10 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>
              <Button className="font-semibold shadow-lg shadow-primary/25">Update Password</Button>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200/50">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <CardTitle className="text-base font-semibold text-red-600">Danger Zone</CardTitle>
              </div>
              <CardDescription className="text-xs">Irreversible actions for your store</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 rounded-xl bg-red-50/50 border border-red-100">
                <div>
                  <p className="text-sm font-medium text-red-800">Delete Store</p>
                  <p className="text-xs text-red-600/70 mt-0.5">Once deleted, this cannot be undone.</p>
                </div>
                <Button variant="destructive" size="sm" className="font-medium shadow-lg shadow-red-500/20">
                  Delete Store
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
