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
        const docs = await listDocuments(user.id);
        setDocuments(docs);
      } catch (err) {
        console.error("Failed to fetch documents:", err);
      } finally {
        setLoadingDocs(false);
      }
    };

    fetchDocuments();
  }, [user?.id]);

  const handleSubmit = () => {
    console.log("Upload Compliance:", compliance);
    // API call here
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-white/30 ms-6 rounded-4xl mt-10 flex flex-col gap-10">
      <div className="bg-neutral-300/20 p-10  rounded-4xl">
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Upload Compliance Rules
          </h1>
          <p className="text-gray-500 mt-2">
            Assign documents, set deadlines, and track compliance efficiently
          </p>
        </header>

        <div className="w-full mx-auto p-8 bg-white/60 rounded-4xl shadow-sm flex flex-col gap-6">
          {/* Document Selection */}
          <label className="text-gray-700 font-medium">Select Document</label>
          <input
            type="text"
            placeholder="Demo File"
            className="w-full px-4 py-3 rounded-4xl border border-white/80 focus:outline-none  text-gray-900"
          />
          {/*<option value="">
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
        </select>*/}

          {/* Deadline */}
          <label className="text-gray-700 font-medium">Deadline</label>
          <input
            type="date"
            value={compliance.deadline}
            onChange={(e) =>
              setCompliance({ ...compliance, deadline: e.target.value })
            }
            className="w-full px-4 py-3 rounded-4xl border border-white/80 focus:outline-none  text-gray-900"
          />

          {/* Status */}
          <label className="text-gray-700 font-medium">Status</label>
          <select
            value={compliance.status}
            onChange={(e) =>
              setCompliance({ ...compliance, status: e.target.value })
            }
            className="w-full px-4 py-3 rounded-4xl border border-white/80 focus:outline-none  text-gray-900"
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
            className="w-full px-4 py-3 rounded-4xl border border-white/80 focus:outline-none  text-gray-900"
          />

          {/* Remarks */}
          <label className="text-gray-700 font-medium">Remarks</label>
          <textarea
            placeholder="Remarks"
            value={compliance.remarks}
            onChange={(e) =>
              setCompliance({ ...compliance, remarks: e.target.value })
            }
            className="w-full px-4 py-3 rounded-4xl border border-white/80 focus:outline-none  text-gray-900 resize-none"
            rows={4}
          />

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="self-start px-6 py-3 bg-white/30 text-black rounded-4xl hover:bg-white/50 hover:text-black flex items-center gap-2 transition"
          >
            <UploadCloud className="w-5 h-5" />
            Submit Compliance
          </button>
        </div>
      </div>
    </div>
  );
}
