import Navigation from "@/src/components/navigation/Navigation";
import PageContainer from "@/src/components/containers/PageContainer";
import ResetPasswordForm from "@/src/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <PageContainer>
      <Navigation />
      <ResetPasswordForm />
    </PageContainer>
  );
}