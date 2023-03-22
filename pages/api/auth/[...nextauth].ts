import { signInCallBack } from './../../../src/utils/index';
import NextAuth, { Account, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise, { uri } from "src/utils/lib/mongodb";
import { MongoClient } from 'mongodb';
import { AdapterUser } from 'next-auth/adapters';
async function getUserAccount(userId: string) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const accounts = client.db().collection('accounts');

    // const session = await sessions.findOne({})
    const account = await accounts.findOne({ user_id: userId });

    if (!account) {
      throw new Error('Account not found');
    }
    return account;
  } finally {
    await client.close();
  }
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId:
        process.env.NEXT_PUBLIC_GGID as string,
      clientSecret: "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",

    }),
    FacebookProvider({
      clientId: "587694192958530",
      clientSecret: "b9282dea25bb6acae1d59b4b22e1f7a3",
    }),


    // ...add more providers here
  ],

  callbacks: {

    session: async ({
      session,
      token,
      user,
      ...rest
    }: {
      session: any;
      token: any;
      user: any;
    }) => {
      console.log("Callback session 123", session, user)
      if (session?.user) {
        const account = await getUserAccount(session.user.id);
        session.user.accountId = account._id
        session.user.id = user.id;
        session.user.test = "jslkdjfll"
      }
      return session;
    },

  },
  event: {},
  adapter: MongoDBAdapter(clientPromise),
  secret: "giathuan",
};

export default NextAuth(authOptions);
