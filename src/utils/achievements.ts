import type { Achievement, BaseUser, OrderRecord, ProviderProfile } from "@/types/guidew";

const achievementTemplates: Achievement[] = [
  {
    id: "user-first-booking",
    title: "First Adventure",
    description: "Completed the first booking on Guidew.",
    awardedAt: "",
    type: "user"
  },
  {
    id: "provider-first-order",
    title: "First Client",
    description: "Delivered the first service on Guidew.",
    awardedAt: "",
    type: "provider"
  },
  {
    id: "provider-5-orders",
    title: "Trusted Local",
    description: "Completed 5 successful services.",
    awardedAt: "",
    type: "provider"
  },
  {
    id: "provider-50-orders",
    title: "City Legend",
    description: "Completed 50 successful services.",
    awardedAt: "",
    type: "provider"
  },
  {
    id: "user-3-cities",
    title: "Global Explorer",
    description: "Booked services in 3 different cities.",
    awardedAt: "",
    type: "user"
  }
];

export const evaluateAchievements = (
  user: BaseUser,
  orders: OrderRecord[],
  providerProfile?: ProviderProfile
) => {
  const earned: Achievement[] = [];
  const now = new Date().toISOString();

  const hasOrder = orders.some(order => order.userId === user.id && order.status === "completed");
  if (hasOrder && !user.achievements.some(a => a.id === "user-first-booking")) {
    const template = achievementTemplates.find(a => a.id === "user-first-booking");
    if (template) {
      earned.push({ ...template, awardedAt: now });
    }
  }

  const completedCities = new Set(
    orders
      .filter(order => order.userId === user.id && order.status === "completed")
      .map(order => order.location.address.split(",")[1]?.trim() ?? order.location.address)
  );
  if (completedCities.size >= 3 && !user.achievements.some(a => a.id === "user-3-cities")) {
    const template = achievementTemplates.find(a => a.id === "user-3-cities");
    if (template) {
      earned.push({ ...template, awardedAt: now });
    }
  }

  if (providerProfile) {
    const providerOrders = orders.filter(order => order.providerId === providerProfile.id && order.status === "completed");

    if (providerOrders.length >= 1 && !user.achievements.some(a => a.id === "provider-first-order")) {
      const template = achievementTemplates.find(a => a.id === "provider-first-order");
      if (template) {
        earned.push({ ...template, awardedAt: now });
      }
    }

    if (providerOrders.length >= 5 && !user.achievements.some(a => a.id === "provider-5-orders")) {
      const template = achievementTemplates.find(a => a.id === "provider-5-orders");
      if (template) {
        earned.push({ ...template, awardedAt: now });
      }
    }

    if (providerOrders.length >= 50 && !user.achievements.some(a => a.id === "provider-50-orders")) {
      const template = achievementTemplates.find(a => a.id === "provider-50-orders");
      if (template) {
        earned.push({ ...template, awardedAt: now });
      }
    }
  }

  return earned;
};

