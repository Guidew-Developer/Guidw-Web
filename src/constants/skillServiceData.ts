import { pickLocaleValue, resolveLocale, type SupportedLocale } from "@/utils/locale";

export interface SkillService {
  title: string;
  description: string;
  mode: string;
  location: string;
  price: number;
  priceUnit: string;
  currencySymbol?: string;
  timeRange: string;
  highlights: string[];
  images: string[];
  provider: {
    name: string;
    avatar: string;
    rating: number;
    certifications?: string[];
    verified?: boolean;
  };
  reviews: Array<{
    user: string;
    avatar: string;
    rating: number;
    date: string;
    content: string;
  }>;
  faq?: Array<{ q: string; a: string }>;
}

const services: Partial<Record<SupportedLocale, Record<string, SkillService>>> = {
  en: {
    "39": {
      title: "Yoga & Meditation Workshop",
      description:
        "Personalized yoga and meditation sessions led by a certified instructor. Choose one-on-one coaching, group classes, or tailored mind-body programs.",
      mode: "In-person / virtual",
      location: "Auckland, Wellington",
      price: 200,
      currencySymbol: "NZ$",
      priceUnit: "per hour",
      timeRange: "Mon-Sun 8:00-20:00",
      highlights: ["Certified yoga coach", "Customized plans", "Stress relief", "Mind-body balance"],
      images: [
        "https://images.unsplash.com/photo-1545389336-cf090694435e",
        "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6",
        "https://images.unsplash.com/photo-1599447421416-3414546c2a89"
      ],
      provider: {
        name: "Coach Wang",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        rating: 4.9,
        certifications: ["Yoga Alliance Certified", "Mindfulness Instructor"],
        verified: true
      },
      reviews: [
        {
          user: "Ms. Zhang",
          avatar: "https://randomuser.me/api/portraits/women/22.jpg",
          rating: 5,
          date: "2024-03-21",
          content: "Highly professional guidance that greatly improved my sleep quality."
        },
        {
          user: "Mr. Li",
          avatar: "https://randomuser.me/api/portraits/men/54.jpg",
          rating: 4,
          date: "2024-04-11",
          content: "Patient coach and well-paced sessions. I can feel the difference."
        }
      ],
      faq: [
        { q: "What equipment do I need?", a: "Just a yoga mat and comfortable activewear. All other props are provided." },
        { q: "Is it suitable for beginners?", a: "Absolutely—the instructor tailors lessons to your level." }
      ]
    },
    "40": {
      title: "Pottery Creation Studio",
      description:
        "Hands-on pottery lessons guided by a master ceramic artist. Learn foundational techniques and design your own pieces.",
      mode: "In-person",
      location: "Christchurch",
      price: 280,
      currencySymbol: "NZ$",
      priceUnit: "per hour",
      timeRange: "Tue-Sun 10:00-18:00",
      highlights: ["Professional equipment", "Kiln firing services", "Personalized coaching", "Materials included"],
      images: [
        "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261",
        "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61",
        "https://images.unsplash.com/photo-1604242684300-b8e24fdb149c"
      ],
      provider: {
        name: "Teacher Chen",
        avatar: "https://randomuser.me/api/portraits/men/36.jpg",
        rating: 4.8,
        certifications: ["National Arts & Crafts Artist", "Pottery Education Certificate"],
        verified: true
      },
      reviews: [
        {
          user: "Ms. Wang",
          avatar: "https://randomuser.me/api/portraits/women/28.jpg",
          rating: 5,
          date: "2024-03-25",
          content: "Fantastic experience—detailed guidance and I made my first pottery piece!"
        }
      ],
      faq: [
        { q: "Can I take my work home?", a: "Yes, once it is fired you can pick it up or have it delivered." },
        { q: "Do I need to book ahead?", a: "Advance booking is recommended so we can prepare materials." }
      ]
    }
  },
  zh: {
    "39": {
      title: "瑜伽与冥想工作坊",
      description: "专业瑜伽导师带领的个性化瑜伽和冥想体验。提供一对一指导、团体课程和定制化的身心健康计划。",
      mode: "线下/线上可选",
      location: "奥克兰、惠灵顿",
      price: 200,
      currencySymbol: "NZ$",
      priceUnit: "每小时",
      timeRange: "周一至周日 8:00-20:00",
      highlights: ["专业瑜伽认证教练", "个性化课程定制", "放松减压", "身心健康提升"],
      images: [
        "https://images.unsplash.com/photo-1545389336-cf090694435e",
        "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6",
        "https://images.unsplash.com/photo-1599447421416-3414546c2a89"
      ],
      provider: {
        name: "王教练",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        rating: 4.9,
        certifications: ["国际瑜伽联盟认证", "正念冥想导师认证"],
        verified: true
      },
      reviews: [
        {
          user: "张小姐",
          avatar: "https://randomuser.me/api/portraits/women/22.jpg",
          rating: 5,
          date: "2024-03-21",
          content: "非常专业的瑜伽指导，对改善我的睡眠质量帮助很大。"
        },
        {
          user: "李先生",
          avatar: "https://randomuser.me/api/portraits/men/54.jpg",
          rating: 4,
          date: "2024-04-11",
          content: "教练很耐心，课程安排合理，身体状态有明显改善。"
        }
      ],
      faq: [
        { q: "需要准备什么装备？", a: "瑜伽垫和舒适的运动服装，其他装备现场提供。" },
        { q: "适合初学者吗？", a: "完全适合，课程会根据学员基础定制内容。" }
      ]
    },
    "40": {
      title: "陶艺创作工作室",
      description: "专业陶艺师指导的个性化陶艺课程。从基础技法到创意设计，体验手工创作的乐趣。",
      mode: "线下体验",
      location: "基督城",
      price: 280,
      currencySymbol: "NZ$",
      priceUnit: "每小时",
      timeRange: "周二至周日 10:00-18:00",
      highlights: ["专业陶艺设备", "作品烧制服务", "个性化指导", "材料提供"],
      images: [
        "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261",
        "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61",
        "https://images.unsplash.com/photo-1604242684300-b8e24fdb149c"
      ],
      provider: {
        name: "陈老师",
        avatar: "https://randomuser.me/api/portraits/men/36.jpg",
        rating: 4.8,
        certifications: ["国家级工艺美术师", "陶艺教育资格证"],
        verified: true
      },
      reviews: [
        {
          user: "王女士",
          avatar: "https://randomuser.me/api/portraits/women/28.jpg",
          rating: 5,
          date: "2024-03-25",
          content: "很棒的体验，老师教得很细致，做出了自己的第一个陶艺作品。"
        }
      ],
      faq: [
        { q: "可以带作品回家吗？", a: "可以，作品烧制后可以带回家。" },
        { q: "需要预约吗？", a: "建议提前预约，保证器材和材料准备充足。" }
      ]
    }
  },
  pt: {
    "39": {
      title: "Workshop de ioga e meditação",
      description:
        "Sessões personalizadas conduzidas por uma instrutora certificada. Escolha mentoria individual, turmas reduzidas ou programas corpo-mente sob medida.",
      mode: "Presencial / virtual",
      location: "Auckland, Wellington",
      price: 200,
      currencySymbol: "NZ$",
      priceUnit: "por hora",
      timeRange: "Seg-Dom 8h00-20h00",
      highlights: ["Coach de ioga certificada", "Planos personalizados", "Redução de estresse", "Equilíbrio corpo-mente"],
      images: [
        "https://images.unsplash.com/photo-1545389336-cf090694435e",
        "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6",
        "https://images.unsplash.com/photo-1599447421416-3414546c2a89"
      ],
      provider: {
        name: "Coach Wang",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        rating: 4.9,
        certifications: ["Yoga Alliance Certified", "Instrutora de mindfulness"],
        verified: true
      },
      reviews: [
        {
          user: "Sra. Zhang",
          avatar: "https://randomuser.me/api/portraits/women/22.jpg",
          rating: 5,
          date: "2024-03-21",
          content: "Orientação super profissional—meu sono e foco melhoraram muito."
        },
        {
          user: "Sr. Li",
          avatar: "https://randomuser.me/api/portraits/men/54.jpg",
          rating: 4,
          date: "2024-04-11",
          content: "Coach paciente, aulas bem ritmadas. Já sinto diferença no corpo."
        }
      ],
      faq: [
        { q: "Preciso de equipamentos?", a: "Somente um tapete e roupa confortável. Levamos o restante." },
        { q: "Serve para iniciantes?", a: "Sim, cada aula é adaptada ao nível e objetivos de cada pessoa." }
      ]
    },
    "40": {
      title: "Estúdio de cerâmica autoral",
      description:
        "Aulas práticas guiadas por mestre ceramista. Aprenda técnicas fundamentais e crie peças exclusivas, do design até a queima final.",
      mode: "Presencial",
      location: "Christchurch",
      price: 280,
      currencySymbol: "NZ$",
      priceUnit: "por hora",
      timeRange: "Ter-Dom 10h00-18h00",
      highlights: ["Equipamentos profissionais", "Serviço de queima em forno", "Mentoria personalizada", "Materiais incluídos"],
      images: [
        "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261",
        "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61",
        "https://images.unsplash.com/photo-1604242684300-b8e24fdb149c"
      ],
      provider: {
        name: "Professor Chen",
        avatar: "https://randomuser.me/api/portraits/men/36.jpg",
        rating: 4.8,
        certifications: ["Artista nacional de artes e ofícios", "Certificação em ensino de cerâmica"],
        verified: true
      },
      reviews: [
        {
          user: "Sra. Wang",
          avatar: "https://randomuser.me/api/portraits/women/28.jpg",
          rating: 5,
          date: "2024-03-25",
          content: "Experiência incrível—aprendi técnicas e saí com minha primeira peça finalizada!"
        }
      ],
      faq: [
        { q: "Posso levar minha peça?", a: "Sim, após a queima você retira no estúdio ou recebe em casa." },
        { q: "Preciso agendar?", a: "Recomendamos reserva antecipada para preparar materiais e forno." }
      ]
    }
  },
  es: {
    "39": {
      title: "Taller de yoga y meditación",
      description:
        "Sesiones personalizadas dirigidas por una instructora certificada. Elige coaching uno a uno, clases grupales o programas cuerpo-mente hechos a medida.",
      mode: "Presencial / virtual",
      location: "Auckland, Wellington",
      price: 200,
      currencySymbol: "NZ$",
      priceUnit: "por hora",
      timeRange: "Lun-Dom 8:00-20:00",
      highlights: ["Coach de yoga certificada", "Planes personalizados", "Alivio de estrés", "Equilibrio mente-cuerpo"],
      images: [
        "https://images.unsplash.com/photo-1545389336-cf090694435e",
        "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6",
        "https://images.unsplash.com/photo-1599447421416-3414546c2a89"
      ],
      provider: {
        name: "Coach Wang",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        rating: 4.9,
        certifications: ["Yoga Alliance Certified", "Instructora de mindfulness"],
        verified: true
      },
      reviews: [
        {
          user: "Sra. Zhang",
          avatar: "https://randomuser.me/api/portraits/women/22.jpg",
          rating: 5,
          date: "2024-03-21",
          content: "Guía muy profesional; mi sueño y niveles de estrés mejoraron notablemente."
        },
        {
          user: "Sr. Li",
          avatar: "https://randomuser.me/api/portraits/men/54.jpg",
          rating: 4,
          date: "2024-04-11",
          content: "Coach paciente y sesiones con ritmo adecuado. Ya siento el cambio."
        }
      ],
      faq: [
        { q: "¿Qué equipo necesito?", a: "Solo un mat de yoga y ropa cómoda. El resto de los props se proveen." },
        { q: "¿Es apto para principiantes?", a: "Sí, las clases se ajustan a tu nivel y objetivos." }
      ]
    },
    "40": {
      title: "Estudio de cerámica artesanal",
      description:
        "Clases prácticas guiadas por un maestro ceramista. Aprende técnicas base y diseña tus propias piezas, del boceto al esmaltado.",
      mode: "Presencial",
      location: "Christchurch",
      price: 280,
      currencySymbol: "NZ$",
      priceUnit: "por hora",
      timeRange: "Mar-Dom 10:00-18:00",
      highlights: ["Equipamiento profesional", "Servicio de horneado", "Mentoría personalizada", "Materiales incluidos"],
      images: [
        "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261",
        "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61",
        "https://images.unsplash.com/photo-1604242684300-b8e24fdb149c"
      ],
      provider: {
        name: "Profesor Chen",
        avatar: "https://randomuser.me/api/portraits/men/36.jpg",
        rating: 4.8,
        certifications: ["Artista nacional de artes y oficios", "Certificación en enseñanza de cerámica"],
        verified: true
      },
      reviews: [
        {
          user: "Sra. Wang",
          avatar: "https://randomuser.me/api/portraits/women/28.jpg",
          rating: 5,
          date: "2024-03-25",
          content: "Experiencia increíble: guía detallada y salí con mi primera pieza terminada."
        }
      ],
      faq: [
        { q: "¿Puedo llevarme mi pieza?", a: "Sí, después del horneado puedes retirarla o pedir envío." },
        { q: "¿Necesito reservar?", a: "Se recomienda reservar con anticipación para preparar materiales y el horno." }
      ]
    }
  },
  fr: {
    "39": {
      title: "Atelier yoga & méditation",
      description:
        "Séances personnalisées animées par une coach certifiée. Choisissez coaching individuel, petits groupes ou programme corps-esprit sur mesure.",
      mode: "Présentiel / virtuel",
      location: "Auckland, Wellington",
      price: 200,
      currencySymbol: "NZ$",
      priceUnit: "par heure",
      timeRange: "Lun-Dim 8h00-20h00",
      highlights: ["Coach certifiée", "Programmes personnalisés", "Gestion du stress", "Équilibre corps-esprit"],
      images: [
        "https://images.unsplash.com/photo-1545389336-cf090694435e",
        "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6",
        "https://images.unsplash.com/photo-1599447421416-3414546c2a89"
      ],
      provider: {
        name: "Coach Wang",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        rating: 4.9,
        certifications: ["Yoga Alliance Certified", "Instructrice mindfulness"],
        verified: true
      },
      reviews: [
        {
          user: "Mme Zhang",
          avatar: "https://randomuser.me/api/portraits/women/22.jpg",
          rating: 5,
          date: "2024-03-21",
          content: "Coaching très professionnel, mon sommeil et mon énergie se sont nettement améliorés."
        },
        {
          user: "M. Li",
          avatar: "https://randomuser.me/api/portraits/men/54.jpg",
          rating: 4,
          date: "2024-04-11",
          content: "Coach patiente, séances bien rythmées. Je sens déjà la différence."
        }
      ],
      faq: [
        { q: "Quel matériel prévoir ?", a: "Un tapis et une tenue confortable suffisent. Nous fournissons le reste." },
        { q: "Est-ce adapté aux débutants ?", a: "Oui, chaque session est ajustée à votre niveau et à vos objectifs." }
      ]
    },
    "40": {
      title: "Studio de céramique artisanale",
      description:
        "Cours pratiques guidés par un maître céramiste. Apprenez les techniques de base et créez vos pièces du design à l’émaillage.",
      mode: "Présentiel",
      location: "Christchurch",
      price: 280,
      currencySymbol: "NZ$",
      priceUnit: "par heure",
      timeRange: "Mar-Dim 10h00-18h00",
      highlights: ["Équipement professionnel", "Cuisson au four incluse", "Coaching personnalisé", "Matériel fourni"],
      images: [
        "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261",
        "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61",
        "https://images.unsplash.com/photo-1604242684300-b8e24fdb149c"
      ],
      provider: {
        name: "Professeur Chen",
        avatar: "https://randomuser.me/api/portraits/men/36.jpg",
        rating: 4.8,
        certifications: ["Artiste national arts & métiers", "Certificat d’enseignement céramique"],
        verified: true
      },
      reviews: [
        {
          user: "Mme Wang",
          avatar: "https://randomuser.me/api/portraits/women/28.jpg",
          rating: 5,
          date: "2024-03-25",
          content: "Expérience géniale : conseils précis et j’ai emporté ma toute première pièce terminée !"
        }
      ],
      faq: [
        { q: "Puis-je repartir avec ma pièce ?", a: "Oui, vous la récupérez après cuisson ou nous l’expédions." },
        { q: "Faut-il réserver ?", a: "Une réservation à l’avance est conseillée pour préparer matériaux et four." }
      ]
    }
  },
  he: {
    "39": {
      title: "סדנת יוגה ומדיטציה",
      description:
        "מפגשי יוגה ומדיטציה המותאמים אישית בהובלת מדריכה מוסמכת. אפשר לבחור ליווי אחד על אחד, כיתות קטנות או תוכנית גוף-נפש ייעודית.",
      mode: "פרונטלי / מקוון",
      location: "אוקלנד, וולינגטון",
      price: 200,
      currencySymbol: "NZ$",
      priceUnit: "לשעה",
      timeRange: "א'-ש' 8:00-20:00",
      highlights: ["מאמנת יוגה מוסמכת", "תוכנית מותאמת אישית", "הפחתת סטרס", "איזון גוף ונפש"],
      images: [
        "https://images.unsplash.com/photo-1545389336-cf090694435e",
        "https://images.unsplash.com/photo-1603988363607-e1e4a66962c6",
        "https://images.unsplash.com/photo-1599447421416-3414546c2a89"
      ],
      provider: {
        name: "Coach Wang",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        rating: 4.9,
        certifications: ["Yoga Alliance Certified", "Mindfulness Instructor"],
        verified: true
      },
      reviews: [
        {
          user: "גברת ג'אנג",
          avatar: "https://randomuser.me/api/portraits/women/22.jpg",
          rating: 5,
          date: "2024-03-21",
          content: "ליווי מקצועי ומרגיע שהחזיר לי שינה עמוקה אחרי כמה מפגשים."
        },
        {
          user: "מר לי",
          avatar: "https://randomuser.me/api/portraits/men/54.jpg",
          rating: 4,
          date: "2024-04-11",
          content: "קצב מדויק וסבלנות אינסופית—אני מרגיש גמישות ואנרגיה חדשות."
        }
      ],
      faq: [
        { q: "מה צריך להביא?", a: "מזרן יוגה ובגדי ספורט נוחים—שאר האביזרים מחכים בסטודיו." },
        { q: "האם זה מתאים למתחילים?", a: "כן. התרגול נבנה לפי הרמה והצרכים האישיים שלכם." }
      ]
    },
    "40": {
      title: "סטודיו ליצירת קרמיקה",
      description:
        "שיעורי חימר חווייתיים בליווי אמן קרמיקה בכיר. לומדים טכניקות בסיס, מפתחים סגנון אישי ומעצבים יצירה משלכם.",
      mode: "פרונטלי",
      location: "כרייסטצ'רץ'",
      price: 280,
      currencySymbol: "NZ$",
      priceUnit: "לשעה",
      timeRange: "ג'-א' 10:00-18:00",
      highlights: ["ציוד מקצועי מלא", "שירותי שריפה בתנור", "הדרכה צמודה", "חומרים כלולים"],
      images: [
        "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261",
        "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61",
        "https://images.unsplash.com/photo-1604242684300-b8e24fdb149c"
      ],
      provider: {
        name: "Teacher Chen",
        avatar: "https://randomuser.me/api/portraits/men/36.jpg",
        rating: 4.8,
        certifications: ["National Arts & Crafts Artist", "Pottery Education Certificate"],
        verified: true
      },
      reviews: [
        {
          user: "גברת וונג",
          avatar: "https://randomuser.me/api/portraits/women/28.jpg",
          rating: 5,
          date: "2024-03-25",
          content: "חוויה מהנה וסבלנית. יצאתי עם הכלי הקרמי הראשון שלי וגאווה גדולה."
        }
      ],
      faq: [
        { q: "אפשר לקחת את היצירה הביתה?", a: "בוודאי. לאחר השריפה תוכלו לאסוף בעצמכם או להזמין משלוח." },
        { q: "צריך להזמין מקום מראש?", a: "מומלץ לשריין מראש כדי שנכין את החומרים והציוד המתאימים." }
      ]
    }
  }
};

export const getSkillService = (language: string, id: string) => {
  const locale = resolveLocale(language);
  const localeServices = pickLocaleValue(services, locale);
  return localeServices[id] ?? services.en?.[id];
};
