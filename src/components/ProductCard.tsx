import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "@/lib/currency";

interface ProductCardProps {
  id?: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const ProductCard = ({ id, name, price, description, image, category }: ProductCardProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [imageError, setImageError] = useState(false);

  const addToCart = useMutation({
    mutationFn: async () => {
      if (!user) {
        navigate("/auth");
        return;
      }

      if (!id) {
        toast.error("Product not available");
        return;
      }

      const { data: existing } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", user.id)
        .eq("product_id", id)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from("cart_items")
          .update({ quantity: existing.quantity + 1 })
          .eq("id", existing.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("cart_items")
          .insert({
            user_id: user.id,
            product_id: id,
            quantity: 1,
          });
        
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cart-count"] });
      toast.success(`${name} added to cart!`);
    },
    onError: () => {
      toast.error("Failed to add to cart");
    },
  });

  return (
    <Card className="group overflow-hidden hover-lift border-border bg-card rounded-2xl">
      <div className="aspect-square overflow-hidden">
        <img
          src={imageError ? '/placeholder.svg' : image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={() => setImageError(true)}
        />
      </div>
      <CardContent className="p-4">
        <div className="text-xs font-medium text-primary mb-1">{category}</div>
        <h3 className="font-display text-xl font-semibold mb-2">{name}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{description}</p>
        <div className="text-2xl font-bold text-primary">{formatPrice(price)}</div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => addToCart.mutate()}
          disabled={addToCart.isPending}
          className="w-full bg-primary hover:bg-primary/90"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {addToCart.isPending ? "Adding..." : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
