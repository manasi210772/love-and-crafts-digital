import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import braceletImg from "@/assets/products/bracelet.jpg";
import candlesImg from "@/assets/products/candles.jpg";
import ceramicMugsImg from "@/assets/products/ceramic-mugs.jpg";
import crossStitchImg from "@/assets/products/cross-stitch.jpg";
import embroideryImg from "@/assets/products/embroidery.jpg";
import paperFlowersImg from "@/assets/products/paper-flowers.jpg";
import potteryBowlImg from "@/assets/products/pottery-bowl.jpg";
import silverNecklaceImg from "@/assets/products/silver-necklace.jpg";

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("name");
      
      if (error) throw error;
      return data || [];
    },
  });

  // Map product names to their imported images
  const productImages: Record<string, string> = {
    "Beaded Bracelet": braceletImg,
    "Lavender Soy Candles": candlesImg,
    "Ceramic Mug Set": ceramicMugsImg,
    "Cross-Stitch Kit": crossStitchImg,
    "Embroidered Wall Art": embroideryImg,
    "Paper Flower Bouquet": paperFlowersImg,
    "Clay Pottery Bowl": potteryBowlImg,
    "Handmade Silver Necklace": silverNecklaceImg,
  };

  const categories = ["All", "Paper Crafts", "Clay Art", "Jewelry", "Embroidery", "Home Decor"];

  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden bg-gradient-warm">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,white_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,white_0%,transparent_50%)]" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-display text-5xl lg:text-6xl font-bold mb-4 text-white drop-shadow-lg">
            Our Handmade Shop
          </h1>
          <p className="text-lg lg:text-xl text-white/95 max-w-2xl mx-auto">
            Every piece is lovingly crafted by talented artisans. Find your perfect handmade treasure.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">

        {/* Search and Filter */}
        <div className="mb-16 space-y-6">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search for crafts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 rounded-full"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full ${
                  selectedCategory === category
                    ? "bg-primary hover:bg-primary/90"
                    : "border-primary text-primary hover:bg-secondary"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="text-center py-16">Loading products...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ProductCard 
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    description={product.description}
                    image={productImages[product.name] || product.image_url}
                    category={product.category}
                  />
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No products found. Try a different search or category.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Shop;
