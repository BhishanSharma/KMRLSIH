import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { listDocuments } from "../api/services";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

export default function ViewSummary() {
  const { t, i18n } = useTranslation();
  const [docs, setDocs] = useState([]);
  const [openDoc, setOpenDoc] = useState(null);
  const [summaries, setSummaries] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Fetch documents on mount
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await listDocuments(user.id);
        setDocs(res.data || []);
      } catch (err) {
        console.error("Error fetching docs:", err);
      }
    };
    fetchDocs();
  }, [user.id]);

  // Fetch summary for a document
  const handleToggle = async (docId) => {
    if (openDoc === docId) {
      setOpenDoc(null);
      return;
    }
    setOpenDoc(docId);

    if (!summaries[docId]) {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/documents/${docId}/summary?lang=${i18n.language}`
        );
        const data = await res.json();
        setSummaries((prev) => ({ ...prev, [docId]: data.summary }));
      } catch (err) {
        console.error("Error fetching summary:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Re-fetch open summary when language changes
  useEffect(() => {
    if (openDoc) {
      setSummaries((prev) => {
        const updated = { ...prev };
        delete updated[openDoc];
        return updated;
      });
      handleToggle(openDoc);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  // Toggle language
  const toggleLang = () => {
    const newLang = i18n.language === "en" ? "ml" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="min-h-screen bg-gray-50 rounded-2xl mt-10 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-green-500 mb-2 sm:mb-0">
            {t("documentSummaries")}
          </h1>

          {/* Language Switcher */}
          <div
            onClick={toggleLang}
            className="relative inline-flex items-center cursor-pointer w-20 h-10 bg-black rounded-full p-1"
          >
            <span
              className={`absolute left-1 w-8 h-8 bg-green-500 rounded-full shadow transform transition-transform ${
                i18n.language === "en" ? "translate-x-0" : "translate-x-10"
              }`}
            ></span>
            <span
              className={`absolute left-1 text-xs font-semibold text-white w-8 text-center ${
                i18n.language === "en" ? "opacity-100" : "opacity-100"
              }`}
            >
              En
            </span>
            <span
              className={`absolute right-1 text-xs font-semibold text-white w-8 text-center ${
                i18n.language === "ml" ? "opacity-100" : "opacity-100"
              }`}
            >
              Ml
            </span>
          </div>
        </div>

        {/* Documents Accordion */}
        <div className="space-y-4">
          {docs.length === 0 ? (
            <p className="text-green-300 text-center">{t("noDocuments")}</p>
          ) : (
            docs.map((doc) => {
              const isOpen = openDoc === doc.id;
              return (
                <div
                  key={doc.id}
                  className="rounded-xl shadow-md backdrop-blur-sm bg-white/50 border border-white/20 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => handleToggle(doc.id)}
                    className={`w-full flex justify-between items-center px-4 sm:px-5 py-3 sm:py-4 hover:bg-green-50 transition`}
                  >
                    <span className="font-medium text-green-500 text-sm sm:text-base">
                      {doc.name}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-green-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-green-500" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-3 sm:p-4 bg-white/30 text-green-500 border-t border-white/20 text-sm sm:text-base">
                      {loading && !summaries[doc.id] ? (
                        <p className="text-green-400">{t("loading")}...</p>
                      ) : (
                        <p className="whitespace-pre-line">
                          {summaries[doc.id] || t("noSummary")}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
