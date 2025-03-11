import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

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

        // const user = await prisma.Akun.findUnique({
        //   where: { email: credentials.email },
        // });

        // if (!user || !user.password) {
        //   throw new Error("Invalid email or password");
        // }

        // const isValidPassword = await bcrypt.compare(
        //   credentials.password,
        //   user.password
        // );

        // if (!isValidPassword) {
        //   throw new Error("Invalid email or password");
        // }

        return credentials;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      console.log(token);
      if (user) {
        token.role = user.role;
        token.image = user.image;
        token.accessToken = user.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      console.log(session);
      session.accessToken = token.accessToken;
      session.user.role = token.role;
      session.user.image = token.image;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
