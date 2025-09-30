import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  FileText,
  Eye,
  Shield,
  Upload,
  CheckCircle,
  AlertTriangle,
  Mail,
  Wrench,
  Building2,
  UserCheck,
  DollarSign,
  Scale,
} from "lucide-react";

// Mock data
const generateMockData = (userRole, userDepartment) => {
  const departments = [
    "Engineering",
    "Procurement",
    "HR",
    "Finance",
    "Legal & Compliance",
  ];
  const documentActivity = [
    { month: "Jan", uploads: 45, views: 234, downloads: 89 },
    { month: "Feb", uploads: 52, views: 298, downloads: 103 },
    { month: "Mar", uploads: 61, views: 356, downloads: 127 },
    { month: "Apr", uploads: 48, views: 289, downloads: 98 },
    { month: "May", uploads: 67, views: 412, downloads: 156 },
    { month: "Jun", uploads: 71, views: 445, downloads: 178 },
  ];
  const complianceData = [
    { name: "Compliant", value: 78, color: "#22c55e" },
    { name: "Pending", value: 15, color: "#facc15" },
    { name: "Non-Compliant", value: 7, color: "#ef4444" },
  ];
  const departmentStats = departments.map((dept) => ({
    name: dept,
    documents: Math.floor(Math.random() * 200) + 50,
    users: Math.floor(Math.random() * 25) + 5,
    compliance: Math.floor(Math.random() * 30) + 70,
  }));
  const priorityDistribution = [
    { name: "Urgent", value: 12, color: "#ef4444" },
    { name: "High", value: 28, color: "#f87171" },
    { name: "Medium", value: 45, color: "#fbbf24" },
    { name: "Low", value: 67, color: "#22c55e" },
  ];
  return {
    documentActivity,
    complianceData,
    departmentStats:
      userRole === "admin"
        ? departmentStats
        : departmentStats.filter((d) => d.name === userDepartment),
    priorityDistribution,
    totalUsers:
      userRole === "admin"
        ? 127
        : departmentStats.find((d) => d.name === userDepartment)?.users || 15,
    totalDocuments:
      userRole === "admin" ? 1453 : Math.floor(Math.random() * 300) + 100,
    totalViews:
      userRole === "admin" ? 12847 : Math.floor(Math.random() * 2000) + 500,
    complianceRate:
      userRole === "admin" ? 85 : Math.floor(Math.random() * 20) + 75,
  };
};

const Analytics = ({ userRole = "admin", userDepartment = "Engineering" }) => {
  const [data, setData] = useState(null);
  const [timeRange, setTimeRange] = useState("6months");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setTimeout(() => {
        setData(generateMockData(userRole, userDepartment));
        setLoading(false);
      }, 1000);
    };
    fetchData();
  }, [userRole, userDepartment, timeRange]);

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white/50 rounded-4xl shadow p-6 flex justify-between items-center transition hover:shadow-lg">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div
        className="p-3 rounded-full"
        style={{ backgroundColor: color + "20" }}
      >
        <Icon className="h-6 w-6" style={{ color }} />
      </div>
    </div>
  );

  const ChartCard = ({ title, children }) => (
    <div className="bg-white/50 rounded-4xl shadow p-6 transition hover:shadow-lg">
      <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );

  const getDeptIcon = (dept) => {
    const map = {
      Engineering: Wrench,
      Procurement: Building2,
      HR: UserCheck,
      Finance: DollarSign,
      "Legal & Compliance": Scale,
    };
    return map[dept] || FileText;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center  bg-white/50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-white/50">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen rounded-4xl mt-10 ms-6 bg-white/50 py-8 px-4 lg:px-12">
      <div className=" bg-neutral-300/20 p-10  rounded-4xl ">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                {userRole === "admin"
                  ? "System Analytics"
                  : `${userDepartment} Analytics`}
              </h1>
              <p className="text-gray-500">
                {userRole === "admin"
                  ? "Overview of the document management system"
                  : `Department insights and performance metrics`}
              </p>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-white/80 rounded-4xl focus:ring-2 focus:ring-white focus:outline-none"
            >
              <option value="1month">Last Month</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Users"
              value={data.totalUsers}
              icon={Users}
              color="#3b82f6"
            />
            <StatCard
              title="Documents"
              value={data.totalDocuments}
              icon={FileText}
              color="#10b981"
            />
            <StatCard
              title="Total Views"
              value={data.totalViews}
              icon={Eye}
              color="#f59e0b"
            />
            <StatCard
              title="Compliance Rate"
              value={`${data.complianceRate}%`}
              icon={Shield}
              color="#22c55e"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <ChartCard title="Document Activity">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={data.documentActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="uploads"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="downloads"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Compliance Overview">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={data.complianceData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {data.complianceData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Task Priority Distribution">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart layout="vertical" data={data.priorityDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Bar dataKey="value">
                    {data.priorityDistribution.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>

          {/* Departments Overview */}
          {userRole === "admin" && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Departments Overview
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {data.departmentStats.map((dept) => {
                  const Icon = getDeptIcon(dept.name);
                  return (
                    <div
                      key={dept.name}
                      className="bg-white/50 rounded-4xl p-4 shadow hover:shadow-lg transition cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className="h-6 w-6 text-blue-500" />
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                          {dept.compliance}% compliant
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900">
                        {dept.name}
                      </h3>
                      <div className="text-sm mt-2">
                        <p>Documents: {dept.documents}</p>
                        <p>Users: {dept.users}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recent Activity */}
          <ChartCard title="Recent System Activity">
            <div className="space-y-4 max-h-96 rounded-4xl overflow-y-auto">
              {[
                {
                  icon: Upload,
                  text: "New document uploaded to Engineering",
                  time: "5 minutes ago",
                  type: "info",
                },
                {
                  icon: CheckCircle,
                  text: "Compliance check completed for HR documents",
                  time: "12 minutes ago",
                  type: "success",
                },
                {
                  icon: AlertTriangle,
                  text: "Document review overdue in Finance",
                  time: "1 hour ago",
                  type: "warning",
                },
                {
                  icon: Eye,
                  text: "Safety manual viewed 23 times today",
                  time: "2 hours ago",
                  type: "info",
                },
                {
                  icon: Mail,
                  text: "Notification sent to Procurement team",
                  time: "3 hours ago",
                  type: "info",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 rounded-4xl hover:bg-gray-50 transition"
                >
                  <div
                    className={`p-2 rounded-full ${
                      activity.type === "success"
                        ? "bg-green-100"
                        : activity.type === "warning"
                        ? "bg-yellow-100"
                        : "bg-blue-100"
                    }`}
                  >
                    <activity.icon
                      className={`h-4 w-4 ${
                        activity.type === "success"
                          ? "text-green-500"
                          : activity.type === "warning"
                          ? "text-yellow-500"
                          : "text-blue-500"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.text}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
