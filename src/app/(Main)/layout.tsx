import Layout from "@/components/Layout"
import ImageErrorHandler from "@/misc/ImageErrorHandler"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ImageErrorHandler>
      <Layout>
        {children}
      </Layout>
    </ImageErrorHandler>
  )
}
