"use client";

import { ChevronDown, LogOut, User, Menu, BellDot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { useUserInfo } from "@/hooks/useUserInfo";
import { Skeleton } from "@/components/ui/skeleton";
import { logout } from "@/services/auth";
import { useRouter } from "next/navigation";
import { getInitials } from "@/utils/getIntials";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();
  const router = useRouter();
  const { userInfo, loading } = useUserInfo();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 flex h-(--header-height) items-center border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex w-full items-center gap-4 px-4 lg:px-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Right Section */}
        <div className="flex items-center ml-auto">
          {/* Notification */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Notifications"
            className="relative"
          >
            <BellDot className="size-5 text-blue-500" />
          </Button>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center hover:bg-slate-50/60 gap-2 px-2 focus:ring-0 focus-within:outline-none focus-visible:ring-0"
              >
                {loading ? (
                  <>
                    <Skeleton className="h-9 w-9 rounded-full" />
                    <div className="hidden text-left md:block">
                      <Skeleton className="h-4 w-24 mb-1 rounded" />
                      <Skeleton className="h-3 w-16 rounded" />
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </>
                ) : (
                  <>
                    <Avatar className="h-9 w-9">
                      {userInfo?.avatar ? (
                        <AvatarImage
                          src={userInfo.avatar}
                          alt={userInfo?.name}
                          className="rounded-full"
                        />
                      ) : null}
                      <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                        {getInitials(userInfo?.name || "")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden text-left md:block">
                      <p className="text-sm font-medium leading-none">
                        {userInfo?.name ?? "Guest"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {userInfo?.role ?? "User"}
                      </p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem
                onSelect={() => router.push("/dashboard/profile")}
                className=" cursor-pointer"
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-red-600 focus:text-red-600 cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
