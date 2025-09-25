import React, { useState, useEffect } from "react";
import { getCompliances } from "../api/services";
import {
  AlertCircle,
  CheckCircle,
  FileText,
  Loader2,
  X,
} from "lucide-react";

const DocumentViewerPage = ({ isOpen, onClose, document, userId }) => {
  const [complianceData, setComplianceData] = useState(null);
  const [complianceLoading, setComplianceLoading] = useState(false);
  const [complianceError, setComplianceError] = useState(null);
  const [selectedComplianceDoc, setSelectedComplianceDoc] = useState(null);

  // Fetch compliance when page opens
  useEffect(() => {
    const fetchCompliance = async () => {
      if (!isOpen || !document?.id) return;
      
      setComplianceLoading(true);
      setComplianceError(null);
      setComplianceData(null);
      setSelectedComplianceDoc(null);

      try {
        const response = await getCompliances(document.id);
        setComplianceData(response);
      } catch (err) {
        console.error("Error fetching compliance:", err);
        setComplianceError("Failed to fetch compliance information");
      } finally {
        setComplianceLoading(false);
      }
    };

    fetchCompliance();
  }, [isOpen, document?.id]);

  // Reset state when page closes
  useEffect(() => {
    if (!isOpen) {
      setComplianceData(null);
      setComplianceError(null);
      setComplianceLoading(false);
      setSelectedComplianceDoc(null);
    }
  }, [isOpen]);

  // Check if the document is a PDF
  const isPDF = (doc) => doc?.url && (
    doc.url.toLowerCase().includes('.pdf') || 
    doc.url.toLowerCase().includes('pdf') ||
    doc.title?.toLowerCase().includes('.pdf')
  );

  const handleComplianceDocClick = (complianceDoc) => {
    setSelectedComplianceDoc(complianceDoc);
  };

  const handleBackToCompliance = () => {
    setSelectedComplianceDoc(null);
  };

  const renderDocumentViewer = (doc) => {
    if (isPDF(doc) && doc.url && doc.url !== "#") {
      return (
        <iframe
          src={`${doc.url}#toolbar=1&navpanes=1&scrollbar=1`}
          className="w-full h-full rounded-lg border border-gray-300"
          title={`PDF Viewer - ${doc.title}`}
        />
      );
    } else if (doc.url && doc.url !== "#") {
      return (
        <div className="h-full flex flex-col items-center justify-center space-y-4">
          <FileText className="w-16 h-16 text-gray-400" />
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              This file type cannot be previewed in the browser.
            </p>
            <button
              onClick={() => window.open(doc.url, "_blank")}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Open in New Tab
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="h-full flex items-center justify-center">
          <div className="text-center text-gray-500">
            <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p>No preview available</p>
          </div>
        </div>
      );
    }
  };

  const renderComplianceContent = () => {
    if (selectedComplianceDoc) {
      return (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">Document Details</h4>
            <div className="space-y-2 text-sm">
              <p><strong>Title:</strong> {selectedComplianceDoc.title}</p>
              <p><strong>Type:</strong> {selectedComplianceDoc.type || 'Compliance Document'}</p>
              <p><strong>Related to:</strong> {document.title}</p>
            </div>
          </div>
          
          {selectedComplianceDoc.description && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">Description</h4>
              <p className="text-gray-700 text-sm">{selectedComplianceDoc.description}</p>
            </div>
          )}
        </div>
      );
    }

    if (complianceLoading) {
      return (
        <div className="flex items-center justify-center h-32">
          <div className="flex items-center space-x-2">
            <Loader2 className="w-5 h-5 animate-spin text-green-600" />
            <span className="text-gray-600">Loading compliance...</span>
          </div>
        </div>
      );
    }

    if (complianceError) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Error</span>
          </div>
          <p className="text-red-600 text-sm mt-1">{complianceError}</p>
        </div>
      );
    }

    if (!complianceData) {
      return (
        <div className="flex items-center justify-center h-32 text-gray-500">
          <div className="text-center">
            <CheckCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No compliance data available</p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* Compliance Documents List */}
        {complianceData.documents && Array.isArray(complianceData.documents) && complianceData.documents.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-3">Related Compliance Documents</h4>
            <div className="space-y-2">
              {complianceData.documents.map((doc, index) => (
                <button
                  key={index}
                  onClick={() => handleComplianceDocClick(doc)}
                  className="w-full text-left p-3 bg-white hover:bg-blue-50 border border-blue-200 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-800 text-sm">{doc.title || `Document ${index + 1}`}</p>
                      <p className="text-blue-600 text-xs">{doc.type || 'Compliance Document'}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Compliance Status */}
        {complianceData.compliance_status && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-800 mb-2">Overall Status</h4>
            <p className="text-green-700">{complianceData.compliance_status}</p>
          </div>
        )}

        {/* Compliance Score */}
        {complianceData.compliance_score && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">Compliance Score</h4>
            <div className="flex items-center">
              <div className="flex-1 bg-blue-200 rounded-full h-2 mr-3">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${complianceData.compliance_score}%` }}
                ></div>
              </div>
              <span className="text-blue-700 font-medium">
                {complianceData.compliance_score}%
              </span>
            </div>
          </div>
        )}

        {/* Requirements */}
        {complianceData.requirements && Array.isArray(complianceData.requirements) && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-3">Requirements</h4>
            <ul className="space-y-2">
              {complianceData.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Issues or Non-compliance */}
        {complianceData.issues && Array.isArray(complianceData.issues) && complianceData.issues.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-800 mb-3">Issues Found</h4>
            <ul className="space-y-2">
              {complianceData.issues.map((issue, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span className="text-yellow-700 text-sm">{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Document Type */}
        {complianceData.document_type && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-2">Document Type</h4>
            <p className="text-gray-700">{complianceData.document_type}</p>
          </div>
        )}

        {/* Additional Information */}
        {complianceData.additional_info && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-2">Additional Information</h4>
            <p className="text-gray-700 text-sm">{complianceData.additional_info}</p>
          </div>
        )}

        {/* Fallback for unknown data structure */}
        {!complianceData.compliance_status && !complianceData.requirements && !complianceData.compliance_score && !complianceData.documents && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-2">Compliance Data</h4>
            <pre className="text-sm text-gray-700 whitespace-pre-wrap">
              {JSON.stringify(complianceData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    );
  };

  if (!isOpen || !document) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white shadow-sm">
        <div className="flex items-center space-x-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Back to Dashboard"
          >
            <X className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {selectedComplianceDoc ? selectedComplianceDoc.title : document.title}
            </h1>
            <p className="text-sm text-gray-500">
              {selectedComplianceDoc ? 
                `Compliance Document | ${document.title}` :
                `Priority: ${document.priority} | Status: ${document.marked_as_read ? "Read" : "Viewed"}`
              }
            </p>
          </div>
        </div>
        {selectedComplianceDoc && (
          <button
            onClick={handleBackToCompliance}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center space-x-2"
          >
            <FileText className="w-4 h-4" />
            <span>Back to Main Document</span>
          </button>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Side - Document Viewer */}
        <div className="flex-1 flex flex-col bg-gray-50">
          <div className="p-4 bg-white border-b border-gray-200">
            <h3 className="font-medium text-gray-800">
              {selectedComplianceDoc ? "Compliance Document Viewer" : "Main Document Viewer"}
            </h3>
          </div>
          
          <div className="flex-1 p-4">
            {renderDocumentViewer(selectedComplianceDoc || document)}
          </div>
        </div>

        {/* Right Side - Compliance Information */}
        <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h3 className="font-medium text-gray-800 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
              {selectedComplianceDoc ? "Document Info" : "Compliance Information"}
            </h3>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            {renderComplianceContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewerPage;