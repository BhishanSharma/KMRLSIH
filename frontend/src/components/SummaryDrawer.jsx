import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSummary } from "../api/services";
import { X, Loader2 } from "lucide-react";

const SummaryDrawer = ({ isOpen, onClose, docId }) => {
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch summary when drawer opens
  useEffect(() => {
    const fetchSummary = async () => {
      if (!isOpen || !docId) return;
      
      setLoading(true);
      setError(null);
      setSummaryData(null);

      try {
        const response = await getSummary(docId);
        setSummaryData(response);
      } catch (err) {
        console.error("Error fetching summary:", err);
        setError("Failed to fetch document summary");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [isOpen, docId]);

  // Reset state when drawer closes
  useEffect(() => {
    if (!isOpen) {
      setSummaryData(null);
      setError(null);
      setLoading(false);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-50/30 backdrop-blur-3xl z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-96 bg-gray-50 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-green-500">
                Document Summary
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-green-500 hover:text-green-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-green-500 mb-2">
                    <h3 className="border-b-1 mb-5">Document ID</h3>
                  </div>
                  <p className="text-gray-800">{docId}</p>
                </div>

                {/* Summary Content */}
                <div>
                  <div className="text-sm font-medium text-green-500 mb-2">
                    <h3 className="border-b-1 mb-5">Summary</h3>
                  </div>
                  <div className="border-green-200 p-4 text-green-500 rounded-lg">
                    {loading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <p className="text-green-500">Loading summary...</p>
                      </div>
                    ) : error ? (
                      <div className="text-red-500">
                        <p>⚠️ {error}</p>
                      </div>
                    ) : summaryData ? (
                      <div className="space-y-4">
                        {/* Display summary based on your API response structure */}
                        {summaryData.summary && (
                          <div>
                            <h4 className="font-semibold text-green-600 mb-2">Summary</h4>
                            <p className="text-gray-700">{summaryData.summary}</p>
                          </div>
                        )}
                        
                        {summaryData.key_points && Array.isArray(summaryData.key_points) && (
                          <div>
                            <h4 className="font-semibold text-green-600 mb-2">Key Points</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-700">
                              {summaryData.key_points.map((point, index) => (
                                <li key={index}>{point}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {summaryData.document_type && (
                          <div>
                            <h4 className="font-semibold text-green-600 mb-2">Document Type</h4>
                            <p className="text-gray-700">{summaryData.document_type}</p>
                          </div>
                        )}

                        {summaryData.compliance_status && (
                          <div>
                            <h4 className="font-semibold text-green-600 mb-2">Compliance Status</h4>
                            <p className="text-gray-700">{summaryData.compliance_status}</p>
                          </div>
                        )}

                        {/* Fallback if summaryData has different structure */}
                        {!summaryData.summary && !summaryData.key_points && (
                          <div>
                            <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                              {JSON.stringify(summaryData, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-green-500">
                        Click "Get Summary" to load document summary
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SummaryDrawer;