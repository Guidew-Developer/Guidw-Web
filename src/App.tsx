
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Discover from "./pages/Discover";
import HowItWorks from "./pages/HowItWorks";
import BecomeExpert from "./pages/BecomeExpert";
import ServiceDetail from "./pages/ServiceDetail";
import SkillServiceDetail from "./pages/SkillServiceDetail";
import NotFound from "./pages/NotFound";
import './i18n/config';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/become-expert" element={<BecomeExpert />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
          <Route path="/skill-service/:id" element={<SkillServiceDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
