import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { OrderRecord } from "@/types/guidew";
import { useEffect, useState } from "react";

interface ActiveOrderPanelProps {
  order?: OrderRecord;
  onStart: (orderId: string) => void;
  onComplete: (orderId: string) => void;
  onSubmitItinerary: (orderId: string, itinerary: string) => void;
}

const ActiveOrderPanel = ({ order, onStart, onComplete, onSubmitItinerary }: ActiveOrderPanelProps) => {
  const [itinerary, setItinerary] = useState(order?.itinerary ?? "Morning coffee at local cafe\nTour of city highlights\nLunch at waterfront");

  useEffect(() => {
    setItinerary(order?.itinerary ?? "Morning coffee at local cafe\nTour of city highlights\nLunch at waterfront");
  }, [order?.id, order?.itinerary]);

  if (!order) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Active order</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">No active orders. Grab a new request from the queue.</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active order</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-lg font-semibold">{format(new Date(order.startTime), "PPP p")}</p>
          <p className="text-sm text-muted-foreground">{order.location.address}</p>
          <p className="text-sm">Duration {order.durationHours} hours · Earnings ${order.providerEarnings.toFixed(2)}</p>
        </div>

        {order.requiresItinerary && (
          <div className="space-y-2">
            <Textarea value={itinerary} onChange={event => setItinerary(event.target.value)} rows={5} />
            <Button onClick={() => onSubmitItinerary(order.id, itinerary)}>Submit itinerary</Button>
          </div>
        )}

        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={() => onStart(order.id)}>
            Start service
          </Button>
          <Button onClick={() => onComplete(order.id)}>Complete</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveOrderPanel;

