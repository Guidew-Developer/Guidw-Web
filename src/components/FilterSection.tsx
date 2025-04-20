
import React from 'react';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import { Filter } from 'lucide-react';

interface FilterSectionProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  '全部',
  '城市向导',
  '翻译服务',
  '文化体验',
  '技能教学',
  '美食探索',
  '摄影服务'
];

const FilterSection = ({ selectedCategory, onCategoryChange }: FilterSectionProps) => {
  return (
    <div className="space-y-4">
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full flex justify-between items-center">
            <span>筛选</span>
            <Filter className="h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold">类别</Label>
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
