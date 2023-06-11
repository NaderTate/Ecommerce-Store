import NextAuth from "next-auth";
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import { getAdmins } from "@/lib/admins";
import { updateAdminAction } from "@/app/_actions";
const { admins } = await getAdmins(1, 99999);
const emails = [];
admins.map(({ email }) => {
  emails.push(email);
});
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: async ({ session, token, user }) => {
      if (emails.includes(session?.user?.email)) {
        const foundAdmin = admins.find(
          (admin) => admin.email == session?.user?.email
        );
        updateAdminAction(
          foundAdmin.id,
          session?.user?.name,
          session?.user?.email,
          session?.user?.image
        );
        return session;
      } else {
        return false;
      }
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
