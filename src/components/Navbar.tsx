import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import CartButton from "./CartButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Workshops", path: "/workshops" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-card/95 backdrop-blur-md shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Heart className={`w-8 h-8 group-hover:fill-primary transition-all ${
              isScrolled ? "text-primary" : "text-white"
            }`} />
            <span className={`text-2xl font-display font-bold transition-colors ${
              isScrolled ? "text-foreground" : "text-white drop-shadow-lg"
            }`}>
              Crafted with Love
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors relative group ${
                  isScrolled
                    ? isActive(link.path)
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                    : isActive(link.path)
                      ? "text-white font-bold"
                      : "text-white/90 hover:text-white"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transition-transform origin-left ${
                    isActive(link.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
            
            <TooltipProvider>
              {user && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <CartButton />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Shopping Cart</p>
                  </TooltipContent>
                </Tooltip>
              )}
              
              {user ? (
                <div className="flex items-center gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to="/orders">
                        <Button variant="ghost" size="icon" className={!isScrolled ? "text-white hover:bg-white/10" : ""}>
                          <User className="h-5 w-5" />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>My Orders</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={signOut}
                        className={!isScrolled ? "text-white hover:bg-white/10" : ""}
                      >
                        <LogOut className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Sign Out</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              ) : (
                <Link to="/auth">
                  <Button variant={isScrolled ? "default" : "secondary"}>
                    Sign In
                  </Button>
                </Link>
              )}
            </TooltipProvider>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${!isScrolled && "text-white hover:bg-white/10"}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-6 animate-fade-in">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-card to-secondary/20 backdrop-blur-md border border-primary/20 shadow-lg p-6 mt-4">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`font-medium py-3 px-4 rounded-lg transition-all duration-300 ${
                      isActive(link.path)
                        ? "bg-primary text-primary-foreground shadow-md transform scale-105"
                        : "text-foreground hover:bg-secondary/50 hover:shadow-sm hover:transform hover:scale-102"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                {user ? (
                  <>
                    <Link to="/orders" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all">
                        My Orders
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      onClick={() => { signOut(); setIsOpen(false); }} 
                      className="w-full bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Link to="/auth" onClick={() => setIsOpen(false)}>
                    <Button className="w-full shadow-md hover:shadow-lg transition-all">Sign In</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
