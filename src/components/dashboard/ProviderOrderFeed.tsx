import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { OrderRecord } from "@/types/guidew";
import { format } from "date-fns";

interface ProviderOrderFeedProps {
  orders: OrderRecord[];
  onAccept: (orderId: string) => void;
}

const ProviderOrderFeed = ({ orders, onAccept }: ProviderOrderFeedProps) => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle>Live requests</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {orders.length === 0 && <p className="text-sm text-muted-foreground">No new orders. Keep the app open to grab the next request.</p>}
      {orders.map(order => (
        <div key={order.id} className="rounded-lg border p-4 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">{format(new Date(order.startTime), "PPP p")}</p>
            <Button size="lg" className="text-xl" onClick={() => onAccept(order.id)}>
              抢
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">{order.location.address}</p>
          <p className="text-sm">Duration: {order.durationHours} hours · Earnings ${order.providerEarnings.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">
            Travel time estimate: {order.travel.estimatedTravelMinutes} minutes · {order.travel.canArriveOnTime ? "On time" : "Risk of delay"}
          </p>
        </div>
      ))}
    </CardContent>
  </Card>
);

export default ProviderOrderFeed;

