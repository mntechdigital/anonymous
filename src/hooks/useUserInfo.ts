import { useEffect, useState } from "react";
import { getUserFromToken } from "@/utils/authHelpers";
import { getUserById } from "@/services/auth";

export interface Feature {
  id: string;
  name: string;
  path: string;
  index: number;
}

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatar: string;
  features: Feature[];
  role?: string;
}

export function useUserInfo() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const user = getUserFromToken();
      if (user?.id) {
        const data = await getUserById(user.id);
        setUserInfo({
          id: user?.id,
          name: data?.data?.name || "",
          email: data?.data?.email || "",
          avatar: data?.data?.avatar || "",
          features: data?.data?.features || [],
          role: data?.data?.role || undefined,
        });
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  return { userInfo, loading };
}
