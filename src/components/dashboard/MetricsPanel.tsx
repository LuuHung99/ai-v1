import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  TrendingUpIcon,
  CupSodaIcon,
  DollarSignIcon,
  UsersIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  description?: string;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

const MetricCard = ({
  title,
  value,
  description,
  icon,
  trend = "neutral",
  trendValue,
  className,
}: MetricCardProps) => {
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trendValue) && (
          <div className="flex items-center mt-1">
            {trend && trend !== "neutral" && (
              <span
                className={cn(
                  "mr-1 flex items-center text-xs",
                  trend === "up" ? "text-green-500" : "text-red-500",
                )}
              >
                {trend === "up" ? (
                  <ArrowUpIcon className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-3 w-3 mr-1" />
                )}
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

interface MetricsPanelProps {
  dailySales?: number;
  ordersCompleted?: number;
  popularItems?: { name: string; count: number }[];
  averageOrderValue?: number;
  customerCount?: number;
  className?: string;
}

const MetricsPanel = ({
  dailySales = 1250.75,
  ordersCompleted = 42,
  popularItems = [
    { name: "Taro Milk Tea", count: 15 },
    { name: "Brown Sugar Boba", count: 12 },
    { name: "Matcha Latte", count: 8 },
  ],
  averageOrderValue = 29.8,
  customerCount = 36,
  className,
}: MetricsPanelProps) => {
  const mostPopularItem =
    popularItems.length > 0 ? popularItems[0].name : "No data";

  return (
    <div
      className={cn(
        "grid gap-4 md:grid-cols-2 lg:grid-cols-4 bg-background p-4 rounded-lg",
        className,
      )}
    >
      <MetricCard
        title="Daily Sales"
        value={`$${dailySales.toFixed(2)}`}
        trend="up"
        trendValue="12%"
        description="vs. yesterday"
        icon={<DollarSignIcon className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="Orders Completed"
        value={ordersCompleted.toString()}
        trend="up"
        trendValue="8%"
        description="vs. yesterday"
        icon={<CupSodaIcon className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="Most Popular Item"
        value={mostPopularItem}
        description={
          popularItems.length > 0 ? `${popularItems[0].count} orders today` : ""
        }
        icon={<TrendingUpIcon className="h-4 w-4 text-muted-foreground" />}
      />
      <MetricCard
        title="Customers Today"
        value={customerCount.toString()}
        trend="down"
        trendValue="3%"
        description="vs. yesterday"
        icon={<UsersIcon className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
};

export default MetricsPanel;
