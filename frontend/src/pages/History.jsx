import { useState, useEffect } from "react";
import { getUserHistory } from "../api/services";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Eye, Download, Clock } from "lucide-react";

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
      const historyData = await getUserHistory(user.id);
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
    <div className="min-h-screen bg-gray-50 rounded-2xl py-10 px-4 mt-10 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-black mb-1">
              Activity History
            </h1>
            <p className="text-black">
              Track your document views and interactions
            </p>
          </div>
          <Link
            to="/dashboard"
            className="px-5 py-2 bg-green-200 text-green-500 rounded-md hover:bg-green-500 hover:text-green-200 transition-colors"
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
                  ? "bg-green-100 text-green-600"
                  : "bg-green-100 text-green-600";
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
              <Clock className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-lg font-medium text-green-500 mb-2">
                No activity history yet
              </h3>
              <p className="text-green-400 mb-6">
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
      </div>
    </div>
  );
};

export default History;
