"use client";

import { useState } from "react";

import { API_BASE_URL } from "../lib/api";


export function useForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);

  async function forgotPassword(email: string) {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(
          responseData.message || "Something went wrong"
        );
      }

      return responseData;

    } finally {
      setIsLoading(false);
    }
  }

  return {
    forgotPassword,
    isLoading,
  };
}