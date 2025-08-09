import {
  Server,
  CheckCircle2,
  Clock4,
  AlertTriangle,
} from "lucide-react";

const statusCards = [
  {
    title: "Total Terminals",
    icon: <Server className="h-5 w-5 text-gray-500" />,
    valueKey: "total",
    textColor: "text-gray-800",
    borderColor: "border-gray-300",
    bgColor: "bg-gray-50",
  },
  {
    title: "Submitted",
    icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
    valueKey: "Submitted",
    textColor: "text-green-700",
    borderColor: "border-green-200",
    bgColor: "bg-green-50",
  },
  {
    title: "Remind",
    icon: <Clock4 className="h-5 w-5 text-yellow-600" />,
    valueKey: "Remind",
    textColor: "text-yellow-700",
    borderColor: "border-yellow-200",
    bgColor: "bg-yellow-50",
  },
  {
    title: "Past Due",
    icon: <AlertTriangle className="h-5 w-5 text-red-600" />,
    valueKey: "Past Due",
    textColor: "text-red-700",
    borderColor: "border-red-200",
    bgColor: "bg-red-50",
  },
];

const NscStreamsStatsOverview = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-medium">
      {statusCards.map((card) => (
        <div
          key={card.title}
          className={`border ${card.borderColor} ${card.bgColor} rounded-lg p-4 shadow-sm flex flex-col gap-2`}
        >
          <div className="flex items-center gap-2 text-gray-500">
            {card.icon}
            <span>{card.title}</span>
          </div>
          <div className={`text-xl font-bold ${card.textColor}`}>
            {stats[card.valueKey]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NscStreamsStatsOverview;
