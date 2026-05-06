import Layout from "@/src/app/layout"
import Navigation from "@/src/components/navigation/Navigation"
import PageContainer from "@/src/components/containers/PageContainer"

export default function Profile()
{
  return (
    <Layout>
      <Navigation />
      <PageContainer>
        {/* profile content goes here */}
      </PageContainer>
    </Layout>
  )
}