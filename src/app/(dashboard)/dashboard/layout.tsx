import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { demoSidebarData } from "../test/demo-sidebar-data";
// import { getAdminDetails } from "@/services/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  // const adminDetails = await getAdminDetails();

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      {/* <AppSidebar variant="inset" data={demoSidebarData}/> */}
      <AppSidebar variant="inset" data={{
        roleFeature: "admin",
        user: {
          name: "Reshad",
          email: "reshad@gmail.com",
          avatar: "/avatar.png",
        },
        mainMenu: ["Dashboard", "Users", "Settings"],
        footerMenu: [],
      }} />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
