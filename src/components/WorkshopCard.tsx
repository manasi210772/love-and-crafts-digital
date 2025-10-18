import { Calendar, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface WorkshopCardProps {
  title: string;
  date: string;
  time: string;
  instructor: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  image: string;
}

const WorkshopCard = ({
  title,
  date,
  time,
  instructor,
  description,
  level,
  image,
}: WorkshopCardProps) => {
  const handleRegister = () => {
    toast.success(`You've registered for ${title}! 🎨`);
  };

  const levelColors = {
    Beginner: "bg-accent text-accent-foreground",
    Intermediate: "bg-secondary text-secondary-foreground",
    Advanced: "bg-primary text-primary-foreground",
  };

  return (
    <Card className="group overflow-hidden hover-lift border-border bg-card rounded-2xl">
      <div className="aspect-video overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
        <Button
          onClick={handleRegister}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Register Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WorkshopCard;
