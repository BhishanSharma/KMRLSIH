import { useState } from 'react';
import { Link } from 'react-router-dom';

const ProfilePreferences = () => {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    whatsappNotifications: true,
    dailyDigest: false,
    urgentAlerts: true,
    documentUpdates: true
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const showMessage = (type, text, duration = 5000) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), duration);
  };

  const handlePreferenceChange = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSavePreferences = () => {
    // In real app, this would call an API
    showMessage('success', 'Preferences saved successfully');
  };

  return (
    <div className="min-h-screen bg-secondary py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-primary mb-2">
                Notification Preferences
              </h1>
              <p className="text-neutral-600">Customize how you receive updates and alerts</p>
            </div>
            <Link 
              to="/dashboard" 
              className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
            >
              Back to Profile
            </Link>
          </div>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg border ${
            message.type === 'success' 
              ? 'bg-success/10 border-success/20 text-success' 
              : 'bg-danger/10 border-danger/20 text-danger'
          }`}>
            {message.text}
          </div>
        )}

        {/* Preferences Content */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="space-y-6">
            {/* Notification Channels */}
            <div>
              <h3 className="text-lg font-heading font-semibold text-primary mb-4">
                Notification Channels
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Email Notifications
                    </label>
                    <p className="text-sm text-neutral-500">Receive important updates and document notifications via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={preferences.emailNotifications}
                      onChange={() => handlePreferenceChange('emailNotifications')}
                    />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      WhatsApp Notifications
                    </label>
                    <p className="text-sm text-neutral-500">Receive urgent alerts and reminders via WhatsApp</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={preferences.whatsappNotifications}
                      onChange={() => handlePreferenceChange('whatsappNotifications')}
                    />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Notification Types */}
            <div className="pt-4 border-t border-divider">
              <h3 className="text-lg font-heading font-semibold text-primary mb-4">
                Notification Types
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Daily Digest
                    </label>
                    <p className="text-sm text-neutral-500">Receive a daily summary of new documents and updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={preferences.dailyDigest}
                      onChange={() => handlePreferenceChange('dailyDigest')}
                    />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Urgent Alerts
                    </label>
                    <p className="text-sm text-neutral-500">Immediate notifications for critical updates and deadlines</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={preferences.urgentAlerts}
                      onChange={() => handlePreferenceChange('urgentAlerts')}
                    />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Document Updates
                    </label>
                    <p className="text-sm text-neutral-500">Notifications when documents you've viewed are updated</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={preferences.documentUpdates}
                      onChange={() => handlePreferenceChange('documentUpdates')}
                    />
                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-6 border-t border-divider">
              <button 
                onClick={handleSavePreferences}
                className="px-6 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors font-medium"
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

export default ProfilePreferences;