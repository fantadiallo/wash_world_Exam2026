import RegisterForm from "@/src/components/auth/RegisterForm";
import Navigation from "@/src/components/navigation/Navigation";
import Layout from "../layout";
import PageContainer from "@/src/components/containers/PageContainer";
import Section from "@/src/components/sections/Section";

export default function Register() {
  return (
    <Layout>
      <Navigation />
      <PageContainer>
        <Section variant="page">
          <RegisterForm />
        </Section>
      </PageContainer>
    </Layout>
  );
}