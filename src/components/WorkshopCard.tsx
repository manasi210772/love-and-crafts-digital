import { useState } from "react";
import { Calendar, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface WorkshopCardProps {
  id?: string;
  title: string;
  date: string;
  time: string;
  instructor: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  image: string;
}

const WorkshopCard = ({
  id,
  title,
  date,
  time,
  instructor,
  description,
  level,
  image,
}: WorkshopCardProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [imageError, setImageError] = useState(false);

  const { data: isRegistered } = useQuery({
    queryKey: ["workshop-registration", id, user?.id],
    queryFn: async () => {
      if (!user || !id) return false;
      const { data } = await supabase
        .from("workshop_registrations")
        .select("*")
        .eq("workshop_id", id)
        .eq("user_id", user.id)
        .maybeSingle();
      return !!data;
    },
    enabled: !!user && !!id,
  });

  const register = useMutation({
    mutationFn: async () => {
      if (!user) {
        navigate("/auth");
        return;
      }

      if (!id) {
        toast.error("Workshop not available");
        return;
      }

      const { error } = await supabase
        .from("workshop_registrations")
        .insert({
          workshop_id: id,
          user_id: user.id,
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workshop-registration"] });
      queryClient.invalidateQueries({ queryKey: ["my-workshops"] });
      toast.success(`You've registered for ${title}!`);
    },
    onError: (error: Error) => {
      if (error.message.includes("duplicate")) {
        toast.error("You're already registered for this workshop");
      } else {
        toast.error("Failed to register for workshop");
      }
    },
  });

  const unregister = useMutation({
    mutationFn: async () => {
      if (!user || !id) return;
      const { error } = await supabase
        .from("workshop_registrations")
        .delete()
        .eq("workshop_id", id)
        .eq("user_id", user.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workshop-registration"] });
      queryClient.invalidateQueries({ queryKey: ["my-workshops"] });
      toast.success("Registration cancelled");
    },
  });

  const levelColors = {
    Beginner: "bg-accent text-accent-foreground",
    Intermediate: "bg-secondary text-secondary-foreground",
    Advanced: "bg-primary text-primary-foreground",
  };

  return (
    <Card className="group overflow-hidden hover-lift border-border bg-card rounded-2xl">
      <div className="aspect-video overflow-hidden relative">
        <img
          src={imageError ? '/placeholder.svg' : image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={() => setImageError(true)}
        />
        <Badge className={`absolute top-4 right-4 ${levelColors[level]}`}>
          {level}
        </Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="font-display text-2xl font-semibold mb-3">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2 text-primary" />
            <span>{date}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="w-4 h-4 mr-2 text-primary" />
            <span>{time}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Users className="w-4 h-4 mr-2 text-primary" />
            <span>Instructor: {instructor}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        {isRegistered ? (
          <Button
            onClick={() => unregister.mutate()}
            disabled={unregister.isPending}
            variant="outline"
            className="w-full"
          >
            {unregister.isPending ? "Cancelling..." : "Cancel Registration"}
          </Button>
        ) : (
          <Button
            onClick={() => register.mutate()}
            disabled={register.isPending}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {register.isPending ? "Registering..." : "Register Now"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default WorkshopCard;
