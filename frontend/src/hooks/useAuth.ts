"use client";

import { useState } from "react";

type LoginData = {
  email: string;
  password: string;
};

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);

  async function login(loginData: LoginData) {
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1/login-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return data;
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  }

  function getToken() {
    return localStorage.getItem("access_token");
  }

  function getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  return {
    login,
    logout,
    getToken,
    getUser,
    isLoading,
  };
}