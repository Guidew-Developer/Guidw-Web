import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { OrderRecord } from "@/types/guidew";

interface OrderActionsCardProps {
  order?: OrderRecord;
  onCancel: () => void;
  onMutualCancel: () => void;
  onReportProviderNoShow: () => void;
}

const OrderActionsCard = ({ order, onCancel, onMutualCancel, onReportProviderNoShow }: OrderActionsCardProps) => {
  if (!order) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Order controls</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Select a scheduled order to cancel or report a no-show.
        </CardContent>
      </Card>
    );
  }

  const start = new Date(order.startTime);
  const minutesUntilStart = (start.getTime() - Date.now()) / (1000 * 60);
  const withinThreeHours = minutesUntilStart <= 180 && minutesUntilStart > 0;
  const hasStarted = minutesUntilStart <= 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="font-semibold">{format(start, "PPPp")}</p>
          <p className="text-sm text-muted-foreground">{order.location.address}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel booking
          </Button>
          <Button
            variant="outline"
            disabled={!withinThreeHours}
            onClick={onMutualCancel}
          >
            Mutual cancel
          </Button>
          <Button
            variant="destructive"
            disabled={!hasStarted}
            onClick={onReportProviderNoShow}
          >
            Report provider no-show
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Standard cancellations follow Guidew policy. Mutual cancellations within three hours refund 85% to the traveler. Once the start time passes you can report a provider no-show for a full refund.
        </p>
      </CardContent>
    </Card>
  );
};

export default OrderActionsCard;
