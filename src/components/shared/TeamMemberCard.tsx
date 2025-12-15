"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Image from "next/image";

interface PageBadge {
  pageName: string;
  pageLogoUrl?: string;
  followers?: string;
}

interface TeamMemberProps {
  ownerName: string;
  ownerImage?: string;
  badges?: PageBadge[];
  onEdit?: () => void;
  onBlock?: () => void;
}

export const TeamMemberCard = ({
  ownerName,
  ownerImage,
  badges = [],
  onEdit,
  onBlock,
}: TeamMemberProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatFollowers = (count: string) => {
    return `${count} Followers`;
  };

  return (
    <div className="flex items-center border justify-between py-[9px] px-2.5 border-b border-gray-100 hover:bg-gray-50/50 transition-colors rounded-[6px]">
      <div className="flex items-center gap-3">
        <Avatar className="size-[60px] rounded-[6px]">
          <AvatarImage src={ownerImage} alt={ownerName} />
          <AvatarFallback className="rounded-[6px] bg-orange-500 text-white font-medium">
            {getInitials(ownerName)}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-600 font-nunito">{ownerName}</span>
          
          <div className="flex items-center gap-2 flex-wrap">
            {badges.map((badge, index) => (
              <div key={index} className="flex items-center gap-1.5">
                {/* Page Logo */}
                <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0">
                  {badge.pageLogoUrl ? (
                    <Image
                      src={badge.pageLogoUrl}
                      alt={badge.pageName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white text-[8px] font-bold">
                        {badge.pageName.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Page Info */}
                <div className="flex flex-col">
                  <span className="text-[11px] font-medium text-gray-700">
                    {badge.pageName}
                  </span>
                  {badge.followers && (
                    <span className="text-[10px] text-gray-500">
                      {formatFollowers(badge.followers)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onEdit}
          className="h-8 px-3 cursor-pointer"
        >
          <Edit className="h-3.5 w-3.5 mr-1.5" />
          Edit
        </Button>
        <Button
          size="sm"
          onClick={onBlock}
          className="h-8 px-3 bg-[#F93C65] hover:bg-[#E0314F] text-white cursor-pointer"
        >
          <svg
            className="h-3.5 w-3.5 mr-1.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
          Block
        </Button>
      </div>
    </div>
  );
};
