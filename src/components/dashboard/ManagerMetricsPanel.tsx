import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Users,
  ShoppingBag,
  TrendingUp,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import StatisticsChart from "./StatisticsChart";

interface MetricCardProps {
  title: string;
  value: string;
  description?: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

const MetricCard = ({
  title,
  value,
  description,
  icon,
  trend = "neutral",
  trendValue,
}: MetricCardProps) => {
  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted/20 p-1.5 text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {(description || trendValue) && (
          <div className="flex items-center mt-1">
            {trendValue && (
              <span
                className={cn(
                  "mr-2 flex items-center text-xs",
                  trend === "up"
                    ? "text-green-600 dark:text-green-400"
                    : trend === "down"
                    ? "text-red-600 dark:text-red-400"
                    : "text-muted-foreground"
                )}
              >
                {trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : trend === "down" ? (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                ) : null}
                {trendValue}
              </span>
            )}
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface ManagerMetricsPanelProps {
  dailyRevenue?: string;
  weeklyRevenue?: string;
  monthlyRevenue?: string;
  ordersToday?: number;
  averageOrderValue?: string;
  topSellingItems?: Array<{ name: string; count: number }>;
  staffPerformance?: Array<{ name: string; ordersProcessed: number }>;
  inventoryAlerts?: number;
}

const ManagerMetricsPanel = ({
  dailyRevenue = "$1,245.89",
  weeklyRevenue = "$8,942.50",
  monthlyRevenue = "$32,758.25",
  ordersToday = 78,
  averageOrderValue = "$15.97",
  topSellingItems = [
    { name: "Classic Milk Tea", count: 42 },
    { name: "Taro Milk Tea", count: 36 },
    { name: "Brown Sugar Boba", count: 29 },
  ],
  staffPerformance = [
    { name: "Alex Chen", ordersProcessed: 32 },
    { name: "Sarah Kim", ordersProcessed: 27 },
    { name: "David Lee", ordersProcessed: 19 },
  ],
  inventoryAlerts = 3,
}: ManagerMetricsPanelProps) => {
  return (
    <div className="w-full space-y-4 bg-background p-4 rounded-lg">
      <h2 className="text-xl font-bold text-foreground">
        Business Performance
      </h2>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Revenue Today"
              value={dailyRevenue}
              trend="up"
              trendValue="12.5%"
              icon={<DollarSign className="h-4 w-4" />}
            />
            <MetricCard
              title="Orders Today"
              value={ordersToday.toString()}
              description="vs 65 yesterday"
              trend="up"
              trendValue="20%"
              icon={<ShoppingBag className="h-4 w-4" />}
            />
            <MetricCard
              title="Average Order Value"
              value={averageOrderValue}
              trend="down"
              trendValue="3.2%"
              icon={<TrendingUp className="h-4 w-4" />}
            />
            <MetricCard
              title="Inventory Alerts"
              value={inventoryAlerts.toString()}
              description="Items need attention"
              icon={<Clock className="h-4 w-4" />}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-foreground">
                  Top Selling Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {topSellingItems.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm text-foreground">
                        {item.name}
                      </span>
                      <span className="text-sm font-medium text-muted-foreground">
                        {item.count} orders
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="text-sm font-medium text-foreground">
                  Staff Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {staffPerformance.map((staff, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mr-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <span className="text-sm text-foreground">
                          {staff.name}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">
                        {staff.ordersProcessed} orders
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <StatisticsChart
              title="Daily Revenue Trend"
              type="line"
              data={{
                dates: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                values: [1200, 1320, 1010, 1340, 1290, 1330, 1245],
              }}
            />
            <StatisticsChart
              title="Top Selling Items Distribution"
              type="pie"
              data={{
                dates: [],
                values: [
                  { value: 42, name: "Classic Milk Tea" },
                  { value: 36, name: "Taro Milk Tea" },
                  { value: 29, name: "Brown Sugar Boba" },
                ],
              }}
            />
          </div>

          <StatisticsChart
            title="Orders by Hour Today"
            type="bar"
            data={{
              dates: [
                "9AM",
                "10AM",
                "11AM",
                "12PM",
                "1PM",
                "2PM",
                "3PM",
                "4PM",
                "5PM",
                "6PM",
                "7PM",
                "8PM",
              ],
              values: [12, 15, 8, 25, 18, 22, 20, 16, 14, 19, 23, 17],
            }}
          />
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Weekly Revenue"
              value={weeklyRevenue}
              trend="up"
              trendValue="8.3%"
              icon={<DollarSign className="h-4 w-4" />}
            />
            <MetricCard
              title="Weekly Orders"
              value="523"
              description="vs 487 last week"
              trend="up"
              trendValue="7.4%"
              icon={<ShoppingBag className="h-4 w-4" />}
            />
            <MetricCard
              title="Avg Weekly Order Value"
              value="$17.10"
              trend="up"
              trendValue="1.8%"
              icon={<TrendingUp className="h-4 w-4" />}
            />
            <MetricCard
              title="Weekly Inventory Orders"
              value="5"
              description="Supply orders placed"
              icon={<Clock className="h-4 w-4" />}
            />
          </div>

          <StatisticsChart
            title="Weekly Revenue Trend"
            type="bar"
            data={{
              dates: ["Week 1", "Week 2", "Week 3", "Week 4"],
              values: [7500, 8200, 8942, 8500],
            }}
          />
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Monthly Revenue"
              value={monthlyRevenue}
              trend="up"
              trendValue="15.2%"
              icon={<DollarSign className="h-4 w-4" />}
            />
            <MetricCard
              title="Monthly Orders"
              value="2,145"
              description="vs 1,879 last month"
              trend="up"
              trendValue="14.2%"
              icon={<ShoppingBag className="h-4 w-4" />}
            />
            <MetricCard
              title="Avg Monthly Order Value"
              value="$15.27"
              trend="down"
              trendValue="0.8%"
              icon={<TrendingUp className="h-4 w-4" />}
            />
            <MetricCard
              title="Monthly Profit Margin"
              value="32.5%"
              trend="up"
              trendValue="2.1%"
              icon={<TrendingUp className="h-4 w-4" />}
            />
          </div>

          <StatisticsChart
            title="Monthly Revenue Trend"
            type="line"
            data={{
              dates: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              values: [25000, 28000, 29500, 32758, 31000, 33500],
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManagerMetricsPanel;
