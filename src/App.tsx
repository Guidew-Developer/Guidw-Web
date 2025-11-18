
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CookieConsent from "./components/CookieConsent";
import { DownloadDialogProvider } from "./components/DownloadDialogProvider";
import Index from "./pages/Index";
import Discover from "./pages/Discover";
import HowItWorks from "./pages/HowItWorks";
import BecomeExpert from "./pages/BecomeExpert";
import ServiceDetail from "./pages/ServiceDetail";
import SkillServiceDetail from "./pages/SkillServiceDetail";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import UserApp from "./pages/UserApp";
import ProviderApp from "./pages/ProviderApp";
import Locations from "./pages/Locations";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import Press from "./pages/Press";
import LocationDetail from "./pages/LocationDetail";
import AboutVision from "./pages/AboutVision";
import CareerDetail from "./pages/CareerDetail";
import BlogPost from "./pages/BlogPost";
import PressKit from "./pages/PressKit";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import './i18n/config';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <DownloadDialogProvider>
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/become-expert" element={<BecomeExpert />} />
          <Route path="/locations/:cityId" element={<LocationDetail />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/vision" element={<AboutVision />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:roleId" element={<CareerDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/press" element={<Press />} />
          <Route path="/press/kit" element={<PressKit />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route path="/skill-service/:id" element={<SkillServiceDetail />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/app" element={<UserApp />} />
          <Route path="/provider" element={<ProviderApp />} />
          <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieConsent />
        </BrowserRouter>
      </DownloadDialogProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
