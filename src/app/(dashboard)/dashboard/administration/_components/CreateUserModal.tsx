"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { X, Eye, EyeOff } from "lucide-react";
import teamIcon from "../../../../assets/fluent-color_people-team-24.svg";
import Image from "next/image";

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password too short"),
  confirmPassword: z.string().min(6, "Confirm password"),
  roleName: z.string().min(1, "Role name required"),
  features: z.array(z.number()),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type CreateUserValues = z.infer<typeof userSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNext: (values: CreateUserValues) => void;
}

export default function CreateUserModal({ open, onOpenChange, onNext }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<CreateUserValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      roleName: "",
      features: [],
    },
  });

  const submit = (values: CreateUserValues) => {
    console.log('Create user with features:', values.features);
    onNext(values);
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
              className="relative w-full max-w-[640px] bg-white rounded-2xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="px-6 pt-6 pb-4">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 bg-white shadow p-2 rounded-md">
                    <Image
                      src={teamIcon}
                      alt="Add User"
                      width={32}
                      height={32}
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Add New User
                    </h2>
                    <p className="text-sm text-gray-500 max-w-md">
                      Connect a new Facebook page to your dashboard. You&apos;ll need your page URL, and access token.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="px-6  pb-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
                    <FormField
                      name="name"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm gap-1 font-medium text-gray-700">
                            Name<span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Write here...."
                              className="border-gray-200 h-11 focus-visible:ring-1"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="email"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm gap-1 font-medium text-gray-700">
                            Email<span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Write here...."
                              className="border-gray-200 h-11 focus-visible:ring-1"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <FormField
                        name="password"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm gap-1 font-medium text-gray-700">
                              Password<span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type={showPassword ? "text" : "password"}
                                  placeholder="********"
                                  className="border-gray-200 h-11 focus-visible:ring-1 pr-10"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                                >
                                  {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                  ) : (
                                    <Eye className="w-5 h-5" />
                                  )}
                                </button>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        name="confirmPassword"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm gap-1 font-medium text-gray-700">
                              Confirm Password<span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  {...field}
                                  type={showConfirmPassword ? "text" : "password"}
                                  placeholder="********"
                                  className="border-gray-200 h-11 focus-visible:ring-1 pr-10"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                                >
                                  {showConfirmPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                  ) : (
                                    <Eye className="w-5 h-5" />
                                  )}
                                </button>
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      name="roleName"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm gap-1 font-medium text-gray-700">
                            Role Name<span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Write here"
                              className="border-gray-200 h-11 focus:outline-none focus-visible:ring-1"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
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
                        Next
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
