"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-toastify";

/**
 * Higher-order component to protect admin routes
 * Ensures only authenticated users with admin or vendor roles can access
 */
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, loading, isAuthenticated, isAdmin, isVendor } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait for auth to load
    if (loading) return;

    // Check if user is authenticated
    if (!isAuthenticated) {
      toast.error("Please login to access this page");
      router.push("/en/auth/login");
      return;
    }

    // Check role-based access
    if (requiredRole === "admin" && !isAdmin) {
      toast.error("Access denied. Admin privileges required.");
      router.push("/en/auth/login");
      return;
    }

    // For admin panel, allow both admin and vendor
    if (!isAdmin && !isVendor) {
      toast.error("Access denied. This panel is for admins and vendors only.");
      router.push("/en/auth/login");
      return;
    }

    // Check if account is active
    if (user?.status === 0) {
      toast.error("Your account has been deactivated. Please contact support.");
      router.push("/en/auth/login");
      return;
    }
  }, [user, loading, isAuthenticated, isAdmin, isVendor, router, requiredRole]);

  // Show loading state
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          flexDirection: "column",
        }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p style={{ marginTop: "20px" }}>Verifying authentication...</p>
      </div>
    );
  }

  // If not authenticated or not authorized, don't render children
  if (!isAuthenticated || (!isAdmin && !isVendor)) {
    return null;
  }

  // Render protected content
  return <>{children}</>;
};

export default ProtectedRoute;
