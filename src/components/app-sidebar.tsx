"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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

const AppSidebar = () => {
  const pathname = usePathname();
  const { state, isMobile, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed" && !isMobile;

  const mainMenuItems = [
    { icon: Shapes, label: "Overview", href: "/dashboard" },
    {
      icon: Newspaper,
      label: "Facebook Pages",
      href: "/dashboard/facebook_pages",
    },
    {
      icon: Calendar,
      label: "Post & Scheduling",
      href: "/dashboard/posts_schedule",
    },
    {
      icon: ChartColumnStacked,
      label: "Insights",
      href: "/dashboard/analytics",
    },
    { icon: Scale, label: "Poll", href: "/dashboard/poll" },
  ];

  const bottomMenuItems = [
    {
      icon: Landmark,
      label: "Administration",
      href: "/dashboard/administration",
    },
    { icon: Settings, label: "Setting", href: "/dashboard/settings" },
  ];

  const userInfo = {
    name: "W. Shakespeare",
    email: "shakespeare@gmail.com",
    avatar: "https://github.com/shadcn.png",
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-gray-200 bg-white overflow-visible">
      {/* Logo Section with Toggle Button */}
      <SidebarHeader className={`pt-4 ${isCollapsed ? "pb-1" : "pb-6"} bg-white relative overflow-visible`}>
        <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between px-2"}`}>
          <Link href="/dashboard" className="flex items-center">
            {isCollapsed ? (
              <Image src={logoIcon} alt="logo icon" width={40} height={40} className="w-8 h-8" />
            ) : (
              <Image src={logoImage} alt="logo image" width={180} height={40} className="h-8 w-auto" />
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
            className="cursor-pointer mx-auto my-2 py-2 px-2 ml-1 hover:bg-[#E7F2FF] hover:text-[#297AFF] rounded-sm transition-colors"
          >
            <ChevronsLeft className="h-4 w-4 rotate-180 " />
          </button>
        )}
      </SidebarHeader>

      {/* Main Menu Items */}
      <SidebarContent className="px-3 overflow-hidden bg-white">
        <SidebarMenu className="space-y-1">
          {mainMenuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  className={`${
                    active ? "bg-[#E7F2FF] hover:bg-[#E7F2FF]" : ""
                  } rounded hover:bg-slate-50/70`}
                >
                  <Link href={item.href}>
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
                      {item.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bottom Menu Items (Poll & Settings) */}
        <SidebarMenu className="space-y-1 mt-auto bg-white">
          {bottomMenuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  className={`${
                    active ? "bg-[#E7F2FF] hover:bg-[#E7F2FF]" : ""
                  } rounded hover:bg-slate-50/70`}
                >
                  <Link href={item.href}>
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
                      {item.label}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      {/* User Profile Section */}
      <SidebarFooter className="bg-white p-2">
        <SidebarSeparator className="mb-2" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-gray-50 data-[state=open]:bg-gray-50"
              tooltip={userInfo.name}
            >
              <div className="flex aspect-square size-8 shrink-0 items-center justify-center rounded-full ring-2 ring-blue-100 overflow-hidden">
                <Image
                  src={userInfo.avatar}
                  alt={userInfo.name}
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-gray-900">
                  {userInfo.name}
                </span>
                <span className="truncate text-xs text-gray-500">
                  {userInfo.email}
                </span>
              </div>
              <LogOut className="ml-auto size-4 shrink-0 text-gray-400" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
