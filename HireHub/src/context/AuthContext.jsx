import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // ✅ Show success message when login is successful
  const login = (newToken, userData) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(userData);
    toast.success("Logged in successfully!");
  };

  const logout = async () => {
    try {
      await API.get("/auth/logout", { withCredentials: true });
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
      toast.success("Logged out successfully!");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  useEffect(() => {
    if (token) {
      API.get("/auth/current-user", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => setUser(res.data))
        .catch(() => logout());
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, setUser, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
