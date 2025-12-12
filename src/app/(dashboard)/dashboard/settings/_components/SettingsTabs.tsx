"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

const tabs = [
    { id: "security", label: "Security", href: "/dashboard/settings/security" },
    { id: "team", label: "Team", href: "/dashboard/settings/team" },
    { id: "requests", label: "Requests", href: "/dashboard/settings/requests" },
    { id: "blocklist", label: "Blocklist", href: "/dashboard/settings/blocklist" },
];

export default function SettingsTabs({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const activeTab = tabs.find((tab) => pathname.includes(tab.id))?.id || "security";

    return (
        <div className="px-4 sm:px-5 lg:px-6">
            <div className="inline-flex items-center gap-0.5 sm:gap-1 p-1 sm:p-1.5 bg-[#F7F7F7] rounded-full overflow-x-auto md:overflow-x-hidden max-w-full">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => router.push(tab.href)}
                            className="relative px-3 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTabBg"
                                    className="absolute inset-0 bg-[#3B82F6] rounded-full shadow-sm"
                                    initial={false}
                                    transition={{
                                        type: "spring",
                                        stiffness: 700,
                                        damping: 50,
                                    }}
                                />
                            )}
                            <span
                                className={`relative z-10 transition-colors duration-200 ${isActive ? "text-white" : "text-gray-700 hover:text-gray-900"
                                    }`}
                            >
                                {tab.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Animated Content Area */}
            <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -2 }}
                transition={{
                    duration: 0.15,
                }}
                className="py-6"
            >
                {children}
            </motion.div>
        </div>
    );
}
