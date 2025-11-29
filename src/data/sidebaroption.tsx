import {
  Calendar,
  ChartColumnStacked,
  LogOut,
  Newspaper,
  Settings,
  Shapes
} from "lucide-react"; // or your icon library

const sidebarMenuItems = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: Shapes,
  },
  {
    title: "Facebook Pages",
    url: "/dashboard/facebook_pages",
    icon: Newspaper,
  },
  {
    title: "Posts & Scheduling",
    url: "/dashboard/posts_schedule",
    icon: Calendar,
  },
  {
    title: "Insights",
    url: "/dashboard/analytics",
    icon: ChartColumnStacked,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Logout",
    url: "/logout",
    icon: LogOut,
  },
];

export default sidebarMenuItems;
