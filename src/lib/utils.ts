import { ActionResponse } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { AppwriteException } from "node-appwrite";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getFirstNameInitial(name: string): string {
  return name.charAt(0).toUpperCase();
}

export function formatErrorMessage(error: unknown): ActionResponse {
  const success = false;
  let message = "An unknown error occurred. Please try again.";

  // handle Appwrite exceptions
  if (error instanceof AppwriteException) {
    switch (error.type) {
      case "user_invalid_credentials":
        message = error.message;
    }
  }

  return {
    success,
    message,
  };
}
