/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useState } from "react";
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
import CreateUserModal, { CreateUserValues } from "./CreateUserModal";
import RolePermissionModal, {
  RolePermissionValues,
} from "./RolePermissionModal";
import { addFeatures, createAdmin } from "@/services/admin/admin";
import { toast } from "sonner";

interface TeamMembersListProps {
  title: string;
  description?: string;
  members: TeamMember[];
}

const TeamMembersList = ({
  title,
  description,
  members,
}: TeamMembersListProps) => {
  const [createOpen, setCreateOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const [pendingUser, setPendingUser] = useState<CreateUserValues | null>(null);
  const [targetAdminId, setTargetAdminId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleCreateUser = useCallback(() => {
    setCreateOpen(true);
  }, []);

  const handleEditMember = useCallback((member: TeamMember) => {
    // Client-only handler: open edit modal
    console.log("Edit member:", member);
  }, []);

  const handleMemberPermissions = useCallback((member: TeamMember) => {
    // Open permissions modal for existing member
    setPendingUser(null);
    setTargetAdminId(member.id);
    setRoleOpen(true);
  }, []);

  const handleCreateNext = (values: CreateUserValues) => {
    // move to role modal, keep form values
    setPendingUser(values);
    setTargetAdminId(null);
    setCreateOpen(false);
    // give time for close animation, then open next
    setTimeout(() => setRoleOpen(true), 200);
  };

  const handleRoleConfirm = async (permissions: RolePermissionValues) => {
    try {
      setSubmitting(true);

      // Case 1: Creating a new admin with selected features
      if (pendingUser) {
        const payload = {
          name: pendingUser.name,
          email: pendingUser.email,
          password: pendingUser.password,
          role: pendingUser.roleName || "ADMIN",
          features: permissions.features,
        };
        
        await createAdmin(payload);
        toast.success("User created successfully", {
          description: `${pendingUser.name} has been added to your team.`,
        });
      }

      else if (targetAdminId) {
        await addFeatures(targetAdminId, permissions.features);
        toast.success("Permissions updated successfully", {
          description: "User permissions have been updated.",
        });
      }

      setRoleOpen(false);
      setPendingUser(null);
      setTargetAdminId(null);
    } catch (err: any) {
      console.error(err);
      toast.error("Operation failed", {
        description: err?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="shadow-none">
      <CardHeader>
        <div className="items-center my-auto">
          <CardTitle className="text-lg font-nunito">{title}</CardTitle>
          {description && (
            <CardDescription className="font-nunito text-[12px]">
              {description}
            </CardDescription>
          )}
        </div>
        <CardAction className="self-center justify-self-end">
          <>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 rounded-full text-white gap-1.5"
              onClick={handleCreateUser}
            >
              <Plus className="size-4" />
              Create User
            </Button>
            <CreateUserModal
              open={createOpen}
              onOpenChange={setCreateOpen}
              onNext={handleCreateNext}
            />
            <RolePermissionModal
              open={roleOpen}
              onOpenChange={setRoleOpen}
              onConfirm={handleRoleConfirm}
              isSubmitting={submitting}
            />
          </>
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
