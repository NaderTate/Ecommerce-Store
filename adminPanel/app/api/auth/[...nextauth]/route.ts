import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
const adminsEmails: string[] = [];
// get the emails of all admins
prisma.admin.findMany({ select: { Email: true } }).then((admins) => {
  admins.forEach((admin) => {
    adminsEmails.push(admin.Email);
  });
});

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],

  callbacks: {
    async session({ session, user }: any) {
      // only return a session if the user is in the database
      if (adminsEmails.includes(user.email)) {
        session.user.id = user.id;
        return session;
      } else {
        return null;
      }
    },
  },

  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    maxAge: 10 * 24 * 60 * 60, // 10 days
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
