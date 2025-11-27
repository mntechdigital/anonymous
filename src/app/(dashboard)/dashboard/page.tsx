
const DashboardHome = () => {
  return (
    <div className="flex flex-1 flex-col animate-fade-in">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-6 py-6 md:gap-8 md:py-8">
          {/* Enhanced welcome section */}
          <div className="px-4 lg:px-6">
            <div className="relative">
              <h1 className="text-3xl font-bold tracking-tight from-primary to-primary/60 bg-clip-text text-transparent">
                Dashboard Overview
              </h1>
              <p className="text-muted-foreground mt-2">
                Monitor your campaigns, track donations, and manage your impact
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
