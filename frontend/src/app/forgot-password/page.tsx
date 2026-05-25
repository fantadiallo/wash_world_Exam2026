import ForgotPasswordForm from "@/src/components/auth/ForgotPasswordForm";
import PageContainer from "@/src/components/containers/PageContainer";
import Navigation from "@/src/components/navigation/Navigation";
import Layout from "../layout";


export default function ForgotPasswordPage() {
  return (
    <Layout>
    <Navigation />
      <PageContainer>
      <ForgotPasswordForm />
    </PageContainer>
    </Layout>
  );
}