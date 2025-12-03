import DashboardHeader from "@/components/shared/DashboardHeader";
import SettingsTabs from "./_components/SettingsTabs";

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col">
            <DashboardHeader
                title="Settings"
                description="Welcome! Monitor and manage your Facebook pages performance"
            />

            <SettingsTabs>{children}</SettingsTabs>
        </div>
    );
}
