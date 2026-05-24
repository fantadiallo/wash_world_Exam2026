"use client";

import { useState } from "react";

import type { ForgotPasswordData } from "@/src/types/forgotPassword";

export function useForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);

  async function forgotPassword(data: ForgotPasswordData) {
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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