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

  const [errors, setErrors] = useState({
    reset_token: "",
    password: "",
    confirmPassword: "",
  });

  const [toast, setToast] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const { resetPassword, isLoading } = useResetPassword();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (isLoading) return;

    const newErrors = {
      reset_token: !formData.reset_token
        ? "Nulstillingskode er påkrævet"
        : "",
      password: !formData.password
        ? "Ny adgangskode er påkrævet"
        : "",
      confirmPassword: !formData.confirmPassword
        ? "Bekræft adgangskode"
        : formData.password !== formData.confirmPassword
        ? "Adgangskoderne matcher ikke"
        : "",
    };

    setErrors(newErrors);

    if (
      newErrors.reset_token ||
      newErrors.password ||
      newErrors.confirmPassword
    ) {
      setToast("");
      setSuccessMessage("");
      return;
    }

    setToast("");
    setSuccessMessage("Nulstiller adgangskode...");

    try {
      await resetPassword({
        reset_token: formData.reset_token,
        password: formData.password,
      });

      setSuccessMessage(
        "Din adgangskode er blevet nulstillet."
      );

      setTimeout(() => {
        router.push("/login");
      }, 1500);

    } catch (error) {
      setToast(
        error instanceof Error
          ? error.message
          : "Noget gik galt"
      );

      setSuccessMessage("");
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

          {errors.reset_token && (
            <p className="mt-2 text-sm text-red-400">
              {errors.reset_token}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-bold text-(--brand-green-white-bg)">
            Ny adgangskode
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Indtast ny adgangskode"
              value={formData.password}
              onChange={handleChange}
              className="rounded-xl w-full bg-[#303030] text-white placeholder:text-[#9d9d9d] p-5 pr-20 transition-all duration-200 focus:ring-0 focus:outline-none focus:border focus:border-(--brand-green-white-bg)"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#bdbdbd]"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {errors.password && (
            <p className="mt-2 text-sm text-red-400">
              {errors.password}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-bold text-(--brand-green-white-bg)">
            Gentag adgangskode
          </label>

          <div className="relative">
            <input
              type={
                showConfirmPassword ? "text" : "password"
              }
              name="confirmPassword"
              placeholder="Gentag adgangskode"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="rounded-xl w-full bg-[#303030] text-white placeholder:text-[#9d9d9d] p-5 pr-20 transition-all duration-200 focus:ring-0 focus:outline-none focus:border focus:border-(--brand-green-white-bg)"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#bdbdbd]"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-400">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <Button
          text={
            isLoading
              ? "Nulstiller..."
              : "Nulstil adgangskode"
          }
          variant="submit"
          type="submit"
          disabled={isLoading}
        />

        {successMessage && (
          <p className="mt-4 rounded-xl bg-green-100 px-4 py-3 text-green-700 text-center">
            {successMessage}
          </p>
        )}

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