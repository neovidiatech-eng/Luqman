import type { Property, Project, ProjectUnit, Developer, BlogPost, Testimonial, ContactRequest, Notification, SiteSettings, UserRole } from '@/lib/types';

export const mockProperties: Property[] = [
  {
    id: "prop-001",
    title: "فيلا فاخرة للبيع في الياسمين",
    type: "villa",
    status: "available",
    approvalStatus: "approved",
    price: 3200000,
    area: 450,
    bedrooms: 5,
    bathrooms: 6,
    floor: 0,
    city: "الرياض",
    district: "حي الياسمين",
    address: "طريق الملك سلمان التقاطع الأول",
    description: "فيلا بتصميم عصري وتشطيبات فاخرة جداً، تضم مسبح خاص وحديقة واسعة. موقع مميز بالقرب من جميع الخدمات والمرافق الحيوية.",
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", "https://images.unsplash.com/photo-1600607687931-cebf004f3cf0?auto=format&fit=crop&q=80&w=1200"],
    features: ["مسبح", "حديقة", "موقف سيارات", "غرفة خادمة", "تكييف مركزي"],
    featured: true,
    views: 1240,
    developerId: "dev-001",
    developerName: "شركة الأفق العقارية",
    createdAt: "2024-03-10T08:00:00Z"
  },
  {
    id: "prop-002",
    title: "شقة سكنية مؤثثة بالكامل",
    type: "apartment",
    status: "available",
    approvalStatus: "approved",
    price: 850000,
    area: 180,
    bedrooms: 3,
    bathrooms: 3,
    floor: 4,
    city: "جدة",
    district: "حي الشاطئ",
    address: "شارع الأمير سلطان",
    description: "شقة مؤثثة بأرقى الأثاث الحديث، إطلالة رائعة وموقع استراتيجي. العمارة مزودة بمسبح مشترك ونادي رياضي.",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200", "https://images.unsplash.com/photo-1502672260266-1c1de2d93688?auto=format&fit=crop&q=80&w=1200"],
    features: ["أثاث فاخر", "إطلالة بحرية", "نادي رياضي", "مسبح مشترك", "أمن 24/7"],
    featured: true,
    views: 856,
    developerId: "dev-002",
    developerName: "مجموعة المجد للتطوير",
    createdAt: "2024-03-12T10:30:00Z"
  },
  {
    id: "prop-003",
    title: "أرض تجارية على طريق الملك فهد",
    type: "commercial",
    status: "available",
    approvalStatus: "approved",
    price: 15000000,
    area: 1200,
    city: "الرياض",
    district: "حي الملقا",
    address: "طريق الملك فهد العام",
    description: "أرض تجارية بموقع استراتيجي وحيوي تصلح لبناء مقر شركة أو مجمع تجاري.",
    images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200"],
    features: ["موقع تجاري", "تصريح بناء 10 أدوار", "واجهة رئيسية"],
    featured: false,
    views: 450,
    developerId: "dev-001",
    developerName: "شركة الأفق العقارية",
    createdAt: "2024-03-15T09:15:00Z"
  },
  {
    id: "prop-004",
    title: "شاليه فاخر على البحر",
    type: "resort",
    status: "reserved",
    approvalStatus: "approved",
    price: 2500000,
    area: 300,
    bedrooms: 4,
    bathrooms: 4,
    floor: 0,
    city: "الخبر",
    district: "حي العزيزية",
    address: "طريق شاطئ نصف القمر",
    description: "شاليه بإطلالة مباشرة على البحر، مجهز بالكامل بأفضل الخدمات الترفيهية.",
    images: ["https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=1200"],
    features: ["مسبح خاص", "إطلالة مباشرة على البحر", "حديقة"],
    featured: true,
    views: 2100,
    developerId: "dev-003",
    developerName: "شركة إعمار الشرق",
    createdAt: "2024-03-01T14:20:00Z"
  },
  {
    id: "prop-005",
    title: "بنتهاوس فاخر بإطلالة بانورامية",
    type: "apartment",
    status: "available",
    approvalStatus: "approved",
    price: 4500000,
    area: 600,
    bedrooms: 5,
    bathrooms: 5,
    floor: 20,
    city: "الرياض",
    district: "حي العليا",
    address: "برج المملكة مول",
    description: "بنتهاوس مذهل بإطلالة خلابة على مدينة الرياض، تصميم داخلي فريد وأثاث من أشهر الماركات.",
    images: ["https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200"],
    features: ["إطلالة بانورامية", "مصعد خاص", "شرفة واسعة", "موقف لـ 3 سيارات"],
    featured: true,
    views: 5400,
    developerId: "dev-002",
    developerName: "مجموعة المجد للتطوير",
    createdAt: "2024-02-28T11:00:00Z"
  },
  {
    id: "prop-006",
    title: "أرض سكنية في مخطط النرجس",
    type: "land",
    status: "available",
    approvalStatus: "approved",
    price: 1200000,
    area: 600,
    city: "الرياض",
    district: "حي النرجس",
    address: "مخطط القيروان",
    description: "قطعة أرض ممتازة للبناء السكني في واحد من أرقى الأحياء الحديثة في الرياض.",
    images: ["https://images.unsplash.com/photo-1524813686514-a57563d77965?auto=format&fit=crop&q=80&w=1200"],
    features: ["مخطط معتمد", "شوارع واسعة", "قريب من مسجد"],
    featured: false,
    views: 320,
    developerId: "dev-001",
    developerName: "شركة الأفق العقارية",
    createdAt: "2024-04-01T09:00:00Z"
  }
];

