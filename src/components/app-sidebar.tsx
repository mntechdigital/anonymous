/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Shapes,
  Newspaper,
  Calendar,
  ChartColumnStacked,
  Scale,
  Settings,
  LogOut,
  Landmark,
  ChevronsLeft,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logoImage from "@/app/assets/LoremIpsum.png";
import logoIcon from "@/app/assets/Group 1000002752.svg";

import { AvatarFallback, AvatarImage } from "./ui/avatar";
import { getInitials } from "@/utils/getIntials";
import { Avatar } from "@radix-ui/react-avatar";
import { useUserInfo } from "@/hooks/useUserInfo";
import { Skeleton } from "@/components/ui/skeleton";
import { logout } from "@/services/auth";

const AppSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { state, isMobile, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed" && !isMobile;

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  // Map feature names to icons and dashboard paths
  const featureIconMap: Record<string, any> = {
    Overview: Shapes,
    "Facebook Pages": Newspaper,
    "Post & Schedule": Calendar,
    Insights: ChartColumnStacked,
    Polls: Scale,
    Administration: Landmark,
    Settings: Settings,
  };

  // Map feature paths from backend to dashboard routes
  const featurePathMap: Record<string, string> = {
    "/overview": "/dashboard",
    "/facebook-pages": "/dashboard/facebook_pages",
    "/post-schedule": "/dashboard/posts_schedule",
    "/insights": "/dashboard/analytics",
    "/polls": "/dashboard/poll",
    "/administration": "/dashboard/administration",
    "/settings": "/dashboard/settings",
  };

  const { userInfo, loading } = useUserInfo();

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  // Filter out Profile from features for main menu
  const filteredFeatures =
    userInfo?.features?.filter((f) => f.name !== "Profile") || [];
  // Find Settings feature for bottom placement
  const settingsFeature = userInfo?.features?.find(
    (f) => f.name === "Settings"
  );

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-gray-200 bg-white overflow-visible"
    >
      {/* Logo Section with Toggle Button */}
      <SidebarHeader
        className={`pt-4 ${
          isCollapsed ? "pb-1" : "pb-6"
        } bg-white relative overflow-visible`}
      >
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "justify-evenly"
          }`}
        >
          <Link href="/dashboard" className="flex items-center">
            {isCollapsed ? (
              <Image
                src={logoIcon}
                alt="logo icon"
                width={40}
                height={40}
                className="w-8 h-8"
              />
            ) : (
              <Image
                src={logoImage}
                alt="logo image"
                width={231}
                height={41}
                className=""
              />
            )}
          </Link>
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="h-8 w-8 text-gray-500 hover:text-gray-700 cursor-pointer hover:bg-gray-100"
            >
              <ChevronsLeft className="h-5 w-5" />
            </Button>
          )}
        </div>
        {isCollapsed && !isMobile && (
          <button
            onClick={toggleSidebar}
            className="cursor-pointer mx-auto my-2 py-2 px-2 hover:bg-[#E7F2FF] hover:text-[#297AFF] rounded-sm transition-colors"
          >
            <ChevronsLeft className="h-4 w-4 rotate-180 " />
          </button>
        )}
      </SidebarHeader>

      {/* Main Menu Items (from backend features, except Profile/Settings) */}
      <SidebarContent className="px-2 overflow-hidden bg-white">
        <SidebarMenu className="space-y-1">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton className="rounded hover:bg-slate-50/70 flex items-center gap-3">
                    <Skeleton className="h-5 w-5 rounded" />
                    <Skeleton className="h-4 w-24 rounded" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            : filteredFeatures
                .filter((f) => f.name !== "Settings")
                .sort((a, b) => a.index - b.index)
                .map((feature) => {
                  const Icon = featureIconMap[feature.name] || Shapes;
                  const href = featurePathMap[feature.path] || "/dashboard";
                  const active = isActive(href);
                  return (
                    <SidebarMenuItem key={feature.id}>
                      <SidebarMenuButton
                        asChild
                        className={`${
                          active ? "bg-[#E7F2FF] hover:bg-[#E7F2FF]" : ""
                        } rounded hover:bg-slate-50/70`}
                      >
                        <Link href={href}>
                          <Icon
                            className={`${
                              active
                                ? "text-[#297AFF]"
                                : "text-[#888888] group-hover/item:text-[#297AFF]"
                            }`}
                          />
                          <span
                            className={`font-medium ${
                              active
                                ? "text-[#297AFF]"
                                : "text-[#888888] group-hover/item:text-[#297AFF]"
                            }`}
                          >
                            {feature.name}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
        </SidebarMenu>
        {/* Spacer */}
        <div className="flex-1" />
        {/* Settings at the bottom above profile */}
        {loading ? (
          <SidebarMenu className="space-y-1 mt-auto bg-white mb-2">
            <SidebarMenuItem>
              <SidebarMenuButton className="rounded hover:bg-slate-50/70 flex items-center gap-3">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-4 w-20 rounded" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : (
          settingsFeature && (
            <SidebarMenu className="space-y-1 mt-auto bg-white mb-2">
              <SidebarMenuItem key={settingsFeature.id}>
                <SidebarMenuButton
                  asChild
                  className={`${
                    isActive(
                      featurePathMap[settingsFeature.path] ||
                        "/dashboard/settings"
                    )
                      ? "bg-[#E7F2FF] hover:bg-[#E7F2FF]"
                      : ""
                  } rounded hover:bg-slate-50/70`}
                >
                  <Link
                    href={
                      featurePathMap[settingsFeature.path] ||
                      "/dashboard/settings"
                    }
                  >
                    <Settings
                      className={`${
                        isActive(
                          featurePathMap[settingsFeature.path] ||
                            "/dashboard/settings"
                        )
                          ? "text-[#297AFF]"
                          : "text-[#888888] group-hover/item:text-[#297AFF]"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        isActive(
                          featurePathMap[settingsFeature.path] ||
                            "/dashboard/settings"
                        )
                          ? "text-[#297AFF]"
                          : "text-[#888888] group-hover/item:text-[#297AFF]"
                      }`}
                    >
                      Settings
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          )
        )}
      </SidebarContent>

      {/* User Profile Section (persistent, acts as profile route) */}
      <SidebarSeparator className="mx-0" />
      <SidebarFooter className="bg-white p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            {loading ? (
              <SidebarMenuButton
                className="hover:bg-gray-50 data-[state=open]:bg-gray-50 flex items-center gap-3"
                size="lg"
              >
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-24 mb-1 rounded" />
                  <Skeleton className="h-3 w-16 rounded" />
                </div>
                <Skeleton className="h-4 w-4 rounded" />
              </SidebarMenuButton>
            ) : (
              <SidebarMenuButton
                asChild
                size="lg"
                className="hover:bg-gray-50 data-[state=open]:bg-gray-50"
                tooltip={userInfo?.name}
              >
                <Link href="/dashboard/profile">
                  <Avatar className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-full ring-2 ring-blue-100 overflow-hidden">
                    <AvatarImage
                      src={userInfo?.avatar}
                      alt={userInfo?.name}
                      className="rounded-[6px]"
                    />
                    <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                      {getInitials(userInfo?.name || "")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold text-gray-900">
                      {userInfo?.name}
                    </span>
                    <span className="truncate text-xs text-gray-500">
                      {userInfo?.email}
                    </span>
                  </div>
                  <LogOut
                    onClick={handleLogout}
                    className="ml-auto size-4 shrink-0 text-gray-400 cursor-pointer hover:text-red-500 transition-colors"
                  />
                </Link>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
