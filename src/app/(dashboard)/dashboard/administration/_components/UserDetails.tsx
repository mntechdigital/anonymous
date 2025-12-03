/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getUserById } from "@/services/user";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { ChevronDown } from "lucide-react";

type Props = {
  id?: string;
};

const UserDetails = ({ id }: Props) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const result = await getUserById(id);
        // console.log("see result-->",result)
        const userData = result?.data?.data || result?.data || result;

        setUser(userData);
      } catch (err) {
        console.error("User fetch error ==> ", err);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <Button variant="ghost" className="flex items-center gap-2 px-2">
      <Avatar className="h-9 w-9">
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="Admin"
          className="rounded-full"
        />
      </Avatar>

      <div className="hidden text-left md:block">
        <p className="text-sm font-medium leading-none">
          {user?.name ?? "Guest"}
        </p>
        <p className="text-xs text-muted-foreground">
          {user?.role ?? "User"}
        </p>
      </div>

      <ChevronDown className="h-4 w-4 text-muted-foreground" />
    </Button>
  );
};

export default UserDetails;
