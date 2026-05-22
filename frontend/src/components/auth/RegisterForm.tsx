"use client";

import { useState } from "react";
import Button from "../buttons/Button";
import type { RegisterFormData } from "../../types/register";
import Heading from "../headings/Heading";

/**
 * RegisterForm component
 * Handles user registration input and validation
 */
export default function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    last_name: "",
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
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Adgangskoderne matcher ikke");
      return;
    }

    const { confirmPassword, ...dataToBackend } = formData;

    try
    {
        const res = await fetch('http://127.0.0.1/register-user', {
          method: 'POST',
          headers:
          {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify(dataToBackend)
        })

        if(!res.ok)
        {
          throw new Error(`Error: ${res.status}`)
        }

        const data = await res.json()
        console.log("User created: ", dataToBackend);
    }
    catch(err)
    {
      console.error(`Error creating user: ${err}`)
    }

    
    
  }

  return (
    <div className="grid place-content-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-fit rounded-md bg-white text-white p-8 min-w-[300px] w-full max-w-md"
        method="POST"
      >
        <Heading variant="form_heading">
          Opret bruger
        </Heading>

        <p className="mb-4 text-(--gray-sixty)">
          Bliv en del af Wash World
        </p>

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
            className="rounded-md w-full bg-(--gray-eighty) p-4 transition-outline duration-150 ease-in focus:ring-0 focus:outline-2 focus:outline-(--brand-green-white-bg)"
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
            className="rounded-md w-full bg-(--gray-eighty) p-4 transition-outline duration-150 ease-in focus:ring-0 focus:outline-2 focus:outline-(--brand-green-white-bg)"
          />
        </div>

        {/* Original E-mail field kept */}
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
            className="rounded-md w-full bg-(--gray-eighty) p-4 transition-outline duration-150 ease-in focus:ring-0 focus:outline-2 focus:outline-(--brand-green-white-bg)"
          />
        </div>

        {/* Original password field kept */}
        <div className="mb-8">
          <label className="block mb-2 font-bold text-(--brand-green-white-bg)">
            Adgangskode
          </label>

          <input
            type="password"
            name="password"
            placeholder="Indtast adgangskode"
            value={formData.password}
            onChange={handleChange}
            className="rounded-md w-full bg-(--gray-eighty) p-4 transition-outline duration-150 ease-in focus:ring-0 focus:outline-2 focus:outline-(--brand-green-white-bg)"
          />
        </div>

        {/* Original confirm password field kept */}
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
            className="rounded-md w-full bg-(--gray-eighty) p-4 transition-outline duration-150 ease-in focus:ring-0 focus:outline-2 focus:outline-(--brand-green-white-bg)"
          />
        </div>

      <Button 
        as="link"
        href="/login"
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