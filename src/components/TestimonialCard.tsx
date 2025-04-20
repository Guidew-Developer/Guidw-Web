
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  content: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
}

const TestimonialCard = ({ content, author }: TestimonialCardProps) => {
  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <Quote className="w-8 h-8 text-brand-teal mb-4 opacity-50" />
        <p className="text-gray-700 mb-6">{content}</p>
        <div className="flex items-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src={author.avatar} />
            <AvatarFallback>{author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <h4 className="font-medium text-sm">{author.name}</h4>
            <p className="text-gray-500 text-xs">{author.title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
