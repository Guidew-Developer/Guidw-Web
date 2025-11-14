import { useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ProviderOrderFeed from "@/components/dashboard/ProviderOrderFeed";
import ActiveOrderPanel from "@/components/dashboard/ActiveOrderPanel";
import UpcomingOrders from "@/components/dashboard/UpcomingOrders";
import ChatPanel from "@/components/dashboard/ChatPanel";
import WalletSummary from "@/components/dashboard/WalletSummary";
import AchievementsPanel from "@/components/dashboard/AchievementsPanel";
import AvailabilityEditor from "@/components/dashboard/AvailabilityEditor";
import ProviderProfileForm from "@/components/dashboard/ProviderProfileForm";
import ReviewPanel from "@/components/dashboard/ReviewPanel";
import { useGuidew } from "@/state/GuidewProvider";

const ProviderApp = () => {
  const {
    currentUserId,
    users,
    providerProfiles,
    services,
    orders,
    chats,
    acceptOrder,
    startOrder,
    completeOrder,
    submitItinerary,
    addChat,
    submitReview,
    addTip,
    refreshWallets,
    recomputeAchievements,
    setProviderAutoAccept,
    updateProviderAvailability,
    upsertProviderProfile
  } = useGuidew();

  const currentUser = users.find(user => user.id === currentUserId);
  const providerProfile = providerProfiles.find(profile => profile.userId === currentUser?.id);

  const providerOrders = useMemo(() => orders.filter(order => order.providerId === providerProfile?.id), [orders, providerProfile?.id]);
  const awaiting = providerOrders.filter(order => order.status === "awaiting-provider");
  const activeOrder = providerOrders.find(order => order.status === "accepted" || order.status === "in-progress");
  const upcoming = providerOrders.filter(order => new Date(order.startTime) > new Date());
  const completed = providerOrders.filter(order => order.status === "awaiting-review" || order.status === "completed");
  const [selectedOrderId, setSelectedOrderId] = useState<string | undefined>(activeOrder?.id);
  const orderForChat = providerOrders.find(order => order.id === selectedOrderId) ?? activeOrder;

  if (!currentUser || !providerProfile) {
    return <Navigate to="/auth" replace />;
  }

  const service = services.find(item => item.providerId === providerProfile.id);

  const handleAccept = (orderId: string) => {
    acceptOrder(orderId);
    toast.success("Order accepted. Contact the traveler now.");
  };

  const handleStart = (orderId: string) => {
    startOrder(orderId);
    toast("Service marked as in progress.");
  };

  const handleComplete = (orderId: string) => {
    completeOrder(orderId);
    refreshWallets();
    recomputeAchievements(currentUser.id);
    toast.success("Service completed. Earnings will clear after 7 days.");
  };

  const selectedCompletedOrder = completed.find(order => order.id === selectedOrderId) ?? completed[0];

  return (
    <div className="min-h-screen bg-white p-6 space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {currentUser.name}</h1>
          <p className="text-sm text-muted-foreground">
            Manage your orders, chat with clients, and keep your profile polished to secure more bookings.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Label htmlFor="autoAccept" className="text-sm">
            Auto accept (VIP)
          </Label>
          <Switch
            id="autoAccept"
            checked={providerProfile.autoAccept}
            onCheckedChange={value => {
              if (!currentUser.vip.active) {
                toast.error("Upgrade to VIP to enable auto-accept.");
                return;
              }
              setProviderAutoAccept(providerProfile.id, Boolean(value));
              toast.success(`Auto accept ${value ? "enabled" : "disabled"}.`);
            }}
          />
          <Button variant="outline" onClick={() => refreshWallets()}>
            Refresh wallet
          </Button>
        </div>
      </div>

      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="messages">Chat</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProviderOrderFeed orders={awaiting} onAccept={handleAccept} />
            <ActiveOrderPanel
              order={activeOrder}
              onStart={handleStart}
              onComplete={handleComplete}
              onSubmitItinerary={(orderId, itinerary) => {
                submitItinerary(orderId, itinerary);
                toast.success("Itinerary shared with the traveler.");
              }}
            />
          </div>

          <UpcomingOrders orders={upcoming} onSelectOrder={setSelectedOrderId} selectedOrderId={selectedOrderId} />
        </TabsContent>

        <TabsContent value="messages">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UpcomingOrders orders={providerOrders} onSelectOrder={setSelectedOrderId} selectedOrderId={selectedOrderId} />
            <ChatPanel
              order={orderForChat}
              chats={chats}
              currentUserId={providerProfile.userId}
              onSend={message =>
                orderForChat &&
                addChat({ orderId: orderForChat.id, senderId: providerProfile.userId, content: message })
              }
            />
          </div>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          {service && (
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Primary service: {service.title} · {service.category}</p>
            </div>
          )}
          <ProviderProfileForm
            profile={providerProfile}
            onSave={profile => {
              upsertProviderProfile(profile);
              toast.success("Profile updated");
            }}
          />
          <AvailabilityEditor
            availability={providerProfile.availability}
            onUpdate={slots => {
              updateProviderAvailability(providerProfile.id, slots);
              toast.success("Availability updated");
            }}
          />
          <ReviewPanel
            order={selectedCompletedOrder}
            onSubmit={review => {
              if (!selectedCompletedOrder) return;
              submitReview(
                selectedCompletedOrder.id,
                { providerDecision: review.decision === "worth" ? "again" : "no", providerComment: review.comment },
                "provider"
              );
              toast.success("Review saved. We'll publish after both parties submit.");
            }}
            onTip={amount => {
              if (!selectedCompletedOrder) return;
              addTip(selectedCompletedOrder.id, amount);
              toast.success("Tip recorded for reporting.");
            }}
          />
        </TabsContent>

        <TabsContent value="wallet">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WalletSummary
              wallet={currentUser.wallet}
              vipActive={currentUser.vip.active}
              onRefresh={() => refreshWallets()}
              onToggleVip={() => toast("VIP changes must be managed from the traveler app.")}
            />
            <AchievementsPanel achievements={currentUser.achievements} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProviderApp;

