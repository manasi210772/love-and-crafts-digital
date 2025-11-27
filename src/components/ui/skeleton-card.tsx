import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ProductCardSkeleton = () => (
  <Card className="overflow-hidden border-border bg-card rounded-2xl">
    <Skeleton className="aspect-square w-full" />
    <CardContent className="p-4">
      <Skeleton className="h-3 w-16 mb-1" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-2/3 mb-3" />
      <Skeleton className="h-8 w-24" />
    </CardContent>
    <CardFooter className="p-4 pt-0">
      <Skeleton className="h-10 w-full" />
    </CardFooter>
  </Card>
);

export const WorkshopCardSkeleton = () => (
  <Card className="overflow-hidden border-border bg-card rounded-2xl">
    <Skeleton className="aspect-video w-full" />
    <CardContent className="p-6">
      <Skeleton className="h-8 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-48" />
      </div>
    </CardContent>
    <CardFooter className="p-6 pt-0">
      <Skeleton className="h-10 w-full" />
    </CardFooter>
  </Card>
);

export const OrderCardSkeleton = () => (
  <Card className="overflow-hidden border-border bg-card">
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <Skeleton className="h-5 w-32 mb-2" />
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>
      <Skeleton className="h-px w-full my-4" />
      <Skeleton className="h-6 w-28" />
    </CardContent>
  </Card>
);
