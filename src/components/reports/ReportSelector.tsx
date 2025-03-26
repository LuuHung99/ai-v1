import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

export type ReportType =
  | "daily-sales"
  | "inventory-usage"
  | "popular-items"
  | "custom";

export interface ReportSelectorProps {
  onReportTypeChange?: (reportType: ReportType) => void;
  defaultReportType?: ReportType;
}

const ReportSelector = ({
  onReportTypeChange = () => {},
  defaultReportType = "daily-sales",
}: ReportSelectorProps) => {
  const [activeReport, setActiveReport] =
    useState<ReportType>(defaultReportType);

  const handleReportChange = (value: string) => {
    const reportType = value as ReportType;
    setActiveReport(reportType);
    onReportTypeChange(reportType);
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardContent className="p-4">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Report Selection
          </h2>
          <Tabs
            defaultValue={defaultReportType}
            onValueChange={handleReportChange}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 w-full bg-gray-100 p-1 rounded-md">
              <TabsTrigger
                value="daily-sales"
                className={cn(
                  "py-2 text-sm font-medium transition-all",
                  activeReport === "daily-sales"
                    ? "text-primary"
                    : "text-gray-600",
                )}
              >
                Daily Sales
              </TabsTrigger>
              <TabsTrigger
                value="inventory-usage"
                className={cn(
                  "py-2 text-sm font-medium transition-all",
                  activeReport === "inventory-usage"
                    ? "text-primary"
                    : "text-gray-600",
                )}
              >
                Inventory Usage
              </TabsTrigger>
              <TabsTrigger
                value="popular-items"
                className={cn(
                  "py-2 text-sm font-medium transition-all",
                  activeReport === "popular-items"
                    ? "text-primary"
                    : "text-gray-600",
                )}
              >
                Popular Items
              </TabsTrigger>
              <TabsTrigger
                value="custom"
                className={cn(
                  "py-2 text-sm font-medium transition-all",
                  activeReport === "custom" ? "text-primary" : "text-gray-600",
                )}
              >
                Custom Report
              </TabsTrigger>
            </TabsList>

            {/* Empty TabsContent to make the Tabs component work properly */}
            <TabsContent value="daily-sales" className="hidden"></TabsContent>
            <TabsContent
              value="inventory-usage"
              className="hidden"
            ></TabsContent>
            <TabsContent value="popular-items" className="hidden"></TabsContent>
            <TabsContent value="custom" className="hidden"></TabsContent>
          </Tabs>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              {activeReport === "daily-sales" &&
                "View sales data aggregated by day"}
              {activeReport === "inventory-usage" &&
                "Track usage of inventory items over time"}
              {activeReport === "popular-items" &&
                "See which items are selling the most"}
              {activeReport === "custom" &&
                "Create a custom report with specific parameters"}
            </p>
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
              {activeReport === "daily-sales" && "Default Report"}
              {activeReport === "inventory-usage" && "Inventory Analysis"}
              {activeReport === "popular-items" && "Sales Analysis"}
              {activeReport === "custom" && "Advanced"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportSelector;
