/* eslint-disable @typescript-eslint/no-explicit-any */

import { cookies } from "next/headers";
import { getAccessToken } from "./getAccessToken";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

// Detect runtime environment
const isServer = typeof window === "undefined";

// Function to get token from cookies (Server & Client)
const getAuthToken = async () => {
  if (isServer) {
    const cookieStore = await cookies();
    return cookieStore.get("accessToken")?.value;
  } else {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];
  }
};

export const apiRequest = async (
  endpoint: string,
  options: RequestInit & { authRequired?: boolean } = {}
): Promise<any> => {
  const headers = new Headers(options.headers);

  // Set Content-Type unless it's FormData
  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  // Only attach token if explicitly required
  if (options.authRequired) {
    const token = await getAuthToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const fullUrl = `${API_BASE_URL}/${endpoint}`;
  console.log("📡 API Request:", {
    url: fullUrl,
    method: options.method || "GET",
  });

  const response = await fetch(fullUrl, {
    ...options,
    headers,
  });

  console.log("📡 API Response Status:", response.status);

  // Handle token expiration only if auth was required
  if (response.status === 401 && options.authRequired) {
    try {
      const newToken = await getAccessToken();
      if (newToken) {
        headers.set("Authorization", `Bearer ${newToken}`);
        return apiRequest(endpoint, { ...options, headers });
      }
    } catch (error) {
      console.error("Failed to refresh token:", error);
      throw new Error("Unauthorized access. Please log in again.");
    }

    if (typeof window !== "undefined") {
      window.location.href = "/login"; // Redirect to login page
    } else {
      throw new Error("Unauthorized access. Please log in again.");
    }
  }

  // Check if response is ok before parsing JSON
  if (!response.ok) {
    const contentType = response.headers.get("content-type");
    const errorData = contentType?.includes("application/json")
      ? await response.json()
      : { message: await response.text() };
    throw new Error(errorData.message || `API Error: ${response.status}`);
  }

  return response.json();
};
