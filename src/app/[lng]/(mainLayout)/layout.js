import Layout from "@/layout";

export default async function RootLayout({ children, params }) {
  const { lng } = await params; // Await params to resolve the Promise
  return <Layout lng={lng}>{children}</Layout>;
}
