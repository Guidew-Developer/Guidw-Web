import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Achievement } from "@/types/guidew";

interface AchievementsPanelProps {
  achievements: Achievement[];
}

const AchievementsPanel = ({ achievements }: AchievementsPanelProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Achievements</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {achievements.length === 0 && <p className="text-sm text-muted-foreground">Complete bookings to earn badges.</p>}
      {achievements.map(achievement => (
        <div key={achievement.id} className="rounded-lg border border-dashed p-3">
          <p className="font-semibold">{achievement.title}</p>
          <p className="text-sm text-muted-foreground">{achievement.description}</p>
          <p className="text-xs text-muted-foreground">Earned {new Date(achievement.awardedAt).toLocaleDateString()}</p>
        </div>
      ))}
    </CardContent>
  </Card>
);

export default AchievementsPanel;

