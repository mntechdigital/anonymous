"use client";

import { type Icon } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  return (
    <SidebarGroup className="px-3 py-4">
      <SidebarGroupContent className="flex flex-col gap-1">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title} className="group">
              <SidebarMenuButton
                size="lg"
                tooltip={item.title}
                className="hover:bg-linear-to-r hover:from-teal-600/20 hover:to-emerald-600/20 hover:text-teal-100 transition-all duration-300 rounded-lg border border-transparent hover:border-teal-500/30 hover:shadow-lg hover:shadow-teal-500/10"
              >
                <Link
                  href={item.url}
                  className="flex items-center gap-3 w-full text-slate-800 group-hover:text-slate-800 transition-colors duration-300"
                >
                  {item.icon && (
                    <item.icon className="w-5 h-5 text-teal-400 group-hover:text-teal-300 transition-colors duration-300" />
                  )}
                  <span className="font-medium">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
