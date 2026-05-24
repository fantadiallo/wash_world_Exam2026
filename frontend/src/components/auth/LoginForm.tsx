"use client";

import { useState } from "react";
import Button from "../buttons/Button";
import type { LoginFormData } from "../../types/login";
import Heading from "../headings/Heading";
import { useAuth } from "@/src/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const membershipId = searchParams.get("membership");

  const { login, isLoading } = useAuth();
  const [toast, setToast] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [optimisticMessage, setOptimisticMessage] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setToast("Alle felter skal udfyldes");
      return;
    }

    setToast("");
    setIsSubmitting(true);
    setOptimisticMessage("Logger ind...");

    try {
      await login(formData);
      setOptimisticMessage("Du er logget ind!");

      setTimeout(() => {
        if (membershipId) {
          router.push(`/subscription?membership=${membershipId}`);
        } else {
          router.push("/profile");
        }
      }, 1000);

    } catch (error) {
      setToast(error instanceof Error ? error.message : "Noget gik galt");
      setOptimisticMessage("");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 mt-[80px] h-fit items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-fit rounded-2xl bg-[#202020] text-white px-8 py-10 min-w-[300px] w-[90vw] max-w-md shadow-2xl border border-[#333]"
        method="POST"
      >
        <Heading variant="form_heading">Log ind</Heading>

        <p className="mb-6 text-[#bdbdbd] text-lg">
          Velkommen tilbage til Wash World
        </p>

        {toast && (
          <p className="mb-4 rounded-xl bg-red-100 px-4 py-3 text-red-700">
            {toast}
          </p>
        )}

        {optimisticMessage && (
          <p className="mb-4 rounded-xl bg-green-100 px-4 py-3 text-green-700">
            {optimisticMessage}
          </p>
        )}

        <div className="mb-6">
          <label className="block mb-2 font-bold text-(--brand-green-white-bg)">
            E-mail
          </label>

          <input
            type="email"
            name="email"
            placeholder="Indtast e-mail"
            value={formData.email}
            onChange={handleChange}
            className="rounded-xl w-full bg-[#303030] text-white placeholder:text-[#9d9d9d] p-5 transition-all duration-200 focus:ring-0 focus:outline-none focus:border focus:border-(--brand-green-white-bg)"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-bold text-(--brand-green-white-bg)">
            Adgangskode
          </label>

          <input
            type="password"
            name="password"
            placeholder="Indtast adgangskode"
            value={formData.password}
            onChange={handleChange}
            className="rounded-xl w-full bg-[#303030] text-white placeholder:text-[#9d9d9d] p-5 transition-all duration-200 focus:ring-0 focus:outline-none focus:border focus:border-(--brand-green-white-bg)"
          />
        </div>

        <Button
          text={isSubmitting || isLoading ? "Logger ind..." : "Log ind"}
          variant="submit"
          type="submit"
          disabled={isSubmitting || isLoading}
        />

        <p className="text-center mt-6 text-[#bdbdbd]">
          Har du ikke en konto?{" "}
          <Button
            variant="text"
            as="link"
            href={membershipId ? `/register?membership=${membershipId}` : "/register"}
            text="Opret bruger"
          />
        </p>
      </form>

      <p className="text-(--solid-white) text-center">
        Har du{" "}
        <Button
          variant="text"
          as="link"
          href="#"
          text="glemt din adgangskode?"
        />
      </p>
    </div>
  );
}