import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { uploadFile } from "../api/services";

const departmentsList = [
  "Engineering",
  "Procurement",
  "HR",
  "Finance",
  "Legal & Compliance",
];

function UploadDocPage() {
  const { user } = useAuth();
  const [priority, setPriority] = useState("normal");
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleDepartmentChange = (dept) => {
    setSelectedDepartments((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
    );
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) return alert("Please select a file first!");
    if (!selectedDepartments.length)
      return alert("Please select at least one department!");
    if (!user?.id) return alert("User not authenticated!");

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/webp",
    ];
    const allowedExtensions =
      /\.(pdf|doc|docx|xls|xlsx|jpg|jpeg|png|gif|bmp|webp)$/i;
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (
      !allowedTypes.includes(selectedFile.type) &&
      !allowedExtensions.test(selectedFile.name)
    )
      return alert(`Unsupported file: ${selectedFile.name}`);
    if (selectedFile.size > maxSize)
      return alert(`File too large: ${selectedFile.name} (Max 10MB)`);

    setIsLoading(true);
    try {
      const uploadPromises = selectedDepartments.map(async (department) => {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("user_id", user.id);
        formData.append("dept_name", department);
        formData.append("priority", priority);
        return await uploadFile(formData);
      });

      const results = await Promise.all(uploadPromises);
      const successfulUploads = results.filter(
        (r) => r.success !== false
      ).length;

      if (successfulUploads > 0) {
        alert(`File uploaded to ${successfulUploads} department(s)!`);
        setSelectedFile(null);
        setSelectedDepartments([]);
        setPriority("normal");
        if (fileInputRef.current) fileInputRef.current.value = "";
        navigate("/dashboard");
      } else {
        throw new Error("All uploads failed");
      }
    } catch (error) {
      console.error(error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 rounded-2xl mt-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">
        Upload Documents
      </h1>

      {/* === First Row: User Info, Priority, Departments === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* User Info */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-2">
            User ID
          </label>
          <input
            type="text"
            value={user?.id || ""}
            disabled
            className="w-full rounded-lg border border-green-200 p-3 bg-green-200 text-green-500 font-medium"
          />
        </div>

        {/* Priority */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-3">
            Priority
          </label>
          <div className="flex gap-3">
            {["low", "normal", "high"].map((p) => (
              <button
                key={p}
                onClick={() => setPriority(p)}
                disabled={isLoading}
                className={`px-5 py-2 rounded-full border font-semibold transition ${
                  priority === p
                    ? "bg-gradient-to-r from-green-200 to-green-300 text-green-700 border-green-500"
                    : "bg-white text-green-500 border-gray-300 hover:border-green-500 hover:bg-green-50"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Departments */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-3">
            Departments
          </label>
          <div className="flex flex-wrap gap-3">
            {departmentsList.map((dept) => (
              <button
                key={dept}
                onClick={() => handleDepartmentChange(dept)}
                disabled={isLoading}
                className={`px-4 py-2 rounded-full border font-medium transition ${
                  selectedDepartments.includes(dept)
                    ? "bg-green-200 text-green-700 border-green-200"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-green-50 hover:border-green-500"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* === Second Row: File Upload Full Width === */}
      <div
        onClick={() => !isLoading && fileInputRef.current?.click()}
        className={`bg-white rounded-2xl shadow-lg p-12 text-center cursor-pointer transition transform hover:scale-105 mb-8 ${
          isLoading ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        {!selectedFile ? (
          <>
            <Upload className="mx-auto mb-4 text-gray-400" size={60} />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Click or drag file to upload
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Supported: pdf, doc, docx, xls, xlsx, images
            </p>
            <button className="px-6 py-2 rounded-lg bg-green-200 text-green-700 font-semibold shadow hover:bg-green-500 hover:text-white transition">
              Select File
            </button>
          </>
        ) : (
          <p className="text-lg font-medium text-gray-700">
            {selectedFile.name}
          </p>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.gif,.bmp,.webp"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isLoading}
        />
      </div>

      {/* === Submit Button === */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`px-10 py-3 rounded-lg font-semibold text-black shadow transition-all ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-200 text-green-500 hover:bg-green-500 hover:text-white"
          }`}
        >
          {isLoading ? "Uploading..." : "Submit"}
        </button>
      </div>
    </div>
  );
}

export default UploadDocPage;
