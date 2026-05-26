import ForgotPasswordForm from "@/src/components/auth/ForgotPasswordForm";
import PageContainer from "@/src/components/containers/PageContainer";
import Navigation from "@/src/components/navigation/Navigation";
import Layout from "../layout";
import Footer from "@/src/components/layout/Footer";


export default function ForgotPasswordPage() {
  return (
    <Layout>
    <Navigation />
      <PageContainer>
      <ForgotPasswordForm />
    </PageContainer>
    <Footer
            address="Dynamovej 4, 2860 Søborg"
            phone="+45 70 70 70 70"
          />
    </Layout>
  );
}