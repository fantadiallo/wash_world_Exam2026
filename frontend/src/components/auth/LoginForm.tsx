"use client";

import { useState } from "react";
import Button from "../buttons/Button";
import type { LoginFormData } from "../../types/login";

/**
 * LoginForm component
 * Handles user login input and submission.
 */
export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  /**
   * Updates form state when user types in input fields
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

    console.log(formData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#333] text-white px-8 py-12 w-full max-w-md"
    >
      <h1 className="text-4xl font-bold mb-2">Log ind</h1>
      <p className="text-gray-400 mb-8">velkommen tilbage!</p>

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

      <div className="mb-3">
        <label className="block mb-2 font-bold">Adgangs kode</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full bg-[#1c1c1c] border border-[#555] px-4 py-4 text-white outline-none focus:border-[#06c167]"
        />
      </div>

      <button
        type="button"
        className="block ml-auto text-[#06c167] mb-6 hover:text-[#ff6b06]"
      >
        Glemt adgangskode?
      </button>

      <Button
        text="Log ind"
        variant="primary"
        className="w-full justify-center text-xl py-4"
      />

      <p className="text-center mt-6 text-xl underline">Bliv medlem?</p>
    </form>
  );
}