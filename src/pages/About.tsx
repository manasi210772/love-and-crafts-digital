import { Heart, Users, Sparkles, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import craftWorkshopImg from "@/assets/craft-workshop-team.jpg";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Made with Love",
      description: "Every creation is crafted with passion, care, and attention to detail",
    },
    {
      icon: Users,
      title: "Community First",
      description: "We believe in building connections through shared creative experiences",
    },
    {
      icon: Sparkles,
      title: "Supporting Artisans",
      description: "We empower local artists and celebrate their unique talents",
    },
    {
      icon: Award,
      title: "Quality Craftsmanship",
      description: "We're committed to excellence in every handmade piece we offer",
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden bg-gradient-warm">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,white_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,white_0%,transparent_50%)]" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-display text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            Our Story
          </h1>
          <p className="text-lg lg:text-xl text-white/95 max-w-3xl mx-auto leading-relaxed">
            Crafted with Love was born from a simple belief: that handmade items carry a special 
            kind of magic that mass-produced goods simply cannot match.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">

        {/* Story Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="font-display text-4xl font-bold">Every Creation Tells a Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              Founded in 2020, our mission has always been to connect hearts through handmade art. 
              We started as a small studio with just a handful of local artisans, and have grown 
              into a thriving community of talented makers.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Each piece in our shop is created by skilled artisans who pour their heart and soul 
              into their work. From delicate paper crafts to stunning ceramics, every item has been 
              lovingly made by hand.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our weekend workshops bring people together to learn, create, and share in the joy of 
              making something beautiful with their own hands. We believe that everyone has an inner 
              artist waiting to be discovered.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800"
                alt="Artisan at work"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-3/4 aspect-video rounded-2xl overflow-hidden border-4 border-background shadow-hover">
              <img
                src={craftWorkshopImg}
                alt="Workshop scene"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <h2 className="font-display text-4xl font-bold text-center mb-12">What We Believe In</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="hover-lift border-border bg-card rounded-2xl"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-warm flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Quote Section */}
        <section className="bg-gradient-warm rounded-3xl p-12 text-center text-white">
          <blockquote className="font-display text-3xl md:text-4xl font-bold mb-4">
            "Every creation tells a story"
          </blockquote>
          <p className="text-lg opacity-90">
            We're not just making crafts — we're creating connections, preserving traditions, 
            and celebrating the beauty of handmade artistry.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
