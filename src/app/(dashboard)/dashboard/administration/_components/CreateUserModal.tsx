"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password too short"),
  confirmPassword: z.string().min(6, "Confirm password"),
  roleName: z.string().min(1, "Role name required"),
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
  const form = useForm<CreateUserValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      roleName: "",
    },
  });

  const submit = (values: CreateUserValues) => {
    onNext(values);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-w-2xl mx-auto rounded-lg">
        <SheetHeader>
          <SheetTitle>Add New User</SheetTitle>
          <SheetDescription>
            Connect a new user to your dashboard. Provide the user details below.
          </SheetDescription>
        </SheetHeader>

        <div className="p-4">
          <Form {...form}>{/* FormProvider */}
            <form
              onSubmit={form.handleSubmit(submit)}
              className="grid gap-3"
            >
              <FormField name="name" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Write here...." />
                  </FormControl>
                </FormItem>
              )} />

              <FormField name="email" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Write here...." />
                  </FormControl>
                </FormItem>
              )} />

              <div className="grid grid-cols-2 gap-3">
                <FormField name="password" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="********" />
                    </FormControl>
                  </FormItem>
                )} />

                <FormField name="confirmPassword" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" placeholder="********" />
                    </FormControl>
                  </FormItem>
                )} />
              </div>

              <FormField name="roleName" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Role Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Write here" />
                  </FormControl>
                </FormItem>
              )} />

              <div className="flex items-center justify-end gap-2 mt-3">
                <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button type="submit">Confirm</Button>
              </div>
            </form>
          </Form>
        </div>

      </SheetContent>
    </Sheet>
  );
}
