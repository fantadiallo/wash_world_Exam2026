"use client";

import { useState } from "react";
import Button from "../buttons/Button";
import type { LoginFormData } from "../../types/login";
import Heading from "../headings/Heading";


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
    <div className="flex flex-col gap-3 mt-[125px] h-fit items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-fit rounded-md bg-white text-white p-8 min-w-[300px] w-full max-w-md"
      >
      
      <Heading variant="form_heading">
          Log ind
      </Heading>

      <div className="mb-6">
        <label className="block mb-2 font-bold text-(--brand-green-white-bg)">E-mail</label>
        <input
          type="email"
          name="email"
          placeholder="Indtast e-mail"
          value={formData.email}
          onChange={handleChange}
          className="rounded-md w-full bg-(--gray-eighty) p-4 transition-outline duration-150 ease-in focus:ring-0 focus:outline-2 focus:outline-(--brand-green-white-bg)"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-2 font-bold text-(--brand-green-white-bg)">Adgangskode</label>
        <input
          type="password"
          name="password"
          placeholder="Indtast adgangskode"
          value={formData.password}
          onChange={handleChange}
          className="rounded-md w-full bg-(--gray-eighty) p-4 transition-outline duration-150 ease-in focus:ring-0 focus:outline-2 focus:outline-(--brand-green-white-bg)"
        />
        
      </div>

      <Button
        text="Log ind"
        variant="submit"
      />
    </form>

      <p className="text-(--solid-white) text-center">
        Har du <Button variant="text" as="link" href="#" text="glemt din adgangskode?" />
      </p>
    </div>
   
  );
}