"use client";

import { Bell, ChevronDown, LogOut, User, Menu, BellDot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { useMemo } from "react";
import { jwtDecode } from "jwt-decode";
import { TCustomJwtPayload } from "@/types/auth.types";
import getCookie from "@/utils/getCookie";


export function SiteHeader() {
  const { toggleSidebar } = useSidebar();

  // Use useMemo to decode token only once
  const user = useMemo(() => {
    const token = getCookie("accessToken");

    if (!token) return null;

    try {
      return jwtDecode<TCustomJwtPayload>(token);
    } catch (err) {
      console.error("Failed to decode token", err);
      return null;
    }
  }, []);

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user?.email) return "U";
    return user.email.substring(0, 2).toUpperCase();
  };

  // Logout handler
  const handleLogout = () => {
    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/login";
  };

  return (
    <header className="sticky top-0 flex h-(--header-height) items-center border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex w-full items-center gap-4 px-4 lg:px-6">
        {/* Mobile Menu Button (always rendered to keep SSR/client tree stable) */}
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
            <BellDot className="h-5 w-5 text-blue-500" />
          </Button>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="Admin"
                    className="rounded-full"
                  />
                  <AvatarFallback>{getUserInitials()}</AvatarFallback>
                </Avatar>
                <div className="hidden text-left md:block">
                  <p className="text-sm font-medium leading-none">
                    {user?.email ?? "Guest"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user?.role ?? "User"}
                  </p>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-red-600 focus:text-red-600"
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