import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  location: string;
  provider: {
    id: string;
    name: string;
    avatar: string;
  };
  imageSrc: string;
  onCardClick?: () => void;
  detailPath?: string;
}

const ServiceCard = ({
  id,
  title,
  description,
  category,
  price,
  rating,
  location,
  provider,
  imageSrc,
  onCardClick,
  detailPath,
}: ServiceCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onCardClick) {
      onCardClick();
      return;
    }
    navigate(detailPath ?? `/service/${id}`);
  };
  const satisfactionPercentage = Math.min(99.99, Math.max(80, (rating / 5) * 100)).toFixed(2);

  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:shadow-md cursor-pointer h-full flex flex-col"
      onClick={handleClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-medium py-1 px-2 rounded-full">
          {category}
        </div>
      </div>
      
      <CardContent className="pt-4 flex-grow">
        <div className="flex items-center mb-2">
          <div className="flex items-center text-brand-teal">
            <ThumbsUp className="h-4 w-4" />
            <span className="ml-1 text-sm font-medium">{satisfactionPercentage}%</span>
          </div>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-sm text-gray-500">{location}</span>
        </div>
        
        <h3 className="text-lg font-semibold mb-1 line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center mt-auto">
          <Avatar className="h-8 w-8">
            <AvatarImage src={provider.avatar} />
            <AvatarFallback>{provider.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="ml-2 text-sm font-medium">{provider.name}</span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 pb-4">
        <div className="w-full flex justify-between items-center">
          <span className="font-semibold text-brand-teal">${price}/hr</span>
          <span className="text-xs text-gray-500">Available now</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
