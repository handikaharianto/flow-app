import Header from "@/components/header";
import { getUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  if (!user) redirect("/sign-in");

  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default ProtectedLayout;
