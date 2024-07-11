import { UserFormData } from "@/components/home-page";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createUser = async (user: UserFormData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/create-user`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to create user");
    }

    return res.json();
  } catch (error: any) {
    console.log(error?.message || "Something went wrong...");
  }
};

export const fetchAllUsers = async (): Promise<UserFormData[] | undefined> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
    if (!res.ok) {
      throw new Error("Failed to create user");
    }

    const { data } = await res.json();
    console.log(`data -> `, data);
    return data;
  } catch (error: any) {
    console.log(error?.message || "Something went wrong...");
  }
};
