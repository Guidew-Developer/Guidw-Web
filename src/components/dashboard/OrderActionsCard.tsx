import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { OrderRecord } from "@/types/guidew";
import { useTranslation } from "react-i18next";

interface OrderActionsCardProps {
  order?: OrderRecord;
  onCancel: () => void;
  onMutualCancel: () => void;
  onReportProviderNoShow: () => void;
}

const OrderActionsCard = ({ order, onCancel, onMutualCancel, onReportProviderNoShow }: OrderActionsCardProps) => {
  const { t } = useTranslation();
  if (!order) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.orderActions.title")}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">{t("dashboard.orderActions.empty")}</CardContent>
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
        <CardTitle>{t("dashboard.orderActions.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="font-semibold">{format(start, "PPPp")}</p>
          <p className="text-sm text-muted-foreground">{order.location.address}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <Button variant="outline" onClick={onCancel}>
            {t("dashboard.orderActions.cancel")}
          </Button>
          <Button
            variant="outline"
            disabled={!withinThreeHours}
            onClick={onMutualCancel}
          >
            {t("dashboard.orderActions.mutual")}
          </Button>
          <Button
            variant="destructive"
            disabled={!hasStarted}
            onClick={onReportProviderNoShow}
          >
            {t("dashboard.orderActions.reportProvider")}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">{t("dashboard.orderActions.instructions")}</p>
      </CardContent>
    </Card>
  );
};

export default OrderActionsCard;
