interface DashboardHeaderProps {
  title: string;
  description: string;
}

const DashboardHeader = ({ title, description }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-1 flex-col animate-fade-in px-5 lg:px-6 pb-6">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-6 md:gap-8 pt-6">
          <div className="">
            <div className="relative">
              <h1 className="text-3xl font-semibold font-sans">{title}</h1>
              <p className="font-nunito text-muted-foreground mt-1">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;

export const DashboardMiniHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-1 flex-col animate-fade-in px-5 lg:px-6 pb-6">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-6 md:gap-8 pt-6">
          <div className="">
            <div className="relative">
              <h1 className="text-xl font-semibold font-sans">{title}</h1>
              <p className="font-nunito text-muted-foreground mt-1 text-xs">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
