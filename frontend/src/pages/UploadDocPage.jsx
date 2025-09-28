import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, CheckCircle, XCircle, Clock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { uploadFile } from "../api/services";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
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
  const [uploadProgress, setUploadProgress] = useState({});
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
    setUploadProgress({}); // Reset progress
  };

  const handleSubmit = async () => {
    if (!selectedFile)
      return MySwal.fire({ icon: "warning", title: "Please select a file!" });
    if (!selectedDepartments.length)
      return MySwal.fire({
        icon: "warning",
        title: "Select at least one department!",
      });
    if (!user?.id)
      return MySwal.fire({ icon: "error", title: "User not authenticated!" });

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
      return MySwal.fire({
        icon: "error",
        title: `Unsupported file: ${selectedFile.name}`,
      });
    if (selectedFile.size > maxSize)
      return MySwal.fire({
        icon: "error",
        title: `File too large: ${selectedFile.name} (Max 10MB)`,
      });

    setIsLoading(true);

    // Show loading modal
    MySwal.fire({
      title: <p>Uploading file...</p>,
      allowOutsideClick: false,
      didOpen: () => MySwal.showLoading(),
    });

    const progressState = {};
    selectedDepartments.forEach((dept) => {
      progressState[dept] = { status: "pending", message: "Waiting..." };
    });
    setUploadProgress(progressState);

    const results = [];
    let successfulUploads = 0;

    try {
      for (const department of selectedDepartments) {
        setUploadProgress((prev) => ({
          ...prev,
          [department]: { status: "uploading", message: "Uploading..." },
        }));

        try {
          const formData = new FormData();
          formData.append("file", selectedFile);
          formData.append("user_id", user.id);
          formData.append("dept_name", department);
          formData.append("priority", priority);

          const result = await uploadFile(formData);

          if (result && result.success !== false) {
            successfulUploads++;
            setUploadProgress((prev) => ({
              ...prev,
              [department]: {
                status: "success",
                message: "Upload successful!",
              },
            }));
            results.push({ ...result, department, success: true });
          } else {
            throw new Error(result?.message || "Upload failed");
          }

          if (
            selectedDepartments.indexOf(department) <
            selectedDepartments.length - 1
          ) {
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
        } catch (error) {
          setUploadProgress((prev) => ({
            ...prev,
            [department]: {
              status: "error",
              message: error.message || "Upload failed",
            },
          }));
          results.push({
            success: false,
            department,
            error: error.message || "Upload failed",
          });
        }
      }

      MySwal.close(); // Close loading modal

      if (successfulUploads > 0) {
        await MySwal.fire({
          icon: "success",
          title: "Upload Completed!",
          html: `File uploaded to <b>${successfulUploads}</b> department(s).`,
        });

        setSelectedFile(null);
        setSelectedDepartments([]);
        setPriority("normal");
        setUploadProgress({});
        if (fileInputRef.current) fileInputRef.current.value = "";
        navigate("/dashboard");
      } else {
        const errorMessages = results
          .filter((r) => !r.success)
          .map((r) => `${r.department}: ${r.error}`)
          .join("<br/>");

        await MySwal.fire({
          icon: "error",
          title: "All uploads failed",
          html: errorMessages,
        });
      }
    } catch (error) {
      console.error("Upload process error:", error);
      MySwal.fire({
        icon: "error",
        title: "Upload failed",
        text: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return <CheckCircle className="text-green-500" size={16} />;
      case "error":
        return <XCircle className="text-red-500" size={16} />;
      case "uploading":
        return <Clock className="text-blue-500 animate-spin" size={16} />;
      default:
        return <Clock className="text-gray-400" size={16} />;
    }
  };

  return (
    <div className="min-h-screen p-8 ms-6 bg-white/30 rounded-4xl mt-10">
      <div className=" bg-neutral-300/20 p-10  rounded-4xl ">
        <h1 className="text-4xl font-bold text-gray-800 mb-10">
          Upload Documents
        </h1>

        {/* === First Row: User Info, Priority, Departments === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* User Info */}
          <div className="bg-white/30 backdrop-blur-3xl rounded-4xl shadow-sm p-6 flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-2">
              User ID
            </label>
            <input
              type="text"
              value={user?.id || ""}
              disabled
              className="w-full rounded-4xl border p-3 border-white/80  bg-white/30 text-black font-medium"
            />
          </div>

          {/* Priority */}
          <div className="bg-white/30 rounded-4xl shadow-sm p-6 flex flex-col">
            <label className="text-sm font-medium text-black mb-3">
              Priority
            </label>
            <div className="flex gap-3">
              {["low", "medium", "high"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  disabled={isLoading}
                  className={`px-5 py-2 rounded-full border font-semibold transition ${
                    priority === p
                      ? " bg-white/80 text-black border-white/80 focus:outline-none focus:border-white/80 "
                      : "bg-white/10 text-black  border-white/50 hover:border-white/80 hover:bg-white/50"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Departments */}
          <div className="bg-white/30 rounded-4xl shadow-sm p-6 flex flex-col ">
            <label className="text-sm font-medium text-black mb-3">
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
                      ? "bg-white/80 text-black border-white/80 focus:outline-none  "
                      : "bg-white/10 text-black  border-white/50 hover:border-white/80 hover:bg-white/50"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* === Upload Progress (only show when uploading) === */}
        {isLoading && Object.keys(uploadProgress).length > 0 && (
          <div className="bg-white rounded-4xl shadow-sm p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Upload Progress
            </h3>
            <div className="space-y-3">
              {Object.entries(uploadProgress).map(([dept, progress]) => (
                <div
                  key={dept}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="font-medium text-gray-700">{dept}</span>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(progress.status)}
                    <span
                      className={`text-sm ${
                        progress.status === "success"
                          ? "text-green-600"
                          : progress.status === "error"
                          ? "text-red-600"
                          : progress.status === "uploading"
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    >
                      {progress.message}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === Second Row: File Upload Full Width === */}
        <div
          onClick={() => !isLoading && fileInputRef.current?.click()}
          className={`bg-white/30 rounded-4xl shadow-sm p-12 text-center cursor-pointer transition transform hover:scale-101 mb-8 ${
            isLoading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {!selectedFile ? (
            <>
              <Upload className="mx-auto mb-4 text-black" size={60} />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Click or drag file to upload
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Supported: pdf, doc, docx, xls, xlsx, images
              </p>
              <button className="px-6 py-2 rounded-4xl bg-white/30 text-black font-semibold shadow hover:bg-white/50 hover:text-black transition">
                Select File
              </button>
            </>
          ) : (
            <div>
              <p className="text-lg font-medium text-gray-700 mb-2">
                {selectedFile.name}
              </p>
              <p className="text-sm text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
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
            disabled={isLoading || !selectedFile || !selectedDepartments.length}
            className={`px-10 py-3 rounded-4xl font-semibold text-black shadow-sm transition-all ${
              isLoading || !selectedFile || !selectedDepartments.length
                ? "bg-white/30 cursor-not-allowed"
                : " text-black hover:bg-white/50 hover:text-black bg-white/30"
            }`}
          >
            {isLoading ? "Uploading..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadDocPage;
