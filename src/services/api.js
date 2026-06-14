import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,         
});

// Auth   
export const registerAPI    = (data) => api.post("/auth/register", data);
export const loginAPI       = (data) => api.post("/auth/login", data);
export const logoutAPI      = ()     => api.get("/auth/logout");
export const checkAuthAPI   = ()     => api.get("/auth/check-auth");
export const updateProfileAPI = (data) => api.put("/auth/update-profile", data);
export const changePasswordAPI = (data) => api.put("/auth/password", data);

// Resume    
export const uploadResumeAPI  = (formData) => api.post("/user/resume", formData);
export const getHistoryAPI    = ()          => api.get("/user/resumes");
export const getResumeByIdAPI = (id)        => api.get(`/user/resumes/${id}`);
export const deleteResumeAPI  = (id)        => api.delete(`/user/resumes/${id}`);

// Admin  
export const getAllUsersAPI    = ()   => api.get("/admin/users");
export const toggleUserAPI    = (id) => api.put(`/admin/users/${id}/toggle`);
export const deleteUserAPI    = (id) => api.delete(`/admin/users/${id}`);
export const getAllResumesAPI  = ()   => api.get("/admin/resumes");
export const getAdminStatsAPI = ()   => api.get("/admin/stats");

export default api;