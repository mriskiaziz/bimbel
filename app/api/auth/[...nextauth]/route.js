import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        return {
          email: "admin@gmail.com",
          role: "admin",
          image: "rty",
          name: "admin",
          access_token: "some_access_token",
        };
      },
    }),
  ],
  adapter: PrismaAdapter(prisma), // Pastikan PrismaAdapter digunakan
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.image = user.image;
        token.accessToken = user.access_token || null;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.role = token.role;
      session.user.image = token.image;
      return session;
    },
  },
};
