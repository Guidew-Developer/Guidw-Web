import { useEffect, useMemo, useRef, useState } from "react";
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
import VerificationStatusCard from "@/components/dashboard/VerificationStatusCard";
import { haversineDistanceKm } from "@/utils/geo";
import ReviewHistory from "@/components/dashboard/ReviewHistory";
import { useTranslation } from "react-i18next";
import { resolveLocale } from "@/utils/locale";
import { translateGuidewMessage } from "@/utils/guidewMessages";

const providerLocales = ["en", "zh", "pt", "es", "fr", "he"] as const;
type ProviderLocale = (typeof providerLocales)[number];

type ProviderCopy = {
  heroTitle: string;
  heroDescription: string;
  autoAccept: {
    label: string;
    vipRequired: string;
    enabled: string;
    disabled: string;
  };
  refreshWallet: string;
  tabs: { orders: string; messages: string; profile: string; wallet: string };
  toasts: {
    travelReminderTitle: string;
    travelReminderDescription: string;
    rangeWarningTitle: string;
    rangeWarningDescription: string;
    acceptSuccess: string;
    startInfo: string;
    completeSuccess: string;
    itineraryShared: string;
    profileUpdated: string;
    availabilityUpdated: string;
    verificationRequest: string;
    reviewSaved: string;
    tipRecorded: string;
    walletVipNotice: string;
  };
  primaryService: string;
};

