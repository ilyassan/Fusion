import { PerformerData } from "./TopPerformers"; // Import from parent

interface PerformerItemProps {
  performer: PerformerData;
  index: number;
}

export const PerformerItem = ({ performer, index }: PerformerItemProps) => {
  return (
    <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <span className="text-blue-500 font-medium">{index + 1}</span>
        </div>
        <div>
          <p className="font-medium">{performer.name}</p>
          <p className="text-sm text-gray-500">{performer.deals} deals</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">${performer.revenue.toLocaleString()}</p>
      </div>
    </div>
  );
};