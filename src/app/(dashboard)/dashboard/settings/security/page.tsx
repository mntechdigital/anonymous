/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { changePassword } from "@/services/auth";
import { changePasswordSchema, type ChangePasswordValues } from "@/validation/auth.validation";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 300,
            damping: 24,
        },
    },
};

export default function SecurityPage() {
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<Partial<Record<keyof ChangePasswordValues, string>>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        // Validate form data
        const validation = changePasswordSchema.safeParse(formData);
        
        if (!validation.success) {
            const fieldErrors: Partial<Record<keyof ChangePasswordValues, string>> = {};
            validation.error.issues.forEach((err) => {
                if (err.path[0]) {
                    fieldErrors[err.path[0] as keyof ChangePasswordValues] = err.message;
                }
            });
            setErrors(fieldErrors);
            return;
        }

        setIsLoading(true);

        try {
            await changePassword({
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
            });

            toast.success("Password changed successfully", {
                description: "Your password has been updated.",
            });

            // Reset form
            setFormData({
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (error: any) {
            toast.error("Failed to change password", {
                description: error?.message || "Please check your current password and try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="w-full"
        >
            {/* Card Container */}
            <motion.div
                variants={itemVariants}
                className="bg-white rounded-[12px] border-[0.5px] border-[#E8E8E8] py-6 px-5"
            >
                {/* Section Header */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 font-nunito">Change Password</h2>
                    <p className="text-xs font-semibold text-gray-500 font-nunito">
                        Update your password to keep your account secure
                    </p>
                </div>

                {/* Password Form */}
                <form onSubmit={handleSubmit}>
                    <motion.div variants={itemVariants} className="space-y-4">
                        {/* Current Password */}
                        <div className="space-y-2">
                            <Label htmlFor="oldPassword" className="text-sm font-medium text-gray-700">
                                Current Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="oldPassword"
                                    type={showOldPassword ? "text" : "password"}
                                    placeholder="********"
                                    value={formData.oldPassword}
                                    onChange={(e) => {
                                        setFormData({ ...formData, oldPassword: e.target.value });
                                        if (errors.oldPassword) {
                                            setErrors({ ...errors, oldPassword: undefined });
                                        }
                                    }}
                                    className={`h-11 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus-visible:ring-1 pr-10 ${
                                        errors.oldPassword ? "border-red-500" : ""
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showOldPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                            </div>
                            {errors.oldPassword && (
                                <p className="text-xs text-red-500">{errors.oldPassword}</p>
                            )}
                        </div>

                        {/* New Password */}
                        <div className="space-y-2">
                            <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                                New Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="newPassword"
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="************"
                                    value={formData.newPassword}
                                    onChange={(e) => {
                                        setFormData({ ...formData, newPassword: e.target.value });
                                        if (errors.newPassword) {
                                            setErrors({ ...errors, newPassword: undefined });
                                        }
                                    }}
                                    className={`h-11 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus-visible:ring-1 pr-10 ${
                                        errors.newPassword ? "border-red-500" : ""
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showNewPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                            </div>
                            {errors.newPassword && (
                                <p className="text-xs text-red-500">{errors.newPassword}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                                Confirm Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="************"
                                    value={formData.confirmPassword}
                                    onChange={(e) => {
                                        setFormData({ ...formData, confirmPassword: e.target.value });
                                        if (errors.confirmPassword) {
                                            setErrors({ ...errors, confirmPassword: undefined });
                                        }
                                    }}
                                    className={`h-11 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus-visible:ring-1 pr-10 ${
                                        errors.confirmPassword ? "border-red-500" : ""
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-xs text-red-500">{errors.confirmPassword}</p>
                            )}
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="flex items-center justify-end gap-3 pt-6 border-gray-100"
                    >
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                            disabled={isLoading}
                            className="px-6 h-10 rounded-full cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 h-10 rounded-full cursor-pointer bg-[#3B82F6] hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                    </motion.div>
                </form>
            </motion.div>

        </motion.div>
    );
}
