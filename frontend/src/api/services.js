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

// Updated uploadFile function in services.js
export const uploadFile = async (formData) => {
  try {
    console.log('Starting file upload...');
    
    // Log FormData contents for debugging
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
    
    const response = await api.post('/documents/file', formData, {
      // Don't set Content-Type - let axios handle it for FormData
      timeout: 60000, // Increase timeout to 60 seconds for file uploads
    });
    
    console.log('Upload successful:', response.data);
    return { success: true, data: response.data };
    
  } catch (error) {
    console.error('Upload API error:', error);
    
    let errorMessage = 'Upload failed';
    
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      const errorData = error.response.data;
      
      if (status === 500) {
        errorMessage = `Server error (500): ${errorData?.detail || 'Internal server error'}`;
      } else if (status === 400) {
        errorMessage = `Bad request (400): ${errorData?.detail || 'Invalid request'}`;
      } else if (status === 422) {
        errorMessage = `Validation error (422): ${errorData?.detail || 'Invalid data'}`;
      } else {
        errorMessage = `Server error (${status}): ${errorData?.detail || error.response.statusText}`;
      }
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = 'No response from server - please check your connection';
    } else if (error.code === 'ECONNABORTED') {
      // Timeout error
      errorMessage = 'Upload timeout - file may be too large or connection is slow';
    } else {
      // Something else happened
      errorMessage = `Upload error: ${error.message}`;
    }
    
    throw new Error(errorMessage);
  }
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
