export type UserRole = "user" | "provider";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface CityLocation extends Coordinates {
  city: string;
  country: string;
}

export interface AvailabilitySlot {
  id: string;
  day: number; // 0-6 (Sunday-Saturday)
  start: string; // HH:mm
  end: string; // HH:mm
}

export interface ProviderMedia {
  type: "image" | "video" | "document";
  url: string;
  description?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuedBy: string;
  issueDate: string;
  credentialUrl?: string;
}

export interface ProviderProfile {
  id: string;
  userId: string;
  bio: string;
  hourlyRate: number;
  minHours: number;
  tags: string[];
  languages: string[];
  includesExpenses: boolean;
  expenseNotes?: string;
  media: ProviderMedia[];
  certifications: Certification[];
  location: CityLocation;
  availability: AvailabilitySlot[];
  travelRadiusKm: number;
  autoAccept: boolean;
  vip: boolean;
  rating: number;
  completedOrders: number;
  activeOrderId?: string;
  penaltyPoints?: number;
}

export interface ServiceOffering {
  id: string;
  providerId: string;
  title: string;
  description: string;
  hourlyRate: number;
  minHours: number;
  tags: string[];
  category: string;
  includesExpenses: boolean;
  expenseDetails?: string;
  media: ProviderMedia[];
}

export type OrderStatus =
  | "pending"
  | "awaiting-provider"
  | "accepted"
  | "in-progress"
  | "completed"
  | "cancelled"
  | "awaiting-review";

export interface OrderLocation extends Coordinates {
  address: string;
}

export interface TravelWindow {
  estimatedTravelMinutes: number;
  canArriveOnTime: boolean;
}

export interface CancellationOutcome {
  userRefund: number;
  providerPayout: number;
  platformFee: number;
  providerPenaltyPoints: number;
  reason: string;
}

export interface OrderReview {
  userDecision?: "worth" | "not-worth";
  userComment?: string;
  providerDecision?: "again" | "no";
  providerComment?: string;
  userSubmittedAt?: string;
  providerSubmittedAt?: string;
  publishedAt?: string;
}

export interface TipInfo {
  amount: number;
  currency: string;
  addedAt: string;
}

export interface OrderTimelineEvent {
  id: string;
  timestamp: string;
  type:
    | "created"
    | "auto-matched"
    | "accepted"
    | "auto-accepted"
    | "started"
    | "completed"
    | "cancelled"
    | "payment-authorized"
    | "payment-captured"
    | "tip-added"
    | "review-submitted";
  description: string;
}

export interface OrderRecord {
  id: string;
  userId: string;
  providerId: string;
  serviceId: string;
  status: OrderStatus;
  startTime: string;
  durationHours: number;
  location: OrderLocation;
  createdAt: string;
  travel: TravelWindow;
  basePrice: number;
  platformFee: number;
  userFee: number;
  providerEarnings: number;
  vipBoost?: boolean;
  requiresItinerary: boolean;
  itinerary?: string;
  tip?: TipInfo;
  review?: OrderReview;
  timeline: OrderTimelineEvent[];
  cancellation?: CancellationOutcome;
}

export interface ChatMessage {
  id: string;
  orderId: string;
  senderId: string;
  content: string;
  sentAt: string;
  readBy: string[];
}

export interface WalletBalance {
  balance: number;
  pending: number;
  withdrawable: number;
  currency: string;
  lastUpdated: string;
}

export interface VipSubscription {
  active: boolean;
  startedAt?: string;
  renewsAt?: string;
  amount: number;
  currency: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  awardedAt: string;
  type: "user" | "provider";
}

export interface BaseUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  vip: VipSubscription;
  wallet: WalletBalance;
  createdAt: string;
  lastKnownLocation: CityLocation;
  achievements: Achievement[];
  preferredLanguages: string[];
  verifiedLevels: string[];
}

export interface GuidewState {
  users: BaseUser[];
  providerProfiles: ProviderProfile[];
  services: ServiceOffering[];
  orders: OrderRecord[];
  chats: ChatMessage[];
  currentUserId?: string;
}

export type GuidewAction =
  | { type: "REGISTER_USER"; payload: BaseUser }
  | { type: "SET_CURRENT_USER"; payload?: string }
  | { type: "UPSERT_PROVIDER"; payload: ProviderProfile }
  | { type: "UPSERT_SERVICE"; payload: ServiceOffering }
  | { type: "UPSERT_SERVICES"; payload: ServiceOffering[] }
  | { type: "UPSERT_ORDER"; payload: OrderRecord }
  | { type: "UPSERT_ORDERS"; payload: OrderRecord[] }
  | { type: "UPSERT_CHAT"; payload: ChatMessage }
  | { type: "UPDATE_USER"; payload: BaseUser }
  | { type: "UPSERT_USERS"; payload: BaseUser[] }
  | { type: "UPSERT_PROVIDER_BATCH"; payload: ProviderProfile[] };

