import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: "",
      clientSecret: "",
    }),
    

    // ...add more providers here
  ],
  
};

export default NextAuth(authOptions);
