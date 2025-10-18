import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Paper Crafts", "Clay Art", "Jewelry", "Embroidery", "Home Decor"];

  const products = [
    {
      name: "Watercolor Greeting Cards",
      price: 12.99,
      description: "Hand-painted cards perfect for any occasion",
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800",
      category: "Paper Crafts",
    },
    {
      name: "Lavender Soy Candles",
      price: 18.99,
      description: "Hand-poured candles with natural essential oils",
      image: "https://images.unsplash.com/photo-1602874801006-95415c5babc0?w=800",
      category: "Home Decor",
    },
    {
      name: "Clay Pottery Bowl",
      price: 34.99,
      description: "Handcrafted ceramic bowl with unique glaze",
      image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800",
      category: "Clay Art",
    },
    {
      name: "Handmade Silver Necklace",
      price: 45.99,
      description: "Elegant sterling silver pendant with gemstone",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800",
      category: "Jewelry",
    },
    {
      name: "Embroidered Wall Art",
      price: 28.99,
      description: "Colorful floral design on natural linen",
      image: "https://images.unsplash.com/photo-1611003228941-98852ba62227?w=800",
      category: "Embroidery",
    },
    {
      name: "Paper Flower Bouquet",
      price: 22.99,
      description: "Everlasting paper flowers in vibrant colors",
      image: "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=800",
      category: "Paper Crafts",
    },
    {
      name: "Ceramic Mug Set",
      price: 38.99,
      description: "Set of 4 hand-thrown mugs with unique patterns",
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800",
      category: "Clay Art",
    },
    {
      name: "Beaded Bracelet",
      price: 16.99,
      description: "Handwoven bracelet with natural stones",
      image: "https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=800",
      category: "Jewelry",
    },
    {
      name: "Cross-Stitch Kit",
      price: 24.99,
      description: "Complete kit with pattern, thread, and fabric",
      image: "https://images.unsplash.com/photo-1452827073306-6e6e661baf57?w=800",
      category: "Embroidery",
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-24 pb-16 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-5xl font-bold text-center mb-4">Our Handmade Shop</h1>
        <p className="text-center text-muted-foreground text-lg mb-12 max-w-2xl mx-auto">
          Every piece is lovingly crafted by talented artisans. Find your perfect handmade treasure.
        </p>

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <ProductCard {...product} />
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
      </div>
    </div>
  );
};

export default Shop;
