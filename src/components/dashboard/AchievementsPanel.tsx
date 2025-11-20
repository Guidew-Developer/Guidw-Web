import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Achievement } from "@/types/guidew";
import { useTranslation } from "react-i18next";

interface AchievementsPanelProps {
  achievements: Achievement[];
}

const AchievementsPanel = ({ achievements }: AchievementsPanelProps) => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("dashboard.achievements.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {achievements.length === 0 && (
          <p className="text-sm text-muted-foreground">{t("dashboard.achievements.empty")}</p>
        )}
        {achievements.map(achievement => (
          <div key={achievement.id} className="rounded-lg border border-dashed p-3">
            <p className="font-semibold">
              {t(`dashboard.achievements.templates.${achievement.id}.title`, {
                defaultValue: achievement.title
              })}
            </p>
            <p className="text-sm text-muted-foreground">
              {t(`dashboard.achievements.templates.${achievement.id}.description`, {
                defaultValue: achievement.description
              })}
            </p>
            <p className="text-xs text-muted-foreground">
              {t("dashboard.achievements.earned", {
                date: new Date(achievement.awardedAt).toLocaleDateString()
              })}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AchievementsPanel;
