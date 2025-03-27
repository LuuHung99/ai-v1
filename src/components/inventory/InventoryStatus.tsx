import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface InventoryItem {
  id: string;
  name: string;
  currentStock: number;
  maxStock: number;
  unit: string;
  category: string;
  status: "low" | "normal" | "overstocked";
}

interface InventoryStatusProps {
  items?: InventoryItem[];
  title?: string;
  showHeader?: boolean;
}

const InventoryStatus = ({
  items = [
    {
      id: "1",
      name: "Milk Tea Powder",
      currentStock: 5,
      maxStock: 50,
      unit: "kg",
      category: "Tea Base",
      status: "low",
    },
    {
      id: "2",
      name: "Tapioca Pearls",
      currentStock: 30,
      maxStock: 60,
      unit: "kg",
      category: "Toppings",
      status: "normal",
    },
    {
      id: "3",
      name: "Brown Sugar",
      currentStock: 25,
      maxStock: 40,
      unit: "kg",
      category: "Sweeteners",
      status: "normal",
    },
    {
      id: "4",
      name: "Plastic Cups (Large)",
      currentStock: 120,
      maxStock: 500,
      unit: "pcs",
      category: "Packaging",
      status: "low",
    },
    {
      id: "5",
      name: "Grass Jelly",
      currentStock: 15,
      maxStock: 30,
      unit: "kg",
      category: "Toppings",
      status: "normal",
    },
  ],
  title = "Inventory Status",
  showHeader = true,
}: InventoryStatusProps) => {
  // Calculate percentage for progress bar
  const getStockPercentage = (current: number, max: number) => {
    return Math.min(Math.round((current / max) * 100), 100);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "low":
        return "bg-destructive/10 text-destructive hover:bg-destructive/20";
      case "normal":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50";
      case "overstocked":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/50";
      default:
        return "bg-muted text-muted-foreground hover:bg-muted/80";
    }
  };

  // Get progress bar color
  const getProgressColor = (percentage: number) => {
    if (percentage < 20) return "bg-destructive";
    if (percentage < 40) return "bg-orange-500 dark:bg-orange-400";
    if (percentage < 60) return "bg-yellow-500 dark:bg-yellow-400";
    return "bg-green-500 dark:bg-green-400";
  };

  return (
    <Card className="w-full h-full bg-card shadow-md">
      {showHeader && (
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold text-foreground">
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => {
            const percentage = getStockPercentage(
              item.currentStock,
              item.maxStock
            );
            return (
              <div key={item.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">
                      {item.name}
                    </span>
                    <Badge
                      className={cn("text-xs", getStatusColor(item.status))}
                    >
                      {item.status === "low" && (
                        <AlertTriangle className="h-3 w-3 mr-1" />
                      )}
                      {item.status === "normal" && (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      )}
                      {item.status}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {item.currentStock} / {item.maxStock} {item.unit}
                  </span>
                </div>
                <Progress value={percentage} className={cn("h-2 bg-muted")} />
                <div className="text-xs text-muted-foreground">
                  {item.category}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default InventoryStatus;