export const mockProjects: Project[] = [
  {
    id: "proj-001",
    name: "برج الأفق",
    description: "برج سكني وتجاري فاخر في قلب العاصمة يضم أكثر من 120 وحدة سكنية و 5 طوابق تجارية.",
    city: "الرياض",
    status: "under_construction",
    completionPercentage: 65,
    deliveryDate: "2025-12-01",
    totalUnits: 120,
    availableUnits: 45,
    startingPrice: 1100000,
    images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"],
    features: ["نادي رياضي", "مسبح", "حضانة أطفال", "مواقف ذكية", "أمن 24 ساعة"],
    units: [
      { type: "شقة غرفة نوم واحدة", area: 85, price: 1100000, floor: 5, status: "available" },
      { type: "شقة غرفتين نوم", area: 130, price: 1600000, floor: 8, status: "reserved" },
      { type: "شقة 3 غرف نوم", area: 180, price: 2200000, floor: 12, status: "available" }
    ],
    paymentPlans: "30% دفعة أولى والباقي تقسيط على 5 سنوات",
    developerId: "dev-001",
    developerName: "شركة الأفق العقارية",
    approvalStatus: "approved",
    createdAt: "2023-11-15T00:00:00Z"
  },
  {
    id: "proj-002",
    name: "مجمع النخيل ريزيدنس",
    description: "مجمع فلل سكني متكامل الخدمات يوفر أسلوب حياة هادئ وراقي للعائلات.",
    city: "جدة",
    status: "completed",
    completionPercentage: 100,
    deliveryDate: "2024-01-01",
    totalUnits: 50,
    availableUnits: 5,
    startingPrice: 2800000,
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200"],
    features: ["حدائق عامة", "مسارات مشاة", "كلوب هاوس", "مدارس قريبة"],
    units: [
      { type: "فيلا تاون هاوس", area: 250, price: 2800000, floor: 0, status: "available" },
      { type: "فيلا مستقلة", area: 450, price: 4500000, floor: 0, status: "sold" }
    ],
    paymentPlans: "الدفع كاش أو عن طريق التمويل العقاري مع بنك الراجحي",
    developerId: "dev-002",
    developerName: "مجموعة المجد للتطوير",
    approvalStatus: "approved",
    createdAt: "2022-05-10T00:00:00Z"
  }
];

