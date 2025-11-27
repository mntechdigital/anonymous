import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
// import { getAdminDetails } from "@/services/auth";
// import { NavUser } from "./nav-user";

export async function SiteHeader() {
//   const adminDetails = await getAdminDetails();
  return (
    <header className="sticky top-0 z-10 flex h-(--header-height) shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 hover:bg-accent/50 transition-colors" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        {/* Enhanced right section */}
        <div className="ml-auto flex items-center gap-3">
          <Separator orientation="vertical" className="h-6" />

          {/* Enhanced user nav */}
          <div className="hover:bg-accent/50 rounded-lg transition-colors p-1">
            {/* <NavUser user={adminDetails} /> */}
            <span className="text-sm font-medium">Admin User</span>
          </div>
        </div>
      </div>
    </header>
  );
}
