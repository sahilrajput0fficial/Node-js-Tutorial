import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Store, Loader2, Eye, EyeOff, Package, TrendingUp, BarChart3 } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const { login, signup, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  if (user) {
    navigate('/dashboard');
    return null;
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;
    const storeName = formData.get('storeName') as string;

    const result = await signup(email, password, name, storeName);
    setIsLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Branded */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[40%] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(245,58%,45%)] via-[hsl(255,55%,50%)] to-[hsl(280,50%,45%)]" />
        {/* Decorative circles */}
        <div className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/5 blur-2xl" />

        <div className="relative z-10 flex flex-col justify-between p-10 xl:p-14 text-white w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Store className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">SellerHub</span>
          </div>

          {/* Main Copy */}
          <div className="space-y-8 animate-slide-up">
            <div>
              <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight tracking-tight">
                Manage your
                <br />
                store with
                <br />
                <span className="text-white/80">confidence.</span>
              </h1>
              <p className="text-white/70 text-lg mt-4 max-w-md leading-relaxed">
                Track orders, manage inventory, and grow your business — all from one powerful dashboard.
              </p>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium">
                <Package className="h-4 w-4" />
                Product Management
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium">
                <TrendingUp className="h-4 w-4" />
                Sales Analytics
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium">
                <BarChart3 className="h-4 w-4" />
                Order Tracking
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-white/40 text-sm">
            © 2026 SellerHub. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel — Auth Forms */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 bg-muted/30">
        <div className="w-full max-w-md animate-scale-in">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8 justify-center">
            <div className="h-11 w-11 rounded-xl gradient-indigo flex items-center justify-center shadow-lg shadow-primary/25">
              <Store className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">SellerHub</span>
          </div>

          <Card className="border-0 shadow-xl shadow-black/5">
            <CardHeader className="text-center pb-2 pt-8">
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <CardDescription className="text-muted-foreground">
                Sign in to your seller account to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-8">
              <Tabs defaultValue="login" className="w-full" onValueChange={() => setError('')}>
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/70 h-11">
                  <TabsTrigger value="login" className="text-sm font-medium data-[state=active]:shadow-sm">
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="text-sm font-medium data-[state=active]:shadow-sm">
                    Create Account
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-sm font-medium">Email</Label>
                      <Input
                        id="login-email"
                        name="email"
                        type="email"
                        placeholder="seller@example.com"
                        required
                        className="h-11 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-sm font-medium">Password</Label>
                      <div className="relative">
                        <Input
                          id="login-password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          required
                          className="h-11 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 transition-colors pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    {error && (
                      <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2.5 animate-slide-down">
                        <span className="font-medium">{error}</span>
                      </div>
                    )}
                    <Button
                      type="submit"
                      className="w-full h-11 font-semibold bg-primary hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
                      disabled={isLoading}
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      Sign In
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="signup-name" className="text-sm font-medium">Full Name</Label>
                        <Input
                          id="signup-name"
                          name="name"
                          type="text"
                          placeholder="John Doe"
                          required
                          className="h-11 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-store" className="text-sm font-medium">Store Name</Label>
                        <Input
                          id="signup-store"
                          name="storeName"
                          type="text"
                          placeholder="My Store"
                          required
                          className="h-11 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-sm font-medium">Email</Label>
                      <Input
                        id="signup-email"
                        name="email"
                        type="email"
                        placeholder="seller@example.com"
                        required
                        className="h-11 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-sm font-medium">Password</Label>
                      <div className="relative">
                        <Input
                          id="signup-password"
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          required
                          className="h-11 bg-muted/30 border-muted-foreground/20 focus:border-primary/50 transition-colors pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    {error && (
                      <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2.5 animate-slide-down">
                        <span className="font-medium">{error}</span>
                      </div>
                    )}
                    <Button
                      type="submit"
                      className="w-full h-11 font-semibold bg-primary hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
                      disabled={isLoading}
                    >
                      {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
