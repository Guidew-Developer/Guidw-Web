import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { OrderRecord } from "@/types/guidew";
import { useTranslation } from "react-i18next";

interface OrderTimelineProps {
  orders: OrderRecord[];
}

const statusColors: Record<OrderRecord["status"], string> = {
  pending: "bg-gray-100 text-gray-700",
  "awaiting-provider": "bg-amber-100 text-amber-700",
  accepted: "bg-emerald-100 text-emerald-700",
  "in-progress": "bg-blue-100 text-blue-700",
  "awaiting-review": "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-rose-100 text-rose-700"
};

const OrderTimeline = ({ orders }: OrderTimelineProps) => {
  const { t } = useTranslation();
  if (!orders.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.timeline.title")}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">{t("dashboard.timeline.empty")}</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("dashboard.timeline.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="rounded-lg border p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{format(new Date(order.startTime), "PPPp")}</p>
                <p className="text-xs text-muted-foreground">{order.location.address}</p>
              </div>
              <Badge className={statusColors[order.status]}>
                {t(`dashboard.status.${order.status}`, { defaultValue: order.status.replace(/-/g, " ") })}
              </Badge>
            </div>

            <div className="space-y-2">
              {order.timeline.map(event => (
                <div key={event.id} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-teal" />
                  <span>
                    {event.translationKey
                      ? t(event.translationKey, {
                          defaultValue: event.description,
                          ...(event.translationValues ?? {})
                        })
                      : event.description}
                  </span>
                  <span className="ml-auto text-xs">{format(new Date(event.timestamp), "PPp")}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default OrderTimeline;
