"use client";

import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import { TeamMember } from "@/types/team.types";
import TeamMemberCard from "./TeamMemberCard";

interface TeamMembersListProps {
  title: string;
  description?: string;
  members: TeamMember[];
}

const TeamMembersList = ({ title, description, members }: TeamMembersListProps) => {
  const handleCreateUser = useCallback(() => {
    // Client-only handler: open create modal or navigate
    console.log("Create user clicked");
  }, []);

  const handleEditMember = useCallback((member: TeamMember) => {
    // Client-only handler: open edit modal
    console.log("Edit member:", member);
  }, []);

  const handleMemberPermissions = useCallback((member: TeamMember) => {
    // Client-only handler: open permissions modal
    console.log("Permissions for:", member);
  }, []);

  return (
    <Card className="shadow-none">
      <CardHeader>
        <div className="items-center my-auto">
          <CardTitle className="text-lg font-nunito">{title}</CardTitle>
          {description && <CardDescription className="font-nunito text-[12px]">{description}</CardDescription>}
        </div>
        <CardAction className="self-center justify-self-end">
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 rounded-full text-white gap-1.5"
            onClick={handleCreateUser}
          >
            <Plus className="size-4" />
            Create User
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="px-5">
        <div className="space-y-4">
          {members.map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              onEdit={handleEditMember}
              onPermissions={handleMemberPermissions}
            />
          ))}
        </div>
        {members.length === 0 && (
          <div className="py-8 text-center text-muted-foreground">
            No team members found. Click &quot;Create User&quot; to add one.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TeamMembersList;
