import { ref, watch, computed } from 'vue';

export const currentLang = ref<'en' | 'ar'>('ar');

export const toggleLanguage = () => {
  currentLang.value = currentLang.value === 'en' ? 'ar' : 'en';
};

// Automatically update HTML dir and lang attributes
watch(currentLang, (lang) => {
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
  
  if (lang === 'ar') {
    document.documentElement.classList.add('lang-ar');
  } else {
    document.documentElement.classList.remove('lang-ar');
  }
}, { immediate: true });

export const translations = {
  en: {
    nav: {
      projects: 'Projects', services: 'Services', process: 'Process', about: 'About', contact: 'Contact', request: 'Request Consultation', lang: 'AR'
    },
    hero: {
      company: 'Benaa Company', title1: 'FROM VISION', title2: 'TO BUILT REALITY.', desc: 'We design, build and deliver complete architectural environments with precision, quality and engineering excellence.', explore: 'Explore Our Projects', request: 'Request a Consultation', stats: ['Projects Delivered', 'Years Experience', 'm² Built', 'Client Satisfaction']
    },
    story: [
      { id: '01', title: 'THE FOUNDATION', headline: 'EVERY PROJECT<br/>STARTS WITH A VISION.', align: 'left' },
      { id: '02', title: 'GROUNDWORK', headline: 'ENGINEERED<br/>FROM THE GROUND UP.', align: 'right' },
      { id: '03', title: 'STRUCTURAL SYSTEM', headline: 'PRECISION<br/>IN EVERY PILLAR.', align: 'left' },
      { id: '04', title: 'MEP SYSTEMS', headline: 'EVERY SYSTEM<br/>WORKS TOGETHER.', align: 'right' },
      { id: '05', title: 'ARCHITECTURAL FINISHING', headline: 'CRAFTING<br/>THE EXTERIOR.', align: 'left' },
      { id: '06', title: 'DELIVERY', headline: 'BUILT.<br/>DELIVERED.<br/>READY TO LIVE.', align: 'center' }
    ],
    about: {
      tag: 'About BENAA', title1: 'WE DON\'T JUST BUILD ', title1_sub: 'STRUCTURES.', title2: 'WE BUILD COMPLETE ', title2_sub: 'ENVIRONMENTS.', desc: 'With over 15 years of engineering excellence, we specialize in delivering high-end, turnkey architectural projects. We merge precision engineering with uncompromising quality control to transform empty land into fully realized, ready-to-live spaces.', bullets: ['Engineering Excellence', 'Strict Quality Control', 'Safety First Protocol', 'Transparent Management', 'Premium Materials', 'On-Time Delivery'], btn: 'Read Our Full Story'
    },
    services: {
      tag: 'Expertise', title: 'OUR SERVICES', desc: 'We offer a comprehensive suite of engineering and construction services, seamlessly integrated to deliver architectural excellence.', explore: 'Discover',
      items: [
        { id: '01', title: 'General Contracting', desc: 'Comprehensive construction services managing every aspect from groundwork to final delivery.' },
        { id: '02', title: 'Turnkey Construction', desc: 'Complete end-to-end solutions. You receive the keys to a fully operational building.' },
        { id: '03', title: 'Structural Engineering', desc: 'Advanced structural design ensuring maximum stability and architectural integrity.' },
        { id: '04', title: 'MEP Systems', desc: 'State-of-the-art Mechanical, Electrical, and Plumbing installations.' },
        { id: '05', title: 'Interior & Exterior', desc: 'Premium material selection and craftsmanship for breathtaking facades.' },
        { id: '06', title: 'Project Management', desc: 'Rigorous oversight and budget control ensuring seamless execution.' }
      ]
    },
    process: {
      tag: 'Timeline', title: 'CONSTRUCTION PROCESS',
      items: [
        { num: '01', title: 'Planning & Design', desc: 'Conceptualization, engineering blueprints, and obtaining permits.' },
        { num: '02', title: 'Site Preparation', desc: 'Clearing, excavation, and setting up the construction grid.' },
        { num: '03', title: 'Foundation', desc: 'Pouring structural concrete pads and underground infrastructure.' },
        { num: '04', title: 'Structural Frame', desc: 'Erecting columns, beams, and floor slabs to form the skeleton.' },
        { num: '05', title: 'MEP Installation', desc: 'Integrating Mechanical, Electrical, and Plumbing systems.' },
        { num: '06', title: 'Finishing', desc: 'Exterior cladding, interior walls, and premium surface treatments.' },
        { num: '07', title: 'Commissioning', desc: 'Rigorous testing of all systems to ensure flawless operation.' },
        { num: '08', title: 'Final Handover', desc: 'Delivering the keys to a completely finished, ready-to-use building.' }
      ]
    },
    projects: {
      tag: 'Portfolio', title: 'FEATURED PROJECTS', cats: ['All', 'Residential', 'Commercial', 'Administrative', 'Hospitality']
    },
    stats: [
      { value: '15+', label: 'YEARS OF EXPERIENCE' },
      { value: '150+', label: 'PROJECTS COMPLETED' },
      { value: '250K+', label: 'TOTAL BUILT AREA' },
      { value: '12', label: 'ACTIVE PROJECTS' }
    ],
    contact: {
      tag: 'Contact Us', title1: 'LET\'S BUILD SOMETHING', title2: 'EXCEPTIONAL.', desc: 'Ready to bring your architectural vision to life? Request a consultation with our senior engineering team.', phone: 'Phone / WhatsApp', email: 'Email', hq: 'Headquarters',
      form: { name: 'Full Name', namePl: 'John Doe', comp: 'Company', compPl: 'Your Company Ltd.', email: 'Email', emailPl: 'john@example.com', phone: 'Phone', phonePl: '+1 234 567 8900', proj: 'Project Details', projPl: 'Tell us about your project type...', btn: 'Request Consultation' }
    },
    footer: {
      desc: 'Premium general contracting and turnkey construction. Delivering architectural excellence globally.', comp: 'Company', exp: 'Expertise', news: 'Newsletter', newsDesc: 'Subscribe to receive updates on our latest projects.', emailPl: 'Email Address', rights: 'Benaa Contracting. All rights reserved.', privacy: 'Privacy Policy', terms: 'Terms of Service', final: 'The Final Masterpiece'
    }
  },
  ar: {
    nav: {
      projects: 'المشاريع', services: 'الخدمات', process: 'مراحل العمل', about: 'من نحن', contact: 'تواصل معنا', request: 'طلب استشارة', lang: 'EN'
    },
    hero: {
      company: 'شركة بناء', title1: 'من الرؤية', title2: 'إلى واقع مبني.', desc: 'نحن نصمم ونبني ونسلّم بيئات معمارية متكاملة بدقة، جودة، وتميز هندسي فائق.', explore: 'استكشف مشاريعنا', request: 'اطلب استشارة', stats: ['مشروع تم تسليمه', 'سنوات من الخبرة', 'متر مربع مبني', 'رضا العملاء']
    },
    story: [
      { id: '01', title: 'الأساسات', headline: 'كل مشروع<br/>يبدأ برؤية.', align: 'right' },
      { id: '02', title: 'الأعمال الأرضية', headline: 'هندسة دقيقة<br/>من الألف إلى الياء.', align: 'left' },
      { id: '03', title: 'النظام الإنشائي', headline: 'الدقة<br/>في كل عمود.', align: 'right' },
      { id: '04', title: 'أنظمة MEP', headline: 'كل نظام<br/>يعمل بتناغم تام.', align: 'left' },
      { id: '05', title: 'التشطيبات المعمارية', headline: 'صياغة<br/>الواجهات الخارجية.', align: 'right' },
      { id: '06', title: 'التسليم', headline: 'مبني.<br/>مُسلَّم.<br/>جاهز للسكن.', align: 'center' }
    ],
    about: {
      tag: 'عن شركة بناء', title1: 'نحن لا نبني مجرد ', title1_sub: 'هياكل.', title2: 'نحن نبني بيئات ', title2_sub: 'متكاملة.', desc: 'بخبرة هندسية تمتد لأكثر من ١٥ عاماً، نتخصص في تسليم مشاريع معمارية راقية بنظام تسليم المفتاح. نحن ندمج الهندسة الدقيقة مع الرقابة الصارمة على الجودة لنحوّل الأراضي الفارغة إلى مساحات حية وجاهزة.', bullets: ['التميز الهندسي', 'رقابة صارمة على الجودة', 'بروتوكولات الأمان أولاً', 'إدارة شفافة', 'مواد بناء فاخرة', 'التسليم في الموعد'], btn: 'اقرأ قصتنا الكاملة'
    },
    services: {
      tag: 'خبراتنا', title: 'خدماتنا', desc: 'نقدم مجموعة شاملة من الخدمات الهندسية والإنشائية المدمجة بسلاسة لتقديم تميز معماري استثنائي.', explore: 'اكتشف',
      items: [
        { id: '01', title: 'المقاولات العامة', desc: 'خدمات إنشائية شاملة تدير كل مرحلة من الأعمال الأرضية وحتى التسليم النهائي.' },
        { id: '02', title: 'تسليم المفتاح', desc: 'حلول متكاملة من البداية للنهاية. تستلم مفاتيح مبنى جاهز وعامل بالكامل.' },
        { id: '03', title: 'الهندسة الإنشائية', desc: 'تصميم إنشائي متطور يضمن أقصى درجات الاستقرار والسلامة المعمارية.' },
        { id: '04', title: 'أنظمة MEP', desc: 'أحدث التركيبات الميكانيكية، الكهربائية، وأنظمة السباكة المتقدمة.' },
        { id: '05', title: 'التشطيبات الداخلية والخارجية', desc: 'اختيار مواد فاخرة وحرفية عالية لواجهات وتصاميم تخطف الأنفاس.' },
        { id: '06', title: 'إدارة المشاريع', desc: 'إشراف دقيق وإدارة مالية لضمان تنفيذ سلس في كل مرحلة.' }
      ]
    },
    process: {
      tag: 'الجدول الزمني', title: 'مراحل البناء',
      items: [
        { num: '01', title: 'التخطيط والتصميم', desc: 'وضع المفاهيم، المخططات الهندسية، واستخراج التصاريح.' },
        { num: '02', title: 'تجهيز الموقع', desc: 'تنظيف، حفر، وتحديد شبكة البناء.' },
        { num: '03', title: 'الأساسات', desc: 'صب القواعد الخرسانية والبنية التحتية الأرضية.' },
        { num: '04', title: 'الهيكل الإنشائي', desc: 'تشييد الأعمدة والجسور والأسقف لتكوين الهيكل.' },
        { num: '05', title: 'تركيبات MEP', desc: 'دمج وتمديد الأنظمة الميكانيكية والكهربائية.' },
        { num: '06', title: 'التشطيبات', desc: 'تكسية الواجهات، الجدران الداخلية، واللمسات الفاخرة.' },
        { num: '07', title: 'الاختبار والتشغيل', desc: 'فحص صارم لجميع الأنظمة لضمان عملها بلا عيوب.' },
        { num: '08', title: 'التسليم النهائي', desc: 'تسليم المفاتيح لمبنى مكتمل وجاهز للاستخدام.' }
      ]
    },
    projects: {
      tag: 'أعمالنا', title: 'المشاريع المميزة', cats: ['الكل', 'سكني', 'تجاري', 'إداري', 'ضيافة']
    },
    stats: [
      { value: '+١٥', label: 'سنوات من الخبرة' },
      { value: '+١٥٠', label: 'مشروع منجز' },
      { value: '+٢٥٠ ألف', label: 'متر مربع مبني' },
      { value: '١٢', label: 'مشاريع جارية' }
    ],
    contact: {
      tag: 'تواصل معنا', title1: 'دعنا نبني شيئاً', title2: 'استثنائياً.', desc: 'هل أنت مستعد لتحويل رؤيتك المعمارية إلى واقع؟ اطلب استشارة مع فريقنا الهندسي.', phone: 'هاتف / واتساب', email: 'البريد الإلكتروني', hq: 'المقر الرئيسي',
      form: { name: 'الاسم الكامل', namePl: 'أحمد محمد', comp: 'الشركة', compPl: 'شركتك المحدودة', email: 'البريد', emailPl: 'ahmed@example.com', phone: 'الهاتف', phonePl: '+971 50 123 4567', proj: 'تفاصيل المشروع', projPl: 'أخبرنا عن نوع مشروعك...', btn: 'طلب استشارة' }
    },
    footer: {
      desc: 'مقاولات عامة راقية وبناء بنظام تسليم المفتاح. نقدم التميز المعماري عالمياً.', comp: 'الشركة', exp: 'الخدمات', news: 'النشرة البريدية', newsDesc: 'اشترك ليصلك جديد مشاريعنا ورؤانا المعمارية.', emailPl: 'البريد الإلكتروني', rights: 'شركة بناء للمقاولات العامه. جميع الحقوق محفوظة.', privacy: 'سياسة الخصوصية', terms: 'شروط الخدمة', final: 'التحفة النهائية'
    }
  }
};

export function useTranslation() {
  const t = computed(() => translations[currentLang.value]);
  return { t, currentLang, toggleLanguage };
}
