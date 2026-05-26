import RegisterForm from "@/src/components/auth/RegisterForm";
import Navigation from "@/src/components/navigation/Navigation";
import Layout from "../layout";
import PageContainer from "@/src/components/containers/PageContainer";
import Section from "@/src/components/sections/Section";
import Footer from "@/src/components/layout/Footer";

export default function Register() {
  return (
    <>
      <Layout>
      <Navigation />

      <main className="min-h-screen flex items-center justify-center">
      <RegisterForm />
      </main>
      <Footer
       address="Dynamovej 4, 2860 Søborg"
       phone="+45 70 70 70 70"
      />
      </Layout>
    </>
  );
}