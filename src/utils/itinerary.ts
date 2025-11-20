import type { OrderRecord, ProviderProfile, ServiceOffering } from "@/types/guidew";
import type { SupportedLocale } from "@/utils/locale";
import i18n from "@/i18n/config";

interface GenerateItineraryInput {
  order: OrderRecord;
  service: ServiceOffering;
  provider: ProviderProfile;
  locale?: SupportedLocale;
}
export const generateItineraryPlan = ({ order, service, provider, locale = "en" }: GenerateItineraryInput) => {
  const t = i18n.getFixedT(locale);
  const tagTemplates = t("dashboard.itinerary.tags", { returnObjects: true }) as Record<string, string[]>;
  const defaultTemplates = t("dashboard.itinerary.defaults", { returnObjects: true }) as string[];
  const segments = new Set<string>();
  service.tags.forEach(tag => {
    tagTemplates[tag]?.forEach(item => segments.add(item));
  });

  if (segments.size === 0) {
    defaultTemplates.forEach(item => segments.add(item));
  }

  const durationBlocks = Math.max(2, Math.round(order.durationHours));
  const plan = Array.from(segments).slice(0, durationBlocks);

  const header = t("dashboard.itinerary.header", {
    service: service.title,
    city: provider.location.city,
    expert: provider.id.replace("provider-", "")
  });
  const travelNotice = t("dashboard.itinerary.travel", {
    minutes: order.travel.estimatedTravelMinutes
  });
  const wrapUp = t("dashboard.itinerary.wrapUp");

  return [
    header,
    travelNotice,
    ...plan.map((item, index) =>
      t("dashboard.itinerary.phase", {
        index: index + 1,
        item
      })
    ),
    wrapUp
  ].join("\n");
};
