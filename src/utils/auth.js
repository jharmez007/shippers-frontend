// utils/auth.js
import { jwtDecode } from 'jwt-decode';

export const isTokenValid = () => {
  const token = localStorage.getItem('token');
  console.log("token val :", token)
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const isExpired = decoded.exp * 1000 < Date.now(); // exp is in seconds
    console.log("is token expired :", isExpired)
    return !isExpired;
  } catch (err) {
    return false;
  }
};
