import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import type {
  BaseUser,
  CityLocation,
  GuidewAction,
  GuidewState,
  OrderRecord,
  OrderReview,
  ProviderProfile,
  ServiceOffering,
  UserRole
} from "@/types/guidew";
import { estimateTravelWindow } from "@/utils/geo";
import { evaluateAchievements } from "@/utils/achievements";
import { createId } from "@/utils/id";

const STORAGE_KEY = "guidew-state-v1";

const defaultUsers: BaseUser[] = [
  {
    id: "user-alex",
    name: "Alex Walker",
    email: "alex@example.com",
    role: "user",
    vip: { active: true, startedAt: new Date().toISOString(), renewsAt: undefined, amount: 9.9, currency: "USD" },
    wallet: { balance: 500, pending: 0, withdrawable: 0, currency: "USD", lastUpdated: new Date().toISOString() },
    createdAt: new Date().toISOString(),
    lastKnownLocation: { city: "Auckland", country: "New Zealand", lat: -36.8485, lng: 174.7633 },
    achievements: [],
    preferredLanguages: ["English"],
    verifiedLevels: ["basic"]
  },
  {
    id: "user-jordan",
    name: "Jordan Patel",
    email: "jordan@example.com",
    role: "provider",
    vip: { active: true, startedAt: new Date().toISOString(), renewsAt: undefined, amount: 9.9, currency: "USD" },
    wallet: { balance: 0, pending: 0, withdrawable: 0, currency: "USD", lastUpdated: new Date().toISOString() },
    createdAt: new Date().toISOString(),
    lastKnownLocation: { city: "Wellington", country: "New Zealand", lat: -41.2865, lng: 174.7762 },
    achievements: [],
    preferredLanguages: ["English", "Maori"],
    verifiedLevels: ["basic", "home-access"]
  }
];

const defaultProviders: ProviderProfile[] = [
  {
    id: "provider-jordan",
    userId: "user-jordan",
    bio: "Cultural guide and interpreter specializing in Wellington's art scene.",
    hourlyRate: 65,
    minHours: 2,
    tags: ["city-guide", "translation", "art", "food"],
    languages: ["English", "Maori", "Mandarin"],
    includesExpenses: false,
    expenseNotes: "Transport and tickets billed separately",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
        description: "Walking tour in Wellington"
      }
    ],
    certifications: [
      {
        id: "cert-police-clearance",
        title: "NZ Ministry of Justice - Clean Slate",
        issuedBy: "NZ Ministry of Justice",
        issueDate: "2023-06-10"
      }
    ],
    location: { city: "Wellington", country: "New Zealand", lat: -41.2865, lng: 174.7762 },
    availability: [
      { id: createId("slot"), day: 1, start: "09:00", end: "17:00" },
      { id: createId("slot"), day: 3, start: "12:00", end: "20:00" },
      { id: createId("slot"), day: 5, start: "08:00", end: "14:00" }
    ],
    travelRadiusKm: 30,
    autoAccept: true,
    vip: true,
    rating: 4.92,
    completedOrders: 42,
    activeOrderId: undefined,
    penaltyPoints: 0
  }
];

const defaultServices: ServiceOffering[] = [
  {
    id: "service-wellington-guide",
    providerId: "provider-jordan",
    title: "Wellington Cultural Immersion",
    description: "Tailored cultural experiences across Wellington including Te Papa, Cuba Street, and hidden food gems.",
    hourlyRate: 65,
    minHours: 2,
    tags: ["culture", "food", "city-guide", "history"],
    category: "City Guide",
    includesExpenses: false,
    expenseDetails: "Tickets and transportation not included.",
    media: [
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
        description: "Wellington waterfront"
      }
    ]
  }
];

const defaultState: GuidewState = {
  users: defaultUsers,
  providerProfiles: defaultProviders,
  services: defaultServices,
  orders: [],
  chats: [],
  currentUserId: "user-alex"
};

