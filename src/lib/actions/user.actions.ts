"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { SignInUserResponse } from "@/types/user";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AppwriteException, Models } from "node-appwrite";

export async function signInUser(
  prevState: unknown,
  formData: FormData,
): Promise<SignInUserResponse> {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession({
      email: email as string,
      password: password as string,
    });

    (await cookies()).set("session", session.secret, {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      expires: new Date(session.expire),
      path: "/",
    });

    // redirect("/");

    return {
      success: true,
      message: "You have successfully signed in.",
    };
  } catch (error) {
    if (error instanceof AppwriteException) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "An unknown error occurred. Please try again.",
    };
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
