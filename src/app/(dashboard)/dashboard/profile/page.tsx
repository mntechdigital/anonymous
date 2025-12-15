import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardHeader from "@/components/shared/DashboardHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfilePage = () => {
//   const getUserInitials = () => {
//     if (!user?.email) return "U";
//     return user.email.substring(0, 2).toUpperCase();
//   };
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
            <Avatar className="w-24 h-24">
              <AvatarImage
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Profile"
                className="w-24 h-24 object-cover rounded-full"
              />
              <AvatarFallback className="w-24 h-24 flex items-center justify-center text-2xl font-semibold bg-gray-100 text-gray-500 rounded-full">
                S
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1 flex-1">
              <div className="flex items-center gap-4">
                <label htmlFor="avatar-upload" className="flex items-center border border-gray-300 rounded-lg px-4 py-2 cursor-pointer transition hover:border-blue-400">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                  <span className="text-gray-500 font-medium text-base">Change Photo</span>
                  <input id="avatar-upload" type="file" accept="image/*" className="hidden" />
                </label>
                <button type="button" className="ml-2 text-red-500 font-medium text-base hover:underline">Remove</button>
              </div>
              <span className="text-xs text-gray-400 mt-1">JPG, GIF or PNG. Max size of 2MB.</span>
            </div>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Input disabled value="W. Shakespeare" className="bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <Input
                disabled
                value="shakespeare@gmail.com"
                className="bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <Input disabled value="+880 1234-56789" className="bg-gray-50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <Input
                disabled
                value="English Playwright of Elizabethan Age"
                className="bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <Input
                disabled
                value="Stratford-upon-Avon, United Kingdom"
                className="bg-gray-50"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 text-white">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
