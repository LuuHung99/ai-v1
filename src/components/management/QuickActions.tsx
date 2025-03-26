import React from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import {
  ClipboardList,
  Package,
  Users,
  BarChart4,
  Settings,
  Coffee,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface QuickActionProps {
  actions?: QuickAction[];
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  color?: string;
}

const QuickActions = ({ actions = defaultActions }: QuickActionProps) => {
  return (
    <Card className="w-full p-4 bg-white shadow-sm">
      <h3 className="text-lg font-medium mb-3">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {actions.map((action) => (
          <TooltipProvider key={action.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "h-24 w-full flex flex-col items-center justify-center gap-2 hover:bg-slate-50",
                    action.color,
                  )}
                  onClick={action.onClick}
                >
                  {action.icon}
                  <span className="text-sm font-medium">{action.label}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{action.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </Card>
  );
};

const defaultActions: QuickAction[] = [
  {
    id: "inventory",
    label: "Inventory",
    icon: <Package className="h-6 w-6 text-blue-500" />,
    onClick: () => console.log("Navigate to inventory"),
  },
  {
    id: "employees",
    label: "Employees",
    icon: <Users className="h-6 w-6 text-green-500" />,
    onClick: () => console.log("Navigate to employees"),
  },
  {
    id: "reports",
    label: "Reports",
    icon: <BarChart4 className="h-6 w-6 text-purple-500" />,
    onClick: () => console.log("Navigate to reports"),
  },
  {
    id: "orders",
    label: "Orders",
    icon: <ClipboardList className="h-6 w-6 text-amber-500" />,
    onClick: () => console.log("Navigate to orders"),
  },
  {
    id: "menu",
    label: "Menu Items",
    icon: <Coffee className="h-6 w-6 text-red-500" />,
    onClick: () => console.log("Navigate to menu items"),
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="h-6 w-6 text-gray-500" />,
    onClick: () => console.log("Navigate to settings"),
  },
];

export default QuickActions;
