import { jwtDecode } from "jwt-decode";

// Get token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Decode token
export const getUser = () => {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (err) {
    return null;
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
};