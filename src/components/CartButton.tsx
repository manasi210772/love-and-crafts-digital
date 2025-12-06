import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface CartButtonProps {
  isHeroStyle?: boolean;
}

const CartButton = ({ isHeroStyle = false }: CartButtonProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: cartItems } = useQuery({
    queryKey: ["cart-count", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("cart_items")
        .select("quantity")
        .eq("user_id", user.id);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const totalItems = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`relative h-9 w-9 transition-all ${
        isHeroStyle 
          ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] hover:text-white/80 hover:bg-white/10" 
          : "text-foreground/80 hover:text-primary hover:bg-primary/10"
      }`}
      onClick={() => navigate("/cart")}
    >
      <ShoppingCart className="h-5 w-5" />
      {totalItems > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
        >
          {totalItems}
        </Badge>
      )}
    </Button>
  );
};

export default CartButton;