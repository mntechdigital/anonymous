import { cn } from "@/lib/utils";
import React from "react";

const DashboardContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("p-4 lg:p-8 border-2 border-gray-200 m-4 rounded-md min-h-[calc(100vh-6rem)]", className)}>{children}</div>;
};

export default DashboardContainer;
