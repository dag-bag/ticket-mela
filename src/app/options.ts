import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const options: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "phone", type: "text", placeholder: "phone" },
        password: { label: "Password", type: "password" },
        orgNumber: { label: "OrgNumber", type: "number" },
      },
      async authorize(credentials) {
        const users = await getAllUsers();
        const user = users.find((user: any) => {
          return (
            credentials?.phone === user.email &&
            credentials?.password === user.password
          );
        });

        if (user) {
          return user;
        }

        throw new Error("Wrong Credentials");
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
};

async function getAllUsers() {
  const res = await fetch("http://localhost:3000/api/users");
  return res.json();
}
