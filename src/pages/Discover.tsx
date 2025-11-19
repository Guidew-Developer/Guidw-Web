import React, { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import ServiceCard from "@/components/ServiceCard";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import DownloadApp from "@/components/DownloadApp";
import { useDownloadDialog } from "@/components/DownloadDialogProvider";
import { resolveLocale, type SupportedLocale } from "@/utils/locale";

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

const serviceCopy: Record<SupportedLocale, Record<string, { title: string; description: string; location: string }>> = {
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
  }
};

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

  const services = useMemo(
    () =>
      baseServices.map(service => {
        const localized = serviceCopy[locale][service.id];
        return {
          ...service,
          title: localized.title,
          description: localized.description,
          location: localized.location
        };
      }),
    [locale]
  );

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