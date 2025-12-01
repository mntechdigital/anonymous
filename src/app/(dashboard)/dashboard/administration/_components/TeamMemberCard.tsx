"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { TeamMember } from "@/types/team.types";

interface TeamMemberCardProps {
  member: TeamMember;
  onEdit?: (member: TeamMember) => void;
  onPermissions?: (member: TeamMember) => void;
}

const TeamMemberCard = ({ member, onEdit, onPermissions }: TeamMemberCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex items-center justify-between border hover:bg-muted/50 transition-colors rounded-lg p-2.5">
      <div className="flex items-center gap-4">
        <Avatar className="size-[60px]">
          <AvatarImage src={member.avatarUrl} alt={member.name} className="rounded-[6px]" />
          <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
            {getInitials(member.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-[16px] font-nunito text-[#202224]">{member.name}</span>
          <span className="text-xs text-muted-foreground font-nunito">{member.email}</span>
          <span className="text-sm text-[#202224] font-nunito">{member.role}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground border hover:text-foreground gap-1.5"
          onClick={() => onEdit?.(member)}
        >
          <Edit className="size-4" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-blue-600 border-blue-200 bg-[#E7F2FF] hover:text-blue-700"
          onClick={() => onPermissions?.(member)}
        >
          Permissions
        </Button>
      </div>
    </div>
  );
};

export default TeamMemberCard;
