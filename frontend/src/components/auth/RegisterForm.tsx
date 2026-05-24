"use client";

import { useState } from "react";
import Button from "../buttons/Button";
import type { RegisterFormData } from "../../types/register";
import Heading from "../headings/Heading";
import { useRouter, useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/src/lib/api";

export default function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const membershipId = searchParams.get("membership");

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

    if (
      !formData.name ||
      !formData.last_name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setToast("Alle felter skal udfyldes");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setToast("Adgangskoderne matcher ikke");
      return;
    }

    setToast("");
    setIsSubmitting(true);
    setOptimisticMessage("Opretter konto...");

    const { confirmPassword, ...dataToBackend } = formData;

    try {
      const res = await fetch(`${API_BASE_URL}/register-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToBackend),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Kunne ikke oprette konto");
      }

      setOptimisticMessage("Konto oprettet! Du sendes til login...");

      setTimeout(() => {
        if (membershipId) {
          router.push(`/login?membership=${membershipId}`);
        } else {
          router.push("/login");
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
    <div className="grid place-content-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-fit rounded-2xl bg-[#202020] text-white px-8 py-10 min-w-[300px] w-[90vw] max-w-md shadow-2xl border border-[#333]"
        method="POST"
      >
        <Heading variant="form_heading">Opret bruger</Heading>

        <p className="mb-6 text-[#bdbdbd] text-lg">
          Bliv en del af Wash World
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
            Fornavn
          </label>

          <input
            type="text"
            name="name"
            placeholder="Indtast fornavn"
            value={formData.name}
            onChange={handleChange}
            className="rounded-xl w-full bg-[#303030] text-white placeholder:text-[#9d9d9d] p-5 transition-all duration-200 focus:ring-0 focus:outline-none focus:border focus:border-(--brand-green-white-bg)"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-bold text-(--brand-green-white-bg)">
            Efternavn
          </label>

          <input
            type="text"
            name="last_name"
            placeholder="Indtast efternavn"
            value={formData.last_name}
            onChange={handleChange}
            className="rounded-xl w-full bg-[#303030] text-white placeholder:text-[#9d9d9d] p-5 transition-all duration-200 focus:ring-0 focus:outline-none focus:border focus:border-(--brand-green-white-bg)"
          />
        </div>

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

        <div className="mb-8">
          <label className="block mb-2 font-bold text-(--brand-green-white-bg)">
            Gentag adgangskode
          </label>

          <input
            type="password"
            name="confirmPassword"
            placeholder="Gentag adgangskode"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="rounded-xl w-full bg-[#303030] text-white placeholder:text-[#9d9d9d] p-5 transition-all duration-200 focus:ring-0 focus:outline-none focus:border focus:border-(--brand-green-white-bg)"
          />
        </div>

        <Button
          text={isSubmitting ? "Opretter..." : "Opret konto"}
          variant="primary"
          type="submit"
          disabled={isSubmitting}
          className="w-full justify-center text-xl py-4"
        />

        <p className="text-center mt-6 text-[#bdbdbd]">
          Har du allerede en konto?{" "}
          <Button
            variant="text"
            as="link"
            href={membershipId ? `/login?membership=${membershipId}` : "/login"}
            text="Log ind"
          />
        </p>
      </form>
    </div>
  );
}