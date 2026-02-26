export interface AppUser {
  id: string;
  email: string;
}

export async function requireUser(): Promise<AppUser> {
  // Replace with your auth provider integration (Clerk, Auth.js, Supabase, etc).
  return {
    id: "dev-user",
    email: "dev@neonglass.local",
  };
}
