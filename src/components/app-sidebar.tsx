"use client";
import React, { useState } from 'react';
import { LayoutDashboard, FileText, Calendar, BarChart3, Scale, Settings, LogOut } from 'lucide-react';

const AppSidebar = () => {
  const [activeItem, setActiveItem] = useState('Overview');

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', active: true },
    { icon: FileText, label: 'Facebook Pages', active: false },
    { icon: Calendar, label: 'Post & Scheduling', active: false },
    { icon: BarChart3, label: 'Insights', active: false },
  ];

  const bottomMenuItems = [
    { icon: Scale, label: 'Poll' },
    { icon: Settings, label: 'Setting' },
  ];

  const userInfo = {
    name: 'W. Shakespeare',
    email: 'shakespeare@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shakespeare'
  };

  return (
    <div className="w-full sm:w-72 h-dvh bg-white border-r border-gray-200 flex flex-col">
      {/* Logo Section */}
      <div className="p-3 sm:p-4 border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="sm:w-10 sm:h-10">
            <path d="M8 8L8 12C8 14 10 16 12 16L16 16" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" fill="none"/>
            <path d="M12 12L20 12C22 12 24 14 24 16L24 20" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" fill="none"/>
            <path d="M16 16L24 16C26 16 28 18 28 20L28 24" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" fill="none"/>
            <path d="M6 6L10 10L6 14" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
          <div>
            <span className="text-lg sm:text-2xl font-bold text-blue-600">Logo</span>
            <span className="text-lg sm:text-2xl font-bold text-gray-800">ipsum</span>
          </div>
        </div>
      </div>

      {/* Main Menu Items */}
      <nav className="px-3 sm:px-4 py-2 space-y-0.5 shrink-0">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.label;
          return (
            <button
              key={item.label}
              onClick={() => setActiveItem(item.label)}
              className={`w-full flex items-center gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className="font-medium truncate hidden sm:inline">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Menu Items */}
      <nav className="px-3 sm:px-4 py-1.5 space-y-0.5 shrink-0">
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => setActiveItem(item.label)}
              className="w-full flex items-center gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-all duration-200"
            >
              <Icon className="w-5 h-5 shrink-0 text-gray-400" />
              <span className="font-medium truncate hidden sm:inline">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Spacer to push user section to bottom */}
      <div className="flex-1 min-h-0"></div>

      {/* User Profile Section */}
      <div className="p-2 sm:p-3 border-t border-gray-100 shrink-0">
        <div className="flex items-center gap-3 p-1.5 sm:p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group">
          <img
            src={userInfo.avatar}
            alt={userInfo.name}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full shrink-0"
          />
          <div className="flex-1 min-w-0 hidden sm:block">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {userInfo.name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {userInfo.email}
            </p>
          </div>
          <LogOut className="w-5 h-5 shrink-0 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block" />
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;