const providerCopy: Record<ProviderLocale, ProviderCopy> = {
  en: {
    heroTitle: "Welcome back, {name}",
    heroDescription: "Manage orders, chat with clients, and keep your storefront polished to win more bookings.",
    autoAccept: {
      label: "Auto accept (VIP)",
      vipRequired: "Upgrade to VIP to enable auto-accept.",
      enabled: "Auto accept enabled.",
      disabled: "Auto accept disabled."
    },
    refreshWallet: "Refresh wallet",
    tabs: { orders: "Orders", messages: "Chat", profile: "Profile", wallet: "Wallet" },
    toasts: {
      travelReminderTitle: "Time to head out for your {time} service",
      travelReminderDescription: "Allow {minutes} minutes of travel to {address}.",
      rangeWarningTitle: "Upcoming service exceeds your configured travel radius",
      rangeWarningDescription: "Distance {distance} km vs radius {radius} km.",
      acceptSuccess: "Order accepted. Contact the traveler now.",
      startInfo: "Service marked as in progress.",
      completeSuccess: "Service completed. Earnings clear after 7 days.",
      itineraryShared: "Itinerary shared with the traveler.",
      profileUpdated: "Profile updated.",
      availabilityUpdated: "Availability updated.",
      verificationRequest: "Verification request for {level} submitted.",
      reviewSaved: "Review saved. We'll publish after both parties submit.",
      tipRecorded: "Tip recorded for reporting.",
      walletVipNotice: "VIP changes must be managed from the traveler app."
    },
    primaryService: "Primary service: {title} · {category}"
  },
  zh: {
    heroTitle: "欢迎回来，{name}",
    heroDescription: "管理订单、与客户沟通，并保持你的门面整洁以获得更多预约。",
    autoAccept: {
      label: "自动接单（VIP）",
      vipRequired: "需要开通 VIP 才能使用自动接单。",
      enabled: "自动接单已开启。",
      disabled: "自动接单已关闭。"
    },
    refreshWallet: "刷新钱包",
    tabs: { orders: "订单", messages: "消息", profile: "门面", wallet: "钱包" },
    toasts: {
      travelReminderTitle: "该出发赶赴 {time} 的服务了",
      travelReminderDescription: "前往 {address} 约需 {minutes} 分钟，请预留路程。",
      rangeWarningTitle: "即将到来的订单超过你设置的服务半径",
      rangeWarningDescription: "距离 {distance} 公里，超出半径 {radius} 公里。",
      acceptSuccess: "已接受订单，记得联系旅客。",
      startInfo: "服务标记为进行中。",
      completeSuccess: "服务完成，收益将在 7 天后结算。",
      itineraryShared: "行程已发送给旅客。",
      profileUpdated: "档案已更新。",
      availabilityUpdated: "可用时间已更新。",
      verificationRequest: "{level} 级认证申请已提交。",
      reviewSaved: "评价已保存，双方提交后即可公开。",
      tipRecorded: "小费已记录。",
      walletVipNotice: "VIP 变更需要在用户端操作。"
    },
    primaryService: "主打服务：{title} · {category}"
  },
  pt: {
    heroTitle: "Bem-vindo de volta, {name}",
    heroDescription: "Gerencie pedidos, converse com clientes e mantenha sua vitrine impecável para ganhar mais reservas.",
    autoAccept: {
      label: "Autoaceite (VIP)",
      vipRequired: "Ative o VIP para liberar o autoaceite.",
      enabled: "Autoaceite ativado.",
      disabled: "Autoaceite desativado."
    },
    refreshWallet: "Atualizar carteira",
    tabs: { orders: "Pedidos", messages: "Chat", profile: "Perfil", wallet: "Carteira" },
    toasts: {
      travelReminderTitle: "Hora de sair para o serviço das {time}",
      travelReminderDescription: "Reserve {minutes} minutos para chegar em {address}.",
      rangeWarningTitle: "Próximo serviço excede seu raio configurado",
      rangeWarningDescription: "Distância {distance} km vs raio {radius} km.",
      acceptSuccess: "Pedido aceito. Entre em contato com o viajante.",
      startInfo: "Serviço marcado como em andamento.",
      completeSuccess: "Serviço concluído. Pagamento libera em até 7 dias.",
      itineraryShared: "Roteiro enviado ao viajante.",
      profileUpdated: "Perfil atualizado.",
      availabilityUpdated: "Disponibilidade salva.",
      verificationRequest: "Solicitação de verificação {level} enviada.",
      reviewSaved: "Avaliação salva. Publicaremos quando ambas as partes enviarem.",
      tipRecorded: "Gorjeta registrada para relatórios.",
      walletVipNotice: "Mudanças de VIP devem ser feitas no app do viajante."
    },
    primaryService: "Serviço principal: {title} · {category}"
  },
  es: {
    heroTitle: "Bienvenido de nuevo, {name}",
    heroDescription: "Gestiona pedidos, conversa con clientes y cuida tu vitrina para asegurar más reservas.",
    autoAccept: {
      label: "Autoaceptar (VIP)",
      vipRequired: "Activa VIP para habilitar el autoaceptar.",
      enabled: "Autoaceptar activado.",
      disabled: "Autoaceptar desactivado."
    },
    refreshWallet: "Actualizar billetera",
    tabs: { orders: "Pedidos", messages: "Chat", profile: "Perfil", wallet: "Billetera" },
    toasts: {
      travelReminderTitle: "Es momento de salir para tu servicio de las {time}",
      travelReminderDescription: "Destina {minutes} minutos de viaje hasta {address}.",
      rangeWarningTitle: "El próximo servicio supera tu radio configurado",
      rangeWarningDescription: "Distancia {distance} km vs radio {radius} km.",
      acceptSuccess: "Pedido aceptado. Contacta al viajero ya.",
      startInfo: "Servicio marcado como en curso.",
      completeSuccess: "Servicio completado. El pago libera en 7 días.",
      itineraryShared: "Itinerario enviado al viajero.",
      profileUpdated: "Perfil actualizado.",
      availabilityUpdated: "Disponibilidad guardada.",
      verificationRequest: "Solicitud de verificación {level} enviada.",
      reviewSaved: "Reseña guardada. Se publicará cuando ambas partes respondan.",
      tipRecorded: "Propina registrada para reportes.",
      walletVipNotice: "Los cambios de VIP se gestionan desde la app de viajeros."
    },
    primaryService: "Servicio principal: {title} · {category}"
  },
  fr: {
    heroTitle: "Bon retour, {name}",
    heroDescription: "Gérez vos missions, discutez avec les clients et soignez votre vitrine pour décrocher plus de réservations.",
    autoAccept: {
      label: "Acceptation auto (VIP)",
      vipRequired: "Activez le VIP pour utiliser l’acceptation automatique.",
      enabled: "Acceptation auto activée.",
      disabled: "Acceptation auto désactivée."
    },
    refreshWallet: "Actualiser le portefeuille",
    tabs: { orders: "Commandes", messages: "Chat", profile: "Profil", wallet: "Portefeuille" },
    toasts: {
      travelReminderTitle: "Il est temps de partir pour la mission de {time}",
      travelReminderDescription: "Prévoyez {minutes} minutes de trajet vers {address}.",
      rangeWarningTitle: "Prochaine mission hors de votre rayon de déplacement",
      rangeWarningDescription: "Distance {distance} km vs rayon {radius} km.",
      acceptSuccess: "Commande acceptée. Contactez le voyageur.",
      startInfo: "Mission marquée en cours.",
      completeSuccess: "Mission terminée. Paiement disponible sous 7 jours.",
      itineraryShared: "Itinéraire partagé avec le voyageur.",
      profileUpdated: "Profil mis à jour.",
      availabilityUpdated: "Disponibilités enregistrées.",
      verificationRequest: "Demande de vérification {level} envoyée.",
      reviewSaved: "Avis enregistré. Nous publierons après les deux réponses.",
      tipRecorded: "Pourboire enregistré pour le reporting.",
      walletVipNotice: "Les changements VIP se font depuis l’app voyageurs."
    },
    primaryService: "Service principal : {title} · {category}"
  },
  he: {
    heroTitle: "ברוך שובך, {name}",
    heroDescription: "נהל הזמנות, שוחח עם לקוחות והמשך ללטש את הפרופיל כדי לזכות בעוד הזדמנויות.",
    autoAccept: {
      label: "קבלה אוטומטית (VIP)",
      vipRequired: "יש להפעיל VIP כדי לאפשר קבלה אוטומטית.",
      enabled: "קבלה אוטומטית הופעלה.",
      disabled: "קבלה אוטומטית בוטלה."
    },
    refreshWallet: "רענון ארנק",
    tabs: { orders: "הזמנות", messages: "צ'אט", profile: "פרופיל", wallet: "ארנק" },
    toasts: {
      travelReminderTitle: "זמן לצאת לשירות של {time}",
      travelReminderDescription: "הקצו {minutes} דקות נסיעה ל-{address}.",
      rangeWarningTitle: "השירות הקרוב חורג מהטווח שהגדרת",
      rangeWarningDescription: "מרחק {distance} ק״מ מול רדיוס {radius} ק״מ.",
      acceptSuccess: "הזמנה אושרה. צרו קשר עם הלקוח.",
      startInfo: "המשימה סומנה כבתהליך.",
      completeSuccess: "השירות הושלם. התשלום ישוחרר בעוד 7 ימים.",
      itineraryShared: "מסלול נשלח ללקוח.",
      profileUpdated: "הפרופיל עודכן.",
      availabilityUpdated: "הזמינות נשמרה.",
      verificationRequest: "בקשת אימות עבור {level} נשלחה.",
      reviewSaved: "הביקורת נשמרה ותפורסם לאחר ששני הצדדים יגיבו.",
      tipRecorded: "הטיפ תועד לדוחות.",
      walletVipNotice: "שינויים במנוי VIP מתבצעים באפליקציית הלקוחות."
    },
    primaryService: "שירות מוביל: {title} · {category}"
  }
};

