import { handleHeaders } from "@/helpers/hooks/api-hooks";
import jwt from "jsonwebtoken";

const route = "user";

export const getUserInfo = async (userId: string) => {
  try {
    const data = await fetch(`/api/${route}/${userId}`, {
      method: "GET",
      headers: handleHeaders(true),
    });
    return await data.json();
  } catch (error) {
    console.error("Error fetching User Info:", error);
    throw error;
  }
};

export const updateUser = async (id: string, body: object) => {
  try {
    const response = await fetch(`/api/${route}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: handleHeaders(true, true),
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(
        `HTTP error! status: ${response.status}, details: ${errorDetails.error}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Update user failed:", error);
    throw error;
  }
};

export const verifyToken = (token: string) => {
  try {
    const verifiedToken = jwt.verify(
      token as string,
      process.env.NEXT_PUBLIC_SECRET as string
    );

    return verifiedToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};
