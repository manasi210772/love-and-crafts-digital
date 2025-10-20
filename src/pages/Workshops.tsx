import WorkshopCard from "@/components/WorkshopCard";
import workshopImage from "@/assets/workshop-scene.jpg";
import paperQuillingImg from "@/assets/paper-quilling.jpg";
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

  const galleryImages = [
    "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800",
    "https://images.unsplash.com/photo-1611652022419-a9419f74343a?w=800",
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800",
  ];

  return (
    <div className="animate-fade-in">
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
            <div className="text-center py-16">Loading workshops...</div>
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
                    image={workshop.image_url}
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
