import { useState, useEffect } from "react";
import {
  getProfile,
  changeName,
  changeEmail,
  changePhone,
  getDepartmentName,
} from "../api/services";
import { useAuth } from "../context/AuthContext";

const ProfileSettings = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });
  const { user } = useAuth();
  const [deptName, setDeptName] = useState("");

  useEffect(() => {
    loadUserProfile();
    deptNamefn();
  }, []);

  const deptNamefn = async () => {
    try {
      setLoading(true);
      const res = await getDepartmentName(user?.department);
      setDeptName(res.message);
    } catch (error) {
      showMessage("error", "Failed to get department name");
    } finally {
      setLoading(false);
    }
  };

  const loadUserProfile = async () => {
    try {
      setLoading(true);
      const profile = await getProfile(user?.id);
      if (!profile) throw new Error("Profile not found");
      const departmentName = profile.user[0]?.department
        ? await getDepartmentName(profile.user[0].department).then(
            (res) => res.message
          )
        : "Not Assigned";
      const userData = profile.user[0];

      setUserProfile({ ...userData, department: departmentName });

      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        department: departmentName,
      });
    } catch (error) {
      showMessage("error", "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text, duration = 5000) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), duration);
  };

  const handleEdit = (field) => {
    setEditingField(field);
  };

  const handleCancel = () => {
    setEditingField(null);
    setFormData({
      name: userProfile.name,
      email: userProfile.email,
      phone: userProfile.phone,
      department: userProfile.department,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [editingField]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      let response;
      const user_id = user?.id;

      switch (editingField) {
        case "name":
          response = await changeName(user_id, formData.name);
          break;
        case "email":
          response = await changeEmail(user_id, formData.email);
          break;
        case "phone":
          response = await changePhone(user_id, formData.phone);
          break;
        default:
          return;
      }

      setUserProfile({
        ...userProfile,
        [editingField]: formData[editingField],
      });
      setEditingField(null);
      showMessage(
        "success",
        `${
          editingField.charAt(0).toUpperCase() + editingField.slice(1)
        } updated successfully`
      );
    } catch (error) {
      showMessage("error", `Failed to update ${editingField}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 rounded-4xl ms-6 shadow-sm bg-white/30 mt-10">
      <div className="bg-neutral-300/20 p-10  rounded-4xl ">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-primary mb-2">
              Profile Settings
            </h1>
            <p className="text-neutral-600">
              Manage your personal account information
            </p>
          </div>

          {/* Message Alert */}
          {message.text && (
            <div
              className={`mb-6 p-4 rounded-lg border ${
                message.type === "success"
                  ? "bg-green-100 border-green-300 text-green-700"
                  : "bg-red-100 border-red-300 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Profile Card */}
          {userProfile && (
            <div className="bg-neutral-300/20  rounded-4xl shadow-sm overflow-hidden">
              {/* Profile Header */}
              <div className="bg-white/50  p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white/60 text-black/60 rounded-full flex items-center justify-center text-2xl font-bold">
                    {userProfile.name?.charAt(0) || "U"}
                  </div>
                  <div>
                    <h2 className="text-xl text-black/60 font-heading font-semibold">
                      {userProfile.name}
                    </h2>
                    <p className="text-black/80">Department: {deptName}</p>
                    <p className="text-black/60 text-sm mt-1">
                      User ID: {user?.id}
                    </p>
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="p-6 space-y-6">
                {/* Name */}
                <div className="flex items-center justify-between py-3 border-b border-divider">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Full Name
                    </label>
                    {editingField === "name" ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-focus"
                        autoFocus
                      />
                    ) : (
                      <p className="text-primary">{userProfile.name}</p>
                    )}
                  </div>
                  {editingField === "name" ? (
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-green-600 text-white rounded-md"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit("name")}
                      className="ml-4 px-3 py-1 text-red-500 bg-white/35 hover:bg-white/80 hover:text-red-800 rounded-4xl transition-all"
                    >
                      Edit
                    </button>
                  )}
                </div>

                {/* Email */}
                <div className="flex items-center justify-between py-3 border-b border-divider">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Email Address
                    </label>
                    {editingField === "email" ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-focus"
                      />
                    ) : (
                      <p className="text-primary">{userProfile.email}</p>
                    )}
                  </div>
                  {editingField === "email" ? (
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-green-600 text-white rounded-md"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit("email")}
                      className="ml-4 px-3 py-1 text-red-500 bg-white/35 hover:bg-white/80 hover:text-red-800 rounded-4xl transition-all"
                    >
                      Edit
                    </button>
                  )}
                </div>

                {/* Phone */}
                <div className="flex items-center justify-between py-3 border-b border-divider">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Phone Number
                    </label>
                    {editingField === "phone" ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-focus"
                      />
                    ) : (
                      <p className="text-primary">
                        {userProfile.phone || "Not provided"}
                      </p>
                    )}
                  </div>
                  {editingField === "phone" ? (
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={handleSave}
                        className="px-3 py-1 text-red-500 bg-white/35 hover:bg-white/80 hover:text-red-800 rounded-md"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-md"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit("phone")}
                      className="ml-4 px-3 py-1 text-red-500 bg-white/35 hover:bg-white/80 hover:text-red-800 transition-all rounded-4xl"
                    >
                      Edit
                    </button>
                  )}
                </div>

                {/* Department (Read Only) */}
                <div className="flex items-center justify-between py-3">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Department
                    </label>
                    <div className="flex items-center space-x-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium  text-red-500 bg-white/35 hover:bg-white/80 hover:text-red-800">
                        {userProfile.department || "Not Assigned"}
                      </span>
                      <span className="text-xs text-neutral-500">
                        Contact admin to change department
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <span className="px-3 py-1 text-xs bg-black/80 text-neutral-200 rounded-4xl cursor-not-allowed">
                      Read Only
                    </span>
                  </div>
                </div>

                {/* User ID */}
                <div className="flex items-center justify-between py-3 border-t border-divider">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      User ID
                    </label>
                    <p className="text-primary font-mono text-sm">{user?.id}</p>
                  </div>
                  <div className="ml-4">
                    <span className="px-3 py-1 text-xs bg-black/80 text-neutral-200 rounded-4xl cursor-not-allowed">
                      Permanent
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
