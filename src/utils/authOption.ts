import { pageUserLogin } from "@/service/pageUser";
import { NextAuthOptions } from "next-auth";
import Facebook from "next-auth/providers/facebook";

export const authOptions: NextAuthOptions = {
  providers: [
    Facebook({
      clientId: process.env.FACEBOOK_APP_ID as string,
      clientSecret: process.env.FACEBOOK_APP_SECRET as string,
      authorization: {
        params: {
          scope:
            "email,public_profile,pages_show_list,pages_read_engagement,pages_manage_posts,pages_manage_metadata",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log(user, account, profile);
      const pageUserData = {
        ...user,
        providerAccountId: account?.providerAccountId,
        access_token: account?.access_token,
        expires_at: account?.expires_at,
      };
      if (pageUserData) {
        try {
          const res = await pageUserLogin(pageUserData);
          console.log(res);
        } catch (error) {
          console.error("Login failed:", error);
        }
      }

      return true;
    },
    async jwt({ token, account }) {
      // Persist the OAuth access_token and user info to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.userId = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      session.accessToken = token.accessToken as string;
      session.userId = token.userId as string;
      return session;
    },
  },
};
