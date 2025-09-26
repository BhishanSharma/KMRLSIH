import api from "../api/api";

// Auth
export const login = async (user_id, password) => {
  const response = await api.post("/auth/login", { user_id, password });
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const createDepartment = async (name) => {
  const response = await api.post("/auth/department", { name });
  return response.data;
};

// User Profile
export const getProfile = async (user_id) => {
  const response = await api.get(`/profile/${user_id}`);
  return response.data;
};

export const changeName = async (user_id, name) => {
  const response = await api.post("/profile/cname", { user_id, name });
  return response.data;
};

export const changeEmail = async (user_id, email) => {
  const response = await api.post("/profile/cemail", { user_id, email });
  return response.data;
};

export const changePhone = async (user_id, phone) => {
  const response = await api.post("/profile/cphone", { user_id, phone });
  return response.data;
};

export const changeDepartment = async (user_id, dept_name) => {
  const response = await api.post("/profile/cdept", { user_id, dept_name });
  return response.data;
};

export const getUserHistory = async (user_id) => {
  const response = await api.get(`/profile/history/${user_id}`);
  return response.data;
};

export const markViewed = async (user_id, doc_id) => {
  const response = await api.post("/profile/viewed", { user_id, doc_id });
  return response.data;
};

// Documents
export const uploadUrl = async (urlData) => {
  const response = await api.post("/documents/url", urlData);
  return response.data;
};

export const uploadFile = async (formData) => {
  const response = await api.post("/documents/file", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const getSummary = async (doc_id) => {
  const response = await api.get("/documents/summary", {
    params: { doc_id },
  });
  return response.data;
};

export const listDocuments = async (user_id) => {
  const response = await api.get("/documents/listdocs", {
    params: { user_id },
  });
  return response.data;
};

export const getCompliances = async (doc_id) => {
  const response = await api.get("/documents/compliances", {
    params: { doc_id },
  });
  return response.data;
};

export const searchDocuments = async (query) => {
  const response = await api.get("/documents/search", {
    params: { query }, // backend expects query
  });
  return response.data;
};

// Transactions
export const getTransactions = async (user_id) => {
  const response = await api.get(`/transexions/${user_id}`);
  return response.data;
};

// Notifications
export const sendEmail = async (formData) => {
  const response = await api.post("/notify/email", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const sendWhatsApp = async (formData) => {
  const response = await api.post("/notify/whatsapp", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// Root
export const getRoot = async () => {
  const response = await api.get("/");
  return response.data;
};

export const getDepartmentName = async (dept_id) => {
  const response = await api.get("/auth/dept_name", {
    params: { dept_id },
  });
  return response.data;
};
