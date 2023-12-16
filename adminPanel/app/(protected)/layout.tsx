import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Sidebar from "../components/Sidebar";

type Props = { children: React.ReactNode };
export default async function RootLayout({ children }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return (
    <div className="sm:ml-44 p-5 ">
      <Sidebar
        name={session?.user?.name || ""}
        email={session?.user?.email || ""}
        image={session?.user?.image || ""}
      />
      {children}
    </div>
  );
}
