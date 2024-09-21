import { DefaultSession } from "next-auth";

// 1. Extending the default User type
declare module "next-auth" {
  interface Session {
    user: {
      /** The user's unique ID (from database) */
      id: string;
      googleId?: string | null; // Optional googleId for linking providers
    } & DefaultSession["user"];
  }

  interface User {
    /** The user's unique ID (from database) */
    id: string;
    googleId?: string | null; // Google provider-specific ID
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    /** The user's unique ID (from database) */
    id: string;
    googleId?: string | null;
  }
}
