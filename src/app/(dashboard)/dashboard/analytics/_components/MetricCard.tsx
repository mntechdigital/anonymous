import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Heart, Users, MessageCircle, Share2 } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string;
  change: number;
  isPositive: boolean;
  compareText: string;
  icon: string;
  iconColor: string;
}

const iconMap = {
  eye: Eye,
  heart: Heart,
  users: Users,
  message: MessageCircle,
  share: Share2,
};

export default function MetricCard({
  label,
  value,
  change,
  isPositive,
  compareText,
  icon,
  iconColor,
}: MetricCardProps) {
  const Icon = iconMap[icon as keyof typeof iconMap];

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {label}
        </CardTitle>
        <div className={`p-2 rounded-lg ${iconColor}`}>
          <Icon className="size-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-1 mt-1">
          {isPositive ? (
            <TrendingUp className="size-4 text-green-500" />
          ) : (
            <TrendingDown className="size-4 text-red-500" />
          )}
          <p className="text-xs text-gray-500">
            <span className={isPositive ? "text-green-500" : "text-red-500"}>
              {change}%
            </span>{" "}
            {compareText}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
