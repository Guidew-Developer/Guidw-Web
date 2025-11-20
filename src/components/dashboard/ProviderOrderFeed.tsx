import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { OrderRecord } from "@/types/guidew";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

interface ProviderOrderFeedProps {
  orders: OrderRecord[];
  onAccept: (orderId: string) => void;
}

const ProviderOrderFeed = ({ orders, onAccept }: ProviderOrderFeedProps) => {
  const { t } = useTranslation();
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{t("dashboard.providerFeed.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {orders.length === 0 && (
          <p className="text-sm text-muted-foreground">{t("dashboard.providerFeed.empty")}</p>
        )}
        {orders.map(order => (
          <div key={order.id} className="rounded-lg border p-4 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">{format(new Date(order.startTime), "PPP p")}</p>
              <Button size="lg" className="text-xl" onClick={() => onAccept(order.id)}>
                {t("dashboard.providerFeed.grab")}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">{order.location.address}</p>
            <p className="text-sm">
              {t("dashboard.providerFeed.durationEarnings", {
                hours: order.durationHours,
                earnings: order.providerEarnings.toFixed(2)
              })}
            </p>
            <p className="text-xs text-muted-foreground">
              {t("dashboard.providerFeed.travelEstimate", { minutes: order.travel.estimatedTravelMinutes })} ·{" "}
              {order.travel.canArriveOnTime
                ? t("dashboard.providerFeed.arrivalOnTime")
                : t("dashboard.providerFeed.arrivalRisk")}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ProviderOrderFeed;
