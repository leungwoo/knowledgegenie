import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
//import AppleProvider from "next-auth/providers/apple";
//import EmailProvider from "next-auth/providers/email";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: "",
      clientSecret: "",
    }),
    // OAuth authentication providers
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET,
    // }),
    // Sign in with passwordless email link
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: "<no-reply@example.com>",
    // }),
  ],
  async session({ session }) {},
  async signIn({ profile }) {},
});

export { handler as GET, handler as POST };
