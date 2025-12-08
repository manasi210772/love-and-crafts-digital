import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Sparkles } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import WorkshopCard from "@/components/WorkshopCard";
import { ProductCardSkeleton, WorkshopCardSkeleton } from "@/components/ui/skeleton-card";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-crafts.jpg";

// Image mapping for products
import lavenderCandleImg from "@/assets/lavender-candle.jpg";
import potteryBowlImg from "@/assets/products/pottery-bowl.jpg";
import braceletImg from "@/assets/products/bracelet.jpg";
import candlesImg from "@/assets/products/candles.jpg";
import embroideryImg from "@/assets/products/embroidery.jpg";
import ceramicMugsImg from "@/assets/products/ceramic-mugs.jpg";
import silverNecklaceImg from "@/assets/products/silver-necklace.jpg";

// Workshop images
import canvasImg from "@/assets/canvas-painting.jpg";
import candleWorkshopImg from "@/assets/candle-workshop.jpg";
import embroideryWorkshopImg from "@/assets/embroidery-workshop.jpg";

const productImages: Record<string, string> = {
  "Lavender Soy Candles": lavenderCandleImg,
  "Clay Pottery Bowl": potteryBowlImg,
  "Beaded Bracelet": braceletImg,
  "Handmade Candles Set": candlesImg,
  "Embroidery Hoop Art": embroideryImg,
  "Ceramic Mugs": ceramicMugsImg,
  "Handmade Silver Necklace": silverNecklaceImg,
};

const workshopImages: Record<string, string> = {
  "Watercolor Painting Basics": canvasImg,
  "Candle Making Workshop": candleWorkshopImg,
  "Embroidery for Beginners": embroideryWorkshopImg,
};

const Home = () => {
  // Fetch featured products from database
  const { data: featuredProducts, isLoading: productsLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(3);
      
      if (error) throw error;
      return data || [];
    },
  });

  // Fetch next upcoming workshop from database
  const { data: nextWorkshop, isLoading: workshopLoading } = useQuery({
    queryKey: ["next-workshop"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workshops")
        .select("*")
        .order("workshop_date", { ascending: true })
        .limit(1)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
  });

  const getProductImage = (name: string, fallbackUrl: string) => {
    return productImages[name] || fallbackUrl;
  };

  const getWorkshopImage = (title: string, fallbackUrl: string) => {
    return workshopImages[title] || fallbackUrl;
  };

  return (
    <div className="animate-fade-in">
      <SEO 
        title="Crafted with Love - Handmade Crafts & Workshops"
        description="Discover unique handmade treasures created by passionate artisans. Join our weekend workshops to learn new techniques."
        keywords="handmade crafts, artisan products, craft workshops, handmade jewelry, pottery, candles"
      />

      {/* Hero Section */}
      <section
        className="relative h-[600px] lg:h-[700px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-background" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-slide-up">
          <h1 className="font-display text-5xl lg:text-7xl font-bold mb-6 text-white drop-shadow-lg">
            Crafted with Love
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-white/95 font-medium">
            Connecting hearts through handmade art
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-lg px-8 rounded-full"
            >
              <Link to="/shop">
                <ShoppingBag className="mr-2 w-5 h-5" />
                Shop Now
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/90 hover:bg-white border-2 border-primary text-primary text-lg px-8 rounded-full"
            >
              <Link to="/workshops">
                <Sparkles className="mr-2 w-5 h-5" />
                Join a Workshop
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Welcome Message */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6 text-foreground">
          Welcome to Our Creative Haven
        </h2>
        <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Discover unique handmade treasures created by passionate artisans. Each piece tells a
          story, carries love, and brings warmth to your space. Join our weekend workshops to
          learn new techniques and connect with fellow craft enthusiasts.
        </p>
      </section>

      {/* Featured Products */}
      <section className="bg-gradient-soft py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-4xl font-bold text-center mb-12">
            Featured Crafts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productsLoading ? (
              <>
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
              </>
            ) : featuredProducts && featuredProducts.length > 0 ? (
              featuredProducts.map((product, index) => (
                <div key={product.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    description={product.description}
                    image={getProductImage(product.name, product.image_url)}
                    category={product.category}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-muted-foreground py-8">
                No products available at the moment.
              </div>
            )}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-secondary rounded-full">
              <Link to="/shop">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Next Workshop Highlight */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display text-4xl font-bold text-center mb-12">
          This Weekend's Workshop
        </h2>
        <div className="max-w-3xl mx-auto">
          {workshopLoading ? (
            <WorkshopCardSkeleton />
          ) : nextWorkshop ? (
            <WorkshopCard
              id={nextWorkshop.id}
              title={nextWorkshop.title}
              date={nextWorkshop.workshop_date}
              time={nextWorkshop.workshop_time}
              instructor={nextWorkshop.instructor}
              description={nextWorkshop.description}
              level={nextWorkshop.level as "Beginner" | "Intermediate" | "Advanced"}
              image={getWorkshopImage(nextWorkshop.title, nextWorkshop.image_url)}
            />
          ) : (
            <div className="text-center text-muted-foreground py-8">
              No upcoming workshops at the moment.
            </div>
          )}
        </div>
        <div className="text-center mt-8">
          <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-secondary rounded-full">
            <Link to="/workshops">View All Workshops</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
