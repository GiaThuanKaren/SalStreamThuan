import { signInCallBack } from './../../../src/utils/index';
import NextAuth, { Account, User, AuthOptions, Session } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise, { uri } from "src/utils/lib/mongodb";
import { MongoClient } from 'mongodb';
import { AdapterUser } from 'next-auth/adapters';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import prisma3 from "src/utils/lib/prismadb"


export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma3),
  providers: [
    GoogleProvider({
      clientId:
        process.env.NEXT_PUBLIC_GGID as string,
      clientSecret: process.env.NEXT_PUBLIC_GGSEC as string,

    }),
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FBID as string,
      clientSecret: process.env.NEXT_PUBLIC_FBSEC as string,
    }),


    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {

      return true
    },
    async session({ session, user, token }: {
      session: any
      user: User,
      token: any
    }) {
      if (session) {
        session.user.id = user.id
        session.user.token = token
      }
      return session
    },
  },
  // adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
