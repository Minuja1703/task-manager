import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    try {
      await axios.get(`${BASE_URL}/auth/me`, {
        withCredentials: true,
      });

      setIsAuth(true);
    } catch (error) {
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  if (loading) return null;

  return isAuth ? children : <Navigate to="/login" />;
};
