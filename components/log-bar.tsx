"use client";
import React from "react";
import { useEffect, useState, useCallback } from "react";
import LogEntry from "./LogEntry";
import { matchingEngine } from "@/lib/matching-engine";
import type { LogEntry as LogEntryType } from "@/lib/matching-engine";
import { RefreshCcw } from "lucide-react";

export const LogBar = () => {
  const [logs, setLogs] = useState<LogEntryType[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogUpdate = useCallback((newLogs: LogEntryType[]) => {
    console.log("[LogBar] Received log update:", newLogs);
    setLogs(newLogs);
  }, []);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const logsData = await matchingEngine.fetchTEELogs();
        console.log("[LogBar] Fetched initial logs:", logsData);
        setLogs(logsData);
      } catch (error) {
        console.error("[LogViewer] Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();

    // Subscribe to log updates
    console.log("[LogBar] Setting up log subscription");
    const unsubscribe = matchingEngine.subscribeToLogs(handleLogUpdate);

    return () => {
      console.log("[LogBar] Cleaning up subscription");
      unsubscribe();
    };
  }, [handleLogUpdate]);

  return (
    <div className="max-w-md backdrop-blur-sm w-full space-y-4">
      <div className="bg-gradient-to-br from-blue-500/5 to-blue-600/5 rounded-none p-5 shadow-lg border border-blue-500/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-blue-600 text-lg font-bold">Transaction Logs</h2>
          <button
            className="px-3 py-1.5 bg-gradient-to-r from-blue-600/10 to-blue-500/10 hover:from-blue-600/20 hover:to-blue-500/20 text-blue-500 rounded-none transition-all flex items-center gap-2 text-sm border border-blue-500/20 hover:border-blue-500/20"
            onClick={() => {
              setLoading(true);
              matchingEngine
                .fetchTEELogs()
                .then(setLogs)
                .finally(() => setLoading(false));
            }}
          >
            <RefreshCcw
              className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
            />
            {!loading && "Refresh"}
          </button>
        </div>
        <div className="h-[597px] overflow-y-auto">
          <div className="space-y-2">
            {logs.map((log, index) => (
              <LogEntry
                key={`${log.time}-${index}`}
                time={log.time}
                type={log.type}
                message={log.message}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};