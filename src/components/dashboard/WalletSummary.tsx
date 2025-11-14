import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { WalletBalance } from "@/types/guidew";

interface WalletSummaryProps {
  wallet: WalletBalance;
  vipActive: boolean;
  onRefresh: () => void;
  onToggleVip: () => void;
}

const WalletSummary = ({ wallet, vipActive, onRefresh, onToggleVip }: WalletSummaryProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle>Wallet & VIP</CardTitle>
      <Button variant="outline" onClick={onRefresh}>Refresh balances</Button>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-lg bg-brand-teal/10 p-4">
          <p className="text-sm text-muted-foreground">Available</p>
          <p className="text-2xl font-bold">{wallet.currency} {wallet.balance.toFixed(2)}</p>
        </div>
        <div className="rounded-lg bg-amber-100/60 p-4">
          <p className="text-sm text-muted-foreground">Pending clearance</p>
          <p className="text-2xl font-bold">{wallet.currency} {wallet.pending.toFixed(2)}</p>
        </div>
        <div className="rounded-lg bg-emerald-100/60 p-4">
          <p className="text-sm text-muted-foreground">Withdrawable</p>
          <p className="text-2xl font-bold">{wallet.currency} {wallet.withdrawable.toFixed(2)}</p>
        </div>
      </div>

      <div className="rounded-lg border p-4 flex items-center justify-between">
        <div>
          <p className="font-semibold">VIP subscription</p>
          <p className="text-sm text-muted-foreground">
            {vipActive
              ? "Enjoy AI concierge, zero booking fees, and priority dispatch."
              : "Upgrade to unlock AI concierge, automated dispatch, and commission perks."}
          </p>
        </div>
        <Button onClick={onToggleVip}>{vipActive ? "Cancel VIP" : "Activate VIP ($9.9/month)"}</Button>
      </div>

      <p className="text-xs text-muted-foreground text-right">Last updated {new Date(wallet.lastUpdated).toLocaleString()}</p>
    </CardContent>
  </Card>
);

export default WalletSummary;

