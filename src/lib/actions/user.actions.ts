"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { formatErrorMessage } from "@/lib/utils";
import { signInUserSchema } from "@/lib/validators";
import { ActionResponse } from "@/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Models } from "node-appwrite";
import { z } from "zod";

export async function signInUser(
  data: z.infer<typeof signInUserSchema>,
): Promise<ActionResponse> {
  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession({
      email: data.email,
      password: data.password,
    });

    (await cookies()).set("session", session.secret, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      expires: new Date(session.expire),
      path: "/",
    });

    return {
      success: true,
      message: "You have successfully signed in.",
    };
  } catch (error) {
    return formatErrorMessage(error);
  }
}

export async function logoutUser(): Promise<void> {
  const sessionCookie = (await cookies()).get("session");

  try {
    const { account } = await createSessionClient(sessionCookie?.value);

    await account.deleteSession({ sessionId: "current" });
  } catch (error) {
    console.log(error);
  }

  (await cookies()).delete("session");

  redirect("/sign-in");
}

export async function getUser(): Promise<Models.User<Models.Preferences> | null> {
  const sessionCookie = (await cookies()).get("session");

  try {
    const { account } = await createSessionClient(sessionCookie?.value);

    const user = await account.get();

    return user;
  } catch (error) {
    return null;
  }
}
