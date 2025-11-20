//https://next-auth.js.org/getting-started/example

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectToDatabase } from "./db";

export const authOptions: NextAuthOptions = {
  providers: [
    // 🔹 GOOGLE PROVIDER
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // 🔹 CREDENTIALS PROVIDER
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        console.log("AUTH CREDENTIALS:", credentials);
        await connectToDatabase();
        const user = await User.findOne({ email: credentials?.email });
        if (!user) return null;
        const isValid = await bcrypt.compare(credentials!.password, user.password);
        if (!isValid) return null;
        return { id: user._id.toString(), email: user.email };
      }
    }),
  ],

  // 🔹 JWT SESSIONS
  session: {
    strategy: "jwt",
  },

  // 🔹 CUSTOM LOGIN PAGE
  pages: {
    signIn: "/login",
  },

  // 🔹 OPTIONAL: HANDLE GOOGLE USER FIRST-TIME SIGN-IN
  callbacks: {
    async signIn({ user, account }) {
      console.log("AUTH CREDENTIALS:", user, account);
      if (account?.provider === "google") {
        await connectToDatabase();
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          // Create user in database if first time logging in with Google
          await User.create({
            email: user.email,
            password: "", // no password for google users
            name: user.name,
            provider: "google",
          });
        }
      }
      return true;
    },
  },
};