import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import SideNavMenu from "../components/SideNavMenu";

type Props = { children: React.ReactNode };
export default async function RootLayout({ children }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  return (
    <div className="sm:ml-[200px]  p-4 ">
      <SideNavMenu
        name={session?.user?.name || ""}
        email={session?.user?.email || ""}
        image={session?.user?.image || ""}
      />
      {children}
    </div>
  );
}
