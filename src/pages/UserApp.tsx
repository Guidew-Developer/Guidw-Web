import { useMemo, useState } from "react";
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
import { useGuidew } from "@/state/GuidewProvider";
import type { ProviderProfile } from "@/types/guidew";

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
    recomputeAchievements
  } = useGuidew();

  const currentUser = users.find(user => user.id === currentUserId);
  const [selectedProviderId, setSelectedProviderId] = useState<string | undefined>();
  const [recommendedProviders, setRecommendedProviders] = useState<ProviderProfile[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | undefined>();

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

  const availableProviders = providerProfiles.filter(provider => provider.location.city === currentUser.lastKnownLocation.city);

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
    const order = createOrder({
      userId: currentUser.id,
      providerId,
      serviceId,
      startTime,
      durationHours,
      location: { address, lat: currentUser.lastKnownLocation.lat, lng: currentUser.lastKnownLocation.lng },
      requiresItinerary
    });
    if (!order) {
      toast.error("Unable to create order. Ensure provider has availability and try again.");
      return;
    }
    toast.success("Request submitted. We'll notify the expert.");
    recomputeAchievements(currentUser.id);
  };

  const handleAiSuggest = (query: string) => {
    const keywords = query.toLowerCase().split(/\s+/);
    const matched = providerProfiles
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
            <ProviderMap providers={availableProviders} selectedProviderId={selectedProviderId} onSelect={setSelectedProviderId} />
            <ProviderList
              providers={availableProviders}
              services={services}
              onSelect={setSelectedProviderId}
              activeProviderId={selectedProviderId}
              userLocation={{ lat: currentUser.lastKnownLocation.lat, lng: currentUser.lastKnownLocation.lng }}
            />
          </div>

          <ServiceRequestForm
            services={services.filter(service => availableProviders.some(provider => provider.id === service.providerId))}
            providers={availableProviders}
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

        <TabsContent value="schedule">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UpcomingOrders orders={upcoming} onSelectOrder={setSelectedOrderId} selectedOrderId={selectedOrderId} />
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
          </div>
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

