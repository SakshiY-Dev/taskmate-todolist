import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export function ProtectedRoute({ children }) {
  const user = useAuthStore((state) => state.user);

  console.log("ProtectedRoute: user", user); // Log the user state

  if (!user) {
    console.log("ProtectedRoute: No user, navigating to /login");
    return <Navigate to="/login" replace />;
  }

  console.log("ProtectedRoute: User found, rendering children");
  return <>{children}</>;
}
