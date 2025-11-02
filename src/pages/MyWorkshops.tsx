import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import WorkshopCard from "@/components/WorkshopCard";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const MyWorkshops = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: registeredWorkshops, isLoading } = useQuery({
    queryKey: ["my-workshops", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data: registrations, error } = await supabase
        .from("workshop_registrations")
        .select(`
          workshop_id,
          workshops (
            id,
            title,
            description,
            workshop_date,
            workshop_time,
            instructor,
            level,
            image_url
          )
        `)
        .eq("user_id", user.id);

      if (error) throw error;
      return registrations?.map(r => r.workshops).filter(Boolean) || [];
    },
    enabled: !!user,
  });

  if (!user) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="font-display text-4xl font-bold mb-4">My Workshops</h1>
        <p className="text-muted-foreground mb-8">Please sign in to view your registered workshops</p>
        <Button onClick={() => navigate("/auth")}>Sign In</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
      <h1 className="font-display text-4xl font-bold mb-2 pb-2">My Workshops</h1>
      <p className="text-muted-foreground mb-12">Workshops you've registered for</p>

      {isLoading ? (
        <div className="text-center py-16">Loading your workshops...</div>
      ) : registeredWorkshops && registeredWorkshops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {registeredWorkshops.map((workshop: any) => (
            <WorkshopCard
              key={workshop.id}
              id={workshop.id}
              title={workshop.title}
              date={workshop.workshop_date}
              time={workshop.workshop_time}
              instructor={workshop.instructor}
              description={workshop.description}
              level={workshop.level}
              image={workshop.image_url}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">You haven't registered for any workshops yet</p>
          <Button onClick={() => navigate("/workshops")}>Browse Workshops</Button>
        </div>
      )}
    </div>
  );
};

export default MyWorkshops;
