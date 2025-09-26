import { useState, useEffect } from "react";
import { getUserHistory } from "../api/services";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);

      // Static demo data (replace with API response later)
      const historyData = [
        {
          documentName: "Keyword Analysis Worksheet.pdf",
          userId: "1000000",
          departmentFrom: "Finance",
          departmentTo: "Compliance",
          timestamp: "2025-09-25T10:30:00Z",
        },
        {
          documentName: "Weekly Exam Preparation Timetable.pdf",
          userId: "1000003",
          departmentFrom: "HR",
          departmentTo: "Engineering",
          timestamp: "2025-09-25T14:45:00Z",
        },
        {
          documentName: "Summary Report 01.pdf",
          userId: "1000000",
          departmentFrom: "Engineering",
          departmentTo: "Admin",
          timestamp: "2025-09-24T09:20:00Z",
        },
        {
          documentName: "Kedarnath_Trip_Itinerary_June2025.pdf",
          userId: "1000002",
          departmentFrom: "HR",
          departmentTo: "Admin",
          timestamp: "2025-09-26T08:45:00Z",
        },
      ];

      // ✅ Replace the above with:
      // const historyData = await getUserHistory(user);

      setHistory(historyData);
    } catch (error) {
      console.error("Failed to load history:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white/30 rounded-2xl py-10 px-4 mt-10 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-black mb-1">
              Activity History
            </h1>
            <p className="text-black">Track your document submissions</p>
          </div>
          <Link
            to="/dashboard"
            className="px-5 py-2 bg-white/30 text-black rounded-md hover:bg-white/50 hover:text-black transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* History Cards */}
        <div className="grid gap-6">
          {history.length > 0 ? (
            history.map((item, idx) => {
              const icon =
                item.type === "view" ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <Download className="w-5 h-5" />
                );
              const typeColor =
                item.type === "view"
                  ? "bg-black-100 text-black"
                  : "bg-black-100 text-black";
              const statusColor =
                item.status === "completed"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600";
              return (
                <div
                  key={idx}
                  className="backdrop-blur-sm bg-white/30 border border-white/20 rounded-2xl p-6 flex justify-between items-center hover:shadow-lg transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`p-3 rounded-lg ${typeColor} flex items-center justify-center`}
                    >
                      {icon}
                    </div>
                    <div>
                      <h3 className="text-green-200 font-medium">
                        {item.documentName}
                      </h3>
                      <p className="text-green-300 text-sm">
                        {item.action} •{" "}
                        {new Date(item.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
                  >
                    {item.status}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16">
              <Clock className="mx-auto h-16 w-16 text-black mb-4" />
              <h3 className="text-lg font-medium text-black mb-2">
                No activity history yet
              </h3>
              <p className="text-black mb-6">
                Your document views and interactions will appear here.
              </p>
              <Link
                to="/dashboard"
                className="inline-flex items-center px-5 py-2  bg-green-200 text-green-500 rounded-md hover:bg-green-500 hover:text-green-200 transition-colors"
              >
                Browse Documents
              </Link>
            </div>
          )}
        </div>
        {/* Table */}
        {history.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl shadow-md">
            <table className="min-w-full bg-white/70 backdrop-blur-sm border border-gray-200 rounded-2xl">
              <thead className="bg-green-100 text-green-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Document Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    User ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Dept. From
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Dept. To
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-green-50 transition-colors border-t"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {item.documentName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.userId}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.departmentFrom}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.departmentTo}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(item.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16">
            <Clock className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h3 className="text-lg font-medium text-green-500 mb-2">
              No history records yet
            </h3>
            <p className="text-green-400 mb-6">
              Your submitted documents will appear here.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-5 py-2 bg-green-200 text-green-500 rounded-md hover:bg-green-500 hover:text-green-200 transition-colors"
            >
              Browse Documents
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
