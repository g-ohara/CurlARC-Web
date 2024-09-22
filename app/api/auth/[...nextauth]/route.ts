// pages/api/auth/[...nextauth].ts
import NextAuth, { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET!,
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.idToken = token.idToken as string;

      // バックエンドにリクエストを送信して認証
      const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;
      if (session?.user?.email && session?.user?.name) {
        const response = await fetch(`${baseURL}/authorize`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_token: token.idToken,
            name: session.user.name,
            email: session.user.email,
          }),
        });

        const resJSON = await response.json();
        if (resJSON.data.user.id) {
          session.user.id = resJSON.data.user.id;
        }

        if (resJSON.data.accessToken) {
          session.backendAccessToken = resJSON.data.accessToken;
          cookies().set("access_token", resJSON.data.accessToken, {
            maxAge: 30 * 24 * 60 * 60, // 30 days
          });
        }
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
