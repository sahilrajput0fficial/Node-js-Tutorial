import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="text-center animate-scale-in max-w-md">
        {/* Large 404 */}
        <div className="relative mb-8">
          <h1 className="text-[120px] sm:text-[160px] font-extrabold leading-none tracking-tighter bg-gradient-to-br from-primary via-primary/70 to-primary/40 bg-clip-text text-transparent select-none">
            404
          </h1>
          {/* Decorative circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-primary/5 blur-3xl -z-10" />
        </div>

        <h2 className="text-xl sm:text-2xl font-bold mb-2">Page not found</h2>
        <p className="text-muted-foreground text-sm mb-8 max-w-sm mx-auto leading-relaxed">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div className="flex items-center gap-3 justify-center">
          <Button
            variant="outline"
            asChild
            className="gap-2 font-medium"
          >
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Link>
          </Button>
          <Button
            asChild
            className="gap-2 font-semibold shadow-lg shadow-primary/25"
          >
            <Link to="/dashboard">
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
