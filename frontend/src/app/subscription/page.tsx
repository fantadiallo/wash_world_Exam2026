import Layout from "../layout";
import Navigation from "@/src/components/navigation/Navigation";
import PageContainer from "@/src/components/containers/PageContainer";
import Section from "@/src/components/sections/Section";
import SubscriptionForm from "@/src/components/subscription/SubscriptionForm";
import Footer from "@/src/components/layout/Footer";

export default function SubscriptionPage() {
  return (
    <Layout>
      <Navigation />
      <PageContainer>
        <Section variant="page">
          <SubscriptionForm />
        </Section>
      </PageContainer>
      <Footer
        address="Dynamovej 4, 2860 Søborg"
        phone="+45 70 70 70 70"
      />
    </Layout>
  );
}