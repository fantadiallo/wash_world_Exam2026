"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Button from "../buttons/Button";
import Heading from "../headings/Heading";

import { useResetPassword } from "@/src/hooks/useResetPassword";

export default function ResetPasswordForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    reset_token: "",
    password: "",
    confirmPassword: "",
  });

  const [toast, setToast] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { resetPassword, isLoading } = useResetPassword();

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
      !formData.reset_token ||
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
    setSuccessMessage("");

    try {
      await resetPassword({
        reset_token: formData.reset_token,
        password: formData.password,
      });

      setSuccessMessage("Din adgangskode er blevet nulstillet.");

      setTimeout(() => {
        router.push("/login");
      }, 1500);

    } catch (error) {
      setToast(error instanceof Error ? error.message : "Noget gik galt");
    }
  }

  return (
    <div className="flex flex-col gap-4 mt-[80px] h-fit items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-fit rounded-2xl bg-[#202020] text-white px-8 py-10 min-w-[300px] w-[90vw] max-w-md shadow-2xl border border-[#333]"
      >
        <Heading variant="form_heading">
          Nulstil adgangskode
        </Heading>

        <p className="mb-6 text-[#bdbdbd] text-lg">
          Indtast din nulstillingskode og vælg en ny adgangskode.
        </p>

        {toast && (
          <p className="mb-4 rounded-xl bg-red-100 px-4 py-3 text-red-700">
            {toast}
          </p>
        )}

        {successMessage && (
          <p className="mb-4 rounded-xl bg-green-100 px-4 py-3 text-green-700">
            {successMessage}
          </p>
        )}

        <div className="mb-6">
          <label className="block mb-2 font-bold text-(--brand-green-white-bg)">
            Nulstillingskode
          </label>

          <input
            type="text"
            name="reset_token"
            placeholder="Indtast nulstillingskode"
            value={formData.reset_token}
            onChange={handleChange}
            className="rounded-xl w-full bg-[#303030] text-white placeholder:text-[#9d9d9d] p-5 transition-all duration-200 focus:ring-0 focus:outline-none focus:border focus:border-(--brand-green-white-bg)"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-bold text-(--brand-green-white-bg)">
            Ny adgangskode
          </label>

          <input
            type="password"
            name="password"
            placeholder="Indtast ny adgangskode"
            value={formData.password}
            onChange={handleChange}
            className="rounded-xl w-full bg-[#303030] text-white placeholder:text-[#9d9d9d] p-5 transition-all duration-200 focus:ring-0 focus:outline-none focus:border focus:border-(--brand-green-white-bg)"
          />
        </div>

        <div className="mb-6">
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
          text={isLoading ? "Nulstiller..." : "Nulstil adgangskode"}
          variant="submit"
          type="submit"
          disabled={isLoading}
        />

        <p className="text-center mt-6 text-[#bdbdbd]">
          Tilbage til{" "}
          <Button
            variant="text"
            as="link"
            href="/login"
            text="log ind"
          />
        </p>
      </form>
    </div>
  );
}