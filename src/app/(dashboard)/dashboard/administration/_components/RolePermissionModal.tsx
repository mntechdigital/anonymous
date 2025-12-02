"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { X } from "lucide-react";
import teamIcon from "../../../../assets/role.svg";
import Image from "next/image";

export type RolePermissionValues = {
  overview: boolean;
  facebookPages: boolean;
  postScheduling: boolean;
  insights: boolean;
  pollFeedback: boolean;
  setting: boolean;
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (values: RolePermissionValues) => void;
}

export default function RolePermissionModal({
  open,
  onOpenChange,
  onConfirm,
}: Props) {
  const form = useForm<RolePermissionValues>({
    defaultValues: {
      overview: false,
      facebookPages: false,
      postScheduling: false,
      insights: false,
      pollFeedback: false,
      setting: false,
    },
  });

  const submit = (values: RolePermissionValues) => {
    onConfirm(values);
    onOpenChange(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="px-6 pt-6 pb-4 flex items-start gap-4">
                <div className="shrink-0 bg-white shadow p-2 rounded-md">
                  <Image
                    src={teamIcon}
                    alt="Role Permission"
                    width={32}
                    height={32}
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Role Permission
                  </h2>
                  <p className="text-sm text-gray-500">
                    Give feature permission to your user
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="px-6 pb-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(submit)}>
                    {/* Permissions Grid */}
                    <div className="grid grid-cols-3 gap-x-6 gap-y-4 mb-6">
                      <FormField
                        name="overview"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="flex flex-col items-start gap-2">
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Overview
                            </FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-blue-500"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        name="facebookPages"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="flex flex-col items-start gap-2">
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Facebook Pages
                            </FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-blue-500"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        name="postScheduling"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="flex flex-col items-start gap-2">
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Post Scheduling
                            </FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-blue-500"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        name="insights"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="flex flex-col items-start gap-2">
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Insights
                            </FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-blue-500"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        name="pollFeedback"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="flex flex-col items-start gap-2">
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Poll & Feedback
                            </FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-blue-500"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        name="setting"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="flex flex-col items-start gap-2">
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Setting
                            </FormLabel>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-blue-500"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 border-gray-200 rounded-sm hover:bg-gray-50"
                        onClick={() => onOpenChange(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 rounded-sm bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        Confirm
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
