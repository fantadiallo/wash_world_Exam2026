import Navigation from "@/src/components/navigation/Navigation";
import PageContainer from "@/src/components/containers/PageContainer";
import ResetPasswordForm from "@/src/components/auth/ResetPasswordForm";
import Layout from "../layout";

export default function ResetPasswordPage() {
  return (
    <Layout>
      <Navigation />
      <PageContainer>
      <ResetPasswordForm />
    </PageContainer>
    </Layout>
  );
}