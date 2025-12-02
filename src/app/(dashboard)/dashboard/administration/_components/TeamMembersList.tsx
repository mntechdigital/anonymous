/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import TeamMemberCard from "./TeamMemberCard";
import CreateUserModal from "./CreateUserModal";
import RolePermissionModal from "./RolePermissionModal";
import { addFeatures, createAdmin, updateAdmin } from "@/services/admin/admin";
import { toast } from "sonner";
import { AdminUser } from "@/types/admin.types";
import { useRouter } from "next/navigation";
import { CreateUserValues, userSchema } from "@/validation/administration.validation";

interface TeamMembersListProps {
  title: string;
  description?: string;
  members: AdminUser[];
}

const TeamMembersList = ({
  title,
  description,
  members,
}: TeamMembersListProps) => {
  const router = useRouter();
  const [createOpen, setCreateOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const [pendingUser, setPendingUser] = useState<CreateUserValues | null>(null);
  const [targetAdminId, setTargetAdminId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [editUser, setEditUser] = useState<AdminUser | null>(null);
  const [selectedMember, setSelectedMember] = useState<AdminUser | null>(null);

  const form = useForm<CreateUserValues>({
    resolver: zodResolver(userSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      roleName: "",
      features: [],
    },
  });

  const handleCreateUser = useCallback(() => {
    form.reset({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      roleName: "",
      features: [],
    });
    setEditUser(null);
    setCreateOpen(true);
  }, [form]);

  const handleEditMember = useCallback((member: AdminUser) => {
    setEditUser(member);
    form.reset({
      name: member.name,
      email: member.email,
      password: "",
      confirmPassword: "",
      roleName: member.role,
      features: member.features?.map(f => f.index) || [],
    });
    setCreateOpen(true);
  }, [form]);

  const handleMemberPermissions = useCallback((member: AdminUser) => {
    setPendingUser(null);
    setTargetAdminId(member.id);
    setSelectedMember(member);
    form.setValue("features", member.features?.map(f => f.index) || []);
    setRoleOpen(true);
  }, [form]);

  const handleCreateNext = async () => {
    const values = form.getValues();
    if (editUser) {
      // Update existing user
      try {
        setSubmitting(true);
        await updateAdmin(editUser.id, {
          name: values.name,
          role: values.roleName,
        });
        toast.success("User updated successfully", {
          description: `${values.name} has been updated.`,
        });
        setCreateOpen(false);
        setEditUser(null);
        router.refresh();
      } catch (err: any) {
        console.error(err);
        toast.error("Update failed", {
          description: err?.message || "Something went wrong. Please try again.",
        });
      } finally {
        setSubmitting(false);
      }
    } else {
      // Create new user: move to role modal
      setPendingUser(values);
      setTargetAdminId(null);
      setSelectedMember(null);
      setCreateOpen(false);
      setTimeout(() => setRoleOpen(true), 200);
    }
  };

  const handleRoleConfirm = async () => {
    try {
      setSubmitting(true);
      const features = form.getValues("features");

      // Case 1: Creating a new admin with selected features
      if (pendingUser) {
        const payload = {
          name: pendingUser.name,
          email: pendingUser.email,
          password: pendingUser.password || "",
          role: pendingUser.roleName || "ADMIN",
          features: features,
        };
        
        await createAdmin(payload);
        toast.success("User created successfully", {
          description: `${pendingUser.name} has been added to your team.`,
          dismissible: true,
          closeButton: true
        });
      }

      else if (targetAdminId) {
        console.log(targetAdminId, features, 'features')
        await addFeatures(targetAdminId, features);
        toast.success("Permissions updated successfully", {
          description: "User permissions have been updated.",
        });
      }

      setRoleOpen(false);
      setPendingUser(null);
      setTargetAdminId(null);
      setSelectedMember(null);
      router.refresh();
    } catch (err: any) {
      console.error(err);
      toast.error("Operation failed", {
        description: err?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateOpenChange = (open: boolean) => {
    setCreateOpen(open);
    if (!open) {
      setEditUser(null);
    }
  };

  const handleRoleOpenChange = (open: boolean) => {
    setRoleOpen(open);
    if (!open) {
      setSelectedMember(null);
    }
  };

  return (
    <Card className="shadow-none rounded-[12px]">
      <CardHeader className="flex-col min-[510px]:flex-row gap-3 min-[510px]:gap-0">
        <div className="items-center my-auto">
          <CardTitle className="text-base min-[510px]:text-lg font-nunito">{title}</CardTitle>
          {description && (
            <CardDescription className="font-nunito text-[11px] min-[510px]:text-[12px]">
              {description}
            </CardDescription>
          )}
        </div>
        <CardAction className="self-start min-[510px]:self-center justify-self-start min-[510px]:justify-self-end">
          <>
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 rounded-full text-white gap-1.5"
              onClick={handleCreateUser}
            >
              <Plus className="size-4" />
              Create User
            </Button>
            <FormProvider {...form}>
              <CreateUserModal
                open={createOpen}
                onOpenChange={handleCreateOpenChange}
                onNext={handleCreateNext}
                editMode={!!editUser}
              />
              <RolePermissionModal
                open={roleOpen}
                onOpenChange={handleRoleOpenChange}
                onConfirm={handleRoleConfirm}
                isSubmitting={submitting}
                currentUser={selectedMember || undefined}
              />
            </FormProvider>
          </>
        </CardAction>
      </CardHeader>
      <CardContent className="px-5">
        <div className="space-y-4">
          {members?.map((member) => (
            <TeamMemberCard
              key={member?.id}
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
