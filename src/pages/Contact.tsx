import { MapPin, Phone, Mail, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
const Contact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon. 💌");
    (e.target as HTMLFormElement).reset();
  };
  return <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden bg-gradient-soft">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary))_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(var(--accent))_0%,transparent_50%)]" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-display text-5xl lg:text-6xl font-bold mb-4 text-foreground">
            Get in Touch
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about our products or workshops? We'd love to hear from you!
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border-border rounded-3xl">
            <CardContent className="p-8">
              <h2 className="font-display text-3xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-base font-medium">
                    Name
                  </Label>
                  <Input id="name" name="name" required className="mt-2 h-12" placeholder="Your name" />
                </div>
                <div>
                  <Label htmlFor="email" className="text-base font-medium">
                    Email
                  </Label>
                  <Input id="email" name="email" type="email" required className="mt-2 h-12" placeholder="your@email.com" />
                </div>
                <div>
                  <Label htmlFor="message" className="text-base font-medium">
                    Message
                  </Label>
                  <Textarea id="message" name="message" required className="mt-2 min-h-[150px]" placeholder="Tell us what's on your mind..." />
                </div>
                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="border-border rounded-3xl hover-lift">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-warm flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-2">Visit Our Studio</h3>
                    <p className="text-muted-foreground">
                      123 Artisan Lane<br />
                      Creative District<br />
                      Craftsville, CA 94102
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border rounded-3xl hover-lift">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-warm flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-2">Call Us</h3>
                    <p className="text-muted-foreground">(555) 123-4567</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Mon-Fri: 9am - 6pm<br />
                      Sat-Sun: 10am - 4pm
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border rounded-3xl hover-lift">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-warm flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-2">Email Us</h3>
                    <p className="text-muted-foreground">hello@craftedwithlove.com</p>
                    <p className="text-muted-foreground">workshops@craftedwithlove.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            
          </div>
        </div>

        {/* Map */}
        <div className="mt-16">
          <Card className="border-border rounded-3xl overflow-hidden">
            <div className="aspect-video w-full">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019394323267!2d-122.41941492346644!3d37.77492997187697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sUnion%20Square%2C%20San%20Francisco%2C%20CA%2094108!5e0!3m2!1sen!2sus!4v1699564859845!5m2!1sen!2sus" width="100%" height="100%" style={{
              border: 0
            }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Store Location"></iframe>
            </div>
          </Card>
        </div>
      </div>
    </div>;
};
export default Contact;