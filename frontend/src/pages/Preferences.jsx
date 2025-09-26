import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MessageSquare, AlertTriangle, FileText } from "lucide-react";

const ProfilePreferences = () => {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    whatsappNotifications: true,
    dailyDigest: false,
    urgentAlerts: true,
    documentUpdates: true,
  });
  const [message, setMessage] = useState({ type: "", text: "" });

  const showMessage = (type, text, duration = 4000) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), duration);
  };

  const handlePreferenceChange = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSavePreferences = () => {
    // API call would be placed here
    showMessage("success", "Preferences saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              Notification Preferences
            </h1>
            <p className="text-gray-600">
              Customize how you’d like to receive updates and alerts.
            </p>
          </div>
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors"
          >
            Back to Profile
          </Link>
        </div>

        {/* Message */}
        {message.text && (
          <div
            className={`mb-8 p-4 rounded-lg shadow-md border ${
              message.type === "success"
                ? "bg-green-50 border-green-200 text-green-700"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Preferences Card */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="space-y-8">
            {/* Notification Channels */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-green-600" /> Notification
                Channels
              </h3>
              <div className="space-y-5">
                {/* Email */}
                <PreferenceToggle
                  label="Email Notifications"
                  description="Receive important updates and document notifications via email."
                  checked={preferences.emailNotifications}
                  onChange={() => handlePreferenceChange("emailNotifications")}
                />
                {/* WhatsApp */}
                <PreferenceToggle
                  label="WhatsApp Notifications"
                  description="Receive urgent alerts and reminders directly on WhatsApp."
                  checked={preferences.whatsappNotifications}
                  onChange={() =>
                    handlePreferenceChange("whatsappNotifications")
                  }
                  icon={<MessageSquare className="w-5 h-5 text-green-600" />}
                />
              </div>
            </div>

            {/* Notification Types */}
            <div className="pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-green-600" />{" "}
                Notification Types
              </h3>
              <div className="space-y-5">
                <PreferenceToggle
                  label="Daily Digest"
                  description="Get a daily summary of new documents and updates."
                  checked={preferences.dailyDigest}
                  onChange={() => handlePreferenceChange("dailyDigest")}
                />
                <PreferenceToggle
                  label="Urgent Alerts"
                  description="Immediate notifications for critical updates and deadlines."
                  checked={preferences.urgentAlerts}
                  onChange={() => handlePreferenceChange("urgentAlerts")}
                />
                <PreferenceToggle
                  label="Document Updates"
                  description="Be notified when documents you viewed are updated."
                  checked={preferences.documentUpdates}
                  onChange={() => handlePreferenceChange("documentUpdates")}
                  icon={<FileText className="w-5 h-5 text-green-600" />}
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={handleSavePreferences}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium shadow hover:bg-green-700 transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Subcomponent: toggle switch row
const PreferenceToggle = ({ label, description, checked, onChange, icon }) => (
  <div className="flex items-center justify-between py-2">
    <div>
      <div className="flex items-center gap-2">
        {icon}
        <label className="block text-sm font-medium text-gray-800">
          {label}
        </label>
      </div>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-green-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
    </label>
  </div>
);

export default ProfilePreferences;
