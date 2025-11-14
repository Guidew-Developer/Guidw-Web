import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGuidew } from "@/state/GuidewProvider";
import type { CityLocation, UserRole } from "@/types/guidew";
import { createId } from "@/utils/id";
import { toast } from "sonner";

const defaultCity: CityLocation = {
  city: "Auckland",
  country: "New Zealand",
  lat: -36.8485,
  lng: 174.7633
};

const otherCity: CityLocation = {
  city: "Wellington",
  country: "New Zealand",
  lat: -41.2865,
  lng: 174.7762
};

const Auth = () => {
  const navigate = useNavigate();
  const { registerUser, signIn, upgradeVip } = useGuidew();
  const [role, setRole] = useState<UserRole>("user");
  const [city, setCity] = useState<CityLocation>(defaultCity);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [languages, setLanguages] = useState("English");
  const [subscribeVip, setSubscribeVip] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");

  const handleRegister = () => {
    if (!name || !email) {
      toast.error("Please provide name and email");
      return;
    }

    const userId = createId("user");

    const createdId = registerUser({
      id: userId,
      name,
      email,
      role,
      lastKnownLocation: city,
      preferredLanguages: languages
        .split(",")
        .map(value => value.trim())
        .filter(Boolean),
      verifiedLevels: ["basic"]
    });

    if (subscribeVip) {
      upgradeVip(createdId);
    }

    toast.success("Account created. Welcome to Guidew!");
    navigate(role === "provider" ? "/provider" : "/app");
  };

  const handleLogin = () => {
    if (!loginEmail) {
      toast.error("Please enter your email");
      return;
    }
    const success = signIn(loginEmail);
    if (success) {
      toast.success("Welcome back");
      navigate("/app");
    } else {
      toast.error("Account not found, please register");
    }
  };

  const handleSocial = (provider: "google" | "apple") => {
    const pseudoEmail = `${provider}_${Math.random().toString(36).slice(2, 8)}@example.com`;
    const pseudoName = provider === "google" ? "Google User" : "Apple User";
    const userId = createId("user");

    registerUser({
      id: userId,
      name: pseudoName,
      email: pseudoEmail,
      role: "user",
      lastKnownLocation: defaultCity,
      preferredLanguages: ["English"],
      verifiedLevels: ["basic"]
    });

    toast.success(`Signed in with ${provider === "google" ? "Google" : "Apple"}`);
    navigate("/app");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-lightGray via-white to-brand-lightGray py-10 px-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Join Guidew</CardTitle>
          <CardDescription>
            Access trusted local experts in Auckland and Wellington, request custom services, and manage your bookings in one place.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="space-y-6">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={loginEmail}
                    onChange={event => setLoginEmail(event.target.value)}
                    placeholder="you@example.com"
                  />
                </div>

                <Button className="w-full" onClick={handleLogin}>
                  Continue with email
                </Button>

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs uppercase tracking-wide text-muted-foreground">or</span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button variant="outline" onClick={() => handleSocial("google")}>Continue with Google</Button>
                  <Button variant="outline" onClick={() => handleSocial("apple")}>Continue with Apple</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="register" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" value={name} onChange={event => setName(event.target.value)} placeholder="Jane Smith" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" />
                  </div>
                  <div>
                    <Label>Role</Label>
                    <RadioGroup value={role} onValueChange={value => setRole(value as UserRole)} className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2 rounded-lg border p-3">
                        <RadioGroupItem value="user" id="role-user" />
                        <Label htmlFor="role-user" className="cursor-pointer">I want to book services</Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-lg border p-3">
                        <RadioGroupItem value="provider" id="role-provider" />
                        <Label htmlFor="role-provider" className="cursor-pointer">I want to provide services</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Primary city</Label>
                    <RadioGroup
                      value={city.city}
                      onValueChange={value => setCity(value === "Auckland" ? defaultCity : otherCity)}
                      className="grid grid-cols-2 gap-3"
                    >
                      <div className="flex items-center space-x-2 rounded-lg border p-3">
                        <RadioGroupItem value="Auckland" id="city-akl" />
                        <Label htmlFor="city-akl" className="cursor-pointer">Auckland</Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-lg border p-3">
                        <RadioGroupItem value="Wellington" id="city-wlg" />
                        <Label htmlFor="city-wlg" className="cursor-pointer">Wellington</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <Label htmlFor="languages">Languages</Label>
                    <Input
                      id="languages"
                      value={languages}
                      onChange={event => setLanguages(event.target.value)}
                      placeholder="English, Mandarin"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="vip" checked={subscribeVip} onCheckedChange={value => setSubscribeVip(Boolean(value))} />
                    <Label htmlFor="vip" className="leading-tight">
                      Subscribe to VIP ($9.9/month) for AI-assisted matching and zero booking fees.
                    </Label>
                  </div>
                </div>
              </div>

              <Button className="w-full" onClick={handleRegister}>
                Create account
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;

