"use client";

import { useState } from "react";
import Button from "../buttons/Button";
import Heading from "../headings/Heading";
import { useForgotPassword } from "@/src/hooks/useForgotPassword";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [toast, setToast] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { forgotPassword, isLoading } = useForgotPassword();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
    setEmailError("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isLoading) return;

    if (!email) {
      setEmailError("E-mail er påkrævet");
      setToast("");
      setSuccessMessage("");
      return;
    }

    setEmailError("");
    setToast("");
    setSuccessMessage("Sender nulstillingskode...");

    try {
      await forgotPassword(email);

      setSuccessMessage(
        "Hvis e-mailen findes, er der sendt en nulstillingskode."
      );
    } catch (error) {
      setToast(error instanceof Error ? error.message : "Noget gik galt");
      setSuccessMessage("");
    }
  }

  return (
    <div className="flex flex-col gap-4 mt-[80px] h-fit items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-fit rounded-2xl bg-[#202020] text-white px-8 py-10 min-w-[300px] w-[90vw] max-w-md shadow-2xl border border-[#333]"
      >
        <Heading variant="form_heading">Glemt adgangskode</Heading>

        <p className="mb-6 text-[#bdbdbd] text-lg">
          Indtast din e-mail, så sender vi en nulstillingskode.
        </p>

        {toast && (
          <p className="mb-4 rounded-xl bg-red-100 px-4 py-3 text-red-700">
            {toast}
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
            value={email}
            onChange={handleChange}
            className="rounded-xl w-full bg-[#303030] text-white placeholder:text-[#9d9d9d] p-5 transition-all duration-200 focus:ring-0 focus:outline-none focus:border focus:border-(--brand-green-white-bg)"
          />

          {emailError && (
            <p className="mt-2 text-sm text-red-400">{emailError}</p>
          )}
        </div>

        <Button
          text={isLoading ? "Sender..." : "Send nulstillingskode"}
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
          Har du allerede en kode?{" "}
          <Button
            variant="text"
            as="link"
            href="/reset-password"
            text="Nulstil adgangskode"
          />
        </p>
      </form>
    </div>
  );
}