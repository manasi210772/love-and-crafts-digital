import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, LogIn } from "lucide-react";

const Logout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Hero Section */}
          <div className="relative mb-8 animate-fade-in">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-3xl -z-10" />
            
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <CheckCircle className="h-24 w-24 text-primary animate-scale-in" />
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
              </div>
            </div>

            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              See You Soon!
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto">
              You've been successfully signed out. Thank you for exploring our handcrafted treasures.
            </p>

            {/* Decorative elements */}
            <div className="flex justify-center gap-2 mb-12">
              <div className="h-1 w-12 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
              <div className="h-1 w-12 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full" />
              <div className="h-1 w-12 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Button
              onClick={() => navigate("/auth")}
              size="lg"
              className="w-full sm:w-auto"
            >
              <LogIn className="mr-2 h-5 w-5" />
              Sign In Again
            </Button>
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Home className="mr-2 h-5 w-5" />
              Return Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
