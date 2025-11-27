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
    <AppSidebar variant="inset" data={demoSidebarData}/>
    {/* <AppSidebar variant="inset" data={adminDetails} /> */}
    <SidebarInset className="relative">
        <SiteHeader />
        {/* Enhanced content area with modern backdrop */}
        <div className="relative min-h-screen from-background via-background to-muted/20">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 bg-grid-gray-100/[0.02] dark:bg-grid-white/[0.02]" />

          <div className="relative w-full max-w-[1000px] 2xl:max-w-[1200px]">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