export const mockDevelopers: Developer[] = [
  {
    id: "dev-001",
    companyName: "شركة الأفق العقارية",
    email: "contact@alufuq.com",
    phone: "0501234567",
    logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=150",
    commercialRegister: "1010123456",
    accountStatus: "active",
    totalProperties: 45,
    totalViews: 15400,
    createdAt: "2020-01-15T00:00:00Z"
  },
  {
    id: "dev-002",
    companyName: "مجموعة المجد للتطوير",
    email: "info@almajddv.com",
    phone: "0559876543",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=150",
    commercialRegister: "1010654321",
    accountStatus: "active",
    totalProperties: 12,
    totalViews: 8200,
    createdAt: "2021-06-20T00:00:00Z"
  }
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: "post-001",
    slug: "real-estate-market-2024",
    title: "توقعات السوق العقاري في السعودية لعام 2024",
    excerpt: "نظرة تحليلية شاملة لاتجاهات السوق العقاري والفرص الاستثمارية الواعدة في ظل رؤية 2030.",
    content: "<p>محتوى المقال هنا...</p>",
    category: "تحليل السوق",
    image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&q=80&w=1200",
    author: "محمد عبدالله",
    publishedAt: "2024-03-25T10:00:00Z",
    readingTime: 5,
    status: "published"
  },
  {
    id: "post-002",
    slug: "how-to-choose-your-home",
    title: "5 نصائح هامة قبل شراء منزل العمر",
    excerpt: "دليلك الشامل لاختيار العقار المناسب لاحتياجاتك وتجنب الأخطاء الشائعة.",
    content: "<p>محتوى المقال هنا...</p>",
    category: "نصائح عقارية",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
    author: "سارة خالد",
    publishedAt: "2024-03-10T14:30:00Z",
    readingTime: 3,
    status: "published"
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: "test-001",
    name: "أحمد المرزوقي",
    city: "الرياض",
    text: "تجربتي مع المنصة كانت ممتازة. وجدت المنزل الذي أبحث عنه خلال أسبوع واحد فقط وبأفضل سعر.",
    rating: 5
  },
  {
    id: "test-002",
    name: "فهد الدوسري",
    city: "الدمام",
    text: "سهولة في الاستخدام وتنوع كبير في الخيارات المعروضة، أشكر القائمين على هذا العمل.",
    rating: 4
  }
];

export const mockNotifications: Notification[] = [
  {
    id: "notif-001",
    type: "approval",
    title: "تم قبول العقار",
    message: "تم مراجعة وقبول عقارك 'فيلا فاخرة في الياسمين' وهو الآن معروض للعامة.",
    propertyId: "prop-001",
    propertyTitle: "فيلا فاخرة في الياسمين",
    isRead: false,
    createdAt: "2024-04-05T09:00:00Z"
  },
  {
    id: "notif-002",
    type: "info",
    title: "تحديث النظام",
    message: "تم إضافة ميزات جديدة للوحة تحكم المطورين.",
    isRead: true,
    createdAt: "2024-04-01T12:00:00Z"
  }
];

export const mockContactRequests: ContactRequest[] = [
  {
    id: "req-001",
    name: "خالد بن الوليد",
    phone: "0551234567",
    email: "khaled@example.com",
    message: "أرغب في الاستفسار عن تفاصيل خطة الدفع لمشروع برج الأفق.",
    subject: "استفسار عن مشروع",
    propertyId: "proj-001",
    propertyTitle: "برج الأفق",
    status: "new",
    notes: "",
    createdAt: "2024-04-08T15:30:00Z"
  }
];

export const companyInfo: SiteSettings = {
  whatsapp: "966500000000",
  phone: "920000000",
  email: "info@luqmanrealestate.com",
  address: "طريق الملك فهد، العليا، الرياض",
  workingHours: "الأحد - الخميس: 9 صباحاً - 5 مساءً",
  seoTitle: "لقمان للتسويق العقاري",
  seoDescription: "المنصة الأولى للبحث عن العقارات والمشاريع في المملكة العربية السعودية",
  seoKeywords: "عقارات, السعودية, الرياض, بيع, شراء, فلل, شقق"
};

export const saudiCities = ['الرياض', 'جدة', 'الدمام', 'مكة المكرمة', 'المدينة المنورة', 'الخبر'];
export const propertyTypes = [ { value: 'apartment', label: 'شقة' }, { value: 'villa', label: 'فيلا' }, { value: 'land', label: 'أرض' }, { value: 'commercial', label: 'تجاري' } ];

export const propertyFeatures: string[] = [
  'مسبح خاص', 'موقف سيارة', 'نظام سمارت', 'حراسة أمنية',
  'حديقة', 'نادي رياضي', 'غرفة خادمة', 'تكييف مركزي',
  'مصعد', 'شرفة', 'خزائن حائط', 'منطقة ألعاب أطفال',
]

export const blogCategories: string[] = [
  'أخبار العقارات', 'نصائح للمشترين', 'ديكور وتصميم', 'تحديثات السوق', 'مقالات عامة',
]

export const mockDeveloper: Developer = mockDevelopers[0]

export const mockSiteSettings = {
  seoTitle: '????? ??????? ???????',
  seoDescription: '???? ????? ????? ??????? ???? ???? ?????? ?????? ??????????? ?? ??????? ??????? ????????.',
  seoKeywords: '??????? ????? ?????? ???? ???? ?????? ????????? ?????',
  phone: '+966500000000',
  whatsapp: '+966500000000',
  email: 'info@luqman.com',
  address: '??????? ??????? ??????? ????????',
}
