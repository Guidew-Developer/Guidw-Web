import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { ProviderProfile, ServiceOffering } from "@/types/guidew";
import { formatDistance } from "@/utils/geo";
import { useTranslation } from "react-i18next";

interface ProviderListProps {
  providers: ProviderProfile[];
  services: ServiceOffering[];
  onSelect: (providerId: string) => void;
  activeProviderId?: string;
  userLocation: { lat: number; lng: number };
}

const ProviderList = ({ providers, services, onSelect, activeProviderId, userLocation }: ProviderListProps) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-4 max-h-[28rem] overflow-y-auto pr-2">
      {providers.map(provider => {
        const service = services.find(item => item.providerId === provider.id);
        const distance = formatDistance(
          Math.sqrt(
            Math.pow(provider.location.lat - userLocation.lat, 2) +
              Math.pow(provider.location.lng - userLocation.lng, 2)
          ) * 80
        );

        return (
          <Card
            key={provider.id}
            className={`cursor-pointer transition hover:border-brand-teal ${
              activeProviderId === provider.id ? "border-brand-teal" : ""
            }`}
            onClick={() => onSelect(provider.id)}
          >
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold">{service?.title ?? t("dashboard.providerList.serviceFallback")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("dashboard.providerList.meta", {
                      city: provider.location.city,
                      distance,
                      languages: provider.languages.join(", ")
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-brand-teal">
                    {t("dashboard.providerList.rate", { rate: provider.hourlyRate })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("dashboard.providerList.minHours", { hours: provider.minHours })}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {provider.tags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="font-semibold">{t("dashboard.providerList.verifications")}</p>
                  <p className="text-muted-foreground">
                    {t("dashboard.providerList.certifications", { count: provider.certifications.length })}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">{t("dashboard.providerList.rating")}</p>
                  <p className="text-muted-foreground">
                    {t("dashboard.providerList.ratingDetail", {
                      rating: provider.rating.toFixed(2),
                      trips: provider.completedOrders
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ProviderList;
