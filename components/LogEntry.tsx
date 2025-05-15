import React from "react";
import type { LogEntry as LogEntryType } from "@/lib/matching-engine";

interface LogEntryProps {
  time: string;
  type: string;
  message: string;
}

const LogEntry: React.FC<LogEntryProps> = ({ time, type, message }) => {
  const getTypeColor = () => {
    switch (type) {
      case "SUCCESS":
        return "text-emerald-500";
      case "INFO":
        return "text-blue-500";
      case "WARNING":
        return "text-amber-500";
      case "ERROR":
        return "text-red-500";
      default:
        return "text-blue-500";
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500/5 to-blue-600/5 rounded-none p-3 border border-blue-600/20 hover:border-blue-500/20 transition-colors">
      <div className="flex items-center justify-between mb-1">
        <span className="text-blue-500 text-sm font-medium">{time}</span>
        <span className={`${getTypeColor()} text-sm font-medium`}>{type}</span>
      </div>
      <p className="text-blue-600 text-sm">{message}</p>
    </div>
  );
};

export default LogEntry;