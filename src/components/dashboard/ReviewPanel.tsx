import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { OrderRecord } from "@/types/guidew";
import { useTranslation } from "react-i18next";

interface ReviewPanelProps {
  order?: OrderRecord;
  onSubmit: (review: { decision: "worth" | "not-worth"; comment: string }) => void;
  onTip: (amount: number) => void;
}

const ReviewPanel = ({ order, onSubmit, onTip }: ReviewPanelProps) => {
  const { t } = useTranslation();
  const [decision, setDecision] = useState<"worth" | "not-worth">("worth");
  const [comment, setComment] = useState(() => t("dashboard.review.defaultComment"));
  const [tip, setTip] = useState(0);

  if (!order) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.review.title")}</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">{t("dashboard.review.empty")}</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("dashboard.review.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>{t("dashboard.review.overallLabel")}</Label>
          <RadioGroup value={decision} onValueChange={value => setDecision(value as "worth" | "not-worth")}
            className="flex gap-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="worth" id="worth" />
              <Label htmlFor="worth">{t("dashboard.review.worth")}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="not-worth" id="not-worth" />
              <Label htmlFor="not-worth">{t("dashboard.review.notWorth")}</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>{t("dashboard.review.detailsLabel")}</Label>
          <Textarea rows={4} value={comment} onChange={event => setComment(event.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>{t("dashboard.review.tipLabel")}</Label>
          <div className="flex gap-2">
            {[0, 10, 20, 40].map(amount => (
              <Button
                key={amount}
                type="button"
                variant={tip === amount ? "default" : "outline"}
                onClick={() => setTip(amount)}
              >
                {t("dashboard.review.tipButton", { amount })}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => {
              if (tip > 0) onTip(tip);
            }}
          >
            {tip > 0 ? t("dashboard.review.tipSend", { amount: tip }) : t("dashboard.review.tipSkip")}
          </Button>
          <Button onClick={() => onSubmit({ decision, comment })}>{t("dashboard.review.submit")}</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewPanel;
