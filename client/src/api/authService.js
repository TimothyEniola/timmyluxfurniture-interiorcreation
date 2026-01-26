import api from './axiosInstance';

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (name, email, password) => {
  const response = await api.post('/auth/register', {name, email, password});
  return response.data;
};

export const logout = async () => {
  await api.post('/auth/logout');
};

export const getMe = async () => {
  const response = await api.get('/users/me'); // Assuming you made this endpoint
  return response.data;
};