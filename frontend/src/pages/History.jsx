import { useState, useEffect } from "react";
import { getUserHistory } from "../api/services";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Eye, Download, Clock } from "lucide-react";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  console.log("User in History:", user);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const historyData = await getUserHistory(user);
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
    <div className="min-h-screen bg-white/30 rounded-4xl ms-6 py-10 px-4 mt-10 sm:px-6 lg:px-8">
      <div className=" bg-neutral-300/20 p-10  rounded-4xl">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-black mb-5">
                Activity History
              </h1>
              <p className="text-black/70">
                Track your document views and interactions
              </p>
            </div>
            <Link
              to="/dashboard"
              className="px-5 py-2 bg-white/30 text-black rounded-4xl hover:bg-white/50 hover:text-black transition-colors"
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
                    className="backdrop-blur-xl bg-white/30 border border-white/20 rounded-2xl p-6 flex justify-between items-center hover:shadow-lg transition-all"
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
                <Clock className="mx-auto h-16 w-16 text-black/40 mb-4" />
                <h3 className="text-lg font-bold text-black/70 mb-2">
                  No activity history yet
                </h3>
                <p className="text-black/70 mb-6">
                  Your document views and interactions will appear here.
                </p>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-5 py-2  bg-white/30 text-black rounded-4xl hover:bg-white/50 hover:text-black transition-colors"
                >
                  Browse Documents
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
