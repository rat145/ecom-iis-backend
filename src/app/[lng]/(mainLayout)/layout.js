import Layout from "@/layout";
import ProtectedRoute from "@/components/common/ProtectedRoute";

export default async function RootLayout({ children, params }) {
  const { lng } = await params; // Await params to resolve the Promise
  
  return (
    <ProtectedRoute>
      <Layout lng={lng}>{children}</Layout>
    </ProtectedRoute>
  );
}

