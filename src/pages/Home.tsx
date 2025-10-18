import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Sparkles } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import WorkshopCard from "@/components/WorkshopCard";
import heroImage from "@/assets/hero-crafts.jpg";

const Home = () => {
  const featuredProducts = [
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
  ];

  const nextWorkshop = {
    title: "Watercolor Painting Basics",
    date: "Saturday, Nov 2, 2025",
    time: "10:00 AM - 1:00 PM",
    instructor: "Emma Richardson",
    description: "Learn watercolor techniques and create your own masterpiece",
    level: "Beginner" as const,
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800",
  };

  return (
    <div className="animate-fade-in">
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
            {featuredProducts.map((product, index) => (
              <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard {...product} />
              </div>
            ))}
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
          <WorkshopCard {...nextWorkshop} />
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
