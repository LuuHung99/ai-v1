import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ReportSelector from "@/components/reports/ReportSelector";
import ReportFilters from "@/components/reports/ReportFilters";
import ReportTable from "@/components/reports/ReportTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Printer, Share2 } from "lucide-react";

// Define ReportType locally if not exported from ReportSelector
type ReportType =
  | "daily-sales"
  | "inventory-usage"
  | "popular-items"
  | "custom";

interface ReportPageProps {
  userRole?: "staff" | "manager";
  userName?: string;
}

const ReportsPage = ({
  userRole = "manager",
  userName = "John Doe",
}: ReportPageProps) => {
  const [activeReportType, setActiveReportType] =
    useState<ReportType>("daily-sales");
  const [filters, setFilters] = useState({});

  // Handle report type change
  const handleReportTypeChange = (reportType: ReportType) => {
    setActiveReportType(reportType);
    // In a real app, this would fetch new data based on the report type
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    // In a real app, this would update the data based on filters
  };

  // Mock data for different report types
  const getReportData = () => {
    switch (activeReportType) {
      case "inventory-usage":
        return [
          { name: "Milk", sales: 120, revenue: 240 },
          { name: "Tea", sales: 150, revenue: 300 },
          { name: "Boba", sales: 200, revenue: 400 },
          { name: "Syrup", sales: 80, revenue: 160 },
          { name: "Cups", sales: 300, revenue: 150 },
        ];
      case "popular-items":
        return [
          { name: "Classic Milk Tea", sales: 85, revenue: 340 },
          { name: "Taro Milk Tea", sales: 75, revenue: 300 },
          { name: "Brown Sugar Boba", sales: 90, revenue: 405 },
          { name: "Matcha Latte", sales: 60, revenue: 270 },
          { name: "Fruit Tea", sales: 70, revenue: 280 },
        ];
      case "custom":
        return [
          { name: "Week 1", sales: 45, revenue: 900 },
          { name: "Week 2", sales: 52, revenue: 1040 },
          { name: "Week 3", sales: 49, revenue: 980 },
          { name: "Week 4", sales: 63, revenue: 1260 },
        ];
      default: // daily-sales
        return [
          { name: "Mon", sales: 65, revenue: 1300 },
          { name: "Tue", sales: 59, revenue: 1180 },
          { name: "Wed", sales: 80, revenue: 1600 },
          { name: "Thu", sales: 81, revenue: 1620 },
          { name: "Fri", sales: 90, revenue: 1800 },
          { name: "Sat", sales: 110, revenue: 2200 },
          { name: "Sun", sales: 95, revenue: 1900 },
        ];
    }
  };

  // Get report title and description based on active report type
  const getReportInfo = () => {
    switch (activeReportType) {
      case "inventory-usage":
        return {
          title: "Inventory Usage Analytics",
          description: "Track consumption of inventory items over time",
        };
      case "popular-items":
        return {
          title: "Popular Items Analysis",
          description: "See which products are selling the most",
        };
      case "custom":
        return {
          title: "Custom Report",
          description: "Customized report based on selected parameters",
        };
      default: // daily-sales
        return {
          title: "Daily Sales Report",
          description: "Overview of sales performance by day",
        };
    }
  };

  const reportInfo = getReportInfo();
  const chartData = getReportData();

  return (
    <>
      <div className="space-y-6 p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Reports & Analytics
            </h1>
            <p className="text-muted-foreground">
              Generate and analyze business performance reports.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>

        {/* Report Selector */}
        {/* <ReportSelector
          onReportTypeChange={handleReportTypeChange}
          defaultReportType={activeReportType}
        /> */}

        {/* Report Filters */}
        <ReportFilters onFilterChange={handleFilterChange} />

        {/* Report Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart */}

          {/* Summary Card */}
          <Card className="bg-card">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                Report Summary
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                    Total Sales
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {chartData.reduce((sum, item) => sum + item.sales, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">units</p>
                </div>

                <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                    Total Revenue
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    $
                    {chartData
                      .reduce((sum, item) => sum + item.revenue, 0)
                      .toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">USD</p>
                </div>

                <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                    Average Order Value
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    $
                    {(
                      chartData.reduce((sum, item) => sum + item.revenue, 0) /
                      chartData.reduce((sum, item) => sum + item.sales, 0)
                    ).toFixed(2)}
                  </p>
                  <p className="text-sm text-muted-foreground">per order</p>
                </div>

                <div className="p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
                  <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                    Top Performer
                  </p>
                  <p className="text-xl font-bold text-foreground">
                    {
                      chartData.reduce(
                        (max, item) => (item.sales > max.sales ? item : max),
                        chartData[0]
                      ).name
                    }
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {
                      chartData.reduce(
                        (max, item) => (item.sales > max.sales ? item : max),
                        chartData[0]
                      ).sales
                    }{" "}
                    units
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Report Table */}
        <Card className="bg-card">
          <CardContent className="p-6">
            <div className="flex flex-col gap-2 mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                {reportInfo.title} Details
              </h3>
              <p className="text-sm text-muted-foreground">
                Detailed breakdown of report data
              </p>
            </div>
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted">
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Sales
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Revenue
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.map((item, index) => (
                    <tr key={index} className="border-b last:border-0">
                      <td className="px-4 py-3 font-medium text-foreground">
                        {item.name}
                      </td>
                      <td className="px-4 py-3 text-foreground">
                        {item.sales}
                      </td>
                      <td className="px-4 py-3 text-foreground">
                        ${item.revenue.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ReportsPage;
