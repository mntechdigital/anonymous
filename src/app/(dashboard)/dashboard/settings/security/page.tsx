"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

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
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle password change logic here
        console.log("Password change submitted:", formData);
    };

    const handleCancel = () => {
        setFormData({
            currentPassword: "",
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
                className="bg-white rounded-2xl border-[0.5px] border-[#E8E8E8] py-6 px-5"
            >
                {/* Section Header */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900 font-nunito">Change Password</h2>
                    <p className="text-sm font-semibold text-gray-500 mt-1 font-nunito">
                        Update your password to keep your account secure
                    </p>
                </div>

                {/* Password Form */}
                <form onSubmit={handleSubmit}>
                    <motion.div variants={itemVariants} className="space-y-4">
                        {/* Current Password */}
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-700">
                                Current Password
                            </Label>
                            <Input
                                id="currentPassword"
                                type="password"
                                placeholder="********"
                                value={formData.currentPassword}
                                onChange={(e) =>
                                    setFormData({ ...formData, currentPassword: e.target.value })
                                }
                                className="h-11 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus-visible:ring-1"
                            />
                        </div>

                        {/* New Password */}
                        <div className="space-y-2">
                            <Label htmlFor="newPassword" className="text-sm font-medium text-gray-700">
                                New Password
                            </Label>
                            <Input
                                id="newPassword"
                                type="password"
                                placeholder="************"
                                value={formData.newPassword}
                                onChange={(e) =>
                                    setFormData({ ...formData, newPassword: e.target.value })
                                }
                                className="h-11 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus-visible:ring-1"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                                Confirm Password
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                placeholder="************"
                                value={formData.confirmPassword}
                                onChange={(e) =>
                                    setFormData({ ...formData, confirmPassword: e.target.value })
                                }
                                className="h-11 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-blue-500 focus-visible:ring-1"
                            />
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
                            className="px-6 h-10 rounded-full cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="px-6 h-10 rounded-full cursor-pointer bg-[#3B82F6] hover:bg-blue-600 text-white"
                        >
                            Save Changes
                        </Button>
                    </motion.div>
                </form>
            </motion.div>

        </motion.div>
    );
}
