"use client";

import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { TeamMemberCard } from "@/components/shared/TeamMemberCard";

const TeamPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const teamMembers = [
    {
      id: 1,
      ownerName: "P.B. Shelley",
      ownerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      badges: [
        { 
          pageName: "Pepsi Official", 
          followers: "444K",
          pageLogoUrl: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=100&h=100&fit=crop",
        },
        { 
          pageName: "Coca Cola", 
          followers: "124K",
          pageLogoUrl: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=100&h=100&fit=crop",
        },
      ],
    },
    {
      id: 2,
      ownerName: "P.B. Shelley",
      ownerImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      badges: [
        { 
          pageName: "Pepsi Official", 
          followers: "124K",
          pageLogoUrl: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=100&h=100&fit=crop",
        },
        { 
          pageName: "Coca Cola", 
          followers: "124K",
          pageLogoUrl: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=100&h=100&fit=crop",
        },
      ],
    },
    {
      id: 3,
      ownerName: "P.B. Shelley",
      ownerImage: "",
      badges: [
        { 
          pageName: "Pepsi Official", 
          followers: "124K",
          pageLogoUrl: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=100&h=100&fit=crop",
        },
        { 
          pageName: "Coca Cola", 
          followers: "124K",
          pageLogoUrl: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=100&h=100&fit=crop",
        },
      ],
    },
    {
      id: 4,
      ownerName: "P.B. Shelley",
      ownerImage: "",
      badges: [
        { 
          pageName: "Pepsi Official", 
          followers: "124K",
          pageLogoUrl: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=100&h=100&fit=crop",
        },
        { 
          pageName: "Coca Cola", 
          followers: "124K",
          pageLogoUrl: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=100&h=100&fit=crop",
        },
      ],
    },
    {
      id: 5,
      ownerName: "P.B. Shelley",
      ownerImage: "",
      badges: [
        { 
          pageName: "Pepsi Official", 
          followers: "124K",
          pageLogoUrl: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=100&h=100&fit=crop",
        },
        { 
          pageName: "Coca Cola", 
          followers: "124K",
          pageLogoUrl: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=100&h=100&fit=crop",
        },
      ],
    },
    {
      id: 6,
      ownerName: "P.B. Shelley",
      ownerImage: "",
      badges: [
        { 
          pageName: "Pepsi Official", 
          followers: "124K",
          pageLogoUrl: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=100&h=100&fit=crop",
        },
        { 
          pageName: "Coca Cola", 
          followers: "124K",
          pageLogoUrl: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=100&h=100&fit=crop",
        },
      ],
    },
    {
      id: 7,
      ownerName: "P.B. Shelley",
      ownerImage: "",
      badges: [
        { 
          pageName: "Pepsi Official", 
          followers: "124K",
          pageLogoUrl: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=100&h=100&fit=crop",
        },
        { 
          pageName: "Coca Cola", 
          followers: "124K",
          pageLogoUrl: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=100&h=100&fit=crop",
        },
      ],
    },
  ];

  const filteredMembers = teamMembers.filter((member) =>
    member.ownerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (memberId: number) => {
    console.log("Edit member:", memberId);
    // Implement edit logic
  };

  const handleBlock = (memberId: number) => {
    console.log("Block member:", memberId);
    // Implement block logic
  };

  return (
    <div className="p-6 border rounded-[12px]">
      <PageHeader
        title="Team Members (Page Owner)"
        subtitle="Manage your team and users with a admin."
        showSearch={true}
        searchPlaceholder="Search"
        onSearchChange={setSearchQuery}
      />

      <div className="bg-white overflow-hidden space-y-4">
        {filteredMembers.map((member) => (
          <TeamMemberCard
            key={member.id}
            ownerName={member.ownerName}
            ownerImage={member.ownerImage}
            badges={member.badges}
            onEdit={() => handleEdit(member.id)}
            onBlock={() => handleBlock(member.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamPage;