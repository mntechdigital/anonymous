"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserInfo } from "@/hooks/useUserInfo";
import { getInitials } from "@/utils/getIntials";
import { useForm } from "react-hook-form";
import { useRef, useState, useEffect } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { updateAdmin } from "@/services/admin/admin";

const ProfilePage = () => {
  const { userInfo, loading } = useUserInfo();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    undefined
  );
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm({
    defaultValues: {
      name: "",
      avatar: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (userInfo) {
      form.reset({
        name: userInfo.name || "",
        avatar: userInfo.avatar || "",
      });
      setAvatarPreview(userInfo.avatar || undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  if (loading || !userInfo) {
    return (
      <div className="flex items-center justify-center h-64">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <DashboardHeader
        title="Settings"
        description="Welcome! Monitor and manage your Facebook pages performance"
      />
      <div className="px-5 lg:px-6 pb-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-1">Profile Settings</h2>
          <p className="text-gray-400 text-sm mb-6">
            Update your personal information
          </p>
          <div className="flex items-center gap-6 mb-6">
            <Avatar
              className="w-20 h-20"
              key={avatarPreview || form.watch("name") || "avatar-fallback"}
            >
              {avatarPreview ? (
                <AvatarImage
                  src={avatarPreview}
                  alt={form.watch("name") || "Profile"}
                  className="size-20 object-cover rounded-full"
                  onError={() => {
                    setAvatarPreview(undefined);
                  }}
                />
              ) : null}
              <AvatarFallback className="size-20 flex items-center justify-center text-2xl font-semibold bg-gray-100 text-gray-500 rounded-full">
                {getInitials(form.watch("name") || "")}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1 flex-1">
              <div className="flex items-center gap-4">
                <label
                  htmlFor="avatar-upload"
                  className="flex items-center border border-gray-300 rounded-lg px-4 py-2 cursor-pointer transition hover:border-blue-400"
                >
                  <svg
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="text-gray-400 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
                    />
                  </svg>
                  <span className="text-gray-500 font-medium text-base">
                    Change Photo
                  </span>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setAvatarFile(file);
                        setAvatarPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>
                {avatarPreview || avatarFile ? (
                  <button
                    type="button"
                    className="ml-2 text-red-500 font-medium text-base hover:underline"
                    onClick={() => {
                      setAvatarPreview(undefined);
                      setAvatarFile(null);
                    }}
                  >
                    Remove
                  </button>
                ) : null}
              </div>
              <span className="text-xs text-gray-400 mt-1">
                JPG, GIF or PNG. Max size of 2MB.
              </span>
            </div>
          </div>
          <Form {...form}>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(async (values) => {
                setSaving(true);
                try {
                  const formData = new FormData();
                  formData.append("name", values.name);
                  if (avatarFile) {
                    formData.append("avatar", avatarFile);
                  }
                  await updateAdmin(userInfo.id, formData);
                } finally {
                  setSaving(false);
                }
              })}
            >
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-gray-50" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    value={userInfo?.email || ""}
                    className="bg-gray-50"
                  />
                </FormControl>
              </FormItem>
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  type="button"
                  disabled={saving}
                  onClick={() => {
                    form.reset({
                      name: userInfo.name || "",
                      avatar: userInfo.avatar || "",
                    });
                    setAvatarPreview(userInfo.avatar || undefined);
                    setAvatarFile(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 text-white"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
