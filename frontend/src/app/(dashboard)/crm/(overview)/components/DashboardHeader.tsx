interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

export const DashboardHeader = ({ title, subtitle }: DashboardHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
};