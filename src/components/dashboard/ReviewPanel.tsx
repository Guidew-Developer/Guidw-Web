import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { OrderRecord } from "@/types/guidew";

interface ReviewPanelProps {
  order?: OrderRecord;
  onSubmit: (review: { decision: "worth" | "not-worth"; comment: string }) => void;
  onTip: (amount: number) => void;
}

const ReviewPanel = ({ order, onSubmit, onTip }: ReviewPanelProps) => {
  const [decision, setDecision] = useState<"worth" | "not-worth">("worth");
  const [comment, setComment] = useState("Great service, very knowledgeable guide!");
  const [tip, setTip] = useState(0);

  if (!order) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Leave a review</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">Select a completed order to review.</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave a review</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Overall experience</Label>
          <RadioGroup value={decision} onValueChange={value => setDecision(value as "worth" | "not-worth")}
            className="flex gap-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="worth" id="worth" />
              <Label htmlFor="worth">Worth it</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="not-worth" id="not-worth" />
              <Label htmlFor="not-worth">Not worth it</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label>Share details</Label>
          <Textarea rows={4} value={comment} onChange={event => setComment(event.target.value)} />
        </div>

        <div className="space-y-2">
          <Label>Optional tip</Label>
          <div className="flex gap-2">
            {[0, 10, 20, 40].map(amount => (
              <Button
                key={amount}
                type="button"
                variant={tip === amount ? "default" : "outline"}
                onClick={() => setTip(amount)}
              >
                ${amount}
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
            {tip > 0 ? `Send tip of $${tip}` : "Skip tip"}
          </Button>
          <Button onClick={() => onSubmit({ decision, comment })}>Submit review</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewPanel;

