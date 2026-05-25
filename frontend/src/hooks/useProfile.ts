"use client";

import { useState } from "react";

import type { User } from "@/src/types/profile";
import { API_BASE_URL } from "@/src/lib/api";

export function useProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getProfile() {
    setIsLoading(true);

    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        throw new Error("Not logged in");
      }

      const response = await fetch(`${API_BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");

        throw new Error(
          responseData.message || "Could not load profile"
        );
      }

      const userData: User = responseData.user;

      setUser(userData);

      return userData;

    } catch (error) {
      console.error(error);

      throw error;

    } finally {
      setIsLoading(false);
    }
  }

  return {
    user,
    getProfile,
    isLoading,
  };
}