import LoginForm from "@/src/components/auth/LoginForm";
import Navigation from "@/src/components/navigation/Navigation";
import Layout from "../layout";
import PageContainer from "@/src/components/containers/PageContainer";

export default function Login() {
  return (
    <Layout>
      <Navigation />
      <PageContainer>
        <LoginForm />
      </PageContainer>
    </Layout>
  );
}