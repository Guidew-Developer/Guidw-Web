import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ProviderMap from "@/components/dashboard/ProviderMap";
import ProviderList from "@/components/dashboard/ProviderList";
import ServiceRequestForm from "@/components/dashboard/ServiceRequestForm";
import OrderTimeline from "@/components/dashboard/OrderTimeline";
import UpcomingOrders from "@/components/dashboard/UpcomingOrders";
import ChatPanel from "@/components/dashboard/ChatPanel";
import WalletSummary from "@/components/dashboard/WalletSummary";
import AchievementsPanel from "@/components/dashboard/AchievementsPanel";
import ReviewPanel from "@/components/dashboard/ReviewPanel";
import ThirdPartySuggestions from "@/components/dashboard/ThirdPartySuggestions";
import ProviderFilters, { ProviderFilterState } from "@/components/dashboard/ProviderFilters";
import ReviewHistory from "@/components/dashboard/ReviewHistory";
import OrderActionsCard from "@/components/dashboard/OrderActionsCard";
import { useGuidew } from "@/state/GuidewProvider";
import type { ProviderProfile } from "@/types/guidew";
import { estimateTravelWindow, haversineDistanceKm } from "@/utils/geo";

const UserApp = () => {
  const {
    currentUserId,
    users,
    providerProfiles,
    services,
    orders,
    chats,
    createOrder,
    addChat,
    addTip,
    submitReview,
    upgradeVip,
    downgradeVip,
    refreshWallets,
    recomputeAchievements,
    cancelOrder,
    reportProviderNoShow
  } = useGuidew();

  const currentUser = users.find(user => user.id === currentUserId);
  const [selectedProviderId, setSelectedProviderId] = useState<string | undefined>();
  const [recommendedProviders, setRecommendedProviders] = useState<ProviderProfile[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | undefined>();
  const [filters, setFilters] = useState<ProviderFilterState>({
    tags: [],
    languages: [],
    vipOnly: false,
    autoAcceptOnly: false,
    minRating: 0
  });

  const userOrders = useMemo(
    () => orders.filter(order => order.userId === currentUser?.id).sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()),
    [orders, currentUser?.id]
  );

  const upcoming = userOrders.filter(order => new Date(order.startTime) >= new Date());
  const completed = userOrders.filter(order => order.status === "awaiting-review" || order.status === "completed");
  const activeOrder = userOrders.find(order => order.status === "accepted" || order.status === "in-progress");
  const orderForChat = userOrders.find(order => order.id === selectedOrderId) ?? activeOrder;

  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }

  const userLocation = currentUser.lastKnownLocation;

  const timeStringToMinutes = (value: string) => {
    const [hours, minutes] = value.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const matchesAvailability = (provider: ProviderProfile, startTime: string, durationHours: number) => {
    if (!provider.availability.length) return true;
    const start = new Date(startTime);
    const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);
    const day = start.getDay();
    const startMinutes = start.getHours() * 60 + start.getMinutes();
    const endMinutes = end.getHours() * 60 + end.getMinutes();

    return provider.availability.some(slot => {
      if (slot.day !== day) return false;
      const slotStart = timeStringToMinutes(slot.start);
      const slotEnd = timeStringToMinutes(slot.end);
      return slotStart <= startMinutes && slotEnd >= endMinutes;
    });
  };

  const hasProviderConflict = (providerId: string, startTime: string, durationHours: number) => {
    const start = new Date(startTime);
    const end = new Date(start.getTime() + durationHours * 60 * 60 * 1000);
    return orders.some(order => {
      if (order.providerId !== providerId) return false;
      if (order.status === "cancelled") return false;
      const orderStart = new Date(order.startTime);
      const orderEnd = new Date(orderStart.getTime() + order.durationHours * 60 * 60 * 1000);
      return start < orderEnd && end > orderStart;
    });
  };

  const providerCanServe = (provider: ProviderProfile, startTime: string, durationHours: number) => {
    if (provider.location.city !== userLocation.city) return false;
    if (!matchesAvailability(provider, startTime, durationHours)) return false;
    if (hasProviderConflict(provider.id, startTime, durationHours)) return false;
    const distance = haversineDistanceKm(provider.location, userLocation);
    if (distance > provider.travelRadiusKm) return false;
    const travelWindow = estimateTravelWindow(provider.location, userLocation, startTime);
    return travelWindow.canArriveOnTime;
  };

  const providersInCity = useMemo(
    () => providerProfiles.filter(provider => provider.location.city === userLocation.city),
    [providerProfiles, userLocation.city]
  );

  const filteredProviders = useMemo(
    () =>
      providersInCity.filter(provider => {
        if (filters.tags.length && !filters.tags.every(tag => provider.tags.includes(tag))) {
          return false;
        }
        if (filters.languages.length && !filters.languages.every(language => provider.languages.includes(language))) {
          return false;
        }
        if (filters.vipOnly && !provider.vip) {
          return false;
        }
        if (filters.autoAcceptOnly && !provider.autoAccept) {
          return false;
        }
        if (provider.rating < filters.minRating) {
          return false;
        }
        const distance = haversineDistanceKm(provider.location, userLocation);
        return distance <= provider.travelRadiusKm;
      }),
    [providersInCity, filters, userLocation.lat, userLocation.lng]
  );

  useEffect(() => {
    if (!selectedProviderId && filteredProviders.length) {
      setSelectedProviderId(filteredProviders[0].id);
    }
    if (selectedProviderId && !filteredProviders.some(provider => provider.id === selectedProviderId)) {
      setSelectedProviderId(filteredProviders[0]?.id);
    }
  }, [filteredProviders, selectedProviderId]);

  useEffect(() => {
    setRecommendedProviders(prev => prev.filter(provider => filteredProviders.some(item => item.id === provider.id)));
  }, [filteredProviders]);

  const handleSubmitRequest = ({
    serviceId,
    providerId,
    startTime,
    durationHours,
    address,
    requiresItinerary
  }: {
    serviceId: string;
    providerId: string;
    startTime: string;
    durationHours: number;
    address: string;
    requiresItinerary: boolean;
  }) => {
    const provider = providerProfiles.find(item => item.id === providerId);
    if (!provider || !providerCanServe(provider, startTime, durationHours)) {
      toast.error("Selected provider is unavailable for the requested slot.");
      return;
    }
    const order = createOrder({
      userId: currentUser.id,
      providerId,
      serviceId,
      startTime,
      durationHours,
      location: { address, lat: userLocation.lat, lng: userLocation.lng },
      requiresItinerary
    });
    if (!order) {
      toast.error("Unable to create order. Ensure provider has availability and try again.");
      return;
    }
    toast.success("Request submitted. We'll notify the expert.");
    recomputeAchievements(currentUser.id);
  };

  const handleAiSuggest = (query: string, options: { startTime: string; durationHours: number }) => {
    const keywords = query.toLowerCase().split(/\s+/);
    const matched = filteredProviders
      .filter(provider => providerCanServe(provider, options.startTime, options.durationHours))
      .map(provider => ({
        provider,
        score: keywords.filter(keyword => provider.tags.some(tag => tag.includes(keyword))).length +
          keywords.filter(keyword => provider.languages.some(language => language.toLowerCase().includes(keyword))).length
      }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.provider);
    setRecommendedProviders(matched);
    toast.success(`AI found ${matched.length} matching experts.`);
    return matched;
  };

  const handleCancelOrder = (orderId: string, mutual = false) => {
    const result = cancelOrder(orderId, "user", mutual ? { mutual: true } : undefined);
    if (result.success) {
      toast.success(result.message);
      refreshWallets();
    } else {
      toast.error(result.message);
    }
  };

  const handleReportProviderNoShow = (orderId: string) => {
    const result = reportProviderNoShow(orderId);
    if (result.success) {
      toast.success(result.message);
      refreshWallets();
    } else {
      toast.error(result.message);
    }
  };

  const handleToggleVip = () => {
    if (currentUser.vip.active) {
      downgradeVip(currentUser.id);
      toast("VIP cancelled. You can rejoin anytime.");
    } else {
      upgradeVip(currentUser.id);
      toast.success("VIP activated. Enjoy AI concierge and priority support!");
    }
  };

  const selectedCompletedOrder = completed.find(order => order.id === selectedOrderId) ?? completed[0];
  const selectedUpcomingOrder = upcoming.find(order => order.id === selectedOrderId) ?? upcoming[0];

  return (
    <div className="min-h-screen bg-brand-lightGray/60 p-6 space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Hi {currentUser.name.split(" ")[0]}, welcome to Guidew</h1>
          <p className="text-sm text-muted-foreground">
            Discover trusted locals in {currentUser.lastKnownLocation.city}, manage bookings, and unlock authentic experiences.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => refreshWallets()}>Sync wallet</Button>
          <Button onClick={() => recomputeAchievements(currentUser.id)}>Check achievements</Button>
        </div>
      </div>

      <Tabs defaultValue="explore" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="explore">Explore</TabsTrigger>
          <TabsTrigger value="messages">Chat</TabsTrigger>
          <TabsTrigger value="schedule">Trips</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
        </TabsList>

        <TabsContent value="explore" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProviderMap providers={filteredProviders} selectedProviderId={selectedProviderId} onSelect={setSelectedProviderId} />
            <ProviderList
              providers={filteredProviders}
              services={services}
              onSelect={setSelectedProviderId}
              activeProviderId={selectedProviderId}
              userLocation={{ lat: userLocation.lat, lng: userLocation.lng }}
            />
          </div>

          <ProviderFilters providers={providersInCity} value={filters} onChange={setFilters} />

          <ServiceRequestForm
            services={services.filter(service => filteredProviders.some(provider => provider.id === service.providerId))}
            providers={filteredProviders}
            onSubmit={handleSubmitRequest}
            aiSuggest={currentUser.vip.active ? handleAiSuggest : undefined}
            recommendedProviders={recommendedProviders}
            onSelectProvider={setSelectedProviderId}
            activeOrder={activeOrder}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <OrderTimeline orders={userOrders.slice(0, 5)} />
            <ThirdPartySuggestions />
          </div>
        </TabsContent>

        <TabsContent value="messages">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UpcomingOrders orders={upcoming} onSelectOrder={setSelectedOrderId} selectedOrderId={selectedOrderId} />
            <ChatPanel
              order={orderForChat}
              chats={chats}
              currentUserId={currentUser.id}
              onSend={message =>
                orderForChat && addChat({ orderId: orderForChat.id, senderId: currentUser.id, content: message })
              }
            />
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UpcomingOrders orders={upcoming} onSelectOrder={setSelectedOrderId} selectedOrderId={selectedOrderId} />
            <div className="space-y-6">
              <ReviewPanel
                order={selectedCompletedOrder}
                onSubmit={review => {
                  if (!selectedCompletedOrder) return;
                  submitReview(selectedCompletedOrder.id, { userDecision: review.decision, userComment: review.comment }, "user");
                  toast.success("Review submitted. We'll publish once the provider also reviews you.");
                }}
                onTip={amount => {
                  if (!selectedCompletedOrder) return;
                  addTip(selectedCompletedOrder.id, amount);
                  toast.success(`Tip of $${amount} added.`);
                }}
              />
              <OrderActionsCard
                order={selectedUpcomingOrder}
                onCancel={() => selectedUpcomingOrder && handleCancelOrder(selectedUpcomingOrder.id)}
                onMutualCancel={() => selectedUpcomingOrder && handleCancelOrder(selectedUpcomingOrder.id, true)}
                onReportProviderNoShow={() => selectedUpcomingOrder && handleReportProviderNoShow(selectedUpcomingOrder.id)}
              />
            </div>
          </div>

          <ReviewHistory
            orders={userOrders}
            users={users}
            services={services}
            providerProfiles={providerProfiles}
            role="user"
          />
        </TabsContent>

        <TabsContent value="wallet">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WalletSummary
              wallet={currentUser.wallet}
              vipActive={currentUser.vip.active}
              onRefresh={() => refreshWallets()}
              onToggleVip={handleToggleVip}
            />
            <AchievementsPanel achievements={currentUser.achievements} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserApp;

