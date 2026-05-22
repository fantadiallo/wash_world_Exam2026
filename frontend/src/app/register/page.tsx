import RegisterForm from "@/src/components/auth/RegisterForm";
import Navigation from "@/src/components/navigation/Navigation";

export default function Register() {
  return (
    <>
      <Navigation />

      <main className="min-h-screen flex items-center justify-center">
        <RegisterForm />
      </main>
    </>
  );
}