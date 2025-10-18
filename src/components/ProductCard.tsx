import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";

interface ProductCardProps {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const ProductCard = ({ name, price, description, image, category }: ProductCardProps) => {
  const handleAddToCart = () => {
    toast.success(`${name} added to cart! 🛒`);
  };

  return (
    <Card className="group overflow-hidden hover-lift border-border bg-card rounded-2xl">
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <CardContent className="p-4">
        <div className="text-xs font-medium text-primary mb-1">{category}</div>
        <h3 className="font-display text-xl font-semibold mb-2">{name}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{description}</p>
        <div className="text-2xl font-bold text-primary">${price.toFixed(2)}</div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          onClick={handleAddToCart}
          className="flex-1 bg-primary hover:bg-primary/90"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
        <Button variant="outline" className="flex-1 border-primary text-primary hover:bg-secondary">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
