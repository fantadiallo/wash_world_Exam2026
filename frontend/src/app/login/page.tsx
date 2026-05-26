import LoginForm from "@/src/components/auth/LoginForm";
import Navigation from "@/src/components/navigation/Navigation";
import Layout from "../layout";
import PageContainer from "@/src/components/containers/PageContainer";
import Footer from "@/src/components/layout/Footer";

export default function Login() {
  return (
    <Layout>
      <Navigation />
      <PageContainer>
        <LoginForm />
      </PageContainer>
       <Footer
               address="Dynamovej 4, 2860 Søborg"
               phone="+45 70 70 70 70"
             />
    </Layout>
  );
}