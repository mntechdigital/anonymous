import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  Settings,
} from "lucide-react";

export const demoSidebarData = {
  user: {
    name: "Admin User",
    email: "admin@gmail.com",
    avatar: "https://i.pravatar.cc/100?img=3",
  },

  mainMenu: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      href: "/dashboard/users",
      icon: Users,
    },
    {
      title: "Orders",
      href: "/dashboard/orders",
      icon: ShoppingCart,
    },
    {
      title: "Products",
      href: "/dashboard/products",
      icon: Package,
    },
  ],

  footerMenu: [
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ],
};
