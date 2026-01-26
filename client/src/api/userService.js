import api from './axiosInstance';

export const getMyProfile = async () => {
  const response = await api.get('/users/me');
  return response.data; // Expected: { data: { id, email, full_name, ... } }
};

export const updateMyProfile = async (userData) => {
  // userData can be { full_name: "New Name", phone: "..." }
  const response = await api.put('/users/me', userData);
  return response.data;
};

export const changePassword = async (passwordData) => {
  // passwordData = { currentPassword, newPassword }
  const response = await api.put('/users/password', passwordData);
  return response.data;
};

// Placeholder for future address implementation
export const getUserAddresses = async () => {
  const response = await api.get('/users/addresses');
  return response.data;
};

export const addUserAddress = async (addressData) => {
  const response = await api.post('/users/addresses', addressData);
  return response.data;
};