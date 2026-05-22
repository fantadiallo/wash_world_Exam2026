"use client";

import { useState } from "react";
import Button from "../buttons/Button";
import type { RegisterFormData } from "../../types/register";

/**
 * RegisterForm component
 * Handles user registration input and validation
 */
export default function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  /**
   * Updates form state when user types
   */
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  /**
   * Handles form submission
   */
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Adgangskoderne matcher ikke");
      return;
    }

    const { confirmPassword, ...dataToBackend } = formData;

    console.log(dataToBackend);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#333] text-white px-8 py-12 w-full max-w-md"
    >
      <h1 className="text-4xl font-bold mb-2">Opret bruger</h1>
      <p className="text-gray-300 mb-8">Bliv en del av Wash World</p>

      <div className="mb-6">
        <label className="block mb-2 font-bold">Fulde navn</label>
        <input
          type="text"
          name="name"
          placeholder="indtast dit navn"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-[#1c1c1c] border border-[#555] px-4 py-4 text-white outline-none focus:border-[#06c167]"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-bold">E-mail</label>
        <input
          type="email"
          name="email"
          placeholder="indtast din e-mail"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-[#1c1c1c] border border-[#555] px-4 py-4 text-white outline-none focus:border-[#06c167]"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-bold">Adgangskode</label>
        <input
          type="password"
          name="password"
          placeholder="opret en adgangskode"
          value={formData.password}
          onChange={handleChange}
          className="w-full bg-[#1c1c1c] border border-[#555] px-4 py-4 text-white outline-none focus:border-[#06c167]"
        />
      </div>

      <div className="mb-8">
        <label className="block mb-2 font-bold">Gentag adgangskode</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Gentag din adgangskode"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full bg-[#1c1c1c] border border-[#555] px-4 py-4 text-white outline-none focus:border-[#06c167]"
        />
      </div>

      <Button
  text="Opret konto"
  variant="primary"
  className="w-full justify-center text-xl py-4"
/>

      <p className="text-center mt-4">
        Har du allerede en konto?{" "}
        <span className="text-[#06c167] underline cursor-pointer">
          Log ind
        </span>
      </p>
    </form>
  );
}