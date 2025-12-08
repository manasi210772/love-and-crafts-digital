import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import { formatPrice } from "@/lib/currency";
import { getProductImage } from "@/lib/productImages";
import { Skeleton } from "@/components/ui/skeleton";
import type { RazorpayOptions, RazorpayResponse } from "@/types/razorpay";

const Cart = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: cartItems, isLoading } = useQuery({
    queryKey: ["cart", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("cart_items")
        .select(`
          *,
          products (*)
        `)
        .eq("user_id", user.id);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const updateQuantity = useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      if (quantity === 0) {
        const { error } = await supabase
          .from("cart_items")
          .delete()
          .eq("id", id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("cart_items")
          .update({ quantity })
          .eq("id", id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cart-count"] });
    },
  });

  const removeItem = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["cart-count"] });
      toast.success("Item removed from cart");
    },
  });

  const checkout = useMutation({
    mutationFn: async () => {
      if (!user || !cartItems || cartItems.length === 0) {
        throw new Error("Cart is empty");
      }

      // Validate stock availability
      for (const item of cartItems) {
        const stock = item.products?.stock ?? 0;
        if (stock < item.quantity) {
          throw new Error(`${item.products?.name} is out of stock or has insufficient quantity`);
        }
      }

      const total = cartItems.reduce(
        (sum, item) => sum + (item.products?.price || 0) * item.quantity,
        0
      );

      // Check if Razorpay is loaded
      if (!window.Razorpay) {
        throw new Error("Payment gateway not loaded. Please refresh the page.");
      }

      // Create Razorpay order
      const { data: orderData, error: orderError } = await supabase.functions.invoke(
        'create-razorpay-order',
        {
          body: {
            amount: total,
            currency: 'USD',
            receipt: `receipt_${Date.now()}`,
          },
        }
      );

      if (orderError) {
        throw new Error(orderError.message || "Failed to create order");
      }

      // Get primary color from CSS variable for Razorpay theme
      const primaryColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--primary')
        .trim();
      
      // Convert HSL to hex for Razorpay (fallback to default lavender)
      const themeColor = '#A78BFA';

      // Initialize Razorpay checkout
      const options: RazorpayOptions = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Crafted with Love',
        description: 'Purchase handmade crafts',
        order_id: orderData.orderId,
        handler: async function (response: RazorpayResponse) {
          try {
            // Verify payment
            const { error: verifyError } = await supabase.functions.invoke(
              'verify-razorpay-payment',
              {
                body: {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  userId: user.id,
                  totalAmount: total,
                },
              }
            );

            if (verifyError) throw verifyError;

            queryClient.invalidateQueries({ queryKey: ["cart"] });
            queryClient.invalidateQueries({ queryKey: ["cart-count"] });
            toast.success("Payment successful! Order placed.");
            navigate("/orders");
          } catch (error) {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          email: user.email,
        },
        theme: {
          color: themeColor,
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to initiate payment");
    },
  });

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <SEO title="Shopping Cart" description="View and manage your shopping cart" />
        <h1 className="font-display text-3xl mb-4">Please sign in to view your cart</h1>
        <Button onClick={() => navigate("/auth")}>Sign In</Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <SEO title="Shopping Cart" description="View and manage your shopping cart" />
        <div className="relative bg-gradient-to-br from-accent/10 via-background to-primary/10 py-16 mb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Skeleton className="h-16 w-16 rounded-full mx-auto mb-6" />
              <Skeleton className="h-12 w-64 mx-auto mb-4" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 pb-16">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[1, 2].map((i) => (
                <Card key={i}>
                  <CardContent className="p-4 flex gap-4">
                    <Skeleton className="w-24 h-24 rounded" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-32 mb-2" />
                      <Skeleton className="h-4 w-48 mb-2" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card>
              <CardContent className="p-6">
                <Skeleton className="h-8 w-40 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-6 w-full mb-4" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const total = cartItems?.reduce(
    (sum, item) => sum + (item.products?.price || 0) * item.quantity,
    0
  ) || 0;

  return (
    <div className="min-h-screen">
      <SEO title="Shopping Cart" description="View and manage your shopping cart" />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-accent/10 via-background to-primary/10 py-16 mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-primary/5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <ShoppingBag className="h-16 w-16 text-primary" />
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              </div>
            </div>
            
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-4 pb-2 bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent leading-relaxed">
              Shopping Cart
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your selected craft items are waiting to be yours
            </p>

            {/* Decorative line */}
            <div className="flex justify-center gap-2 mt-6">
              <div className="h-1 w-12 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full" />
              <div className="h-1 w-12 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
              <div className="h-1 w-12 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
      
      {!cartItems || cartItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground mb-4">Your cart is empty</p>
          <Button onClick={() => navigate("/shop")}>Continue Shopping</Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4 flex gap-4">
                  <img
                    src={getProductImage(item.products?.name || '', item.products?.image_url || '/placeholder.svg')}
                    alt={item.products?.name}
                    className="w-24 h-24 object-cover rounded"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.products?.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.products?.description}</p>
                    <p className="font-semibold mt-2">{formatPrice(item.products?.price || 0)}</p>
                    {(item.products?.stock ?? 0) < item.quantity && (
                      <p className="text-sm text-destructive mt-1">Low stock warning</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem.mutate(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateQuantity.mutate({
                            id: item.id,
                            quantity: item.quantity - 1,
                          })
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          updateQuantity.mutate({
                            id: item.id,
                            quantity: item.quantity + 1,
                          })
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="font-display text-2xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={() => checkout.mutate()}
                  disabled={checkout.isPending}
                >
                  {checkout.isPending ? "Processing..." : "Checkout"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Cart;
