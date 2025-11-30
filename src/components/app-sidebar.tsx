"use client";

import { transformRoleFeatures } from "@/utils/transformRoleFeature";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import Link from "next/link";
import { NavMain } from "./ui/nav-main";
import { useRouter } from "next/navigation";
import sidebaritems from "../data/sidebaroption"
import sitelogo from "../../public/sitelogo.jpg"
import Image from "next/image";

export function AppSidebar({
  variant,
  data,
}: {
  variant: "sidebar" | "floating" | "inset" | undefined;
  data: any;
}) {
  const router = useRouter();

  if (!data) return null;

  const { navMain } = transformRoleFeatures(data.roleFeature);

  if (!data.roleFeature) {
    router.push("/login");
    return null;
  }

  return (
    <Sidebar collapsible="offcanvas" variant={variant}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/" className="text-2xl font-bold">
                <Image src={sitelogo} alt="Site Logo" width={40} height={40} /> 
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {/* <NavMain items={navMain} /> */}
        <NavMain items={sidebaritems} />
      </SidebarContent>

      <SidebarFooter>
        <div>
          <p className="text-sm text-slate-600">{data.fullName || "User Name"}</p>
          <p className="text-sm text-slate-600">{data.email || "user@gmail.com"}</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
