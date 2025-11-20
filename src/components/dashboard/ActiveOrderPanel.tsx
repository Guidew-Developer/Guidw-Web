import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { OrderRecord } from "@/types/guidew";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

interface ActiveOrderPanelProps {
  order?: OrderRecord;
  onStart: (orderId: string) => void;
  onComplete: (orderId: string) => void;
  onSubmitItinerary: (orderId: string, itinerary: string) => void;
  onGenerateItinerary?: (orderId: string) => string | undefined;
  onReportUserNoShow?: (orderId: string) => void;
  isVip: boolean;
}

const ActiveOrderPanel = ({
  order,
  onStart,
  onComplete,
  onSubmitItinerary,
  onGenerateItinerary,
  onReportUserNoShow,
  isVip
}: ActiveOrderPanelProps) => {
  const { t } = useTranslation();
  const defaultItinerary = t("dashboard.activeOrder.defaultItinerary");
  const [itinerary, setItinerary] = useState(order?.itinerary ?? defaultItinerary);

  useEffect(() => {
    setItinerary(order?.itinerary ?? defaultItinerary);
  }, [order?.id, order?.itinerary, defaultItinerary]);

  const canReportNoShow = useMemo(() => {
    if (!order) return false;
    const now = Date.now();
    const start = new Date(order.startTime).getTime();
    return order.status === "in-progress" || (order.status === "accepted" && now - start > 0);
  }, [order]);

  if (!order) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.activeOrder.title")}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">{t("dashboard.activeOrder.empty")}</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("dashboard.activeOrder.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-lg font-semibold">{format(new Date(order.startTime), "PPP p")}</p>
          <p className="text-sm text-muted-foreground">{order.location.address}</p>
          <p className="text-sm">
            {t("dashboard.activeOrder.durationEarnings", {
              hours: order.durationHours,
              earnings: order.providerEarnings.toFixed(2)
            })}
          </p>
        </div>

        {order.requiresItinerary && (
          <div className="space-y-2">
            <Textarea value={itinerary} onChange={event => setItinerary(event.target.value)} rows={5} />
            <div className="flex flex-wrap gap-2">
              {isVip && onGenerateItinerary && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    const suggestion = onGenerateItinerary(order.id);
                    if (suggestion) {
                      setItinerary(suggestion);
                    }
                  }}
                >
                  {t("dashboard.activeOrder.aiButton")}
                </Button>
              )}
              <Button onClick={() => onSubmitItinerary(order.id, itinerary)}>
                {t("dashboard.activeOrder.submitItinerary")}
              </Button>
            </div>
            {!isVip && (
              <p className="text-xs text-muted-foreground">{t("dashboard.activeOrder.vipUpsell")}</p>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-2 justify-end">
          <Button variant="outline" onClick={() => onStart(order.id)}>
            {t("dashboard.activeOrder.start")}
          </Button>
          <Button onClick={() => onComplete(order.id)}>{t("dashboard.activeOrder.complete")}</Button>
          {canReportNoShow && onReportUserNoShow && (
            <Button variant="destructive" onClick={() => onReportUserNoShow(order.id)}>
              {t("dashboard.activeOrder.reportNoShow")}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActiveOrderPanel;
