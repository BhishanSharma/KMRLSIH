import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { uploadUrl } from "../api/services";

const departmentsList = [
  "Engineering",
  "Procurement",
  "HR",
  "Finance",
  "Legal & Compliance",
];

function UploadUrlPage() {
  const { user } = useAuth();
  const [priority, setPriority] = useState("normal");
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDepartmentChange = (dept) => {
    setSelectedDepartments((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
    );
  };

  const handleSubmit = async () => {
    if (!url) return alert("Please enter a URL!");
    if (!selectedDepartments.length)
      return alert("Please select at least one department!");
    if (!user?.id) return alert("User not authenticated!");

    // Basic URL validation
    try {
      new URL(url);
    } catch (error) {
      return alert("Please enter a valid URL!");
    }

    setIsLoading(true);
    try {
      const uploadPromises = selectedDepartments.map(async (department) => {
        const urlData = {
          user_id: user.id,
          url,
          dept_name: department,
          priority,
        };
        return await uploadUrl(urlData);
      });

      const results = await Promise.all(uploadPromises);
      const successfulUploads = results.filter(
        (r) => r.success !== false
      ).length;

      if (successfulUploads > 0) {
        alert(`URL uploaded to ${successfulUploads} department(s)!`);
        setUrl("");
        setSelectedDepartments([]);
        setPriority("normal");
        navigate("/dashboard");
      } else {
        throw new Error("All uploads failed");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload URL! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">
        Upload Document URL
      </h1>

      {/* === First Row: User ID, Priority, Departments === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* User ID */}
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

      {/* === Second Row: URL Input Full Width === */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex flex-col">
        <label className="text-sm font-medium text-gray-600 mb-2">
          Document URL
        </label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter document URL (e.g., https://example.com/document.pdf)"
          disabled={isLoading}
          className="w-full rounded-lg border border-gray-300 p-3"
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

export default UploadUrlPage;
