import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const VERIFICATION_LEVELS: { id: string; title: string; description: string }[] = [
  {
    id: "basic",
    title: "Basic identity",
    description: "Government ID selfie check for all providers"
  },
  {
    id: "home-access",
    title: "Home access",
    description: "Police vetting and proof of clean criminal record"
  },
  {
    id: "premium",
    title: "Premium trust",
    description: "Deep background screening for high-touch services"
  }
];

interface VerificationStatusCardProps {
  levels: string[];
  onRequestLevel: (level: string) => void;
}

const VerificationStatusCard = ({ levels, onRequestLevel }: VerificationStatusCardProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Verification & trust</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {VERIFICATION_LEVELS.map(level => {
        const verified = levels.includes(level.id);
        return (
          <div key={level.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-lg border p-3">
            <div>
              <p className="font-semibold">{level.title}</p>
              <p className="text-sm text-muted-foreground">{level.description}</p>
            </div>
            <Button
              variant={verified ? "outline" : "default"}
              disabled={verified}
              onClick={() => onRequestLevel(level.id)}
            >
              {verified ? "Verified automatically" : "Request automated check"}
            </Button>
          </div>
        );
      })}
      <p className="text-xs text-muted-foreground">
        Guidew processes verification requests automatically using our compliance partners. You will receive an email when a new level is approved.
      </p>
    </CardContent>
  </Card>
);

export default VerificationStatusCard;
