import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { FileText, Search, Filter, Eye, Download } from "lucide-react";

function RecentDocuments() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadProgress, setUploadProgress] = useState({});

  // Static files
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: "Safety Directive - Track Maintenance.pdf",
      type: "pdf",
      size: "2.4 MB",
      uploadDate: "2025-01-15",
      status: "processed",
      priority: "urgent",
      department: "Safety",
      summary:
        "Critical safety protocols for track maintenance during operational hours...",
    },
    {
      id: 2,
      name: "Procurement Guidelines 2025.docx",
      type: "doc",
      size: "1.2 MB",
      uploadDate: "2025-01-14",
      status: "processing",
      priority: "medium",
      department: "Procurement",
      summary:
        "Updated procurement guidelines and vendor evaluation criteria...",
    },
  ]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-400";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "processed":
        return "text-green-700 bg-green-100";
      case "processing":
        return "text-yellow-700 bg-yellow-100";
      case "uploading":
        return "text-blue-700 bg-blue-100";
      case "error":
        return "text-red-700 bg-red-100";
      default:
        return "text-gray-700 bg-gray-100";
    }
  };

  const filteredFiles = uploadedFiles.filter(
    (file) =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-primary">
          {t.recentDocuments}
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
          <input
            type="text"
            placeholder={t.searchDocuments}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition w-full sm:w-auto"
          />
          <button className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition">
            <Filter size={16} />
            {t.filter}
          </button>
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {filteredFiles.length === 0 ? (
          <div className="text-center py-12 text-neutral-500">
            <FileText size={48} className="mx-auto mb-4 text-neutral-300" />
            <p>{t.noDocuments}</p>
          </div>
        ) : (
          filteredFiles.map((file) => (
            <div
              key={file.id}
              className="border border-neutral-200 rounded-lg p-4 hover:shadow-lg transition-shadow flex flex-col lg:flex-row gap-4 lg:gap-6"
            >
              {/* Left: File Info */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-3 h-3 rounded-full mt-2 ${getPriorityColor(
                      file.priority
                    )}`}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-primary truncate">
                      {file.name}
                    </h3>
                    <p className="text-sm text-neutral-600 mt-1 line-clamp-2">
                      {file.summary}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-neutral-500 flex-wrap">
                      <span>{file.size}</span>
                      <span>{file.uploadDate}</span>
                      <span className="capitalize">{file.department}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Status & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-3 lg:mt-0">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    file.status
                  )}`}
                >
                  {t[file.status] || file.status}
                </span>

                {uploadProgress[file.id] !== undefined && (
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-28 h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all duration-300"
                        style={{ width: `${uploadProgress[file.id]}%` }}
                      />
                    </div>
                    <span className="text-xs text-neutral-500 whitespace-nowrap">
                      {uploadProgress[file.id]}%
                    </span>
                  </div>
                )}

                <div className="flex gap-2">
                  <button
                    className="p-2 hover:bg-neutral-100 rounded-lg transition-colors disabled:cursor-not-allowed"
                    disabled={
                      file.status === "uploading" || file.status === "error"
                    }
                    aria-label={t.view}
                  >
                    <Eye
                      size={16}
                      className={
                        file.status === "uploading" || file.status === "error"
                          ? "text-neutral-300"
                          : "text-neutral-600"
                      }
                    />
                  </button>
                  <button
                    className="p-2 hover:bg-neutral-100 rounded-lg transition-colors disabled:cursor-not-allowed"
                    disabled={
                      file.status === "uploading" || file.status === "error"
                    }
                    aria-label={t.download}
                  >
                    <Download
                      size={16}
                      className={
                        file.status === "uploading" || file.status === "error"
                          ? "text-neutral-300"
                          : "text-neutral-600"
                      }
                    />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecentDocuments;
