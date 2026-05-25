import Layout from "../layout";
import PageContainer from "@/src/components/containers/PageContainer";
import Footer from "@/src/components/layout/Footer";
import ProfileClient from "@/src/components/profile/ProfileClient";
import Navigation from "@/src/components/navigation/Navigation";

export default function ProfilePage() {
  return (
    <Layout>
      <Navigation />
      <PageContainer>
        <ProfileClient />
      </PageContainer>

      <Footer
        address="Dynamovej 4, 2860 Søborg"
        phone="+45 70 70 70 70"
      />
    </Layout>
  );
}