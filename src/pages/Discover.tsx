import React, { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import ServiceCard from "@/components/ServiceCard";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import DownloadApp from "@/components/DownloadApp";
import { useDownloadDialog } from "@/components/DownloadDialogProvider";
import { pickLocaleValue, resolveLocale, type SupportedLocale } from "@/utils/locale";

interface BaseService {
  id: string;
  categoryKey: string;
  price: number;
  rating: number;
  provider: {
    id: string;
    name: string;
    avatar: string;
  };
  imageSrc: string;
  detailPath?: string;
}

const baseServices: BaseService[] = [
  {
    id: "1",
    categoryKey: "localguide",
    price: 40,
    rating: 4.9,
    provider: { id: "p1", name: "Hiroshi K.", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=987&q=80"
  },
  {
    id: "2",
    categoryKey: "localguide",
    price: 35,
    rating: 4.8,
    provider: { id: "p2", name: "Carlos M.", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: "3",
    categoryKey: "translation",
    price: 60,
    rating: 4.8,
    provider: { id: "p3", name: "Li Wei", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1551836022-d5d88e9218df"
  },
  {
    id: "4",
    categoryKey: "translation",
    price: 55,
    rating: 4.7,
    provider: { id: "p4", name: "Sophie L.", avatar: "https://randomuser.me/api/portraits/women/29.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
  },
  {
    id: "5",
    categoryKey: "skillteaching",
    price: 45,
    rating: 4.9,
    provider: { id: "p5", name: "Akira T.", avatar: "https://randomuser.me/api/portraits/men/67.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261"
  },
  {
    id: "6",
    categoryKey: "emergency",
    price: 50,
    rating: 4.6,
    provider: { id: "p6", name: "Mike R.", avatar: "https://randomuser.me/api/portraits/men/52.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
  },
  {
    id: "7",
    categoryKey: "events",
    price: 75,
    rating: 4.8,
    provider: { id: "p7", name: "Emma B.", avatar: "https://randomuser.me/api/portraits/women/33.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: "8",
    categoryKey: "home",
    price: 65,
    rating: 4.7,
    provider: { id: "p8", name: "Thomas M.", avatar: "https://randomuser.me/api/portraits/men/41.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: "9",
    categoryKey: "foodexperience",
    price: 55,
    rating: 4.9,
    provider: { id: "p9", name: "Supaporn J.", avatar: "https://randomuser.me/api/portraits/women/59.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9"
  },
  {
    id: "10",
    categoryKey: "professional",
    price: 75,
    rating: 4.8,
    provider: { id: "p10", name: "Jonathan L.", avatar: "https://randomuser.me/api/portraits/men/76.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1521737711867-e3b97375f902"
  },
  {
    id: "11",
    categoryKey: "culturalexchange",
    price: 45,
    rating: 4.9,
    provider: { id: "p11", name: "Yuki T.", avatar: "https://randomuser.me/api/portraits/women/67.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: "12",
    categoryKey: "health",
    price: 40,
    rating: 4.7,
    provider: { id: "p12", name: "Anna S.", avatar: "https://randomuser.me/api/portraits/women/25.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1506126613408-eca07ce68773"
  },
  {
    id: "13",
    categoryKey: "petcare",
    price: 35,
    rating: 4.8,
    provider: { id: "p13", name: "Robert M.", avatar: "https://randomuser.me/api/portraits/men/42.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1552053831-71594a27632d"
  },
  {
    id: "14",
    categoryKey: "childcare",
    price: 45,
    rating: 4.9,
    provider: { id: "p14", name: "Jessica W.", avatar: "https://randomuser.me/api/portraits/women/37.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1504151932400-72d4384f04b3?auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: "15",
    categoryKey: "travelplanning",
    price: 120,
    rating: 4.9,
    provider: { id: "p15", name: "Lena P.", avatar: "https://randomuser.me/api/portraits/women/70.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1502920514313-52581002a659"
  },
  {
    id: "16",
    categoryKey: "homeorg",
    price: 95,
    rating: 4.8,
    provider: { id: "p16", name: "Jordan F.", avatar: "https://randomuser.me/api/portraits/men/61.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1581578731548-c64695cc6952"
  },
  {
    id: "17",
    categoryKey: "shopping",
    price: 110,
    rating: 4.9,
    provider: { id: "p17", name: "Soojin K.", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518"
  },
  {
    id: "18",
    categoryKey: "techsupport",
    price: 85,
    rating: 4.7,
    provider: { id: "p18", name: "Diego R.", avatar: "https://randomuser.me/api/portraits/men/73.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1518770660439-4636190af475"
  },
  {
    id: "19",
    categoryKey: "financial",
    price: 130,
    rating: 4.9,
    provider: { id: "p19", name: "Mei Lin", avatar: "https://randomuser.me/api/portraits/women/72.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
  },
  {
    id: "20",
    categoryKey: "legal",
    price: 140,
    rating: 4.8,
    provider: { id: "p20", name: "Nadia H.", avatar: "https://randomuser.me/api/portraits/women/21.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1521791136064-7986c2920216"
  },
  {
    id: "21",
    categoryKey: "artcraft",
    price: 70,
    rating: 4.9,
    provider: { id: "p21", name: "Oliver B.", avatar: "https://randomuser.me/api/portraits/men/28.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f"
  },
  {
    id: "22",
    categoryKey: "musicdance",
    price: 65,
    rating: 4.8,
    provider: { id: "p22", name: "Camila A.", avatar: "https://randomuser.me/api/portraits/women/84.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1485579149621-3123dd979885"
  },
  {
    id: "23",
    categoryKey: "gardening",
    price: 90,
    rating: 4.7,
    provider: { id: "p23", name: "Noah L.", avatar: "https://randomuser.me/api/portraits/men/15.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
  },
  {
    id: "24",
    categoryKey: "fitness",
    price: 75,
    rating: 4.9,
    provider: { id: "p24", name: "Taylor V.", avatar: "https://randomuser.me/api/portraits/women/12.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1"
  },
  {
    id: "25",
    categoryKey: "cooking",
    price: 80,
    rating: 4.8,
    provider: { id: "p25", name: "Chef Arun", avatar: "https://randomuser.me/api/portraits/men/53.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0"
  },
  {
    id: "26",
    categoryKey: "photovideo",
    price: 150,
    rating: 4.8,
    provider: { id: "p26", name: "Eva M.", avatar: "https://randomuser.me/api/portraits/women/33.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
  },
  {
    id: "27",
    categoryKey: "languageexchange",
    price: 35,
    rating: 4.7,
    provider: { id: "p27", name: "Han L.", avatar: "https://randomuser.me/api/portraits/men/50.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1485217988980-11786ced9454"
  },
  {
    id: "28",
    categoryKey: "hometutoring",
    price: 60,
    rating: 4.9,
    provider: { id: "p28", name: "Priya S.", avatar: "https://randomuser.me/api/portraits/women/18.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1509062522246-3755977927d7"
  },
  {
    id: "29",
    categoryKey: "seniorcare",
    price: 55,
    rating: 4.8,
    provider: { id: "p29", name: "Akiko N.", avatar: "https://randomuser.me/api/portraits/women/58.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
  },
  {
    id: "30",
    categoryKey: "vrexperience",
    price: 95,
    rating: 4.7,
    provider: { id: "p30", name: "Samir A.", avatar: "https://randomuser.me/api/portraits/men/46.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952"
  },
  {
    id: "31",
    categoryKey: "environmental",
    price: 120,
    rating: 4.9,
    provider: { id: "p31", name: "Freja N.", avatar: "https://randomuser.me/api/portraits/women/39.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429"
  },
  {
    id: "32",
    categoryKey: "mentalhealth",
    price: 90,
    rating: 4.8,
    provider: { id: "p32", name: "Dr. Elise K.", avatar: "https://randomuser.me/api/portraits/women/27.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1524592094714-0f0654e20314"
  },
  {
    id: "33",
    categoryKey: "interiordesign",
    price: 110,
    rating: 4.9,
    provider: { id: "p33", name: "Clara D.", avatar: "https://randomuser.me/api/portraits/women/52.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1493666438817-866a91353ca9"
  },
  {
    id: "34",
    categoryKey: "eventent",
    price: 130,
    rating: 4.7,
    provider: { id: "p34", name: "Marcus V.", avatar: "https://randomuser.me/api/portraits/men/57.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f"
  },
  {
    id: "35",
    categoryKey: "giftservices",
    price: 70,
    rating: 4.8,
    provider: { id: "p35", name: "Aya T.", avatar: "https://randomuser.me/api/portraits/women/45.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1475180098004-ca77a66827be"
  },
  {
    id: "36",
    categoryKey: "travelplanning",
    price: 115,
    rating: 4.9,
    provider: { id: "p36", name: "Jon E.", avatar: "https://randomuser.me/api/portraits/men/62.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef"
  },
  {
    id: "37",
    categoryKey: "nutritionplanning",
    price: 85,
    rating: 4.8,
    provider: { id: "p37", name: "Sara O.", avatar: "https://randomuser.me/api/portraits/women/31.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
  },
  {
    id: "38",
    categoryKey: "travelphotography",
    price: 160,
    rating: 4.9,
    provider: { id: "p38", name: "Matteo R.", avatar: "https://randomuser.me/api/portraits/men/27.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1469474968028-56623f02e42e"
  },
  {
    id: "39",
    categoryKey: "wellnessretreats",
    price: 180,
    rating: 4.8,
    provider: { id: "p39", name: "Emma W.", avatar: "https://randomuser.me/api/portraits/women/26.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1545389336-cf090694435e",
    detailPath: "/skill-service/39"
  },
  {
    id: "40",
    categoryKey: "artworkshops",
    price: 65,
    rating: 4.9,
    provider: { id: "p40", name: "Marcus L.", avatar: "https://randomuser.me/api/portraits/men/36.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a",
    detailPath: "/skill-service/40"
  },
  {
    id: "41",
    categoryKey: "weddingplanning",
    price: 180,
    rating: 4.9,
    provider: { id: "p41", name: "Giulia C.", avatar: "https://randomuser.me/api/portraits/women/47.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1525182008055-f88b95ff7980"
  },
  {
    id: "42",
    categoryKey: "corporatetraining",
    price: 210,
    rating: 4.8,
    provider: { id: "p42", name: "David P.", avatar: "https://randomuser.me/api/portraits/men/70.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70"
  },
  {
    id: "43",
    categoryKey: "homestaging",
    price: 125,
    rating: 4.7,
    provider: { id: "p43", name: "Isabel W.", avatar: "https://randomuser.me/api/portraits/women/14.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1484154218962-a197022b5858"
  },
  {
    id: "44",
    categoryKey: "languagelearning",
    price: 75,
    rating: 4.9,
    provider: { id: "p44", name: "Lucia R.", avatar: "https://randomuser.me/api/portraits/women/43.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1498075702571-ecb018f3752d"
  },
  {
    id: "45",
    categoryKey: "careercounseling",
    price: 95,
    rating: 4.8,
    provider: { id: "p45", name: "Caleb S.", avatar: "https://randomuser.me/api/portraits/men/34.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  },
  {
    id: "46",
    categoryKey: "financialplanning",
    price: 135,
    rating: 4.9,
    provider: { id: "p46", name: "Helena B.", avatar: "https://randomuser.me/api/portraits/women/28.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a"
  },
  {
    id: "47",
    categoryKey: "homeautomation",
    price: 160,
    rating: 4.8,
    provider: { id: "p47", name: "Oren L.", avatar: "https://randomuser.me/api/portraits/men/35.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade"
  },
  {
    id: "48",
    categoryKey: "travelplanning",
    price: 150,
    rating: 4.8,
    provider: { id: "p48", name: "Marta Q.", avatar: "https://randomuser.me/api/portraits/women/38.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
  },
  {
    id: "49",
    categoryKey: "pettraining",
    price: 65,
    rating: 4.9,
    provider: { id: "p49", name: "Nate F.", avatar: "https://randomuser.me/api/portraits/men/44.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1517849845537-4d257902454a"
  },
  {
    id: "50",
    categoryKey: "childeducation",
    price: 70,
    rating: 4.8,
    provider: { id: "p50", name: "Ying L.", avatar: "https://randomuser.me/api/portraits/women/56.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
  },
  {
    id: "51",
    categoryKey: "homesecurity",
    price: 130,
    rating: 4.7,
    provider: { id: "p51", name: "Kwame T.", avatar: "https://randomuser.me/api/portraits/men/69.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1507679799987-c73779587ccf"
  },
  {
    id: "52",
    categoryKey: "gardening",
    price: 140,
    rating: 4.8,
    provider: { id: "p52", name: "Moana P.", avatar: "https://randomuser.me/api/portraits/women/13.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
  },
  {
    id: "53",
    categoryKey: "eventcatering",
    price: 170,
    rating: 4.9,
    provider: { id: "p53", name: "Chef Lena", avatar: "https://randomuser.me/api/portraits/women/22.jpg" },
    imageSrc: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17"
  }
];

const serviceCopy: Partial<Record<SupportedLocale, Record<string, { title: string; description: string; location: string }>>> = {
  en: {
    "1": {
      title: "Auckland Hidden Gems Tour",
      description: "Discover secret alleys and local favorites on your first day in the city.",
            location: "Auckland, New Zealand"
    },
    "2": {
      title: "Barcelona Street Art Walk",
      description: "Explore murals with a local artist who knows every story behind the paint.",
            location: "Auckland, New Zealand"
    },
    "3": {
      title: "Business Meeting Translation",
      description: "Certified translator for high-stakes meetings with international partners.",
            location: "Auckland, New Zealand"
    },
    "4": {
      title: "Medical Appointment Translator",
      description: "Accurate interpretation during hospital visits so nothing gets lost.",
            location: "Auckland, New Zealand"
    },
    "5": {
      title: "Japanese Pottery Workshop",
      description: "Hands-on pottery coaching tailored to beginners and hobbyists.",
            location: "Auckland, New Zealand"
    },
    "6": {
      title: "Emergency Tech Support",
      description: "On-call expert for phone, laptop, or smart-home emergencies.",
            location: "Auckland, New Zealand"
    },
    "7": {
      title: "Last-Minute Event Planning",
      description: "Corporate, birthdays, or pop-ups handled end-to-end within hours.",
            location: "Auckland, New Zealand"
    },
    "8": {
      title: "Emergency Plumbing Repair",
      description: "Stop leaks and clogs fast with 30-minute arrival guaranteed.",
            location: "Auckland, New Zealand"
    },
    "9": {
      title: "Authentic Food Tour",
      description: "Taste Bangkok's hidden eateries curated to your preferences.",
            location: "Auckland, New Zealand"
    },
    "10": {
      title: "Business Strategy Workshop",
      description: "Executive mentor for scaling roadmaps and pitch refinement.",
            location: "Auckland, New Zealand"
    },
    "11": {
      title: "Traditional Tea Ceremony",
      description: "Learn philosophy and rituals from a Kyoto tea master.",
            location: "Auckland, New Zealand"
    },
    "12": {
      title: "Meditation & Stress Relief",
      description: "Guided mindfulness for busy professionals needing quick resets.",
            location: "Auckland, New Zealand"
    },
    "13": {
      title: "Emergency Pet Care",
      description: "Certified sitter arrives within the hour for walks, meds, or feeding.",
            location: "Auckland, New Zealand"
    },
    "14": {
      title: "Last-Minute Babysitting",
      description: "Background-checked caregiver comfortable with all age groups.",
            location: "Auckland, New Zealand"
    },
    "15": {
      title: "Personal Travel Concierge",
      description: "Design custom itineraries, book locals, and coordinate logistics within hours.",
            location: "Auckland, New Zealand"
    },
    "16": {
      title: "48-Hour Home Reset",
      description: "Professional organizer streamlines closets, kitchens, and paperwork in one weekend.",
            location: "Auckland, New Zealand"
    },
    "17": {
      title: "Curated Wardrobe Sprint",
      description: "Stylist scouts boutiques and delivers mix-and-match looks tailored to your profile.",
            location: "Auckland, New Zealand"
    },
    "18": {
      title: "On-Site Device Rescue",
      description: "Hardware engineer troubleshoots laptops, phones, and smart-home gear on demand.",
            location: "Auckland, New Zealand"
    },
    "19": {
      title: "Rapid Portfolio Check",
      description: "CFP reviews your allocations and issues action steps in a single session.",
            location: "Auckland, New Zealand"
    },
    "20": {
      title: "Contract First Aid",
      description: "Attorney reviews urgent agreements and explains red flags in plain language.",
            location: "Auckland, New Zealand"
    },
    "21": {
      title: "Neighborhood Makers Studio",
      description: "Join local artists for textile, ceramic, or printmaking crash sessions.",
            location: "Auckland, New Zealand"
    },
    "22": {
      title: "Express Salsa Coaching",
      description: "Private dancer coaches routines for events, confidence, or workouts.",
            location: "Auckland, New Zealand"
    },
    "23": {
      title: "Urban Garden Rescue",
      description: "Horticulturist revives balconies and yards with seasonal planting plans.",
            location: "Auckland, New Zealand"
    },
    "24": {
      title: "Mobile Strength Coach",
      description: "Certified trainer brings equipment for tailored HIIT or recovery combos.",
            location: "Auckland, New Zealand"
    },
    "25": {
      title: "Chef-Led Street Food Lab",
      description: "Local chef teaches signature dishes in your kitchen or pop-up studio.",
            location: "Auckland, New Zealand"
    },
    "26": {
      title: "Flash Documentary Crew",
      description: "Two-person team films events and delivers same-day highlight edits.",
            location: "Auckland, New Zealand"
    },
    "27": {
      title: "Coffee & Conversation Pairing",
      description: "Meet curated native partners for immersive cafe chats and city walks.",
            location: "Auckland, New Zealand"
    },
    "28": {
      title: "STEM Mentor On Call",
      description: "Top-tier tutor solves math and science blockers in focused sessions.",
            location: "Auckland, New Zealand"
    },
    "29": {
      title: "Compassionate Companion Visit",
      description: "Certified caregiver handles wellness checks, errands, and social time.",
            location: "Auckland, New Zealand"
    },
    "30": {
      title: "Immersive VR Journeys",
      description: "Mobile VR lab brings virtual travel adventures to offices or parties.",
            location: "Auckland, New Zealand"
    },
    "31": {
      title: "Green Footprint Audit",
      description: "Sustainability pro measures impact and delivers zero-waste roadmaps.",
            location: "Auckland, New Zealand"
    },
    "32": {
      title: "Pop-Up Mind Gym",
      description: "Licensed counselor hosts rapid resilience sessions on-site or online.",
            location: "Auckland, New Zealand"
    },
    "33": {
      title: "Instant Space Refresh",
      description: "Designer restyles rooms with modular furniture lists and vendor contacts.",
            location: "Auckland, New Zealand"
    },
    "34": {
      title: "Pop-Up Entertainment Squad",
      description: "Producers assemble DJs, performers, and hosts in less than 24 hours.",
            location: "Auckland, New Zealand"
    },
    "35": {
      title: "Local Artisan Gift Hunt",
      description: "Concierge sources bespoke souvenirs from makers that match your story.",
            location: "Auckland, New Zealand"
    },
    "36": {
      title: "48-Hour Trip Blueprint",
      description: "Planner builds bookable itineraries with live support for each day.",
            location: "Auckland, New Zealand"
    },
    "37": {
      title: "Hybrid Nutrition Studio",
      description: "Dietitian analyzes labs and co-creates meal plans plus guided shopping.",
            location: "Auckland, New Zealand"
    },
    "38": {
      title: "Destination Storyteller",
      description: "Photographer shadows your adventures to capture cinematic travel sets.",
            location: "Auckland, New Zealand"
    },
    "39": {
      title: "3-Day Mountain Yoga Retreat",
      description: "All-inclusive wellness escape with guided meditation and hikes.",
            location: "Auckland, New Zealand"
    },
    "40": {
      title: "Personalized Pottery Residency",
      description: "One-on-one studio time to design, throw, and glaze your own pieces.",
            location: "Auckland, New Zealand"
    },
    "41": {
      title: "Micro-Wedding Command Center",
      description: "Boutique planner secures venues, vendors, and rituals on short notice.",
            location: "Auckland, New Zealand"
    },
    "42": {
      title: "Rapid Team Upskill Lab",
      description: "Enterprise coach builds applied workshops for leadership or product squads.",
            location: "Auckland, New Zealand"
    },
    "43": {
      title: "Same-Week Home Staging",
      description: "Stylists declutter, furnish, and style listings with pro photography.",
            location: "Auckland, New Zealand"
    },
    "44": {
      title: "Immersive Accent Lab",
      description: "Linguists craft seven-day sprints to upgrade pronunciation and fluency.",
            location: "Auckland, New Zealand"
    },
    "45": {
      title: "Career Pivot Intensive",
      description: "Strategist maps skills, story, and outreach plans in one focused session.",
            location: "Auckland, New Zealand"
    },
    "46": {
      title: "Life Event Money Plan",
      description: "Planner models savings, tax, and protection scenarios for major decisions.",
            location: "Auckland, New Zealand"
    },
    "47": {
      title: "Smart Home Blueprint",
      description: "Integrator designs connected lighting, climate, and security scenes.",
            location: "Auckland, New Zealand"
    },
    "48": {
      title: "Global Nomad Logistics",
      description: "Travel concierge manages visas, insurance, and multi-stop bookings.",
            location: "Auckland, New Zealand"
    },
    "49": {
      title: "Behavior Reset Bootcamp",
      description: "Trainer designs at-home plans for anxious or energetic pets.",
            location: "Auckland, New Zealand"
    },
    "50": {
      title: "Project-Based Learning Coach",
      description: "Educator builds custom STEAM pods and delivers progress feedback.",
            location: "Auckland, New Zealand"
    },
    "51": {
      title: "Adaptive Security Patrol",
      description: "Security consultant audits risks, installs sensors, and trains households.",
            location: "Auckland, New Zealand"
    },
    "52": {
      title: "Edible Landscape Atelier",
      description: "Designer plans regenerative gardens plus ongoing maintenance coaching.",
            location: "Auckland, New Zealand"
    },
    "53": {
      title: "Chef Collective Catering",
      description: "Pop-up kitchen co-creates menus and mobilizes staff for boutique events.",
            location: "Auckland, New Zealand"
    }
  },
  zh: {
    "1": {
      title: "东京城市秘境导览",
      description: "第一天就跟本地专家走进小巷与隐藏店铺。",
            location: "奥克兰，新西兰"
    },
    "2": {
      title: "巴塞罗那街头艺术漫步",
      description: "由本地艺术家带路，了解每幅壁画背后的故事。",
            location: "奥克兰，新西兰"
    },
    "3": {
      title: "商务会议同步口译",
      description: "持证译员陪同洽谈，确保跨国语意精准。",
            location: "奥克兰，新西兰"
    },
    "4": {
      title: "就医翻译陪同",
      description: "医疗场景实时翻译，帮助你听懂每一项诊疗。",
            location: "奥克兰，新西兰"
    },
    "5": {
      title: "日式陶艺入门",
      description: "适合初学者的手作课程，感受拉坯与上釉的乐趣。",
            location: "奥克兰，新西兰"
    },
    "6": {
      title: "紧急科技救援",
      description: "手机、电脑、智能家居 24/7 上门排障。",
            location: "奥克兰，新西兰"
    },
    "7": {
      title: "速效活动策划",
      description: "企业会议或生日派对，从场地到流程一站式落地。",
            location: "奥克兰，新西兰"
    },
    "8": {
      title: "急修管道服务",
      description: "30 分钟到场止漏疏通，守护家庭用水安全。",
            location: "奥克兰，新西兰"
    },
    "9": {
      title: "曼谷私房美食路线",
      description: "依照口味定制的街头美食探索。",
            location: "奥克兰，新西兰"
    },
    "10": {
      title: "商业战略工作坊",
      description: "资深导师陪你梳理增长路线与融资陈述。",
            location: "奥克兰，新西兰"
    },
    "11": {
      title: "京都茶道体验",
      description: "与茶师一起学习茶道礼仪与哲思。",
            location: "奥克兰，新西兰"
    },
    "12": {
      title: "冥想减压课程",
      description: "为高压工作者设计的正念练习。",
            location: "奥克兰，新西兰"
    },
    "13": {
      title: "紧急宠物照护",
      description: "持证宠物管家一小时内上门陪伴或投药。",
            location: "奥克兰，新西兰"
    },
    "14": {
      title: "临时保姆服务",
      description: "背景审查完备，擅长各年龄段儿童。",
            location: "奥克兰，新西兰"
    },
    "15": {
      title: "个性化旅行礼宾",
      description: "数小时内完成行程规划、当地预订与交通协同。",
            location: "奥克兰，新西兰"
    },
    "16": {
      title: "48小时居家整理",
      description: "专业整理师周末内梳理衣橱、厨房与文档动线。",
            location: "奥克兰，新西兰"
    },
    "17": {
      title: "个性衣橱急速打造",
      description: "私服造型师走访精品店并送上可自由组合的造型。",
            location: "奥克兰，新西兰"
    },
    "18": {
      title: "到府设备急救",
      description: "硬件工程师现场排查笔电、手机与智能家居。",
            location: "奥克兰，新西兰"
    },
    "19": {
      title: "极速资产体检",
      description: "注册理财师一次会议梳理配置与下一步策略。",
            location: "奥克兰，新西兰"
    },
    "20": {
      title: "合同急诊服务",
      description: "律师快速审核文件，并用浅显语言提示风险。",
            location: "奥克兰，新西兰"
    },
    "21": {
      title: "社区手作实验室",
      description: "跟本地艺术家体验纺织、陶艺或版画速成课。",
            location: "奥克兰，新西兰"
    },
    "22": {
      title: "极速萨尔萨教练",
      description: "私人舞者客制派对舞步与体态训练。",
            location: "奥克兰，新西兰"
    },
    "23": {
      title: "城市花园急救",
      description: "园艺师为阳台与庭院制定当季种植计划。",
            location: "奥克兰，新西兰"
    },
    "24": {
      title: "移动私教",
      description: "认证教练携装备提供专属HIIT或恢复训练。",
            location: "奥克兰，新西兰"
    },
    "25": {
      title: "主厨街头料理课",
      description: "本地主厨上门或在快闪厨房教学招牌菜。",
            location: "奥克兰，新西兰"
    },
    "26": {
      title: "闪拍纪录团队",
      description: "双人团队拍摄活动并于当天剪出亮点短片。",
            location: "奥克兰，新西兰"
    },
    "27": {
      title: "咖啡语言交换",
      description: "匹配母语伙伴，在咖啡馆练口语逛城市。",
            location: "奥克兰，新西兰"
    },
    "28": {
      title: "STEM即刻导师",
      description: "名校导师针对数学与科学难点提供集训。",
            location: "奥克兰，新西兰"
    },
    "29": {
      title: "贴心长者陪护",
      description: "持证照护者进行关怀探访、代办与社交陪伴。",
            location: "奥克兰，新西兰"
    },
    "30": {
      title: "沉浸式VR漫游",
      description: "移动VR实验室到现场带来旅行与团建体验。",
            location: "奥克兰，新西兰"
    },
    "31": {
      title: "绿色足迹评估",
      description: "可持续顾问量化能耗并提供零废行动方案。",
            location: "奥克兰，新西兰"
    },
    "32": {
      title: "快闪心灵健身房",
      description: "执照心理师上门或远程进行减压与复原训练。",
            location: "奥克兰，新西兰"
    },
    "33": {
      title: "速效空间改造",
      description: "室内设计师即场重组家具灯光并提供采购单。",
            location: "奥克兰，新西兰"
    },
    "34": {
      title: "快闪娱乐团队",
      description: "制作人24小时内召集DJ、主持与表演者。",
            location: "奥克兰，新西兰"
    },
    "35": {
      title: "本地匠礼寻访",
      description: "礼品策展人依照故事挑选手作纪念。",
            location: "奥克兰，新西兰"
    },
    "36": {
      title: "48小时旅程蓝图",
      description: "行程规划师输出可预订行程并实时跟进。",
            location: "奥克兰，新西兰"
    },
    "37": {
      title: "混合营养工作室",
      description: "营养师解读检查数据并陪同制定菜单与采买。",
            location: "奥克兰，新西兰"
    },
    "38": {
      title: "旅行故事摄影",
      description: "摄影师跟拍旅程，产出电影感影像。",
            location: "奥克兰，新西兰"
    },
    "39": {
      title: "三日山间瑜伽营",
      description: "全包式瑜伽与冥想假期，含徒步与素食餐。",
            location: "奥克兰，新西兰"
    },
    "40": {
      title: "私人陶艺驻留",
      description: "一对一完成拉坯、塑形与上釉，作品可带走。",
            location: "奥克兰，新西兰"
    },
    "41": {
      title: "微婚礼指挥站",
      description: "精品策划极速敲定场地、供应商与仪式细节。",
            location: "奥克兰，新西兰"
    },
    "42": {
      title: "团队加速实验室",
      description: "企业教练客制领导或产品主题实战训练。",
            location: "奥克兰，新西兰"
    },
    "43": {
      title: "一周速售软装",
      description: "软装团队清理布置并安排专业摄影。",
            location: "奥克兰，新西兰"
    },
    "44": {
      title: "沉浸口音实验室",
      description: "语言学家规划7天冲刺提升发音与流利度。",
            location: "奥克兰，新西兰"
    },
    "45": {
      title: "职业转向工作坊",
      description: "顾问梳理能力矩阵、故事与触达策略。",
            location: "奥克兰，新西兰"
    },
    "46": {
      title: "人生节点理财方案",
      description: "规划师模拟储蓄、税务与保障以支持重大决策。",
            location: "奥克兰，新西兰"
    },
    "47": {
      title: "智慧家庭蓝图",
      description: "系统整合师设计灯光、空调与安防自动化。",
            location: "奥克兰，新西兰"
    },
    "48": {
      title: "全球游牧后勤",
      description: "旅行礼宾统筹签证、保险与多城市预订。",
            location: "奥克兰，新西兰"
    },
    "49": {
      title: "宠物行为重置营",
      description: "训犬师量身设计在家训练与外出练习。",
            location: "奥克兰，新西兰"
    },
    "50": {
      title: "项目式学习教练",
      description: "教育顾问打造客制 STEAM 课程并提供反馈。",
            location: "奥克兰，新西兰"
    },
    "51": {
      title: "定制家庭安防",
      description: "安防顾问评估风险、安装感测器并培训家庭。",
            location: "奥克兰，新西兰"
    },
    "52": {
      title: "食用花园工坊",
      description: "景观设计师规划再生菜园并指导维护。",
            location: "奥克兰，新西兰"
    },
    "53": {
      title: "主厨共创餐饮",
      description: "快闪厨房共创菜单并迅速集结餐饮团队。",
            location: "奥克兰，新西兰"
    }
  },
  pt: {
    "1": {
      title: "Tour de cantinhos ocultos em Auckland",
      description: "Descubra ruelas e cafés secretos no primeiro dia na cidade.",
      location: "Auckland, Nova Zelândia"
    },
    "2": {
      title: "Caminhada por arte urbana",
      description: "Explore murais e a história por trás de cada obra com um artista local.",
      location: "Auckland, Nova Zelândia"
    },
    "3": {
      title: "Tradução para reuniões de negócios",
      description: "Intérprete certificado para manter cada conversa internacional alinhada.",
      location: "Auckland, Nova Zelândia"
    },
    "4": {
      title: "Tradução para consultas médicas",
      description: "Interpretação precisa durante visitas a hospitais e clínicas.",
      location: "Auckland, Nova Zelândia"
    },
    "5": {
      title: "Oficina de cerâmica japonesa",
      description: "Aprenda técnicas manuais com acompanhamento personalizado.",
      location: "Auckland, Nova Zelândia"
    },
    "6": {
      title: "Suporte técnico emergencial",
      description: "Profissional de prontidão para laptop, celular ou soluções domésticas.",
      location: "Auckland, Nova Zelândia"
    },
    "7": {
      title: "Planejamento rápido de eventos",
      description: "Organizamos aniversários, corporativos ou pop-ups em poucas horas.",
      location: "Auckland, Nova Zelândia"
    },
    "8": {
      title: "Serviços residenciais imediatos",
      description: "Arrumação, manutenção e upgrades com chegada garantida.",
      location: "Auckland, Nova Zelândia"
    },
    "9": {
      title: "Tour gastronômico autêntico",
      description: "Vivencie mercados e cozinhas secretas adaptadas ao seu paladar.",
      location: "Auckland, Nova Zelândia"
    },
    "10": {
      title: "Workshop de estratégia",
      description: "Mentor executivo para revisar pitch e planos de expansão.",
      location: "Auckland, Nova Zelândia"
    },
    "11": {
      title: "Cerimônia tradicional do chá",
      description: "Aprenda filosofia e rituais com mestre formado em Kyoto.",
      location: "Auckland, Nova Zelândia"
    },
    "12": {
      title: "Sessão de meditação e alívio de estresse",
      description: "Mindfulness guiado para profissionais que precisam desacelerar.",
      location: "Auckland, Nova Zelândia"
    },
    "13": {
      title: "Cuidados emergenciais com pets",
      description: "Dog walker ou cuidador chega em menos de uma hora.",
      location: "Auckland, Nova Zelândia"
    },
    "14": {
      title: "Babá e apoio infantil",
      description: "Profissionais verificados para ida a eventos ou compromissos.",
      location: "Auckland, Nova Zelândia"
    },
    "15": {
      title: "Planejamento de viagens personalizadas",
      description: "Especialista cria roteiros completos com logística e reservas.",
      location: "Auckland, Nova Zelândia"
    },
    "16": {
      title: "Organização do lar",
      description: "Consultoria premium para destralhar e criar sistemas fáceis.",
      location: "Auckland, Nova Zelândia"
    },
    "17": {
      title: "Personal shopping",
      description: "Stylist seleciona peças e lojas conforme seu perfil.",
      location: "Auckland, Nova Zelândia"
    },
    "18": {
      title: "Suporte tech para residências",
      description: "Configuração e resolução de problemas em casa ou escritório.",
      location: "Auckland, Nova Zelândia"
    },
    "19": {
      title: "Consultoria financeira pessoal",
      description: "Planejamento de investimentos e rotinas de controle.",
      location: "Auckland, Nova Zelândia"
    },
    "20": {
      title: "Sessões de orientação jurídica",
      description: "Advogada especializada para dúvidas rápidas e estratégicas.",
      location: "Auckland, Nova Zelândia"
    },
    "21": {
      title: "Ateliê de arte e craft",
      description: "Experiência prática para criar peças exclusivas.",
      location: "Auckland, Nova Zelândia"
    },
    "22": {
      title: "Aulas de música e dança latina",
      description: "Instrutores premiados trazem energia e técnica para sua casa.",
      location: "Auckland, Nova Zelândia"
    },
    "23": {
      title: "Resgate de jardim urbano",
      description: "Paisagista revive varandas e quintais com planos sazonais.",
      location: "Auckland, Nova Zelândia"
    },
    "24": {
      title: "Treinador móvel de força",
      description: "Personal trainer leva equipamentos para HIIT ou recuperação sob medida.",
      location: "Auckland, Nova Zelândia"
    },
    "25": {
      title: "Laboratório de street food com chef",
      description: "Chef local ensina pratos autorais na sua cozinha ou estúdio pop-up.",
      location: "Auckland, Nova Zelândia"
    },
    "26": {
      title: "Equipe relâmpago de documentário",
      description: "Dois profissionais filmam o evento e entregam edição no mesmo dia.",
      location: "Auckland, Nova Zelândia"
    },
    "27": {
      title: "Parceria para café e conversa",
      description: "Encontramos falantes nativos para bate-papos e passeios imersivos.",
      location: "Auckland, Nova Zelândia"
    },
    "28": {
      title: "Mentoria STEM sob demanda",
      description: "Tutor de alto nível resolve bloqueios de matemática e ciências.",
      location: "Auckland, Nova Zelândia"
    },
    "29": {
      title: "Visita de companhia cuidadosa",
      description: "Cuidador certificado garante bem-estar, recados e socialização.",
      location: "Auckland, Nova Zelândia"
    },
    "30": {
      title: "Experiência VR imersiva",
      description: "Laboratório móvel leva turismo virtual e team building ao local.",
      location: "Auckland, Nova Zelândia"
    },
    "31": {
      title: "Diagnóstico de sustentabilidade",
      description: "Consultor mede impactos e entrega plano de ações sem desperdício.",
      location: "Auckland, Nova Zelândia"
    },
    "32": {
      title: "Clínica express de saúde mental",
      description: "Psicóloga licenciada conduz sessões para aliviar estresse e recuperar foco.",
      location: "Auckland, Nova Zelândia"
    },
    "33": {
      title: "Renovação instantânea de interiores",
      description: "Designer rearranja móveis e iluminação com lista de compras.",
      location: "Auckland, Nova Zelândia"
    },
    "34": {
      title: "Time pop-up de entretenimento",
      description: "Produtor convoca DJs, mestres de cerimônia e performers em 24h.",
      location: "Auckland, Nova Zelândia"
    },
    "35": {
      title: "Serviço de presentes curados",
      description: "Curadora busca lembranças artesanais alinhadas à sua história.",
      location: "Auckland, Nova Zelândia"
    },
    "36": {
      title: "Blueprint de viagem em 48h",
      description: "Planner envia roteiro reservável e acompanha atualizações em tempo real.",
      location: "Auckland, Nova Zelândia"
    },
    "37": {
      title: "Estúdio híbrido de nutrição",
      description: "Nutricionista interpreta exames e co-cria menus e listas de compras.",
      location: "Auckland, Nova Zelândia"
    },
    "38": {
      title: "Fotografia narrativa de viagem",
      description: "Fotógrafo registra a jornada e entrega imagens cinematográficas.",
      location: "Auckland, Nova Zelândia"
    },
    "39": {
      title: "Retiro de bem-estar em três dias",
      description: "Pacote de ioga e meditação com trilhas e alimentação plant-based.",
      location: "Auckland, Nova Zelândia"
    },
    "40": {
      title: "Residência privada de cerâmica",
      description: "Sessões individuais de torno, modelagem e esmaltação com peças finais.",
      location: "Auckland, Nova Zelândia"
    },
    "41": {
      title: "Central de microcasamentos",
      description: "Planejadora boutique fecha fornecedores e detalhes em ritmo acelerado.",
      location: "Auckland, Nova Zelândia"
    },
    "42": {
      title: "Laboratório de aceleração corporativa",
      description: "Coach conduz treinamentos práticos de liderança ou produto.",
      location: "Auckland, Nova Zelândia"
    },
    "43": {
      title: "Staging para vender rápido",
      description: "Equipe de interiores organiza, decora e agenda fotos profissionais.",
      location: "Auckland, Nova Zelândia"
    },
    "44": {
      title: "Imersão em sotaque e fluência",
      description: "Linguista cria sprint de 7 dias para pronúncia e confiança.",
      location: "Auckland, Nova Zelândia"
    },
    "45": {
      title: "Oficina de transição de carreira",
      description: "Consultor mapeia competências, narrativa e contatos-chave.",
      location: "Auckland, Nova Zelândia"
    },
    "46": {
      title: "Planejamento financeiro para marcos",
      description: "Especialista simula poupança, impostos e proteções para grandes decisões.",
      location: "Auckland, Nova Zelândia"
    },
    "47": {
      title: "Projeto de automação residencial",
      description: "Integrador desenha iluminação, clima e segurança inteligentes.",
      location: "Auckland, Nova Zelândia"
    },
    "48": {
      title: "Logística para nômades globais",
      description: "Concierge organiza vistos, seguros e reservas multi-cidade.",
      location: "Auckland, Nova Zelândia"
    },
    "49": {
      title: "Reprogramação do comportamento pet",
      description: "Adestrador combina treinos em casa e na rua para corrigir hábitos.",
      location: "Auckland, Nova Zelândia"
    },
    "50": {
      title: "Coaching educacional personalizado",
      description: "Consultora cria projetos STEAM com devolutivas detalhadas.",
      location: "Auckland, Nova Zelândia"
    },
    "51": {
      title: "Segurança residencial sob medida",
      description: "Especialista avalia riscos, instala sensores e treina a família.",
      location: "Auckland, Nova Zelândia"
    },
    "52": {
      title: "Oficina de hortas comestíveis",
      description: "Paisagista ensina a montar jardins regenerativos e mantê-los.",
      location: "Auckland, Nova Zelândia"
    },
    "53": {
      title: "Catering colaborativo com chef",
      description: "Cozinha pop-up monta equipe e menu autoral em ritmo acelerado.",
      location: "Auckland, Nova Zelândia"
    }
  },
  es: {
    "1": {
      title: "Tour de joyas ocultas en Auckland",
      description: "Descubre callejones y cafés secretos desde tu primer día en la ciudad.",
      location: "Auckland, Nueva Zelanda"
    },
    "2": {
      title: "Caminata de arte urbano",
      description: "Explora murales con una artista local que conoce cada historia.",
      location: "Auckland, Nueva Zelanda"
    },
    "3": {
      title: "Traducción para reuniones de negocios",
      description: "Intérprete certificado para conversaciones críticas con socios globales.",
      location: "Auckland, Nueva Zelanda"
    },
    "4": {
      title: "Intérprete para citas médicas",
      description: "Acompañamiento preciso en hospitales para que nada se pierda.",
      location: "Auckland, Nueva Zelanda"
    },
    "5": {
      title: "Taller de cerámica japonesa",
      description: "Práctica guiada adaptada a principiantes y aficionados.",
      location: "Auckland, Nueva Zelanda"
    },
    "6": {
      title: "Soporte tecnológico de emergencia",
      description: "Experto on-call para urgencias con teléfono, portátil o smart home.",
      location: "Auckland, Nueva Zelanda"
    },
    "7": {
      title: "Planeación exprés de eventos",
      description: "Corporativos, cumpleaños o pop-ups coordinados de principio a fin.",
      location: "Auckland, Nueva Zelanda"
    },
    "8": {
      title: "Reparación urgente de plomería",
      description: "Llegada en 30 minutos para detener fugas y destapar tuberías.",
      location: "Auckland, Nueva Zelanda"
    },
    "9": {
      title: "Ruta gastronómica auténtica",
      description: "Degusta puestos ocultos personalizados a tus preferencias.",
      location: "Auckland, Nueva Zelanda"
    },
    "10": {
      title: "Workshop de estrategia empresarial",
      description: "Mentor ejecutivo para pulir hojas de ruta y pitches.",
      location: "Auckland, Nueva Zelanda"
    },
    "11": {
      title: "Ceremonia tradicional del té",
      description: "Aprende filosofía y rituales junto a una maestra de Kioto.",
      location: "Auckland, Nueva Zelanda"
    },
    "12": {
      title: "Meditación y alivio del estrés",
      description: "Sesiones guiadas para profesionales que necesitan reiniciar.",
      location: "Auckland, Nueva Zelanda"
    },
    "13": {
      title: "Cuidado urgente para mascotas",
      description: "Cuidador certificado llega en menos de una hora para paseos o medicación.",
      location: "Auckland, Nueva Zelanda"
    },
    "14": {
      title: "Niñera de último minuto",
      description: "Profesional con verificación de antecedentes para cualquier edad.",
      location: "Auckland, Nueva Zelanda"
    },
    "15": {
      title: "Conserjería personal de viajes",
      description: "Diseña itinerarios, reserva locales y coordina logística en horas.",
      location: "Auckland, Nueva Zelanda"
    },
    "16": {
      title: "Reset del hogar en 48 horas",
      description: "Organizadora profesional ordena closets, cocina y documentos en un fin de semana.",
      location: "Auckland, Nueva Zelanda"
    },
    "17": {
      title: "Sprint de guardarropa curado",
      description: "Stylist recorre boutiques y arma looks combinables según tu perfil.",
      location: "Auckland, Nueva Zelanda"
    },
    "18": {
      title: "Rescate de dispositivos in situ",
      description: "Ingeniero de hardware soluciona laptops, móviles y domótica a domicilio.",
      location: "Auckland, Nueva Zelanda"
    },
    "19": {
      title: "Chequeo rápido de portafolio",
      description: "Asesor CFP revisa inversiones y entrega pasos accionables en una sesión.",
      location: "Auckland, Nueva Zelanda"
    },
    "20": {
      title: "Primeros auxilios contractuales",
      description: "Abogada revisa acuerdos urgentes y explica riesgos en lenguaje claro.",
      location: "Auckland, Nueva Zelanda"
    },
    "21": {
      title: "Estudio de makers del barrio",
      description: "Únete a artistas locales para talleres exprés de textiles, cerámica o grabado.",
      location: "Auckland, Nueva Zelanda"
    },
    "22": {
      title: "Coaching exprés de salsa",
      description: "Bailarina privada entrena rutinas para eventos, confianza o ejercicio.",
      location: "Auckland, Nueva Zelanda"
    },
    "23": {
      title: "Rescate de jardín urbano",
      description: "Horticultora revive balcones y patios con planes estacionales.",
      location: "Auckland, Nueva Zelanda"
    },
    "24": {
      title: "Entrenador móvil de fuerza",
      description: "Coach certificado lleva equipo para HIIT o recuperación personalizada.",
      location: "Auckland, Nueva Zelanda"
    },
    "25": {
      title: "Laboratorio culinario guiado por chef",
      description: "Chef local enseña platos icónicos en tu cocina o estudio pop-up.",
      location: "Auckland, Nueva Zelanda"
    },
    "26": {
      title: "Equipo relámpago de documental",
      description: "Dúo audiovisual filma eventos y entrega edición el mismo día.",
      location: "Auckland, Nueva Zelanda"
    },
    "27": {
      title: "Maridaje de café y conversación",
      description: "Emparejamos hablantes nativos para charlas inmersivas y paseos por la ciudad.",
      location: "Auckland, Nueva Zelanda"
    },
    "28": {
      title: "Mentor STEM a demanda",
      description: "Tutor élite resuelve bloqueos de matemáticas y ciencias en sesiones enfocadas.",
      location: "Auckland, Nueva Zelanda"
    },
    "29": {
      title: "Visita de compañía compasiva",
      description: "Cuidador certificado ofrece chequeos, recados y tiempo social.",
      location: "Auckland, Nueva Zelanda"
    },
    "30": {
      title: "Experiencia VR inmersiva",
      description: "Laboratorio móvil lleva turismo virtual y team building a tu sede.",
      location: "Auckland, Nueva Zelanda"
    },
    "31": {
      title: "Recorrido de sostenibilidad",
      description: "Consultor cuantifica huella y entrega plan de acción sin desperdicios.",
      location: "Auckland, Nueva Zelanda"
    },
    "32": {
      title: "Clínica pop-up de salud mental",
      description: "Psicóloga licenciada ofrece sesiones para reducir estrés y recuperar enfoque.",
      location: "Auckland, Nueva Zelanda"
    },
    "33": {
      title: "Refresh instantáneo de interiores",
      description: "Diseñadora reorganiza muebles e iluminación con lista de compras.",
      location: "Auckland, Nueva Zelanda"
    },
    "34": {
      title: "Equipo de entretenimiento pop-up",
      description: "Productor reúne DJs, MCs y performers en menos de 24 horas.",
      location: "Auckland, Nueva Zelanda"
    },
    "35": {
      title: "Servicio curado de obsequios",
      description: "Curadora elige piezas artesanales alineadas con tu historia.",
      location: "Auckland, Nueva Zelanda"
    },
    "36": {
      title: "Plano de viaje en 48 horas",
      description: "Planner entrega itinerario reservable y da seguimiento en vivo.",
      location: "Auckland, Nueva Zelanda"
    },
    "37": {
      title: "Estudio híbrido de nutrición",
      description: "Nutrióloga interpreta estudios y co-diseña menús y compras.",
      location: "Auckland, Nueva Zelanda"
    },
    "38": {
      title: "Fotografía narrativa de viaje",
      description: "Fotógrafo documenta tu ruta y entrega imágenes cinematográficas.",
      location: "Auckland, Nueva Zelanda"
    },
    "39": {
      title: "Retiro de bienestar de tres días",
      description: "Paquete todo incluido con yoga, meditación, hiking y cocina vegetal.",
      location: "Auckland, Nueva Zelanda"
    },
    "40": {
      title: "Residencia privada de cerámica",
      description: "Sesiones uno a uno de torno, modelado y esmaltado con piezas listas para llevar.",
      location: "Auckland, Nueva Zelanda"
    },
    "41": {
      title: "Comando de microbodas",
      description: "Planner boutique asegura venue, proveedores y detalles con rapidez.",
      location: "Auckland, Nueva Zelanda"
    },
    "42": {
      title: "Laboratorio corporativo acelerado",
      description: "Coach diseña entrenamientos prácticos de liderazgo o producto.",
      location: "Auckland, Nueva Zelanda"
    },
    "43": {
      title: "Home staging en una semana",
      description: "Equipo de interiores limpia, decora y coordina sesión fotográfica.",
      location: "Auckland, Nueva Zelanda"
    },
    "44": {
      title: "Laboratorio de acentos inmersivo",
      description: "Lingüista crea sprint de 7 días para pronunciación y fluidez.",
      location: "Auckland, Nueva Zelanda"
    },
    "45": {
      title: "Taller de cambio profesional",
      description: "Consultor mapea habilidades, narrativa y estrategia de contactos.",
      location: "Auckland, Nueva Zelanda"
    },
    "46": {
      title: "Plan financiero para hitos",
      description: "Planner modela ahorro, impuestos y coberturas para grandes decisiones.",
      location: "Auckland, Nueva Zelanda"
    },
    "47": {
      title: "Blueprint de hogar inteligente",
      description: "Integrador diseña iluminación, clima y seguridad automatizadas.",
      location: "Auckland, Nueva Zelanda"
    },
    "48": {
      title: "Logística para nómadas globales",
      description: "Conserje gestiona visados, seguros y reservas multi-ciudad.",
      location: "Auckland, Nueva Zelanda"
    },
    "49": {
      title: "Campamento de reeducación canina",
      description: "Entrenador diseña rutina combinando prácticas en casa y exteriores.",
      location: "Auckland, Nueva Zelanda"
    },
    "50": {
      title: "Coaching educativo personalizado",
      description: "Consejera crea proyectos STEAM con retroalimentación detallada.",
      location: "Auckland, Nueva Zelanda"
    },
    "51": {
      title: "Seguridad residencial a medida",
      description: "Especialista evalúa riesgos, instala sensores y capacita a la familia.",
      location: "Auckland, Nueva Zelanda"
    },
    "52": {
      title: "Taller de huertos comestibles",
      description: "Paisajista enseña a crear jardines regenerativos y mantenerlos.",
      location: "Auckland, Nueva Zelanda"
    },
    "53": {
      title: "Catering colaborativo con chef",
      description: "Cocina pop-up arma menú y equipo culinario en tiempo récord.",
      location: "Auckland, Nueva Zelanda"
    }
  },
  fr: {
    "1": {
      title: "Visite des trésors cachés d'Auckland",
      description: "Découvrez ruelles secrètes et cafés confidentiels dès votre arrivée.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "2": {
      title: "Balade d'art urbain",
      description: "Explorez les fresques avec une artiste locale qui connaît chaque anecdote.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "3": {
      title: "Interprétation pour réunions d'affaires",
      description: "Interprète certifié pour sécuriser vos échanges avec des partenaires internationaux.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "4": {
      title: "Accompagnement médical bilingue",
      description: "Traduction précise lors des rendez-vous à l'hôpital ou en clinique.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "5": {
      title: "Atelier de céramique japonaise",
      description: "Coaching pratique adapté aux débutants comme aux passionnés.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "6": {
      title: "Assistance tech d'urgence",
      description: "Expert disponible 24/7 pour mobile, ordinateur ou maison connectée.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "7": {
      title: "Organisation express d'événements",
      description: "Conférences, anniversaires ou pop-ups coordonnés de A à Z.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "8": {
      title: "Plomberie de secours",
      description: "Intervention en 30 minutes pour stopper fuites et bouchons.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "9": {
      title: "Parcours gastronomique authentique",
      description: "Dégustez des adresses cachées sélectionnées selon vos goûts.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "10": {
      title: "Workshop de stratégie",
      description: "Mentor exécutif pour affiner feuilles de route et pitch investisseurs.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "11": {
      title: "Cérémonie traditionnelle du thé",
      description: "Apprenez les rituels et la philosophie avec une maîtresse de Kyōto.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "12": {
      title: "Méditation et gestion du stress",
      description: "Séances guidées pour professionnels surmenés.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "13": {
      title: "Assistance urgente pour animaux",
      description: "Pet sitter certifié sur place en moins d'une heure pour balades ou soins.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "14": {
      title: "Garde d'enfants de dernière minute",
      description: "Garde vérifiée et habituée à tous les âges.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "15": {
      title: "Conciergerie voyage personnalisée",
      description: "Conçoit itinéraires, réservations locales et logistique en quelques heures.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "16": {
      title: "Remise en ordre du foyer en 48 h",
      description: "Home organiser rationalise placards, cuisine et paperasse en un week-end.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "17": {
      title: "Sprint dressing sur-mesure",
      description: "Styliste parcourt les boutiques et compose des tenues mix & match.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "18": {
      title: "Sauvetage d'appareils sur site",
      description: "Ingénieur hardware dépanne ordinateurs, mobiles et domotique à domicile.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "19": {
      title: "Check-up de portefeuille",
      description: "Conseiller financier analyse vos placements et propose des actions immédiates.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "20": {
      title: "Secours contractuel",
      description: "Juriste passe vos contrats en revue et traduit les risques en langage clair.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "21": {
      title: "Atelier des makers du quartier",
      description: "Partagez textile, céramique ou gravure avec des artisans locaux.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "22": {
      title: "Coaching salsa express",
      description: "Danseuse privée prépare chorégraphies pour événements ou confiance en soi.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "23": {
      title: "Sauvetage de jardin urbain",
      description: "Horticultrice redonne vie aux balcons et jardins avec plans saisonniers.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "24": {
      title: "Coach mobile de renforcement",
      description: "Trainer certifié apporte le matériel pour HIIT ou récupération ciblée.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "25": {
      title: "Laboratoire street food avec chef",
      description: "Chef local enseigne ses plats signatures chez vous ou en pop-up.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "26": {
      title: "Équipe documentaire éclair",
      description: "Duo vidéo capture votre événement et livre un montage le jour même.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "27": {
      title: "Pairing café & conversation",
      description: "Rencontrez des natifs sélectionnés pour des échanges immersifs en ville.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "28": {
      title: "Mentor STEM à la demande",
      description: "Tuteur d'excellence débloque maths et sciences en sessions ciblées.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "29": {
      title: "Visite de compagnie bienveillante",
      description: "Auxiliaire certifié assure suivi santé, courses et moments sociaux.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "30": {
      title: "Expérience VR immersive",
      description: "Laboratoire mobile apporte voyages virtuels et team building chez vous.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "31": {
      title: "Audit durabilité",
      description: "Consultant mesure votre empreinte et fournit un plan zéro déchet.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "32": {
      title: "Clinique éphémère bien-être mental",
      description: "Psychologue agréée propose des sessions pour réduire le stress et retrouver le focus.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "33": {
      title: "Refresh intérieur instantané",
      description: "Décoratrice réorganise mobilier et éclairages avec liste d'achats dédiée.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "34": {
      title: "Troupe d'animation pop-up",
      description: "Producteur réunit DJs, MCs et artistes en moins de 24 h.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "35": {
      title: "Service cadeaux sur-mesure",
      description: "Curatrice sélectionne des pièces artisanales alignées sur votre histoire.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "36": {
      title: "Plan voyage sous 48 h",
      description: "Travel planner livre un itinéraire réservable et suit les ajustements en direct.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "37": {
      title: "Studio nutrition hybride",
      description: "Nutritionniste analyse vos bilans et co-construit menus & listes de courses.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "38": {
      title: "Photographie d'aventure",
      description: "Photographe capture votre voyage et remet des images cinématographiques.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "39": {
      title: "Retraite bien-être de trois jours",
      description: "Programme tout compris mêlant yoga, méditation, randonnées et cuisine végétale.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "40": {
      title: "Résidence privée en céramique",
      description: "Cours individuels de tournage, modelage et émaillage avec pièces à emporter.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "41": {
      title: "Quartier général micro-mariage",
      description: "Wedding planner boutique sécurise lieux, prestataires et détails éclair.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "42": {
      title: "Lab d'accélération corporate",
      description: "Coach conçoit des trainings immersifs sur la direction ou le produit.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "43": {
      title: "Home staging express",
      description: "Équipe déco prépare, met en scène et organise la séance photo.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "44": {
      title: "Sprint accent & fluidité",
      description: "Linguiste bâtit un programme de 7 jours pour prononciation et aisance.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "45": {
      title: "Atelier transition de carrière",
      description: "Consultant cartographie compétences, storytelling et plan de networking.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "46": {
      title: "Plan financier pour étapes de vie",
      description: "Planner modélise épargne, fiscalité et protections pour vos décisions clés.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "47": {
      title: "Blueprint maison intelligente",
      description: "Intégrateur conçoit éclairage, climat et sécurité automatisés.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "48": {
      title: "Logistique pour nomades globaux",
      description: "Concierge gère visas, assurances et réservations multi-villes.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "49": {
      title: "Bootcamp comportemental canin",
      description: "Éducateur combine entraînements à domicile et en extérieur.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "50": {
      title: "Coaching éducatif personnalisé",
      description: "Conseillère construit des projets STEAM avec retours détaillés.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "51": {
      title: "Sécurité domestique sur mesure",
      description: "Spécialiste évalue les risques, installe capteurs et forme la famille.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "52": {
      title: "Atelier potager comestible",
      description: "Paysagiste enseigne la création et l'entretien d'un jardin régénératif.",
      location: "Auckland, Nouvelle-Zélande"
    },
    "53": {
      title: "Traiteur collaboratif avec chef",
      description: "Cuisine pop-up monte équipe et menu signature en un temps record.",
      location: "Auckland, Nouvelle-Zélande"
    }
  },
  he: {
    "1": {
      title: "סיור פנינים נסתרות באוקלנד",
      description: "גלה סמטאות ובתי קפה מקומיים כבר ביום הראשון בעיר.",
      location: "אוקלנד, ניו זילנד"
    },
    "2": {
      title: "סיור אמנות רחוב",
      description: "אמנית מקומית מובילה אותך בין קירות וצובעת את הסיפורים שמאחוריהם.",
      location: "אוקלנד, ניו זילנד"
    },
    "3": {
      title: "תרגום לפגישות עסקיות",
      description: "מתורגמן מוסמך שמבטיח שכל מילה מול שותפים גלובליים עוברת נכון.",
      location: "אוקלנד, ניו זילנד"
    },
    "4": {
      title: "מתורגמן לביקורים רפואיים",
      description: "ליווי בבית חולים כדי לוודא ששום פרט רפואי לא מתפספס.",
      location: "אוקלנד, ניו זילנד"
    },
    "5": {
      title: "סדנת קרמיקה יפנית",
      description: "לימוד מעשי מותאם למתחילים ולחובבי עיצוב.",
      location: "אוקלנד, ניו זילנד"
    },
    "6": {
      title: "סיוע טכנולוגי דחוף",
      description: "מומחה זמין לכל תקלה בטלפון, מחשב או בית חכם.",
      location: "אוקלנד, ניו זילנד"
    },
    "7": {
      title: "הפקת אירועים מיידית",
      description: "אירועים עסקיים, ימי הולדת או פופ-אפ נשלטים מקצה לקצה.",
      location: "אוקלנד, ניו זילנד"
    },
    "8": {
      title: "תיקון אינסטלציה חירום",
      description: "הגעה תוך 30 דקות לעצירת נזילות ופתיחת סתימות.",
      location: "אוקלנד, ניו זילנד"
    },
    "9": {
      title: "סיור אוכל אותנטי",
      description: "מסלול מותאם לפי הטעם שלך בין מסעדות רחוב חבויות.",
      location: "אוקלנד, ניו זילנד"
    },
    "10": {
      title: "סדנת אסטרטגיה עסקית",
      description: "מנטור בכיר שמלטש מצגות ותכניות צמיחה.",
      location: "אוקלנד, ניו זילנד"
    },
    "11": {
      title: "טקס תה יפני",
      description: "למידת פילוסופיה וטקסיות לצד מאסטרית מקיוטו.",
      location: "אוקלנד, ניו זילנד"
    },
    "12": {
      title: "מדיטציה והפגת מתחים",
      description: "מפגשים מודרכים למקצוענים שרוצים לנשום מחדש.",
      location: "אוקלנד, ניו זילנד"
    },
    "13": {
      title: "טיפול חירום לחיות מחמד",
      description: "מטפל מוסמך מגיע תוך שעה להליכה, האכלה או תרופות.",
      location: "אוקלנד, ניו זילנד"
    },
    "14": {
      title: "בייביסיטר בדקה התשעים",
      description: "מטפלת עם בדיקת רקע מלאה המתאימה לכל גיל.",
      location: "אוקלנד, ניו זילנד"
    },
    "15": {
      title: "קונסיירז' אישי לטיולים",
      description: "משרטטת מסלולים, סוגרת ספקים ומנהלת לוגיסטיקה תוך שעות.",
      location: "אוקלנד, ניו זילנד"
    },
    "16": {
      title: "ריסט לבית ב-48 שעות",
      description: "מסדרת מקצועית מטפלת בארונות, מטבח וניירת בסוף שבוע אחד.",
      location: "אוקלנד, ניו זילנד"
    },
    "17": {
      title: "ספרינט ארון קפסולה",
      description: "סטייליסטית אוצרת מראות תואמים אחרי סבב בוטיקים.",
      location: "אוקלנד, ניו זילנד"
    },
    "18": {
      title: "הצלת מכשירים עד הבית",
      description: "מהנדס חומרה פותר תקלות במחשב, טלפון ובית חכם במקום.",
      location: "אוקלנד, ניו זילנד"
    },
    "19": {
      title: "בדק פורטפוליו מהיר",
      description: "יועץ מוסמך בודק הקצאות ומציע צעדי פעולה בפגישה אחת.",
      location: "אוקלנד, ניו זילנד"
    },
    "20": {
      title: "עזרה ראשונה לחוזים",
      description: "עורכת דין קוראת מסמכים דחופים ומדגישה סיכונים בשפה פשוטה.",
      location: "אוקלנד, ניו זילנד"
    },
    "21": {
      title: "סטודיו יוצרים שכונתי",
      description: "הצטרף לאמנים מקומיים לחוויות טקסטיל, קרמיקה או הדפסה.",
      location: "אוקלנד, ניו זילנד"
    },
    "22": {
      title: "אימון סלסה מהיר",
      description: "רקדנית פרטית בונה רוטינות לאירועים, ביטחון או כושר.",
      location: "אוקלנד, ניו זילנד"
    },
    "23": {
      title: "החייאת גינה עירונית",
      description: "אדריכלית נוף מחזירה חיים למרפסות וגינות עם תכנית עונתית.",
      location: "אוקלנד, ניו זילנד"
    },
    "24": {
      title: "מאמן כוח נייד",
      description: "מאמן מוסמך מגיע עם הציוד ל-HIIT או שיקום מותאם.",
      location: "אוקלנד, ניו זילנד"
    },
    "25": {
      title: "מעבדת סטריט פוד עם שף",
      description: "שף מקומי מלמד מנות חתימה במטבח שלך או בסטודיו זמני.",
      location: "אוקלנד, ניו זילנד"
    },
    "26": {
      title: "צוות דוקו במהירות שיא",
      description: "צמד וידאו מצלם את האירוע ומוסר קליפ עוד באותו יום.",
      location: "אוקלנד, ניו זילנד"
    },
    "27": {
      title: "חיבור קפה ושיחה",
      description: "משדכים דוברי שפת אם למפגשים חווייתיים וביקור בעיר.",
      location: "אוקלנד, ניו זילנד"
    },
    "28": {
      title: "מנטור STEM זמין",
      description: "מורה עילית פותר חסמים במתמטיקה ובמדעים במפגשים מרוכזים.",
      location: "אוקלנד, ניו זילנד"
    },
    "29": {
      title: "ביקור ליווי אמפתי",
      description: "מטפל מוסמך מבצע בדיקות רווחה, סידורים וזמן חברתי.",
      location: "אוקלנד, ניו זילנד"
    },
    "30": {
      title: "חויית VR סוחפת",
      description: "מעבדת מציאות מדומה ניידת מביאה מסעות ווירטואליים וצוותי גיבוש למקום שלך.",
      location: "אוקלנד, ניו זילנד"
    },
    "31": {
      title: "בדיקת קיימות",
      description: "יועץ מודד צריכה ומציג תכנית פעולה ללא בזבוז.",
      location: "אוקלנד, ניו זילנד"
    },
    "32": {
      title: "קליניקת בריאות נפש פופ-אפ",
      description: "פסיכולוגית מוסמכת מקיימת מפגשים להורדת סטרס ולהחזרת ריכוז.",
      location: "אוקלנד, ניו זילנד"
    },
    "33": {
      title: "ריענון מיידי לעיצוב פנים",
      description: "מעצבת מסדרת את הריהוט והאור ונותנת רשימת קניות.",
      location: "אוקלנד, ניו זילנד"
    },
    "34": {
      title: "צוות בידור פופ-אפ",
      description: "מפיק מגייס DJs, מנחים ואמנים בתוך 24 שעות.",
      location: "אוקלנד, ניו זילנד"
    },
    "35": {
      title: "שירות מתנות אוצר",
      description: "אוצרת בוחרת מתנות עבודת יד שמספרות את הסיפור שלך.",
      location: "אוקלנד, ניו זילנד"
    },
    "36": {
      title: "מפת מסע ב-48 שעות",
      description: "מתכננת טיולים שולחת מסלול שניתן להזמין ועוקבת אחרי העדכונים.",
      location: "אוקלנד, ניו זילנד"
    },
    "37": {
      title: "סטודיו היברידי לתזונה",
      description: "דיאטנית מנתחת בדיקות ומבנית תפריטים ורשימות קנייה.",
      location: "אוקלנד, ניו זילנד"
    },
    "38": {
      title: "צילום סיפורי למסע",
      description: "צלם מלווה את הטיול ומוסר תמונות בסגנון קולנועי.",
      location: "אוקלנד, ניו זילנד"
    },
    "39": {
      title: "ריטריט רווחה של שלושה ימים",
      description: "חבילה מלאה של יוגה, מדיטציה, טיולים ותזונה מבוססת צומח.",
      location: "אוקלנד, ניו זילנד"
    },
    "40": {
      title: "רזידנס פרטי בקרמיקה",
      description: "שיעורים אישיים באובניים, פיסול וזיגוג עם יצירות לקחת הביתה.",
      location: "אוקלנד, ניו זילנד"
    },
    "41": {
      title: "חמל למיקרו-חתונות",
      description: "מפיקת חתונות בוטיק סוגרת לוקיישנים, ספקים ופירוט לוח זמנים בקצב מהיר.",
      location: "אוקלנד, ניו זילנד"
    },
    "42": {
      title: "מעבדת האצה לחברות",
      description: "מאמן מוביל סדנאות עומק בניהול או בפיתוח מוצר.",
      location: "אוקלנד, ניו זילנד"
    },
    "43": {
      title: "הום סטייג'ינג מהיר",
      description: "צוות עיצוב מארגן, מעצב ומכין צילום מקצועי לנכס.",
      location: "אוקלנד, ניו זילנד"
    },
    "44": {
      title: "ספרינט הגייה ושטף",
      description: "בלשנית בונה תכנית של שבוע לחידוד מבטא וביטחון בדיבור.",
      location: "אוקלנד, ניו זילנד"
    },
    "45": {
      title: "סדנת שינוי קריירה",
      description: "יועץ ממפה יכולות, סיפור אישי ואסטרטגיית נטוורקינג.",
      location: "אוקלנד, ניו זילנד"
    },
    "46": {
      title: "תכנון פיננסי לצמתי חיים",
      description: "מתכננת מדמה חסכונות, מסים והגנות לפני החלטות גדולות.",
      location: "אוקלנד, ניו זילנד"
    },
    "47": {
      title: "תכנית לבית חכם",
      description: "אינטגרטור מעצב תאורה, אקלים ואבטחה חכמים.",
      location: "אוקלנד, ניו זילנד"
    },
    "48": {
      title: "לוגיסטיקה לנומאדים גלובליים",
      description: "קונסיירז' מטפל בויזות, ביטוחים והזמנות במספר ערים.",
      location: "אוקלנד, ניו זילנד"
    },
    "49": {
      title: "מחנה לאילוף התנהגותי",
      description: "מאלף יוצר תכנית שמחברת אימונים בבית ובחוץ.",
      location: "אוקלנד, ניו זילנד"
    },
    "50": {
      title: "אימון לימודי אישי",
      description: "יועצת בונה פרויקטי STEAM עם משוב מפורט.",
      location: "אוקלנד, ניו זילנד"
    },
    "51": {
      title: "אבטחת בית מותאמת",
      description: "מומחה בוחן סיכונים, מתקין חיישנים ומדריך את המשפחה.",
      location: "אוקלנד, ניו זילנד"
    },
    "52": {
      title: "סדנת גינה אכילה",
      description: "מעצבת נוף מלמדת ליצור גן מתחדש ולתחזק אותו.",
      location: "אוקלנד, ניו זילנד"
    },
    "53": {
      title: "קייטרינג שיתופי עם שף",
      description: "מטבח פופ-אפ מגבש צוות ותפריט מקורי בזמן קצר מאוד.",
      location: "אוקלנד, ניו זילנד"
    }
  },

  mi: {
    "1": {
      title: "Auckland huna Gems Gems",
      description: "Kitea nga mea ngaro me nga tino manakohia i to ra tuatahi i te taone nui.",
            location: "Auckland, Aotearoa"
    },
    "2": {
      title: "Haereere Toi Toi Barcelona",
      description: "Kei te torotoro i nga tohu ki tetahi kaitoi o te rohe e mohio ana ki nga korero katoa kei muri i te peita.",
            location: "Auckland, Aotearoa"
    },
    "3": {
      title: "Te whakamaoritanga pakihi",
      description: "Ko te kaiwhakamaori whaimana mo nga huihuinga nui o nga huihuinga me nga hoa o te ao.",
            location: "Auckland, Aotearoa"
    },
    "4": {
      title: "Te whakamaoritanga rongoa rongoa",
      description: "He tika te whakamaarama i nga wa o te hohipera kaore e ngaro.",
            location: "Auckland, Aotearoa"
    },
    "5": {
      title: "He awheawhe popa Japanese",
      description: "Ringa-i runga i te potiki potae i hangaia ki nga timatanga me nga kaiwhaiwhai.",
            location: "Auckland, Aotearoa"
    },
    "6": {
      title: "Tautoko hangarau ohorere",
      description: "Ka karangahia te tohunga mo te waea, rorohiko pona, me nga raru ohorere ranei.",
            location: "Auckland, Aotearoa"
    },
    "7": {
      title: "Te whakamahere huihuinga mo te meneti whakamutunga",
      description: "Kamupene, whanau, ko nga pop-Up ranei e mau ana i nga haora.",
            location: "Auckland, Aotearoa"
    },
    "8": {
      title: "Te whakatikatika i nga purongo",
      description: "Aukati i nga riihi me nga clogs tere me te 30-meneti te whakamana.",
            location: "Auckland, Aotearoa"
    },
    "9": {
      title: "Haerere kai pono",
      description: "Tapahia nga kaimoana huna a Bangkok i pa ki o hiahia.",
            location: "Auckland, Aotearoa"
    },
    "10": {
      title: "Rauemi rautaki rautaki pakihi",
      description: "Kaiwhakahaere Matua mo te Whakahauhau me te Whakatikatika Whakatikatika.",
            location: "Auckland, Aotearoa"
    },
    "11": {
      title: "Hui Tapu",
      description: "A haapii i te mau faature e te mau horo'a mai i te Feeo Paster Kyoto.",
            location: "Auckland, Aotearoa"
    },
    "12": {
      title: "Te whakaaroaro me te whakaoranga ohorere",
      description: "Ko te ngakau mohio mo nga mahi pukumahi e hiahia ana ki te whakaara tere.",
            location: "Auckland, Aotearoa"
    },
    "13": {
      title: "Te tiaki mo te pepeke ohorere",
      description: "Ka tae mai te Kaitohu kua tohua i roto i te haora mo nga hikoi, me nga meds, te kai ranei.",
            location: "Auckland, Aotearoa"
    },
    "Rongo 14": {
      title: "Te raumati whakamutunga-meneti",
      description: "He pai te tiaki-tirotiro i te papamuri me nga reanga katoa.",
            location: "Auckland, Aotearoa"
    },
    "15": {
      title: "Ko te whakahoahoa haere a te tangata ake",
      description: "Whakahoahoa Whakahoahoa Whakahoahoa, whare rohe, me te whakariterite i nga takiuru i roto i nga haora.",
            location: "Auckland, Aotearoa"
    },
    "16": {
      title: "48-haora te tautuhi",
      description: "Ko nga kaiwhakawhitiwhiti ngaio e kii ana i nga kaata, ki te tunu, me nga pepa i roto i te wiki kotahi.",
            location: "Auckland, Aotearoa"
    },
    "17": {
      title: "Puta kakahu",
      description: "Ko nga Stylist Scouts Boutoques me te tuku i te whakakii i te whakakii-a-rite ki to korero.",
            location: "Auckland, Aotearoa"
    },
    "Ng 18": {
      title: "I runga i-papanga whakaora",
      description: "He raupaparorohiko raupaparorohiko raupaparorohiko raupaparorohiko raupaparorohiko, waea, me nga taputapu maamaa-kaainga i runga i te tono.",
            location: "Auckland, Aotearoa"
    },
    "19": {
      title: "Tirohia te Tirotiro Rapid",
      description: "Ka arotakehia e CFP nga waahanga mahi me nga take i roto i te huihuinga kotahi.",
            location: "Auckland, Aotearoa"
    },
    "20": {
      title: "Kirimana awhina tuatahi",
      description: "Ko nga whakaaetanga a nga roia e arotake ana i nga whakaaetanga me te whakamarama i nga haki whero i te reo maamaa.",
            location: "Auckland, Aotearoa"
    },
    "21": {
      title: "Kaihanga kaihanga takiwa",
      description: "Hono atu ki nga kaitoi a rohe mo te kakano, te miihini, te huihuinga ranei o te tukinga.",
            location: "Auckland, Aotearoa"
    },
    "22": {
      title: "Express Depalsa Coast",
      description: "Ko nga kaitakaro kanikani motuhake mo nga huihuinga, maia, he mahi ranei.",
            location: "Auckland, Aotearoa"
    },
    "23": {
      title: "Whakaora i te Kari taone",
      description: "Ko Horciulturist te whakahou i nga pakihi me nga papa me nga mahere whakato i te tau.",
            location: "Auckland, Aotearoa"
    },
    "24": {
      title: "Kaiwhakangungu kaha a te Haumaru",
      description: "Ko nga kaiwhakangungu kua tohua e kawe ana i nga taputapu mo te hii whakakakara, ki te whakaora ranei.",
            location: "Auckland, Aotearoa"
    },
    "25": {
      title: "Ko te tapanga kai o Chef-LED",
      description: "Ka whakaakohia e Chef Chef a-rohe nga rihi haina i roto i to kaihini, i te papaa-ake ranei.",
            location: "Auckland, Aotearoa"
    },
    "26": {
      title: "Nga Kura Tuarua Flash",
      description: "Ko nga mahi a te roopu e rua-a-iwi e kiriata ana me te tuku i nga ra-a-ra ano.",
            location: "Auckland, Aotearoa"
    },
    "27": {
      title: "Kawhe me te whakawhitiwhiti korero",
      description: "Me tutaki nga hoa rangatira ki nga Pakeha Kaipupuri me nga hikoi taone.",
            location: "Auckland, Aotearoa"
    },
    "28": {
      title: "Ko te kaitohutohu a Stem mo te piiraa",
      description: "Ko te kaiwhakaako o runga-tier e whakaoti ana i nga kaipupuri pāngarau me te pūtaiao i roto i nga huihuinga e arotahi ana.",
            location: "Auckland, Aotearoa"
    },
    "29": {
      title: "Whakahauhau Whanau",
      description: "Ko te kaiarahi whaimana te whakahaere i nga arowhai pai, te mahi, me te waa hapori.",
            location: "Auckland, Aotearoa"
    },
    "30": {
      title: "He Huringa VR Abr",
      description: "Ko te Lab Mobile VR e kawe mai ana i nga haerenga haerenga mariko ki nga tari, ki nga roopu ranei.",
            location: "Auckland, Aotearoa"
    },
    "31": {
      title: "Tātari Tuuturu Matua",
      description: "Te whakapiki i te whaainga Pro me te whakaora i nga huarahi kore-ururua.",
            location: "Auckland, Aotearoa"
    },
    "32": {
      title: "Ma te Mind-Up Gym",
      description: "Ka whakahaerehia e te Kaitohutohu Raihana Raihana te tere tere o nga huihuinga i runga i te papaanga, i te ipurangi ranei.",
            location: "Auckland, Aotearoa"
    },
    "33": {
      title: "He whakamahana tonu te waahi",
      description: "Ka nohoia e te kaihoahoa nga ruma me nga raarangi taputapu mo te taputapu me nga hoapaki kaihoko.",
            location: "Auckland, Aotearoa"
    },
    "34": {
      title: "Pikitia-Up Contrastment",
      description: "Ka huihui nga Kaipupuri DJs, nga kaiwhakaari, me nga rangatira iti iho i te 24 haora.",
            location: "Auckland, Aotearoa"
    },
    "35": {
      title: "Nga taonga tuku taonga a-rohe o te rohe",
      description: "Ko nga hononga honohono e kaha ana nga tohu mai i nga kaihanga e rite ana ki to korero.",
            location: "Auckland, Aotearoa"
    },
    "Awa 36": {
      title: "48-haora haerenga",
      description: "Ka hangaia e te mahere whakamaherea te tautuhi i nga pouaka whakaata me te tautoko ora mo ia ra.",
            location: "Auckland, Aotearoa"
    },
    "37": {
      title: "Studio Hauora Hauora",
      description: "Ka tātarihia e te Kaitohu Kai-a Diditian me te mahere mahere kai me te hokohoko hoko.",
            location: "Auckland, Aotearoa"
    },
    "389": {
      title: "Kōrero Kōkiri",
      description: "Ko te kaitango whakaahua te atarangi o to haerenga ki te hopu i nga huinga haerenga cinematic.",
            location: "Auckland, Aotearoa"
    },
    "39": {
      title: "3-ra Maunga Yoga Road",
      description: "Mawhiti katoa te huarahi ki te whaiwhakaaro me te whai whakaaro me nga hikoi.",
            location: "Auckland, Aotearoa"
    },
    "40": {
      title: "Restident Pootter",
      description: "Kotahi-i runga i te wa studio ki te hoahoa, maka, ka toro atu ki o waahanga ake.",
            location: "Auckland, Aotearoa"
    },
    "41": {
      title: "Pokapū whakahau marena",
      description: "Ka mau te maakete a Boutique i nga waahi, nga kaihoko, me nga tikanga i te panui poto.",
            location: "Auckland, Aotearoa"
    },
    "42": {
      title: "RAPID TOPE TIKANGA USSKIll LAB",
      description: "Ka hangaia e te kaiako hinonga nga awheawhe i whakamahia hei kaiarahi mo te kaiarahi, i nga waahanga hua ranei.",
            location: "Auckland, Aotearoa"
    },
    "43": {
      title: "Taua-wiki e huri haere ana",
      description: "Ko te Stylists Declututh, te papanga, me nga raarangi taera me te whakaahua Pro.",
            location: "Auckland, Aotearoa"
    },
    "44": {
      title: "He tapawha accent",
      description: "Ka hangaia e nga kaiwhaiwhai nga kaiwaiata e whitu-ra hei whakahou i te whakamaoritanga me te matatau.",
            location: "Auckland, Aotearoa"
    },
    "455": {
      title: "Te kaha o te mahi",
      description: "Ko nga pukenga Mahere Mahere, korero, me nga mahere a-waho i roto i te huihuinga e arotahi ana.",
            location: "Auckland, Aotearoa"
    },
    "46": {
      title: "Mahere Moni Moni",
      description: "Ko nga kaiwhakaari whakamahere, taake, me te rongoa mo nga whakataunga nui.",
            location: "Auckland, Aotearoa"
    },
    "47": {
      title: "He Maarama Home Smart",
      description: "Ko nga hoahoa a Interaitor e hono ana i te rama, te huarere, me nga ahuatanga haumaru.",
            location: "Auckland, Aotearoa"
    },
    "488": {
      title: "LOCITS NOMAD",
      description: "Ka whakahaerehia e te Kaihanga Haeretanga Visa, Inihua, me nga pukapuka maha-aukati.",
            location: "Auckland, Aotearoa"
    },
    "49": {
      title: "Whanonga tautuhi anō i te bootcamp",
      description: "Ko nga kaiwhakangungu e hoahoa ana i nga mahere-kaainga mo te awangawanga, i nga pepi kaha ranei.",
            location: "Auckland, Aotearoa"
    },
    "50": {
      title: "Kaiwhakaako Akoranga-kaupapa",
      description: "Ka hangaia e te Kaitohu te pai o nga pods Steam me te tuku urupare ahunga whakamua.",
            location: "Auckland, Aotearoa"
    },
    "51": {
      title: "Pakihi Haumaru",
      description: "Ko nga raru o nga kaitohutohu mo te kaitohutohu, ka whakauruhia nga tohu, me nga whare whakangungu.",
            location: "Auckland, Aotearoa"
    },
    "52": {
      title: "Kāhua whenua",
      description: "Ko nga mahere kaihoahoa kei te piki haere me te mahi whakangungu haere tonu.",
            location: "Auckland, Aotearoa"
    },
    "53": {
      title: "Te poipoi a te Chef Colch",
      description: "Ko te Kuki-Uptchen Co-hanga i te menus me te whakamahi i nga kaimahi mo nga kaupapa o te Boutique.",
            location: "Auckland, Aotearoa"
    }
  },};

const categoryIds = [
  "localguide",
  "translation",
  "skillteaching",
  "emergency",
  "events",
  "home",
  "foodexperience",
  "professional",
  "culturalexchange",
  "health",
  "petcare",
  "childcare",
  "travelplanning",
  "homeorg",
  "shopping",
  "techsupport",
  "financial",
  "legal",
  "artcraft",
  "musicdance",
  "gardening",
  "fitness",
  "cooking",
  "photovideo",
  "languageexchange",
  "hometutoring",
  "seniorcare",
  "vrexperience",
  "environmental",
  "mentalhealth",
  "interiordesign",
  "eventent",
  "giftservices",
  "nutritionplanning",
  "travelphotography",
  "weddingplanning",
  "corporatetraining",
  "homestaging",
  "wellnessretreats",
  "artworkshops",
  "languagelearning",
  "careercounseling",
  "financialplanning",
  "homeautomation",
  "pettraining",
  "childeducation",
  "homesecurity",
  "eventcatering"
];

const serviceCategories = [
  { id: "all", translationKey: "filter.categories.all" },
  ...categoryIds.map(categoryId => ({
    id: categoryId,
    translationKey: `filter.categories.${categoryId}`
  }))
];

const Discover: React.FC = () => {
  const { t, i18n } = useTranslation();
  const locale = resolveLocale(i18n.language);
  const { openDownloadDialog } = useDownloadDialog();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const services = useMemo(() => {
    const localizedMap = pickLocaleValue(serviceCopy, locale);
    const fallbackMap = pickLocaleValue(serviceCopy, "en");
    return baseServices.map(service => {
      const localized = localizedMap[service.id] ?? fallbackMap[service.id] ?? {
        title: service.id,
        description: "",
        location: ""
      };
      return {
        ...service,
        title: localized.title,
        description: localized.description,
        location: localized.location
      };
    });
  }, [locale]);

  const filteredServices = services.filter(service => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.categoryKey === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center">{t("discover.title")}</h1>
          <p className="text-center text-gray-600 mb-8">{t("discover.subtitle")}</p>

          <div className="space-y-6">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {serviceCategories.map(category => (
                <Badge
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`px-3 py-1 cursor-pointer ${
                    selectedCategory === category.id ? "bg-brand-teal hover:bg-brand-teal/90" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {t(category.translationKey)}
                </Badge>
              ))}
            </div>

            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map(service => (
                  <ServiceCard
                    key={service.id}
                    id={service.id}
                    title={service.title}
                    description={service.description}
                    category={t(`filter.categories.${service.categoryKey}`)}
                    price={service.price}
                    rating={service.rating}
                    location={service.location}
                    provider={service.provider}
                    imageSrc={service.imageSrc}
                    detailPath={service.detailPath}
                    onCardClick={() => openDownloadDialog(service.title)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">{t("discover.noResults")}</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <DownloadApp />
      <Footer />
    </div>
  );
};

export default Discover;
