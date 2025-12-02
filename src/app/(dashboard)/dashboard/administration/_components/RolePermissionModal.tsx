"use client";

import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { X, Loader2 } from "lucide-react";
import teamIcon from "../../../../assets/role.svg";
import Image from "next/image";

export type RolePermissionValues = {
  features: number[];
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (values: RolePermissionValues) => void;
  isSubmitting?: boolean;
}

export default function RolePermissionModal({
  open,
  onOpenChange,
  onConfirm,
  isSubmitting = false,
}: Props) {
  const form = useForm<RolePermissionValues>({
    defaultValues: {
      features: [],
    },
  });

  const submit = (values: RolePermissionValues) => {
    console.log('Selected features:', values.features);
    onConfirm(values);
  };

  const toggleFeature = (index: number) => {
    const currentFeatures = form.getValues('features');
    const newFeatures = currentFeatures.includes(index)
      ? currentFeatures.filter((f) => f !== index)
      : [...currentFeatures, index];
    form.setValue('features', newFeatures);
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
            onClick={() => !isSubmitting && onOpenChange(false)}
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
                disabled={isSubmitting}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
                    <div className="grid grid-cols-3 gap-x-6 gap-y-6 mb-6">
                      <div className="flex flex-col items-center gap-2">
                        <div className="text-xs font-medium text-gray-700 mb-1.5">
                          Overview
                        </div>
                        <Switch
                          checked={form.watch('features').includes(0)}
                          onCheckedChange={() => toggleFeature(0)}
                          disabled={isSubmitting}
                          className="data-[state=checked]:bg-blue-500 scale-150"
                        />
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <div className="text-xs font-medium text-gray-700 mb-1.5">
                          Facebook Pages
                        </div>
                        <Switch
                          checked={form.watch('features').includes(1)}
                          onCheckedChange={() => toggleFeature(1)}
                          disabled={isSubmitting}
                          className="data-[state=checked]:bg-blue-500 scale-150"
                        />
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <div className="text-xs font-medium text-gray-700 mb-1.5">
                          Post & Schedule
                        </div>
                        <Switch
                          checked={form.watch('features').includes(2)}
                          onCheckedChange={() => toggleFeature(2)}
                          disabled={isSubmitting}
                          className="data-[state=checked]:bg-blue-500 scale-150"
                        />
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <div className="text-xs font-medium text-gray-700 mb-1.5">
                          Insights
                        </div>
                        <Switch
                          checked={form.watch('features').includes(3)}
                          onCheckedChange={() => toggleFeature(3)}
                          disabled={isSubmitting}
                          className="data-[state=checked]:bg-blue-500 scale-150"
                        />
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <div className="text-xs font-medium text-gray-700 mb-1.5">
                          Support
                        </div>
                        <Switch
                          checked={form.watch('features').includes(4)}
                          onCheckedChange={() => toggleFeature(4)}
                          disabled={isSubmitting}
                          className="data-[state=checked]:bg-blue-500 scale-150"
                        />
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <div className="text-xs font-medium text-gray-700 mb-1.5">
                          Settings
                        </div>
                        <Switch
                          checked={form.watch('features').includes(5)}
                          onCheckedChange={() => toggleFeature(5)}
                          disabled={isSubmitting}
                          className="data-[state=checked]:bg-blue-500 scale-150"
                        />
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 border-gray-200 rounded-sm hover:bg-gray-50"
                        onClick={() => onOpenChange(false)}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 rounded-sm bg-blue-500 hover:bg-blue-600 text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          'Confirm'
                        )}
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
