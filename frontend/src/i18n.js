// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Translation resources
const resources = {
  en: {
    translation: {
      documentSummaries: "Document Summaries",
      noDocuments: "No documents available",
      loading: "Loading...",
      noSummary: "No summary available",
    },
  },
  ml: {
    translation: {
      documentSummaries: "ഡോക്യുമെന്റ് സംഗ്രഹങ്ങൾ",
      noDocuments: "പ്രമാണങ്ങൾ ലഭ്യമല്ല",
      loading: "ലോഡിംഗ്...",
      noSummary: "സംഗ്രഹം ലഭ്യമല്ല",
    },
  },
};

i18n
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React already escapes
    },
  });

export default i18n;
