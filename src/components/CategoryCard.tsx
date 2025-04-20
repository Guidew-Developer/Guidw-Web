
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  route: string;
}

const CategoryCard = ({ title, description, icon: Icon, color, route }: CategoryCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card 
      className="overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer h-full"
      onClick={() => navigate(route)}
    >
      <CardContent className="p-6">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
