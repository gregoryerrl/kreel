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
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Emails", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase();

        console.log(credentials);
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (user) {
          if (!user.password) return null;
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          console.log(isPasswordCorrect);

          if (isPasswordCorrect) return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      await connectToDatabase();

      if (account?.provider !== "google" || !profile?.email) {
        return false; // Return false to prevent the sign-in
      }
      // Handle Google sign-in
      if (account?.provider === "google") {
        // Check if user with Google email already exists
        const existingUser = await prisma.user.findFirst({
          where: { email: profile?.email },
        });

        if (existingUser) {
          // If user exists, link Google account if it's not already linked
          if (!existingUser.googleId) {
            await prisma.user.update({
              where: { email: profile?.email },
              data: { googleId: account?.providerAccountId },
            });
          }
          return true; // Sign in success
        } else {
          // Create new user if one doesn't exist
          await prisma.user.create({
            data: {
              email: profile.email,
              googleId: account?.providerAccountId,
              name: profile?.name,
            },
          });
          return true; // Sign in success
        }
      }
      return true;
    },

    // This is called to customize the token before sending to the client
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    // This function is triggered whenever a session is checked or created
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
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
