import { useState, useEffect } from "react";
import { listDocuments } from "../api/services";
import { useAuth } from "../context/AuthContext";
import { CheckCircle, UploadCloud } from "lucide-react";

export default function UploadCompliance() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(true);

  const [compliance, setCompliance] = useState({
    docId: "",
    deadline: "",
    status: "",
    assignedTo: "",
    remarks: "",
  });

  useEffect(() => {
    if (!user?.user_id) return;

    const fetchDocuments = async () => {
      try {
        const docs = await listDocuments(user.user_id);
        setDocuments(docs);
      } catch (err) {
        console.error("Failed to fetch documents:", err);
      } finally {
        setLoadingDocs(false);
      }
    };

    fetchDocuments();
  }, [user?.user_id]);

  const handleSubmit = () => {
    console.log("Upload Compliance:", compliance);
    // API call here
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50 rounded-2xl mt-10 flex flex-col gap-10">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Upload Compliance Rules
        </h1>
        <p className="text-gray-500 mt-2">
          Assign documents, set deadlines, and track compliance efficiently
        </p>
      </header>

      <div className="w-full mx-auto p-8 bg-white rounded-2xl shadow-lg flex flex-col gap-6">
        {/* Document Selection */}
        <label className="text-gray-700 font-medium">Select Document</label>
        <select
          value={compliance.docId}
          onChange={(e) =>
            setCompliance({ ...compliance, docId: e.target.value })
          }
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none  text-gray-900"
        >
          <option value="">
            {loadingDocs ? "Loading documents..." : "Select Document"}
          </option>
          <option value="demo-file">Demo File</option>
          {documents.length > 0
            ? documents.map((doc) => (
                <option key={doc.doc_id || doc.id} value={doc.doc_id || doc.id}>
                  {doc.title || doc.doc_id || doc.id}
                </option>
              ))
            : !loadingDocs && <option disabled>No documents found</option>}
        </select>

        {/* Deadline */}
        <label className="text-gray-700 font-medium">Deadline</label>
        <input
          type="date"
          value={compliance.deadline}
          onChange={(e) =>
            setCompliance({ ...compliance, deadline: e.target.value })
          }
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none  text-gray-900"
        />

        {/* Status */}
        <label className="text-gray-700 font-medium">Status</label>
        <select
          value={compliance.status}
          onChange={(e) =>
            setCompliance({ ...compliance, status: e.target.value })
          }
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none  text-gray-900"
        >
          <option value="">Select Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="completed">Completed</option>
        </select>

        {/* Assigned To */}
        <label className="text-gray-700 font-medium">Assigned To</label>
        <input
          type="text"
          placeholder="Assigned To"
          value={compliance.assignedTo}
          onChange={(e) =>
            setCompliance({ ...compliance, assignedTo: e.target.value })
          }
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none  text-gray-900"
        />

        {/* Remarks */}
        <label className="text-gray-700 font-medium">Remarks</label>
        <textarea
          placeholder="Remarks"
          value={compliance.remarks}
          onChange={(e) =>
            setCompliance({ ...compliance, remarks: e.target.value })
          }
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none  text-gray-900 resize-none"
          rows={4}
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="self-start px-6 py-3 bg-green-200 text-green-500 rounded-xl hover:bg-green-600 hover:text-green-200 flex items-center gap-2 transition"
        >
          <UploadCloud className="w-5 h-5" />
          Submit Compliance
        </button>
      </div>
    </div>
  );
}
