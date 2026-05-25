import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      appName: 'KrishiRakshak AI',
      heroTagline: 'AI-Powered Crop Disease Detection & Smart Farming Assistant',
      uploadLeaf: 'Upload Leaf Image',
      exploreFeatures: 'Explore Features',
      nav: {
        home: 'Home',
        detection: 'Disease Detection',
        dashboard: 'Dashboard',
        reports: 'Reports',
        weather: 'Weather Alerts',
        schemes: 'Government Schemes',
        chatbot: 'Chatbot',
        login: 'Login/Register',
      },
    },
  },
  hi: {
    translation: {
      appName: 'कृषि रक्षक AI',
      heroTagline: 'AI-संचालित फसल रोग पहचान और स्मार्ट खेती सहायक',
      uploadLeaf: 'पत्ती की तस्वीर अपलोड करें',
      exploreFeatures: 'सुविधाएं देखें',
      nav: {
        home: 'होम',
        detection: 'रोग पहचान',
        dashboard: 'डैशबोर्ड',
        reports: 'रिपोर्ट',
        weather: 'मौसम अलर्ट',
        schemes: 'सरकारी योजनाएं',
        chatbot: 'चैटबॉट',
        login: 'लॉगिन/रजिस्टर',
      },
    },
  },
  mr: {
    translation: {
      appName: 'कृषी रक्षक AI',
      heroTagline: 'AI आधारित पीक रोग निदान आणि स्मार्ट शेती सहाय्यक',
      uploadLeaf: 'पानाचा फोटो अपलोड करा',
      exploreFeatures: 'वैशिष्ट्ये पहा',
      nav: {
        home: 'मुख्यपृष्ठ',
        detection: 'रोग निदान',
        dashboard: 'डॅशबोर्ड',
        reports: 'अहवाल',
        weather: 'हवामान सूचना',
        schemes: 'सरकारी योजना',
        chatbot: 'चॅटबॉट',
        login: 'लॉगिन/नोंदणी',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
