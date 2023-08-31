import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { PrismaClient, User } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { NextAuthOptions } from 'next-auth'

const prisma = new PrismaClient();
export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.JWT_SECRET,
  providers: [
    // GoogleProvider({
    //     clientId: process.env.GOOGLE_CLIENT_ID,
    //     clientSecret: process.env.GOOGLE_SECRET_KEY,
    // }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    }),

  ],
  callbacks: {
    session({ session, user, token }) {
      let u = user as User
      u.privateKey = null // Don't send private key to client
      session.user = u
      return session;
    },
  }
}

export default NextAuth(options)