
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { Filter } from 'lucide-react';

interface FilterSectionProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const FilterSection = ({ selectedCategory, onCategoryChange }: FilterSectionProps) => {
  const { t } = useTranslation();
  
  const categories = [
    t('filter.categories.all'),
    t('filter.categories.cityGuide'),
    t('filter.categories.translation'),
    t('filter.categories.cultural'),
    t('filter.categories.skills'),
    t('filter.categories.food'),
    t('filter.categories.photography')
  ];

  return (
    <div className="space-y-4">
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full flex justify-between items-center">
            <span>{t('filter.title')}</span>
            <Filter className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold">{t('filter.title')}</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => onCategoryChange(category)}
                    className="w-full"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default FilterSection;
