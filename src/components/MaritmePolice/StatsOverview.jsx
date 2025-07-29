import { Boxes, ShieldCheck, CheckCircle2, XCircle } from "lucide-react";
import { motion } from "framer-motion";

const statusStyles = {
  Flagged: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-yellow-200",
    iconBg: "bg-yellow-100",
  },
  Contested: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    iconBg: "bg-blue-100",
  },
  Released: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
    iconBg: "bg-green-100",
  },
  Confiscated: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    iconBg: "bg-red-100",
  },
};

const statusIcons = {
  Flagged: Boxes,
  Contested: ShieldCheck,
  Released: CheckCircle2,
  Confiscated: XCircle,
};

const StatsOverview = ({ containers = [] }) => {
  const statuses = ["Flagged", "Contested", "Released", "Confiscated"];

  const counts = statuses.reduce((acc, status) => {
    acc[status] = containers.filter((c) => c.status === status).length;
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      {statuses.map((status, i) => {
        const Icon = statusIcons[status];
        const styles = statusStyles[status];

        return (
          <motion.div
            key={status}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-5 rounded-2xl border ${styles.border} ${styles.bg} transition hover:shadow-md hover:scale-[1.015] duration-300`}
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className={`text-sm font-medium ${styles.text}`}>{status} Containers</p>
                <p className={`text-3xl font-bold ${styles.text}`}>{counts[status]}</p>
              </div>
              <div className={`p-2 rounded-lg ${styles.iconBg}`}>
                <Icon className={`w-6 h-6 ${styles.text}`} />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsOverview;
