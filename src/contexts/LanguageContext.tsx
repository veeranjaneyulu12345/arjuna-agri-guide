import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'te' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'nav.features': 'Features',
    'nav.howItWorks': 'How It Works',
    'nav.about': 'About',
    'auth.signIn': 'Sign In',
    'auth.getStarted': 'Get Started',
    
    // Hero
    'hero.badge': 'Agricultural Research Platform',
    'hero.title1': 'Transform Your',
    'hero.title2': 'Agricultural Research',
    'hero.title3': 'with Data-Driven Insights',
    'hero.description': 'Harness the power of advanced analytics and AI to optimize crop yields, predict weather patterns, and make informed decisions for sustainable farming practices.',
    'hero.cta1': 'Start Your Research',
    'hero.cta2': 'Watch Demo',
    'hero.stat1.value': '50K+',
    'hero.stat1.label': 'Research Studies',
    'hero.stat2.value': '98%',
    'hero.stat2.label': 'Accuracy Rate',
    'hero.stat3.value': '120+',
    'hero.stat3.label': 'Countries',
    
    // Features
    'features.badge': 'Features',
    'features.title1': 'Everything You Need for',
    'features.title2': 'Agricultural Excellence',
    'features.description': 'Our comprehensive platform provides all the tools and insights needed to revolutionize your agricultural research and farming practices.',
    'features.research.title': 'Advanced Research Tools',
    'features.research.description': 'Access powerful analytics and research methodologies designed specifically for agricultural studies.',
    'features.data.title': 'Data-Driven Insights',
    'features.data.description': 'Transform raw agricultural data into actionable recommendations with our AI-powered analysis engine.',
    'features.weather.title': 'Weather Integration',
    'features.weather.description': 'Real-time weather data integration to optimize planting, irrigation, and harvesting schedules.',
    'features.soil.title': 'Soil Mapping',
    'features.soil.description': 'Comprehensive soil analysis and mapping to understand nutrient levels and optimize crop selection.',
    'features.sustainable.title': 'Sustainable Practices',
    'features.sustainable.description': 'Evidence-based recommendations for sustainable farming that protect the environment while maximizing yield.',
    'features.monitoring.title': 'Real-Time Monitoring',
    'features.monitoring.description': 'Monitor crop health, growth patterns, and potential issues with instant alerts and notifications.',
    
    // Weather
    'weather.title': 'Current Weather',
    'weather.loading': 'Loading weather...',
    'weather.error': 'Unable to load weather',
    'weather.enableLocation': 'Enable location to see weather',
    'weather.humidity': 'Humidity',
    'weather.wind': 'Wind',
    
    // How It Works
    'howItWorks.badge': 'How It Works',
    'howItWorks.title1': 'Simple Steps to',
    'howItWorks.title2': 'Better Farming',
    'howItWorks.step1.title': 'Input Your Data',
    'howItWorks.step1.description': 'Enter your farm details, crop types, soil conditions, and historical data into our intuitive platform.',
    'howItWorks.step2.title': 'AI Analysis',
    'howItWorks.step2.description': 'Our advanced algorithms analyze your data against millions of research points to generate insights.',
    'howItWorks.step3.title': 'Get Recommendations',
    'howItWorks.step3.description': 'Receive personalized, actionable recommendations to optimize your farming practices and maximize yields.',
    
    // About
    'about.badge': 'About Us',
    'about.title1': 'Empowering Farmers with',
    'about.title2': 'Scientific Research',
    'about.description': 'At Arjuna Agri, we believe that every farmer deserves access to cutting-edge agricultural research. Our mission is to bridge the gap between scientific innovation and practical farming.',
    'about.stat1.value': '10M+',
    'about.stat1.label': 'Data Points Analyzed',
    'about.stat2.value': '500+',
    'about.stat2.label': 'Research Partners',
    'about.stat3.value': '25+',
    'about.stat3.label': 'Years Experience',
    
    // CTA
    'cta.title1': 'Ready to Transform Your',
    'cta.title2': 'Agricultural Research?',
    'cta.description': 'Join thousands of researchers and farmers who are already using Arjuna Agri to make data-driven decisions.',
    'cta.button': 'Get Started Free',
    'cta.note': 'No credit card required • Free 30-day trial',
    
    // Footer
    'footer.description': 'Empowering farmers and researchers with data-driven agricultural insights for a sustainable future.',
    'footer.product': 'Product',
    'footer.company': 'Company',
    'footer.legal': 'Legal',
    'footer.pricing': 'Pricing',
    'footer.integrations': 'Integrations',
    'footer.api': 'API',
    'footer.documentation': 'Documentation',
    'footer.blog': 'Blog',
    'footer.careers': 'Careers',
    'footer.contact': 'Contact',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.cookies': 'Cookie Policy',
    'footer.copyright': '© 2024 Arjuna Agri. All rights reserved.',
  },
  te: {
    // Header
    'nav.features': 'ఫీచర్లు',
    'nav.howItWorks': 'ఎలా పని చేస్తుంది',
    'nav.about': 'మా గురించి',
    'auth.signIn': 'సైన్ ఇన్',
    'auth.getStarted': 'ప్రారంభించండి',
    
    // Hero
    'hero.badge': 'వ్యవసాయ పరిశోధన వేదిక',
    'hero.title1': 'మీ వ్యవసాయ',
    'hero.title2': 'పరిశోధనను మార్చండి',
    'hero.title3': 'డేటా-ఆధారిత అంతర్దృష్టులతో',
    'hero.description': 'పంట దిగుబడిని ఆప్టిమైజ్ చేయడానికి, వాతావరణ నమూనాలను అంచనా వేయడానికి మరియు స్థిరమైన వ్యవసాయ పద్ధతుల కోసం సమాచారంతో నిర్ణయాలు తీసుకోవడానికి అధునాతన విశ్లేషణలు మరియు AI శక్తిని ఉపయోగించండి.',
    'hero.cta1': 'మీ పరిశోధన ప్రారంభించండి',
    'hero.cta2': 'డెమో చూడండి',
    'hero.stat1.value': '50వేలు+',
    'hero.stat1.label': 'పరిశోధన అధ్యయనాలు',
    'hero.stat2.value': '98%',
    'hero.stat2.label': 'ఖచ్చితత్వ రేటు',
    'hero.stat3.value': '120+',
    'hero.stat3.label': 'దేశాలు',
    
    // Features
    'features.badge': 'ఫీచర్లు',
    'features.title1': 'వ్యవసాయ ఉత్కృష్టత కోసం',
    'features.title2': 'మీకు కావలసినవన్నీ',
    'features.description': 'మీ వ్యవసాయ పరిశోధన మరియు వ్యవసాయ పద్ధతులను విప్లవాత్మకంగా మార్చడానికి అవసరమైన అన్ని సాధనాలు మరియు అంతర్దృష్టులను మా సమగ్ర వేదిక అందిస్తుంది.',
    'features.research.title': 'అధునాతన పరిశోధన సాధనాలు',
    'features.research.description': 'వ్యవసాయ అధ్యయనాల కోసం ప్రత్యేకంగా రూపొందించిన శక్తివంతమైన విశ్లేషణలు మరియు పరిశోధన పద్ధతులను యాక్సెస్ చేయండి.',
    'features.data.title': 'డేటా-ఆధారిత అంతర్దృష్టులు',
    'features.data.description': 'మా AI-ఆధారిత విశ్లేషణ ఇంజిన్‌తో ముడి వ్యవసాయ డేటాను చర్య తీసుకోదగిన సిఫార్సులుగా మార్చండి.',
    'features.weather.title': 'వాతావరణ ఏకీకరణ',
    'features.weather.description': 'నాటడం, నీటిపారుదల మరియు కోత షెడ్యూల్‌లను ఆప్టిమైజ్ చేయడానికి నిజ-సమయ వాతావరణ డేటా ఏకీకరణ.',
    'features.soil.title': 'నేల మ్యాపింగ్',
    'features.soil.description': 'పోషక స్థాయిలను అర్థం చేసుకోవడానికి మరియు పంట ఎంపికను ఆప్టిమైజ్ చేయడానికి సమగ్ర నేల విశ్లేషణ మరియు మ్యాపింగ్.',
    'features.sustainable.title': 'స్థిరమైన పద్ధతులు',
    'features.sustainable.description': 'దిగుబడిని గరిష్టంగా పెంచుతూ పర్యావరణాన్ని రక్షించే స్థిరమైన వ్యవసాయం కోసం సాక్ష్యం-ఆధారిత సిఫార్సులు.',
    'features.monitoring.title': 'నిజ-సమయ పర్యవేక్షణ',
    'features.monitoring.description': 'తక్షణ హెచ్చరికలు మరియు నోటిఫికేషన్‌లతో పంట ఆరోగ్యం, పెరుగుదల నమూనాలు మరియు సంభావ్య సమస్యలను పర్యవేక్షించండి.',
    
    // Weather
    'weather.title': 'ప్రస్తుత వాతావరణం',
    'weather.loading': 'వాతావరణం లోడ్ అవుతోంది...',
    'weather.error': 'వాతావరణం లోడ్ చేయడం సాధ్యం కాలేదు',
    'weather.enableLocation': 'వాతావరణం చూడటానికి స్థానాన్ని ప్రారంభించండి',
    'weather.humidity': 'తేమ',
    'weather.wind': 'గాలి',
    
    // How It Works
    'howItWorks.badge': 'ఎలా పని చేస్తుంది',
    'howItWorks.title1': 'మెరుగైన వ్యవసాయం కోసం',
    'howItWorks.title2': 'సరళమైన దశలు',
    'howItWorks.step1.title': 'మీ డేటాను నమోదు చేయండి',
    'howItWorks.step1.description': 'మా సహజమైన వేదికలో మీ పొలం వివరాలు, పంట రకాలు, నేల పరిస్థితులు మరియు చారిత్రక డేటాను నమోదు చేయండి.',
    'howItWorks.step2.title': 'AI విశ్లేషణ',
    'howItWorks.step2.description': 'మా అధునాతన అల్గారిథమ్‌లు అంతర్దృష్టులను ఉత్పత్తి చేయడానికి మిలియన్ల పరిశోధన పాయింట్ల వ్యతిరేకంగా మీ డేటాను విశ్లేషిస్తాయి.',
    'howItWorks.step3.title': 'సిఫార్సులు పొందండి',
    'howItWorks.step3.description': 'మీ వ్యవసాయ పద్ధతులను ఆప్టిమైజ్ చేయడానికి మరియు దిగుబడిని గరిష్టంగా పెంచడానికి వ్యక్తిగతీకరించిన, చర్య తీసుకోదగిన సిఫార్సులను స్వీకరించండి.',
    
    // About
    'about.badge': 'మా గురించి',
    'about.title1': 'శాస్త్రీయ పరిశోధనతో',
    'about.title2': 'రైతులను సాధికారత చేయడం',
    'about.description': 'అర్జున అగ్రిలో, ప్రతి రైతుకు అధునాతన వ్యవసాయ పరిశోధనకు ప్రాప్యత ఉండాలని మేము నమ్ముతున్నాము. శాస్త్రీయ ఆవిష్కరణ మరియు ఆచరణాత్మక వ్యవసాయం మధ్య అంతరాన్ని తగ్గించడం మా లక్ష్యం.',
    'about.stat1.value': '1కోటి+',
    'about.stat1.label': 'విశ్లేషించిన డేటా పాయింట్లు',
    'about.stat2.value': '500+',
    'about.stat2.label': 'పరిశోధన భాగస్వాములు',
    'about.stat3.value': '25+',
    'about.stat3.label': 'సంవత్సరాల అనుభవం',
    
    // CTA
    'cta.title1': 'మీ వ్యవసాయ పరిశోధనను',
    'cta.title2': 'మార్చడానికి సిద్ధంగా ఉన్నారా?',
    'cta.description': 'డేటా-ఆధారిత నిర్ణయాలు తీసుకోవడానికి అర్జున అగ్రిని ఇప్పటికే ఉపయోగిస్తున్న వేలాది పరిశోధకులు మరియు రైతులతో చేరండి.',
    'cta.button': 'ఉచితంగా ప్రారంభించండి',
    'cta.note': 'క్రెడిట్ కార్డ్ అవసరం లేదు • 30-రోజుల ఉచిత ట్రయల్',
    
    // Footer
    'footer.description': 'స్థిరమైన భవిష్యత్తు కోసం డేటా-ఆధారిత వ్యవసాయ అంతర్దృష్టులతో రైతులు మరియు పరిశోధకులను సాధికారత చేయడం.',
    'footer.product': 'ఉత్పత్తి',
    'footer.company': 'కంపెనీ',
    'footer.legal': 'చట్టపరమైన',
    'footer.pricing': 'ధరలు',
    'footer.integrations': 'ఇంటిగ్రేషన్లు',
    'footer.api': 'API',
    'footer.documentation': 'డాక్యుమెంటేషన్',
    'footer.blog': 'బ్లాగ్',
    'footer.careers': 'కెరీర్లు',
    'footer.contact': 'సంప్రదించండి',
    'footer.privacy': 'గోప్యతా విధానం',
    'footer.terms': 'సేవా నిబంధనలు',
    'footer.cookies': 'కుకీ విధానం',
    'footer.copyright': '© 2024 అర్జున అగ్రి. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.',
  },
  hi: {
    // Header
    'nav.features': 'विशेषताएं',
    'nav.howItWorks': 'कैसे काम करता है',
    'nav.about': 'हमारे बारे में',
    'auth.signIn': 'साइन इन',
    'auth.getStarted': 'शुरू करें',
    
    // Hero
    'hero.badge': 'कृषि अनुसंधान मंच',
    'hero.title1': 'अपने कृषि',
    'hero.title2': 'अनुसंधान को बदलें',
    'hero.title3': 'डेटा-आधारित अंतर्दृष्टि के साथ',
    'hero.description': 'फसल उत्पादन को अनुकूलित करने, मौसम पैटर्न की भविष्यवाणी करने और टिकाऊ कृषि प्रथाओं के लिए सूचित निर्णय लेने के लिए उन्नत विश्लेषण और AI की शक्ति का उपयोग करें।',
    'hero.cta1': 'अपना अनुसंधान शुरू करें',
    'hero.cta2': 'डेमो देखें',
    'hero.stat1.value': '50 हज़ार+',
    'hero.stat1.label': 'अनुसंधान अध्ययन',
    'hero.stat2.value': '98%',
    'hero.stat2.label': 'सटीकता दर',
    'hero.stat3.value': '120+',
    'hero.stat3.label': 'देश',
    
    // Features
    'features.badge': 'विशेषताएं',
    'features.title1': 'कृषि उत्कृष्टता के लिए',
    'features.title2': 'आपको जो कुछ भी चाहिए',
    'features.description': 'हमारा व्यापक मंच आपके कृषि अनुसंधान और खेती की प्रथाओं में क्रांति लाने के लिए आवश्यक सभी उपकरण और अंतर्दृष्टि प्रदान करता है।',
    'features.research.title': 'उन्नत अनुसंधान उपकरण',
    'features.research.description': 'विशेष रूप से कृषि अध्ययनों के लिए डिज़ाइन की गई शक्तिशाली विश्लेषण और अनुसंधान पद्धतियों तक पहुँचें।',
    'features.data.title': 'डेटा-आधारित अंतर्दृष्टि',
    'features.data.description': 'हमारे AI-संचालित विश्लेषण इंजन के साथ कच्चे कृषि डेटा को कार्रवाई योग्य सिफारिशों में बदलें।',
    'features.weather.title': 'मौसम एकीकरण',
    'features.weather.description': 'रोपण, सिंचाई और कटाई कार्यक्रम को अनुकूलित करने के लिए वास्तविक समय मौसम डेटा एकीकरण।',
    'features.soil.title': 'मिट्टी मानचित्रण',
    'features.soil.description': 'पोषक तत्वों के स्तर को समझने और फसल चयन को अनुकूलित करने के लिए व्यापक मिट्टी विश्लेषण और मानचित्रण।',
    'features.sustainable.title': 'टिकाऊ प्रथाएं',
    'features.sustainable.description': 'उपज को अधिकतम करते हुए पर्यावरण की रक्षा करने वाली टिकाऊ खेती के लिए साक्ष्य-आधारित सिफारिशें।',
    'features.monitoring.title': 'वास्तविक समय निगरानी',
    'features.monitoring.description': 'तत्काल अलर्ट और सूचनाओं के साथ फसल स्वास्थ्य, विकास पैटर्न और संभावित मुद्दों की निगरानी करें।',
    
    // Weather
    'weather.title': 'वर्तमान मौसम',
    'weather.loading': 'मौसम लोड हो रहा है...',
    'weather.error': 'मौसम लोड करने में असमर्थ',
    'weather.enableLocation': 'मौसम देखने के लिए स्थान सक्षम करें',
    'weather.humidity': 'नमी',
    'weather.wind': 'हवा',
    
    // How It Works
    'howItWorks.badge': 'कैसे काम करता है',
    'howItWorks.title1': 'बेहतर खेती के लिए',
    'howItWorks.title2': 'सरल कदम',
    'howItWorks.step1.title': 'अपना डेटा दर्ज करें',
    'howItWorks.step1.description': 'हमारे सहज मंच में अपने खेत का विवरण, फसल प्रकार, मिट्टी की स्थिति और ऐतिहासिक डेटा दर्ज करें।',
    'howItWorks.step2.title': 'AI विश्लेषण',
    'howItWorks.step2.description': 'हमारे उन्नत एल्गोरिदम अंतर्दृष्टि उत्पन्न करने के लिए लाखों अनुसंधान बिंदुओं के खिलाफ आपके डेटा का विश्लेषण करते हैं।',
    'howItWorks.step3.title': 'सिफारिशें प्राप्त करें',
    'howItWorks.step3.description': 'अपनी खेती की प्रथाओं को अनुकूलित करने और उपज को अधिकतम करने के लिए व्यक्तिगत, कार्रवाई योग्य सिफारिशें प्राप्त करें।',
    
    // About
    'about.badge': 'हमारे बारे में',
    'about.title1': 'वैज्ञानिक अनुसंधान के साथ',
    'about.title2': 'किसानों को सशक्त बनाना',
    'about.description': 'अर्जुन एग्री में, हम मानते हैं कि हर किसान को अत्याधुनिक कृषि अनुसंधान तक पहुंच होनी चाहिए। हमारा मिशन वैज्ञानिक नवाचार और व्यावहारिक खेती के बीच की खाई को पाटना है।',
    'about.stat1.value': '1 करोड़+',
    'about.stat1.label': 'विश्लेषित डेटा बिंदु',
    'about.stat2.value': '500+',
    'about.stat2.label': 'अनुसंधान भागीदार',
    'about.stat3.value': '25+',
    'about.stat3.label': 'वर्षों का अनुभव',
    
    // CTA
    'cta.title1': 'अपने कृषि अनुसंधान को',
    'cta.title2': 'बदलने के लिए तैयार हैं?',
    'cta.description': 'हजारों शोधकर्ताओं और किसानों से जुड़ें जो पहले से ही डेटा-आधारित निर्णय लेने के लिए अर्जुन एग्री का उपयोग कर रहे हैं।',
    'cta.button': 'मुफ्त में शुरू करें',
    'cta.note': 'क्रेडिट कार्ड की आवश्यकता नहीं • 30-दिन का मुफ्त परीक्षण',
    
    // Footer
    'footer.description': 'एक टिकाऊ भविष्य के लिए डेटा-आधारित कृषि अंतर्दृष्टि के साथ किसानों और शोधकर्ताओं को सशक्त बनाना।',
    'footer.product': 'उत्पाद',
    'footer.company': 'कंपनी',
    'footer.legal': 'कानूनी',
    'footer.pricing': 'मूल्य निर्धारण',
    'footer.integrations': 'एकीकरण',
    'footer.api': 'API',
    'footer.documentation': 'दस्तावेज़ीकरण',
    'footer.blog': 'ब्लॉग',
    'footer.careers': 'करियर',
    'footer.contact': 'संपर्क करें',
    'footer.privacy': 'गोपनीयता नीति',
    'footer.terms': 'सेवा की शर्तें',
    'footer.cookies': 'कुकी नीति',
    'footer.copyright': '© 2024 अर्जुन एग्री। सर्वाधिकार सुरक्षित।',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
