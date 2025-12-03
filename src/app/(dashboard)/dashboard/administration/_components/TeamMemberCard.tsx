"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { AdminUser } from "@/types/admin.types";
import { getInitials } from "@/utils/getIntials";

interface TeamMemberCardProps {
  member: AdminUser;
  onEdit?: (member: AdminUser) => void;
  onPermissions?: (member: AdminUser) => void;
}

const TeamMemberCard = ({
  member,
  onEdit,
  onPermissions,
}: TeamMemberCardProps) => {


  return (
    <div className="flex flex-col min-[510px]:flex-row min-[510px]:items-center min-[510px]:justify-between border hover:bg-muted/50 transition-colors rounded-lg p-2.5 gap-3 min-[510px]:gap-0">
      <div className="flex items-center gap-3 min-[510px]:gap-4">
        <Avatar className="size-12 min-[510px]:size-[60px]">
          <AvatarImage
            src={member.avatar}
            alt={member.name}
            className="rounded-[6px]"
          />
          <AvatarFallback className="bg-blue-100 text-blue-600 font-medium rounded-[6px]">
            {getInitials(member?.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col min-w-0">
          <span className="font-medium text-sm min-[510px]:text-[16px] font-nunito text-[#202224] truncate">
            {member.name}
          </span>
          <span className="text-xs text-muted-foreground font-nunito truncate">
            {member.email}
          </span>
          <span className="text-xs min-[510px]:text-sm text-[#202224] font-nunito">
            {member.role}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 min-[510px]:gap-3 ml-auto min-[510px]:ml-0">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground border hover:text-foreground gap-1 min-[510px]:gap-1.5 text-xs min-[510px]:text-sm px-2 min-[510px]:px-3"
          onClick={() => onEdit?.(member)}
        >
          <Edit className="size-3 min-[510px]:size-4" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-blue-600 border-blue-200 bg-[#E7F2FF] hover:text-blue-700 text-xs min-[510px]:text-sm px-2 min-[510px]:px-3"
          onClick={() => onPermissions?.(member)}
        >
          Permissions
        </Button>
      </div>
    </div>
  );
};

export default TeamMemberCard;
