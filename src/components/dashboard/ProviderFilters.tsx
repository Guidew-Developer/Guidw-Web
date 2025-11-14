import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import type { ProviderProfile } from "@/types/guidew";

export interface ProviderFilterState {
  tags: string[];
  languages: string[];
  vipOnly: boolean;
  autoAcceptOnly: boolean;
  minRating: number;
}

interface ProviderFiltersProps {
  providers: ProviderProfile[];
  value: ProviderFilterState;
  onChange: (value: ProviderFilterState) => void;
}

const toggleValue = (current: string[], value: string) =>
  current.includes(value) ? current.filter(item => item !== value) : [...current, value];

const ProviderFilters = ({ providers, value, onChange }: ProviderFiltersProps) => {
  const { tags, languages } = useMemo(() => {
    const tagSet = new Set<string>();
    const languageSet = new Set<string>();
    providers.forEach(provider => {
      provider.tags.forEach(tag => tagSet.add(tag));
      provider.languages.forEach(language => languageSet.add(language));
    });
    return { tags: Array.from(tagSet).sort(), languages: Array.from(languageSet).sort() };
  }, [providers]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter experts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-semibold mb-2">Tags</p>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Button
                key={tag}
                variant={value.tags.includes(tag) ? "default" : "outline"}
                size="sm"
                onClick={() => onChange({ ...value, tags: toggleValue(value.tags, tag) })}
              >
                #{tag}
              </Button>
            ))}
            {tags.length === 0 && <p className="text-xs text-muted-foreground">No tags configured yet.</p>}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold mb-2">Languages</p>
          <div className="flex flex-wrap gap-2">
            {languages.map(language => (
              <Button
                key={language}
                variant={value.languages.includes(language) ? "default" : "outline"}
                size="sm"
                onClick={() => onChange({ ...value, languages: toggleValue(value.languages, language) })}
              >
                {language}
              </Button>
            ))}
            {languages.length === 0 && <p className="text-xs text-muted-foreground">Providers have not listed languages yet.</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant={value.vipOnly ? "default" : "outline"}
            onClick={() => onChange({ ...value, vipOnly: !value.vipOnly })}
          >
            VIP only
          </Button>
          <Button
            variant={value.autoAcceptOnly ? "default" : "outline"}
            onClick={() => onChange({ ...value, autoAcceptOnly: !value.autoAcceptOnly })}
          >
            Auto accept only
          </Button>
        </div>

        <div>
          <p className="text-sm font-semibold mb-2">Minimum rating {value.minRating.toFixed(1)}</p>
          <Slider
            value={[value.minRating]}
            onValueChange={([minRating]) => onChange({ ...value, minRating })}
            min={0}
            max={5}
            step={0.1}
          />
        </div>

        <Button variant="ghost" size="sm" onClick={() => onChange({ tags: [], languages: [], vipOnly: false, autoAcceptOnly: false, minRating: 0 })}>
          Reset filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProviderFilters;
