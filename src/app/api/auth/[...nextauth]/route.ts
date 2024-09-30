import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/helpers/hooks/api-hooks";
import bcrypt from "bcrypt";
import prisma from "@/prisma";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    // --------------------------DOESNT WORK NEED REFACTORING---------------------
    //
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Emails", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     await connectToDatabase();

    //     console.log(credentials);
    //     if (!credentials || !credentials.email || !credentials.password)
    //       return null;

    //     const user = await prisma.user.findFirst({
    //       where: { email: credentials.email },
    //     });

    //     if (user) {
    //       if (!user.password) return null;
    //       const isPasswordCorrect = await bcrypt.compare(
    //         credentials.password,
    //         user.password
    //       );

    //       console.log(isPasswordCorrect);

    //       if (isPasswordCorrect) return user;
    //     }
    //     return null;
    //   },
    // }),
  ],
  callbacks: {
    // --------------------------DOESNT WORK NEED REFACTORING---------------------
    //
    // async signIn({ account, profile }) {
    //   try {
    //     // Only handle Google provider
    //     if (account?.provider === "google" && profile?.email) {
    //       await connectToDatabase();

    //       // Find existing user with the same email
    //       const existingUser = await prisma.user.findFirst({
    //         where: { email: profile.email },
    //       });

    //       if (existingUser) {
    //         // Link Google account if not already linked
    //         if (!existingUser.googleId) {
    //           await prisma.user.update({
    //             where: { email: profile.email },
    //             data: { googleId: account.providerAccountId },
    //           });
    //         }
    //       } else {
    //         // Create new user if one doesn't exist
    //         await prisma.user.create({
    //           data: {
    //             email: profile.email,
    //             googleId: account.providerAccountId,
    //             name: profile.name,
    //           },
    //         });
    //       }
    //       return true; // Sign in success
    //     }
    //     return false; // Prevent sign-in if not Google or missing email
    //   } catch (error) {
    //     console.error("Error in signIn callback:", error);
    //     return false; // Fail the sign-in process in case of errors
    //   }
    // },

    // Customize JWT creation before sending to the client
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Add user ID to the token
      }
      return token; // Return token as-is if no user data is available
    },

    // Customize the session object
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id; // Attach the user ID to the session
      }
      return session; // Return the session object
    },
  },

  pages: {
    signIn: "/auth/login",
  },
  // max age simplification
  // 86400 is 1 day
  // 86400 * 7
  session: {
    strategy: "jwt",
    updateAge: 86400 * 2,
    maxAge: 86400 * 7,
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
};
