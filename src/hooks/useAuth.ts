import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useStore, User } from "@/store/useStore";

/**
 * useAuth hook (Client-Side Route Protection)
 * 
 * Redirects unauthenticated users to `/login`.
 * Restricts access for roles that do not match `requiredRole`.
 */
export const useAuth = (requiredRole?: User["role"]) => {
  const user = useStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    // 1. If no user exists, kick them to login
    if (!user) {
      router.push("/login");
      return;
    } 
    
    // 2. If a specific role is required (e.g. "admin"), and user doesn't have it, kick them home
    if (requiredRole && user.role !== requiredRole) {
      router.push("/");
    }
  }, [user, requiredRole, router]);

  return { user };
};
