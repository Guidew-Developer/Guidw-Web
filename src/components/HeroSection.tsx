
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/discover");
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-brand-lightGray to-white -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-brand-teal/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-brand-orange/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Hero content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Local Expertise, <br />
              <span className="gradient-text">On Demand</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Connect with local experts who provide personalized services - from city guides and translators to skill instructors, all at your fingertips.
            </p>
            
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
              <div className="relative flex-grow">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Where are you going?"
                  className="pl-10 bg-white border-gray-200 focus-visible:ring-brand-teal h-12"
                />
              </div>
              <Button type="submit" className="bg-brand-teal hover:bg-brand-teal/90 h-12">
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </form>
          </div>
          
          {/* Hero image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
            <img
              src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Local expert guiding tourists"
              className="w-full max-w-lg rounded-xl shadow-xl animate-float"
            />
            
            {/* Floating badges */}
            <div className="absolute -left-4 top-1/4 bg-white p-3 rounded-lg shadow-lg animate-float">
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full">
                  <MapPin className="h-4 w-4 text-green-600" />
                </div>
                <div className="ml-2">
                  <p className="text-xs font-medium">Local Expert</p>
                  <p className="text-xs text-gray-500">5 min away</p>
                </div>
              </div>
            </div>
            
            <div className="absolute right-4 bottom-1/4 bg-white p-3 rounded-lg shadow-lg animate-float" style={{ animationDelay: "2s" }}>
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <Avatar className="border-2 border-white h-6 w-6">
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-white h-6 w-6">
                    <AvatarFallback>ST</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-2">
                  <p className="text-xs font-medium">500+ Experts</p>
                  <p className="text-xs text-gray-500">In your area</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default HeroSection;
