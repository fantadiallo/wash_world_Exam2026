import LoginForm from "@/src/components/auth/LoginForm";
import Navigation from "@/src/components/navigation/Navigation";

export default function login () {
    return (
        <>
        <Navigation/>

        <main className="min-h-screen flex items-center justify-center">
        <LoginForm />
        </main>
        </>
        
    )
}