const reducer = (state: GuidewState, action: GuidewAction): GuidewState => {
  switch (action.type) {
    case "REGISTER_USER":
      return { ...state, users: [...state.users, action.payload], currentUserId: action.payload.id };
    case "SET_CURRENT_USER":
      return { ...state, currentUserId: action.payload };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map(user => (user.id === action.payload.id ? action.payload : user))
      };
    case "UPSERT_USERS":
      return { ...state, users: action.payload };
    case "UPSERT_PROVIDER": {
      const exists = state.providerProfiles.some(p => p.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          providerProfiles: state.providerProfiles.map(p => (p.id === action.payload.id ? action.payload : p))
        };
      }
      return { ...state, providerProfiles: [...state.providerProfiles, action.payload] };
    }
    case "UPSERT_PROVIDER_BATCH":
      return { ...state, providerProfiles: action.payload };
    case "UPSERT_SERVICE": {
      const exists = state.services.some(service => service.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          services: state.services.map(service => (service.id === action.payload.id ? action.payload : service))
        };
      }
      return { ...state, services: [...state.services, action.payload] };
    }
    case "UPSERT_SERVICES":
      return { ...state, services: action.payload };
    case "UPSERT_ORDER": {
      const exists = state.orders.some(order => order.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          orders: state.orders.map(order => (order.id === action.payload.id ? action.payload : order))
        };
      }
      return { ...state, orders: [...state.orders, action.payload] };
    }
    case "UPSERT_ORDERS":
      return { ...state, orders: action.payload };
    case "UPSERT_CHAT":
      return { ...state, chats: [...state.chats, action.payload] };
    default:
      return state;
  }
};

interface RegisterUserInput {
  id?: string;
  name: string;
  email: string;
  role: UserRole;
  lastKnownLocation: CityLocation;
  preferredLanguages: string[];
  verifiedLevels?: string[];
}

interface GuidewContextValue extends GuidewState {
  registerUser: (user: RegisterUserInput) => string;
  signIn: (email: string) => boolean;
  signOut: () => void;
  upsertProviderProfile: (profile: ProviderProfile) => void;
  upsertService: (service: ServiceOffering) => void;
  createOrder: (input: {
    userId: string;
    providerId: string;
    serviceId: string;
    startTime: string;
    durationHours: number;
    location: OrderRecord["location"];
    requiresItinerary: boolean;
  }) => OrderRecord | undefined;
  updateOrder: (order: OrderRecord) => void;
  acceptOrder: (orderId: string) => void;
  startOrder: (orderId: string) => void;
  submitItinerary: (orderId: string, itinerary: string) => void;
  completeOrder: (orderId: string) => void;
  cancelOrder: (orderId: string, actor: "user" | "provider") => CancellationResult;
  addChat: (message: { orderId: string; senderId: string; content: string }) => void;
  addTip: (orderId: string, amount: number) => void;
  submitReview: (orderId: string, review: Partial<OrderReview>, actor: "user" | "provider") => void;
  upgradeVip: (userId: string) => void;
  downgradeVip: (userId: string) => void;
  refreshWallets: () => void;
  recomputeAchievements: (userId: string) => void;
  setProviderAutoAccept: (providerId: string, autoAccept: boolean) => void;
  updateProviderAvailability: (providerId: string, availability: ProviderProfile["availability"]) => void;
}

interface CancellationResult {
  success: boolean;
  message: string;
  outcome?: OrderRecord["cancellation"];
}

const GuidewContext = createContext<GuidewContextValue | undefined>(undefined);

const persistState = (state: GuidewState) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

const loadState = (): GuidewState => {
  const stored = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
  if (!stored) {
    return defaultState;
  }
  try {
    const parsed = JSON.parse(stored) as GuidewState;
    return { ...defaultState, ...parsed };
  } catch (error) {
    console.error("Failed to parse Guidew state", error);
    return defaultState;
  }
};