const formatMessage = (template: string, vars: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? ""));

const ProviderApp = () => {
  const { t, i18n } = useTranslation();
  const locale = resolveLocale(i18n.language) as ProviderLocale;
  const ui = providerCopy[providerLocales.includes(locale) ? locale : "en"] ?? providerCopy.en;
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
    upsertProviderProfile,
    reportUserNoShow,
    generateItinerarySuggestion,
    requestVerification
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
  const travelReminderRef = useRef<string | null>(null);
  const rangeReminderRef = useRef<string | null>(null);

  useEffect(() => {
    if (!providerProfile) return;
    const sortedUpcoming = [...upcoming].sort(
      (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );
    const next = sortedUpcoming[0];
    if (!next) return;

    const minutesUntilStart = (new Date(next.startTime).getTime() - Date.now()) / (1000 * 60);
    const leaveBuffer = next.travel.estimatedTravelMinutes + 15;
    if (minutesUntilStart > 0 && minutesUntilStart <= leaveBuffer && travelReminderRef.current !== next.id) {
      toast.warning(
        formatMessage(ui.toasts.travelReminderTitle, { time: new Date(next.startTime).toLocaleTimeString() }),
        {
          description: formatMessage(ui.toasts.travelReminderDescription, {
            minutes: next.travel.estimatedTravelMinutes,
            address: next.location.address
          })
        }
      );
      travelReminderRef.current = next.id;
    }

    if (providerProfile.vip) {
      const distance = haversineDistanceKm(providerProfile.location, next.location);
      if (distance > providerProfile.travelRadiusKm && rangeReminderRef.current !== next.id) {
        toast(ui.toasts.rangeWarningTitle, {
          description: formatMessage(ui.toasts.rangeWarningDescription, {
            distance: distance.toFixed(1),
            radius: providerProfile.travelRadiusKm
          })
        });
        rangeReminderRef.current = next.id;
      }
    }
  }, [upcoming, providerProfile]);

  if (!currentUser || !providerProfile) {
    return <Navigate to="/auth" replace />;
  }

  const service = services.find(item => item.providerId === providerProfile.id);

  const handleAccept = (orderId: string) => {
    acceptOrder(orderId);
    toast.success(ui.toasts.acceptSuccess);
  };

  const handleStart = (orderId: string) => {
    startOrder(orderId);
    toast(ui.toasts.startInfo);
  };

  const handleComplete = (orderId: string) => {
    completeOrder(orderId);
    refreshWallets();
    recomputeAchievements(currentUser.id);
    toast.success(ui.toasts.completeSuccess);
  };

  const handleUserNoShow = (orderId: string) => {
    const outcome = reportUserNoShow(orderId);
    if (outcome.success) {
      toast.success(translateGuidewMessage(outcome.message, t));
      refreshWallets();
    } else {
      toast.error(translateGuidewMessage(outcome.message, t));
    }
  };

  const selectedCompletedOrder = completed.find(order => order.id === selectedOrderId) ?? completed[0];

  return (
    <div className="min-h-screen bg-white p-6 space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{formatMessage(ui.heroTitle, { name: currentUser.name })}</h1>
          <p className="text-sm text-muted-foreground">{ui.heroDescription}</p>
        </div>
        <div className="flex items-center gap-3">
          <Label htmlFor="autoAccept" className="text-sm">
            {ui.autoAccept.label}
          </Label>
          <Switch
            id="autoAccept"
            checked={providerProfile.autoAccept}
            onCheckedChange={value => {
              if (!currentUser.vip.active) {
                toast.error(ui.autoAccept.vipRequired);
                return;
              }
              setProviderAutoAccept(providerProfile.id, Boolean(value));
              toast.success(value ? ui.autoAccept.enabled : ui.autoAccept.disabled);
            }}
          />
          <Button variant="outline" onClick={() => refreshWallets()}>
            {ui.refreshWallet}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="orders">{ui.tabs.orders}</TabsTrigger>
          <TabsTrigger value="messages">{ui.tabs.messages}</TabsTrigger>
          <TabsTrigger value="profile">{ui.tabs.profile}</TabsTrigger>
          <TabsTrigger value="wallet">{ui.tabs.wallet}</TabsTrigger>
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
                toast.success(ui.toasts.itineraryShared);
              }}
              onGenerateItinerary={orderId => generateItinerarySuggestion(orderId, locale)}
              onReportUserNoShow={handleUserNoShow}
              isVip={currentUser.vip.active}
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
              <p className="text-sm text-muted-foreground">
                {formatMessage(ui.primaryService, { title: service.title, category: service.category })}
              </p>
            </div>
          )}
          <ProviderProfileForm
            profile={providerProfile}
            onSave={profile => {
              upsertProviderProfile(profile);
              toast.success(ui.toasts.profileUpdated);
            }}
          />
          <AvailabilityEditor
            availability={providerProfile.availability}
            onUpdate={slots => {
              updateProviderAvailability(providerProfile.id, slots);
              toast.success(ui.toasts.availabilityUpdated);
            }}
          />
          <VerificationStatusCard
            levels={currentUser.verifiedLevels}
            onRequestLevel={level => {
              requestVerification(currentUser.id, level);
              toast.success(formatMessage(ui.toasts.verificationRequest, { level }));
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
              toast.success(ui.toasts.reviewSaved);
            }}
            onTip={amount => {
              if (!selectedCompletedOrder) return;
              addTip(selectedCompletedOrder.id, amount);
              toast.success(ui.toasts.tipRecorded);
            }}
          />
          <ReviewHistory
            orders={providerOrders}
            users={users}
            services={services}
            providerProfiles={providerProfiles}
            role="provider"
          />
        </TabsContent>

        <TabsContent value="wallet">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WalletSummary
              wallet={currentUser.wallet}
              vipActive={currentUser.vip.active}
              onRefresh={() => refreshWallets()}
              onToggleVip={() => toast(ui.toasts.walletVipNotice)}
            />
            <AchievementsPanel achievements={currentUser.achievements} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProviderApp;
