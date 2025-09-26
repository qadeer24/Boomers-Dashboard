import { http } from "../utils/httpService";

export const getAgents = () => http.get("/admin/agents/list");
export const getLeads = () => http.get("/admin/leads");
export const getUplines = () => http.get("/admin/uplines");
export const createLicenseInfo = (data) => http.post("/admin/agents/licenses", data);
export const createBankInfo = (data) => http.post("/admin/agents/bank-info", data);
export const createUpline = (data) => http.post("/admin/uplines", data);
export const getAgentById = (id) => http.get(`/admin/agent/id/${id}`);
export const getAgentStatusById = (id) => http.get(`/admin/agent/id/${id}`);
export const getCountytByStateId = () => http.get(`/states`);
export const getprofileStatus = () => http.get(`/profile/completion`);
export const updateLicenseInfo = (data, id) => http.postFormData(`/admin/agents/licenses/${id}`, data, {
  headers: {}, // no need to set Content-Type manually
});
export const updateBankInfo = (data, id) => http.postFormData(`/admin/agents/bank-info/${id}`, data, {
  headers: {}, // no need to set Content-Type manually
});
export const updateAgent = (data, id, token) =>
  http.postFormData(`/admin/agent/${id}`, data, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    }, // Content-Type ko manually set mat karo
  });

// export const updateUser = (id, data) =>  http.put(`/admin/agent/${id}`, data);
// export const deleteUser = (id) => http.delete(`/users/${id}`);