export const GuidewProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    persistState(state);
  }, [state]);

  const registerUser: GuidewContextValue["registerUser"] = input => {
    const now = new Date().toISOString();
    const newUser: BaseUser = {
      id: input.id || createId("user"),
      name: input.name,
      email: input.email,
      role: input.role,
      lastKnownLocation: input.lastKnownLocation,
      preferredLanguages: input.preferredLanguages,
      vip: { active: false, amount: 9.9, currency: "USD" },
      wallet: { balance: 0, pending: 0, withdrawable: 0, currency: "USD", lastUpdated: now },
      createdAt: now,
      achievements: [],
      verifiedLevels: input.verifiedLevels ?? ["basic"]
    };
    dispatch({ type: "REGISTER_USER", payload: newUser });
    return newUser.id;
  };

  const signIn: GuidewContextValue["signIn"] = email => {
    const user = state.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      dispatch({ type: "SET_CURRENT_USER", payload: user.id });
      return true;
    }
    return false;
  };

  const signOut = () => {
    dispatch({ type: "SET_CURRENT_USER", payload: undefined });
  };

  const upsertProviderProfile: GuidewContextValue["upsertProviderProfile"] = profile => {
    dispatch({ type: "UPSERT_PROVIDER", payload: profile });
  };

  const upsertService: GuidewContextValue["upsertService"] = service => {
    dispatch({ type: "UPSERT_SERVICE", payload: service });
  };

  const addTimelineEvent = (order: OrderRecord, description: string, type: OrderRecord["timeline"][number]["type"]) => {
    return {
      ...order,
      timeline: [
        ...order.timeline,
        { id: createId("timeline"), timestamp: new Date().toISOString(), description, type }
      ]
    };
  };

  const createOrder: GuidewContextValue["createOrder"] = ({
    userId,
    providerId,
    serviceId,
    startTime,
    durationHours,
    location,
    requiresItinerary
  }) => {
    const user = state.users.find(u => u.id === userId);
    const provider = state.providerProfiles.find(p => p.id === providerId);
    const service = state.services.find(s => s.id === serviceId);

    if (!user || !provider || !service) return undefined;

    const travel = estimateTravelWindow(provider.location, location, startTime);
    const basePrice = service.hourlyRate * Math.max(service.minHours, durationHours);
    const platformFee = basePrice * 0.15;
    const userFee = user.vip.active ? 0 : basePrice * 0.05;
    const providerEarnings = basePrice - platformFee;

    const order: OrderRecord = {
      id: createId("order"),
      userId,
      providerId: provider.id,
      serviceId,
      status: provider.autoAccept ? "accepted" : "awaiting-provider",
      startTime,
      durationHours,
      location,
      createdAt: new Date().toISOString(),
      travel,
      basePrice,
      platformFee,
      userFee,
      providerEarnings,
      vipBoost: user.vip.active,
      requiresItinerary,
      timeline: [
        {
          id: createId("timeline"),
          timestamp: new Date().toISOString(),
          type: "created",
          description: `Order created by ${user.name}`
        }
      ]
    };

    const updated = provider.autoAccept
      ? addTimelineEvent(order, "Auto accepted by VIP provider", "auto-accepted")
      : order;

    dispatch({ type: "UPSERT_ORDER", payload: updated });

    const updatedUsers = state.users.map(existing => {
      if (existing.id === user.id) {
        return {
          ...existing,
          wallet: {
            ...existing.wallet,
            balance: existing.wallet.balance - (basePrice + order.userFee),
            lastUpdated: new Date().toISOString()
          }
        };
      }
      return existing;
    });
    dispatch({ type: "UPSERT_USERS", payload: updatedUsers });

    if (provider.autoAccept) {
      dispatch({
        type: "UPSERT_PROVIDER",
        payload: { ...provider, activeOrderId: updated.id }
      });
    }

    return updated;
  };

  const updateOrder: GuidewContextValue["updateOrder"] = order => {
    dispatch({ type: "UPSERT_ORDER", payload: order });
  };

  const submitItinerary: GuidewContextValue["submitItinerary"] = (orderId, itinerary) => {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;
    const updated: OrderRecord = {
      ...order,
      itinerary,
      timeline: [
        ...order.timeline,
        {
          id: createId("timeline"),
          timestamp: new Date().toISOString(),
          type: "auto-matched",
          description: "Itinerary submitted"
        }
      ]
    };
    dispatch({ type: "UPSERT_ORDER", payload: updated });
  };

  const acceptOrder: GuidewContextValue["acceptOrder"] = orderId => {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;
    const updated = addTimelineEvent({ ...order, status: "accepted" }, "Provider accepted order", "accepted");
    dispatch({ type: "UPSERT_ORDER", payload: updated });
    const provider = state.providerProfiles.find(p => p.id === order.providerId);
    if (provider) {
      dispatch({ type: "UPSERT_PROVIDER", payload: { ...provider, activeOrderId: updated.id } });
    }
  };

  const startOrder: GuidewContextValue["startOrder"] = orderId => {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;
    const updated = addTimelineEvent({ ...order, status: "in-progress" }, "Service started", "started");
    dispatch({ type: "UPSERT_ORDER", payload: updated });
  };

  const completeOrder: GuidewContextValue["completeOrder"] = orderId => {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;
    const updated: OrderRecord = {
      ...order,
      status: "awaiting-review",
      timeline: [
        ...order.timeline,
        {
          id: createId("timeline"),
          timestamp: new Date().toISOString(),
          type: "completed",
          description: "Service completed"
        }
      ]
    };
    dispatch({ type: "UPSERT_ORDER", payload: updated });

    const provider = state.providerProfiles.find(p => p.id === order.providerId);
    if (provider) {
      dispatch({
        type: "UPSERT_PROVIDER",
        payload: { ...provider, completedOrders: provider.completedOrders + 1, activeOrderId: undefined }
      });
    }

    const providerUser = provider ? state.users.find(u => u.id === provider.userId) : undefined;
    if (providerUser) {
      const updatedProvider = {
        ...providerUser,
        wallet: {
          ...providerUser.wallet,
          pending: providerUser.wallet.pending + order.providerEarnings,
          lastUpdated: new Date().toISOString()
        }
      };
      dispatch({ type: "UPDATE_USER", payload: updatedProvider });
    }
  };

  const cancelOrder: GuidewContextValue["cancelOrder"] = (orderId, actor) => {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return { success: false, message: "Order not found" };

    const now = new Date();
    const start = new Date(order.startTime);
    const minutesUntilStart = (start.getTime() - now.getTime()) / (1000 * 60);
    let userRefund = 0;
    let providerPayout = 0;
    let platformFee = 0;
    let providerPenaltyPoints = 0;
    let reason = "";

    if (minutesUntilStart > 180) {
      userRefund = order.basePrice + order.userFee;
      providerPayout = 0;
      platformFee = 0;
      reason = "Cancelled more than 3 hours in advance";
    } else if (minutesUntilStart > 60) {
      userRefund = order.basePrice * 0.5;
      providerPayout = order.basePrice * 0.25;
      platformFee = order.basePrice * 0.15;
      reason = "Cancelled 1-3 hours before start";
      providerPenaltyPoints = actor === "provider" ? 1 : 0;
    } else if (minutesUntilStart > 0) {
      userRefund = 0;
      providerPayout = order.basePrice * 0.85;
      platformFee = order.basePrice * 0.15;
      reason = "Cancelled less than 1 hour before start";
      providerPenaltyPoints = actor === "provider" ? 2 : 0;
    } else {
      userRefund = 0;
      providerPayout = actor === "provider" ? 0 : order.basePrice * 0.85;
      platformFee = order.basePrice * 0.15;
      reason = "Cancelled after service start";
      providerPenaltyPoints = actor === "provider" ? 4 : 0;
    }

    const cancellation = {
      userRefund,
      providerPayout,
      platformFee,
      providerPenaltyPoints,
      reason
    };

    const updated: OrderRecord = {
      ...order,
      status: "cancelled",
      cancellation,
      timeline: [
        ...order.timeline,
        {
          id: createId("timeline"),
          timestamp: new Date().toISOString(),
          type: "cancelled",
          description: `${actor} cancelled the service`
        }
      ]
    };

    dispatch({ type: "UPSERT_ORDER", payload: updated });

    const providerProfile = state.providerProfiles.find(profile => profile.id === order.providerId);
    if (providerProfile) {
      dispatch({
        type: "UPSERT_PROVIDER",
        payload: {
          ...providerProfile,
          penaltyPoints: (providerProfile.penaltyPoints ?? 0) + providerPenaltyPoints
        }
      });

      const providerUser = state.users.find(user => user.id === providerProfile.userId);
      if (providerUser) {
        const updatedProvider: BaseUser = {
          ...providerUser,
          wallet: {
            ...providerUser.wallet,
            balance: providerUser.wallet.balance + providerPayout,
            lastUpdated: new Date().toISOString()
          }
        };
        dispatch({ type: "UPDATE_USER", payload: updatedProvider });
      }
    }

    return { success: true, message: reason, outcome: cancellation };
  };

  const addChat: GuidewContextValue["addChat"] = ({ orderId, senderId, content }) => {
    dispatch({
      type: "UPSERT_CHAT",
      payload: {
        id: createId("chat"),
        orderId,
        senderId,
        content,
        sentAt: new Date().toISOString(),
        readBy: [senderId]
      }
    });
  };

  const addTip: GuidewContextValue["addTip"] = (orderId, amount) => {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;
    const updated: OrderRecord = {
      ...order,
      tip: { amount, currency: "USD", addedAt: new Date().toISOString() },
      timeline: [
        ...order.timeline,
        {
          id: createId("timeline"),
          timestamp: new Date().toISOString(),
          description: "Tip added",
          type: "tip-added"
        }
      ]
    };
    dispatch({ type: "UPSERT_ORDER", payload: updated });
  };

  const submitReview: GuidewContextValue["submitReview"] = (orderId, review, actor) => {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;
    const merged: OrderReview = { ...order.review, ...review };

    if (actor === "user") {
      merged.userSubmittedAt = new Date().toISOString();
    } else {
      merged.providerSubmittedAt = new Date().toISOString();
    }

    if (merged.userSubmittedAt && merged.providerSubmittedAt) {
      const userSubmitted = new Date(merged.userSubmittedAt).getTime();
      const providerSubmitted = new Date(merged.providerSubmittedAt).getTime();
      const publishedAt = new Date(Math.max(userSubmitted, providerSubmitted) + 3 * 24 * 60 * 60 * 1000).toISOString();
      merged.publishedAt = publishedAt;
    }

    const updated: OrderRecord = {
      ...order,
      review: merged,
      status: merged.publishedAt ? "completed" : order.status,
      timeline: [
        ...order.timeline,
        {
          id: createId("timeline"),
          timestamp: new Date().toISOString(),
          description: `${actor} submitted a review`,
          type: "review-submitted"
        }
      ]
    };

    dispatch({ type: "UPSERT_ORDER", payload: updated });
  };

  const upgradeVip: GuidewContextValue["upgradeVip"] = userId => {
    const user = state.users.find(u => u.id === userId);
    if (!user) return;
    const updated: BaseUser = {
      ...user,
      vip: {
        active: true,
        startedAt: new Date().toISOString(),
        renewsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        amount: 9.9,
        currency: "USD"
      }
    };
    dispatch({ type: "UPDATE_USER", payload: updated });
  };

  const downgradeVip: GuidewContextValue["downgradeVip"] = userId => {
    const user = state.users.find(u => u.id === userId);
    if (!user) return;
    const updated: BaseUser = {
      ...user,
      vip: { ...user.vip, active: false }
    };
    dispatch({ type: "UPDATE_USER", payload: updated });
  };

  const refreshWallets: GuidewContextValue["refreshWallets"] = () => {
    const now = new Date();
    const updatedUsers = state.users.map(user => {
      const providerProfile = state.providerProfiles.find(profile => profile.userId === user.id);
      const relevantOrders = providerProfile
        ? state.orders.filter(order => order.providerId === providerProfile.id)
        : [];
      let withdrawable = user.wallet.withdrawable;
      let pending = user.wallet.pending;

      relevantOrders.forEach(order => {
        if (order.status === "awaiting-review" || order.status === "completed") {
          const completedEvent = order.timeline.find(event => event.type === "completed");
          if (completedEvent) {
            const completedAt = new Date(completedEvent.timestamp);
            const diffDays = (now.getTime() - completedAt.getTime()) / (1000 * 60 * 60 * 24);
            if (diffDays >= 7 && pending >= order.providerEarnings) {
              pending -= order.providerEarnings;
              withdrawable += order.providerEarnings;
            }
          }
        }
      });

      return {
        ...user,
        wallet: { ...user.wallet, withdrawable, pending, lastUpdated: new Date().toISOString() }
      };
    });

    dispatch({ type: "UPSERT_USERS", payload: updatedUsers });
  };

  const recomputeAchievements: GuidewContextValue["recomputeAchievements"] = userId => {
    const user = state.users.find(u => u.id === userId);
    if (!user) return;
    const providerProfile = state.providerProfiles.find(p => p.userId === user.id);
    const achievements = evaluateAchievements(user, state.orders, providerProfile);
    if (!achievements.length) return;

    const updated: BaseUser = {
      ...user,
      achievements: [...user.achievements, ...achievements]
    };
    dispatch({ type: "UPDATE_USER", payload: updated });
  };

  const value = useMemo<GuidewContextValue>(
    () => ({
      ...state,
      registerUser,
      signIn,
      signOut,
      upsertProviderProfile,
      upsertService,
      createOrder,
      updateOrder,
      acceptOrder,
      startOrder,
      submitItinerary,
      completeOrder,
      cancelOrder,
      addChat,
      addTip,
      submitReview,
      upgradeVip,
      downgradeVip,
      refreshWallets,
      recomputeAchievements,
      setProviderAutoAccept: (providerId, autoAccept) => {
        const provider = state.providerProfiles.find(profile => profile.id === providerId);
        if (!provider) return;
        dispatch({ type: "UPSERT_PROVIDER", payload: { ...provider, autoAccept } });
      },
      updateProviderAvailability: (providerId, availability) => {
        const provider = state.providerProfiles.find(profile => profile.id === providerId);
        if (!provider) return;
        dispatch({ type: "UPSERT_PROVIDER", payload: { ...provider, availability } });
      }
    }),
    [state]
  );

  return <GuidewContext.Provider value={value}>{children}</GuidewContext.Provider>;
};

export const useGuidew = () => {
  const context = useContext(GuidewContext);
  if (!context) {
    throw new Error("useGuidew must be used within GuidewProvider");
  }
  return context;
};

