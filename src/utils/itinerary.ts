import type { OrderRecord, ProviderProfile, ServiceOffering } from "@/types/guidew";

interface GenerateItineraryInput {
  order: OrderRecord;
  service: ServiceOffering;
  provider: ProviderProfile;
}

const tagTemplates: Record<string, string[]> = {
  "city-guide": [
    "Welcome briefing at a local café",
    "Walk through heritage precincts and hidden laneways",
    "Panoramic lookout for photos",
    "Food tastings at favourite neighbourhood spots"
  ],
  translation: [
    "Pre-meeting terminology alignment",
    "On-site live translation support",
    "Summary notes and key phrases recap"
  ],
  food: [
    "Market visit with ingredient story",
    "Local eatery tasting menu",
    "Dessert stop at iconic venue"
  ],
  dance: [
    "Warm-up and foundations",
    "Partnered routine walk-through",
    "Freestyle practice with feedback"
  ],
  adventure: [
    "Safety and gear check",
    "Trail or activity briefing",
    "Guided experience with photo stops"
  ]
};

const defaultTemplates = [
  "Meet & align on expectations",
  "Core experience tailored to your interests",
  "Wrap-up, recap, and next-step suggestions"
];

export const generateItineraryPlan = ({ order, service, provider }: GenerateItineraryInput) => {
  const segments = new Set<string>();
  service.tags.forEach(tag => {
    tagTemplates[tag]?.forEach(item => segments.add(item));
  });

  if (segments.size === 0) {
    defaultTemplates.forEach(item => segments.add(item));
  }

  const durationBlocks = Math.max(2, Math.round(order.durationHours));
  const plan = Array.from(segments).slice(0, durationBlocks);

  const header = `Service: ${service.title} with ${provider.location.city} expert ${provider.id.replace("provider-", "")}`;
  const travelNotice = `Travel buffer: ${order.travel.estimatedTravelMinutes} minutes (auto-calculated)`;

  return [header, travelNotice, ...plan.map((item, index) => `Phase ${index + 1}: ${item}`), "Time for feedback & wrap-up"].join("\n");
};
