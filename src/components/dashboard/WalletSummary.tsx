import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { WalletBalance } from "@/types/guidew";
import { useTranslation } from "react-i18next";

interface WalletSummaryProps {
  wallet: WalletBalance;
  vipActive: boolean;
  onRefresh: () => void;
  onToggleVip: () => void;
}

const WalletSummary = ({ wallet, vipActive, onRefresh, onToggleVip }: WalletSummaryProps) => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t("dashboard.wallet.title")}</CardTitle>
        <Button variant="outline" onClick={onRefresh}>
          {t("dashboard.wallet.refresh")}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-lg bg-brand-teal/10 p-4">
            <p className="text-sm text-muted-foreground">{t("dashboard.wallet.available")}</p>
            <p className="text-2xl font-bold">
              {wallet.currency} {wallet.balance.toFixed(2)}
            </p>
          </div>
          <div className="rounded-lg bg-amber-100/60 p-4">
            <p className="text-sm text-muted-foreground">{t("dashboard.wallet.pending")}</p>
            <p className="text-2xl font-bold">
              {wallet.currency} {wallet.pending.toFixed(2)}
            </p>
          </div>
          <div className="rounded-lg bg-emerald-100/60 p-4">
            <p className="text-sm text-muted-foreground">{t("dashboard.wallet.withdrawable")}</p>
            <p className="text-2xl font-bold">
              {wallet.currency} {wallet.withdrawable.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="rounded-lg border p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold">{t("dashboard.wallet.vipTitle")}</p>
            <p className="text-sm text-muted-foreground">
              {vipActive ? t("dashboard.wallet.vipActive") : t("dashboard.wallet.vipInactive")}
            </p>
          </div>
          <Button onClick={onToggleVip}>
            {vipActive ? t("dashboard.wallet.vipCancel") : t("dashboard.wallet.vipActivate")}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-right">
          {t("dashboard.wallet.lastUpdated", { time: new Date(wallet.lastUpdated).toLocaleString() })}
        </p>
      </CardContent>
    </Card>
  );
};

export default WalletSummary;
