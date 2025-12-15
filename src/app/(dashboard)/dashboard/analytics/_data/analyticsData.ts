// Static data for analytics - ready for dynamic replacement
export const analyticsData = {
  // Top metrics cards
  metrics: [
    {
      id: 1,
      label: "Total Reach",
      value: "843.9K",
      change: 8.5,
      isPositive: true,
      compareText: "Up from yesterday",
      icon: "eye",
      iconColor: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      label: "Engagement",
      value: "54.4K",
      change: 1.3,
      isPositive: true,
      compareText: "Up from past week",
      icon: "heart",
      iconColor: "bg-pink-100 text-pink-600",
    },
    {
      id: 3,
      label: "New Followers",
      value: "127.8K",
      change: 3.8,
      isPositive: true,
      compareText: "Up from yesterday",
      icon: "users",
      iconColor: "bg-green-100 text-green-600",
    },
    {
      id: 4,
      label: "Comments",
      value: "8.9K",
      change: 4.3,
      isPositive: false,
      compareText: "Down from yesterday",
      icon: "message",
      iconColor: "bg-blue-100 text-blue-600",
    },
    {
      id: 5,
      label: "Shares",
      value: "4.2K",
      change: 4.3,
      isPositive: false,
      compareText: "Down from yesterday",
      icon: "share",
      iconColor: "bg-orange-100 text-orange-600",
    },
  ],

  // Weekly performance chart data
  weeklyPerformance: [
    { day: "Mon", engagement: 28000, impressions: 20000, reach: 15000 },
    { day: "Tue", engagement: 55000, impressions: 42000, reach: 18000 },
    { day: "Wed", engagement: 48000, impressions: 45000, reach: 12000 },
    { day: "Thu", engagement: 52000, impressions: 62000, reach: 22000 },
    { day: "Fri", engagement: 45000, impressions: 55000, reach: 28000 },
    { day: "Sat", engagement: 60000, impressions: 65000, reach: 58000 },
    { day: "Sun", engagement: 65000, impressions: 72000, reach: 48000 },
  ],

  // Audience by age
  audienceByAge: [
    { ageRange: "18-24", percentage: 35, fill: "#4F46E5" },
    { ageRange: "25-34", percentage: 30, fill: "#374151" },
    { ageRange: "35-44", percentage: 20, fill: "#FF00FF" },
    { ageRange: "55+", percentage: 15, fill: "#FF8C00" },
  ],

  // Audience by gender
  audienceByGender: [
    { gender: "Male", percentage: 30, fill: "#06B6D4" },
    { gender: "Female", percentage: 30, fill: "#6366F1" },
    { gender: "Others", percentage: 40, fill: "#F59E0B" },
  ],

  // Page reach comparison
  pageReach: [
    { date: "Day 1", lastMonth: 243400, thisMonth: 643400 },
    { date: "Day 5", lastMonth: 180000, thisMonth: 520000 },
    { date: "Day 10", lastMonth: 210000, thisMonth: 480000 },
    { date: "Day 15", lastMonth: 190000, thisMonth: 460000 },
    { date: "Day 20", lastMonth: 200000, thisMonth: 310000 },
    { date: "Day 25", lastMonth: 240000, thisMonth: 420000 },
    { date: "Day 30", lastMonth: 350000, thisMonth: 680000 },
  ],

  // Audience by country
  audienceByCountry: [
    { country: "Dubai", percentage: 18.5, followers: "18.5%" },
    { country: "USA", percentage: 18.5, followers: "18.5%" },
    { country: "UAE", percentage: 18.5, followers: "18.5%" },
    { country: "UK", percentage: 18.5, followers: "18.5%" },
    { country: "Bangladesh", percentage: 18.5, followers: "18.5%" },
    { country: "Argentina", percentage: 18.5, followers: "18.5%" },
    { country: "Japan", percentage: 18.5, followers: "18.5%" },
  ],

  // Top locations
  topLocations: [
    { location: "New York", followers: "12,543 followers", percentage: 18.5 },
    {
      location: "Los Angeles",
      followers: "12,543 followers",
      percentage: 18.5,
    },
    { location: "Chicago", followers: "12,543 followers", percentage: 18.5 },
    { location: "Dhaka", followers: "12,543 followers", percentage: 18.5 },
    { location: "Barisal", followers: "12,543 followers", percentage: 18.5 },
  ],
};
