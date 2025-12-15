import { jwtDecode } from "jwt-decode";
import { TCustomJwtPayload } from "@/types/auth.types";
import getCookie from "@/utils/getCookie";

export function getUserFromToken() {
  const token = getCookie("accessToken");
  if (!token) return null;
  try {
    return jwtDecode<TCustomJwtPayload>(token);
  } catch (err) {
    console.error("Failed to decode token", err);
    return null;
  }
}
