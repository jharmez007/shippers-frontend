// utils/refresh.js
import axios from 'axios';

const RefreshApi = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export async function refreshToken() {
  const refresh_token = localStorage.getItem('refresh_token');
  if (!refresh_token) throw new Error('No refresh token available');

  const response = await RefreshApi.post('/auth/refresh', null, {
    headers: {
      Authorization: `Bearer ${refresh_token}`,
    },
  });

  const newAccessToken = response?.data?.data?.access_token;
 
  localStorage.setItem('token', newAccessToken);
  return newAccessToken;
}
