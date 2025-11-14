import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const suggestions = [
  { label: "Book Auckland Sky Tower tickets", url: "https://www.skytower.co.nz" },
  { label: "Reserve an InterCity coach", url: "https://www.intercity.co.nz" },
  { label: "Hire a rental car", url: "https://www.gorentals.co.nz" },
  { label: "Order Tango dance shoes", url: "https://www.salsashoes.co.nz" }
];

const ThirdPartySuggestions = () => (
  <Card>
    <CardHeader>
      <CardTitle>Recommended extras</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {suggestions.map(item => (
        <Button key={item.url} variant="outline" className="w-full justify-between" asChild>
          <a href={item.url} target="_blank" rel="noreferrer">
            {item.label}
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      ))}
      <p className="text-xs text-muted-foreground">Guidew receives affiliate commissions from some partners.</p>
    </CardContent>
  </Card>
);

export default ThirdPartySuggestions;

