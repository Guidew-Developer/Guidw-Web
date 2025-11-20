import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { OrderRecord } from "@/types/guidew";
import { useTranslation } from "react-i18next";

interface UpcomingOrdersProps {
  orders: OrderRecord[];
  onSelectOrder: (orderId: string) => void;
  selectedOrderId?: string;
}

const UpcomingOrders = ({ orders, onSelectOrder, selectedOrderId }: UpcomingOrdersProps) => {
  const { t } = useTranslation();
  const grouped = orders.reduce<Record<string, OrderRecord[]>>((accumulator, order) => {
    const day = format(new Date(order.startTime), "PPP");
    if (!accumulator[day]) accumulator[day] = [];
    accumulator[day].push(order);
    return accumulator;
  }, {});

  const sortedDays = Object.keys(grouped).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("dashboard.upcoming.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedDays.length === 0 && <p className="text-sm text-muted-foreground">{t("dashboard.upcoming.empty")}</p>}
        {sortedDays.map(day => (
          <div key={day} className="space-y-3">
            <p className="text-sm font-semibold">{day}</p>
            <div className="space-y-2">
              {grouped[day]
                .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
                .map(order => (
                  <button
                    key={order.id}
                    onClick={() => onSelectOrder(order.id)}
                    className={`w-full rounded-lg border p-3 text-left transition hover:border-brand-teal ${
                      selectedOrderId === order.id ? "border-brand-teal" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium">
                        {format(new Date(order.startTime), "p")} · {order.location.address}
                      </p>
                      <Badge>{t("dashboard.upcoming.duration", { hours: order.durationHours })}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {t("dashboard.upcoming.status", { status: t(`dashboard.status.${order.status}`, { defaultValue: order.status }) })}
                    </p>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UpcomingOrders;
