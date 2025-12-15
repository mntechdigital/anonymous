import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
}

export const PageHeader = ({
  title,
  subtitle,
  showSearch = false,
  searchPlaceholder = "Search",
  onSearchChange,
}: PageHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-base min-[510px]:text-lg font-nunito font-bold">{title}</h1>
        {subtitle && <p className="text-xs font-semibold text-gray-500 font-nunito">{subtitle}</p>}
      </div>
      {showSearch && (
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder={searchPlaceholder}
            className="pl-10"
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};
