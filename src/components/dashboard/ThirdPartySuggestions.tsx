import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const suggestionItems = [
  { key: "skyTower", url: "https://www.skytower.co.nz" },
  { key: "intercity", url: "https://www.intercity.co.nz" },
  { key: "rentalCar", url: "https://www.gorentals.co.nz" },
  { key: "danceShoes", url: "https://www.salsashoes.co.nz" }
] as const;

const ThirdPartySuggestions = () => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("userApp.thirdParty.title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestionItems.map(item => (
          <Button key={item.url} variant="outline" className="w-full justify-between" asChild>
            <a href={item.url} target="_blank" rel="noreferrer">
              {t(`userApp.thirdParty.items.${item.key}`)}
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        ))}
        <p className="text-xs text-muted-foreground">{t("userApp.thirdParty.disclaimer")}</p>
      </CardContent>
    </Card>
  );
};

export default ThirdPartySuggestions;
