"use client";

import { redirect, usePathname } from "next/navigation";

function Page() {
  const pathname = usePathname();

  // TODO: because matcher is set in the middleware.ts, do i still need this?
  if (pathname === "/") redirect("/dashboard");
}

export default Page;
