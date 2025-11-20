import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { OrderRecord, ProviderProfile, ServiceOffering } from "@/types/guidew";
import { useTranslation } from "react-i18next";

interface ServiceRequestFormProps {
  services: ServiceOffering[];
  providers: ProviderProfile[];
  onSubmit: (payload: {
    serviceId: string;
    providerId: string;
    startTime: string;
    durationHours: number;
    address: string;
    requiresItinerary: boolean;
  }) => void;
  aiSuggest?: (query: string, options: { startTime: string; durationHours: number }) => ProviderProfile[];
  recommendedProviders: ProviderProfile[];
  onSelectProvider: (providerId: string) => void;
  activeOrder?: OrderRecord;
}

const ServiceRequestForm = ({
  services,
  providers,
  onSubmit,
  aiSuggest,
  recommendedProviders,
  onSelectProvider,
  activeOrder
}: ServiceRequestFormProps) => {
  const { t } = useTranslation();
  const [serviceId, setServiceId] = useState(services[0]?.id ?? "");
  const [providerId, setProviderId] = useState(providers[0]?.id ?? "");
  const [startTime, setStartTime] = useState(() => format(new Date(Date.now() + 3 * 60 * 60 * 1000), "yyyy-MM-dd'T'HH:mm"));
  const [duration, setDuration] = useState(2);
  const [address, setAddress] = useState("Sky Tower, Auckland");
  const [requiresItinerary, setRequiresItinerary] = useState(true);
  const [aiQuery, setAiQuery] = useState("I need a translator for a business meeting tomorrow afternoon in Wellington.");

  useEffect(() => {
    if (services.length && !services.some(service => service.id === serviceId)) {
      setServiceId(services[0].id);
    }
  }, [services, serviceId]);

  useEffect(() => {
    if (providers.length && !providers.some(provider => provider.id === providerId)) {
      setProviderId(providers[0].id);
    }
  }, [providers, providerId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("dashboard.request.title")}</CardTitle>
        <CardDescription>{t("dashboard.request.description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {activeOrder && (
          <div className="rounded-lg border border-amber-500 bg-amber-50 p-4 text-sm text-amber-700">
            {t("dashboard.request.activeWarning", { time: format(new Date(activeOrder.startTime), "PPPp") })}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t("dashboard.request.serviceLabel")}</Label>
            <Select value={serviceId} onValueChange={value => setServiceId(value)}>
              <SelectTrigger>
                <SelectValue placeholder={t("dashboard.request.servicePlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {services.map(service => (
                  <SelectItem key={service.id} value={service.id}>
                    {service.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{t("dashboard.request.providerLabel")}</Label>
            <Select value={providerId} onValueChange={value => setProviderId(value)}>
              <SelectTrigger>
                <SelectValue placeholder={t("dashboard.request.providerPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {providers.map(provider => (
                  <SelectItem key={provider.id} value={provider.id}>
                    {provider.location.city} · {provider.tags.slice(0, 2).join(", ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>{t("dashboard.request.startLabel")}</Label>
            <Input type="datetime-local" value={startTime} onChange={event => setStartTime(event.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>{t("dashboard.request.durationLabel")}</Label>
            <Input type="number" min={1} value={duration} onChange={event => setDuration(Number(event.target.value))} />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label>{t("dashboard.request.locationLabel")}</Label>
            <Input value={address} onChange={event => setAddress(event.target.value)} placeholder={t("dashboard.request.locationPlaceholder")} />
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label>{t("dashboard.request.itineraryLabel")}</Label>
            <div className="flex gap-3">
              <Button
                type="button"
                variant={requiresItinerary ? "default" : "outline"}
                onClick={() => setRequiresItinerary(true)}
              >
                {t("dashboard.request.itineraryYes")}
              </Button>
              <Button
                type="button"
                variant={!requiresItinerary ? "default" : "outline"}
                onClick={() => setRequiresItinerary(false)}
              >
                {t("dashboard.request.itineraryNo")}
              </Button>
            </div>
          </div>
        </div>

        {aiSuggest && (
          <div className="space-y-2">
            <Label>{t("dashboard.request.aiLabel")}</Label>
            <Textarea value={aiQuery} onChange={event => setAiQuery(event.target.value)} rows={4} />
            <Button
              type="button"
              variant="outline"
              onClick={() => aiSuggest(aiQuery, { startTime, durationHours: duration })}
            >
              {t("dashboard.request.aiButton")}
            </Button>
            {recommendedProviders.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recommendedProviders.map(provider => (
                  <button
                    key={provider.id}
                    onClick={() => {
                      setProviderId(provider.id);
                      onSelectProvider(provider.id);
                    }}
                    className="rounded-lg border p-3 text-left hover:border-brand-teal"
                  >
                    <p className="font-semibold">{provider.location.city} · {provider.tags[0]}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("dashboard.request.speaksLanguages", { languages: provider.languages.join(", ") })}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <Button
          className="w-full"
          onClick={() =>
            onSubmit({
              serviceId,
              providerId,
              startTime,
              durationHours: duration,
              address,
              requiresItinerary
            })
          }
        >
          {t("dashboard.request.submit")}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceRequestForm;
