import WorkshopCard from "@/components/WorkshopCard";
import { WorkshopCardSkeleton } from "@/components/ui/skeleton-card";
import SEO from "@/components/SEO";
import workshopImage from "@/assets/workshop-scene.jpg";
import paperQuillingImg from "@/assets/paper-quilling.jpg";
import mandalaArt from "@/assets/mandala-art.jpg";
import resinArt from "@/assets/resin-art.jpg";
import canvasPainting from "@/assets/canvas-painting.jpg";
import embroideryWorkshopImg from "@/assets/embroidery-workshop.jpg";
import polymerClayWorkshopImg from "@/assets/polymer-clay-workshop.jpg";
import candleWorkshopImg from "@/assets/candle-workshop.jpg";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Workshops = () => {
  const { data: workshops, isLoading } = useQuery({
    queryKey: ["workshops"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workshops")
        .select("*")
        .order("workshop_date");
      
      if (error) throw error;
      return data || [];
    },
  });

  // Map workshop titles to their imported images
  const workshopImages: Record<string, string> = {
    "Advanced Embroidery Techniques": embroideryWorkshopImg,
    "Polymer Clay Jewelry Making": polymerClayWorkshopImg,
    "Candle Making Workshop": candleWorkshopImg,
    "Paper Quilling Art": paperQuillingImg,
    "Pottery Wheel Throwing": "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800",
    "Watercolor Painting Basics": "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800",
  };

  const galleryImages = [
    "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800",
    mandalaArt,
    resinArt,
    canvasPainting,
  ];

  return (
    <div className="animate-fade-in">
      <SEO 
        title="Weekend Workshops"
        description="Join our creative workshops and learn new crafting techniques. All materials included, all skill levels welcome!"
        keywords="craft workshops, art classes, pottery class, painting workshop, embroidery class, candle making"
      />
      {/* Hero Section */}
      <section
        className="relative h-[400px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${workshopImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-background" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-display text-5xl lg:text-6xl font-bold mb-4 text-white drop-shadow-lg">
            Weekend Workshops
          </h1>
          <p className="text-lg lg:text-xl text-white/95 max-w-2xl mx-auto">
            Join our creative community and learn new crafting techniques every weekend. 
            All materials included, all skill levels welcome!
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">

        {/* Upcoming Workshops */}
        <section className="mb-20">
          <h2 className="font-display text-4xl font-bold text-center mb-12">Upcoming Workshops</h2>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <WorkshopCardSkeleton key={i} />
              ))}
            </div>
          ) : workshops && workshops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {workshops.map((workshop, index) => (
                <div
                  key={workshop.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <WorkshopCard 
                    id={workshop.id}
                    title={workshop.title}
                    date={workshop.workshop_date}
                    time={workshop.workshop_time}
                    instructor={workshop.instructor}
                    description={workshop.description}
                    level={workshop.level as "Beginner" | "Intermediate" | "Advanced"}
                    image={workshopImages[workshop.title] || workshop.image_url}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No workshops available at the moment.</p>
            </div>
          )}
        </section>

        {/* Workshop Gallery */}
        <section className="bg-gradient-soft rounded-3xl p-8 md:p-12">
          <h2 className="font-display text-4xl font-bold text-center mb-8">
            Our Creative Community
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            See the joy and creativity from our previous workshops. Every session is filled with 
            laughter, learning, and handmade magic!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="aspect-video rounded-2xl overflow-hidden hover-lift"
              >
                <img
                  src={image}
                  alt={`Workshop ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Workshops;
