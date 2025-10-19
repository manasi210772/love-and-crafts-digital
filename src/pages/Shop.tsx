import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import greetingCardsImg from "@/assets/products/greeting-cards.jpg";
import candlesImg from "@/assets/products/candles.jpg";
import potteryBowlImg from "@/assets/products/pottery-bowl.jpg";
import silverNecklaceImg from "@/assets/products/silver-necklace.jpg";
import embroideryImg from "@/assets/products/embroidery.jpg";
import paperFlowersImg from "@/assets/products/paper-flowers.jpg";
import ceramicMugsImg from "@/assets/products/ceramic-mugs.jpg";
import braceletImg from "@/assets/products/bracelet.jpg";
import crossStitchImg from "@/assets/products/cross-stitch.jpg";

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Paper Crafts", "Clay Art", "Jewelry", "Embroidery", "Home Decor"];

  const products = [
    {
      name: "Watercolor Greeting Cards",
      price: 12.99,
      description: "Hand-painted cards perfect for any occasion",
      image: greetingCardsImg,
      category: "Paper Crafts",
    },
    {
      name: "Lavender Soy Candles",
      price: 18.99,
      description: "Hand-poured candles with natural essential oils",
      image: candlesImg,
      category: "Home Decor",
    },
    {
      name: "Clay Pottery Bowl",
      price: 34.99,
      description: "Handcrafted ceramic bowl with unique glaze",
      image: potteryBowlImg,
      category: "Clay Art",
    },
    {
      name: "Handmade Silver Necklace",
      price: 45.99,
      description: "Elegant sterling silver pendant with gemstone",
      image: silverNecklaceImg,
      category: "Jewelry",
    },
    {
      name: "Embroidered Wall Art",
      price: 28.99,
      description: "Colorful floral design on natural linen",
      image: embroideryImg,
      category: "Embroidery",
    },
    {
      name: "Paper Flower Bouquet",
      price: 22.99,
      description: "Everlasting paper flowers in vibrant colors",
      image: paperFlowersImg,
      category: "Paper Crafts",
    },
    {
      name: "Ceramic Mug Set",
      price: 38.99,
      description: "Set of 4 hand-thrown mugs with unique patterns",
      image: ceramicMugsImg,
      category: "Clay Art",
    },
    {
      name: "Beaded Bracelet",
      price: 16.99,
      description: "Handwoven bracelet with natural stones",
      image: braceletImg,
      category: "Jewelry",
    },
    {
      name: "Cross-Stitch Kit",
      price: 24.99,
      description: "Complete kit with pattern, thread, and fabric",
      image: crossStitchImg,
      category: "Embroidery",
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden bg-gradient-soft">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary))_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(var(--accent))_0%,transparent_50%)]" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-display text-5xl lg:text-6xl font-bold mb-4 text-foreground">
            Our Handmade Shop
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
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
