import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { BaseUser, OrderRecord, ProviderProfile, ServiceOffering } from "@/types/guidew";
import { useTranslation } from "react-i18next";

interface ReviewHistoryProps {
  orders: OrderRecord[];
  users: BaseUser[];
  services: ServiceOffering[];
  providerProfiles: ProviderProfile[];
  role: "user" | "provider";
}

const decisionCopy: Record<string, string> = {
  worth: "Worth it",
  "not-worth": "Not worth it",
  again: "Would work again",
  no: "Would not work again"
};

const ReviewHistory = ({ orders, users, services, providerProfiles, role }: ReviewHistoryProps) => {
  const { t } = useTranslation();
  const published = orders.filter(order => {
    if (!order.review?.publishedAt) return false;
    return new Date(order.review.publishedAt).getTime() <= Date.now();
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("dashboard.reviewHistory.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {published.length === 0 && (
          <p className="text-sm text-muted-foreground">{t("dashboard.reviewHistory.empty")}</p>
        )}
        {published.map(order => {
          const service = services.find(item => item.id === order.serviceId);
          const traveler = users.find(user => user.id === order.userId);
          const providerProfile = providerProfiles.find(profile => profile.id === order.providerId);
          const providerUser = providerProfile ? users.find(user => user.id === providerProfile.userId) : undefined;
          const counterpartName = role === "user" ? providerUser?.name : traveler?.name;
          const decision = role === "user" ? order.review?.providerDecision : order.review?.userDecision;
          const comment = role === "user" ? order.review?.providerComment : order.review?.userComment;

          return (
            <div key={order.id} className="rounded-lg border p-3 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="font-semibold">{service?.title ?? t("dashboard.reviewHistory.serviceFallback")}</p>
                  <p className="text-xs text-muted-foreground">{counterpartName ?? t("dashboard.reviewHistory.counterpartFallback")}</p>
                </div>
                {decision && (
                  <Badge>
                    {t(`dashboard.reviewHistory.decisions.${decision}`, {
                      defaultValue: decisionCopy[decision] ?? decision
                    })}
                  </Badge>
                )}
              </div>
              {comment && <p className="text-sm">{comment}</p>}
              <p className="text-xs text-muted-foreground">
                {t("dashboard.reviewHistory.published", {
                  date: new Date(order.review!.publishedAt!).toLocaleDateString()
                })}
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default ReviewHistory;
