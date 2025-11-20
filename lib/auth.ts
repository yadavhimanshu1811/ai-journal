//https://next-auth.js.org/getting-started/example

import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectToDatabase } from "./db";

export const authOptions: NextAuthOptions = {
  providers: [
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
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
};