"use client";

import { redirect, usePathname } from "next/navigation";

function Page() {
  const pathname = usePathname();

  if (pathname === "/") redirect("/dashboard");
}

export default Page;
