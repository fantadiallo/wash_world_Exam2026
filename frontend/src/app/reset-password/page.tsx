import Navigation from "@/src/components/navigation/Navigation";
import PageContainer from "@/src/components/containers/PageContainer";
import ResetPasswordForm from "@/src/components/auth/ResetPasswordForm";
import Layout from "../layout";
import Footer from "@/src/components/layout/Footer";

export default function ResetPasswordPage() {
  return (
    <Layout>
      <Navigation />
      <PageContainer>
      <ResetPasswordForm />
    </PageContainer>
    <Footer
            address="Dynamovej 4, 2860 Søborg"
            phone="+45 70 70 70 70"
          />
    </Layout>
  );
}