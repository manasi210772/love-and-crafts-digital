import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import SEO from "@/components/SEO";
import { formatPrice } from "@/lib/currency";
import { getProductImage } from "@/lib/productImages";
import { OrderCardSkeleton } from "@/components/ui/skeleton-card";

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <SEO title="My Orders" description="View your order history" />
        <h1 className="font-display text-3xl mb-4">Please sign in to view your orders</h1>
        <Button onClick={() => navigate("/auth")}>Sign In</Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20">
        <SEO title="My Orders" description="View your order history" />
        <div className="container mx-auto px-4 py-16">
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <OrderCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <SEO title="My Orders" description="View your order history and track your handcrafted treasures" />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-12 mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <Package className="h-12 w-12 text-primary" />
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              </div>
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-3 text-foreground">
              My Orders
            </h1>
            
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Track your handcrafted treasures and review your purchase history
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
      
      {!orders || orders.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">No orders yet</p>
          <Button onClick={() => navigate("/shop")}>Start Shopping</Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-normal">
                      Order #{order.id.slice(0, 8)}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={order.status === "completed" ? "default" : "secondary"}>
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {order.order_items?.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex gap-3">
                        <img
                          src={getProductImage(item.products?.name || '', item.products?.image_url || '/placeholder.svg')}
                          alt={item.products?.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium">{item.products?.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-semibold">{formatPrice(item.price_at_purchase)}</p>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-3 border-t font-bold">
                    <span>Total</span>
                    <span>{formatPrice(order.total_amount)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default Orders;
