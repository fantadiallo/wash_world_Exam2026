"use client";
import type { ResetPasswordData } from "@/src/types/resetPassword";
import { useState } from "react";
import { API_BASE_URL } from "../lib/api";

export function useResetPassword() {
  const [isLoading, setIsLoading] = useState(false);

  async function resetPassword(resetData: ResetPasswordData) {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}//reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resetData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Noget gik galt");
      }

      return responseData;

    } finally {
      setIsLoading(false);
    }
  }

  return {
    resetPassword,
    isLoading,
  };
}