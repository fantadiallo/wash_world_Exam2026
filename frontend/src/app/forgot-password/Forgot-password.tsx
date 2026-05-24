import ForgotPasswordForm from "@/src/components/auth/ForgotPasswordForm";
import PageContainer from "@/src/components/containers/PageContainer";
import Navigation from "@/src/components/navigation/Navigation";

export default function ForgotPasswordPage() {
  return (
    <PageContainer>
      <Navigation />
      <ForgotPasswordForm />
    </PageContainer>
  );
}