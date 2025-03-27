import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Clock, Coffee, MoreVertical, RefreshCw, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type OrderStatus =
  | "pending"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled";

interface OrderItem {
  name: string;
  customizations: string[];
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  status: OrderStatus;
  timestamp: Date;
  total: number;
}

interface OrderQueueProps {
  orders?: Order[];
  onStatusChange?: (orderId: string, newStatus: OrderStatus) => void;
}

const statusColors: Record<OrderStatus, string> = {
  pending:
    "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 hover:bg-yellow-200 dark:hover:bg-yellow-900/50",
  preparing:
    "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50",
  ready:
    "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50",
  completed: "bg-muted text-muted-foreground hover:bg-muted/80",
  cancelled: "bg-destructive/10 text-destructive hover:bg-destructive/20",
};

const statusIcons: Record<OrderStatus, React.ReactNode> = {
  pending: <Clock className="h-4 w-4" />,
  preparing: <RefreshCw className="h-4 w-4" />,
  ready: <Coffee className="h-4 w-4" />,
  completed: <Check className="h-4 w-4" />,
  cancelled: <X className="h-4 w-4" />,
};

const OrderQueue = ({
  orders = mockOrders,
  onStatusChange = () => {},
}: OrderQueueProps) => {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((order) => order.status === activeTab);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    onStatusChange(orderId, newStatus);
  };

  return (
    <Card className="w-full h-full  shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold flex items-center">
          <Coffee className="mr-2 h-5 w-5" /> Order Queue
          <Badge className="ml-2 bg-primary">{orders.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="preparing">Preparing</TabsTrigger>
            <TabsTrigger value="ready">Ready</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[420px] pr-4">
            {filteredOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[200px] text-gray-500">
                <Coffee className="h-12 w-12 mb-2 opacity-30" />
                <p>No orders in this category</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredOrders.map((order) => (
                  <Card key={order.id} className="overflow-hidden border">
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{order.customerName}</h3>
                          <p className="text-sm text-gray-500">
                            {new Date(order.timestamp).toLocaleTimeString()} · $
                            {order.total.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={cn(
                              statusColors[order.status],
                              "flex items-center gap-1"
                            )}
                          >
                            {statusIcons[order.status]}
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {order.status === "pending" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(order.id, "preparing")
                                  }
                                >
                                  Mark as Preparing
                                </DropdownMenuItem>
                              )}
                              {order.status === "preparing" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(order.id, "ready")
                                  }
                                >
                                  Mark as Ready
                                </DropdownMenuItem>
                              )}
                              {order.status === "ready" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(order.id, "completed")
                                  }
                                >
                                  Mark as Completed
                                </DropdownMenuItem>
                              )}
                              {(order.status === "pending" ||
                                order.status === "preparing") && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(order.id, "cancelled")
                                  }
                                >
                                  Cancel Order
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <div className="mt-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="text-sm mb-1">
                            <span className="font-medium">{item.name}</span>
                            {item.customizations.length > 0 && (
                              <span className="text-gray-500">
                                {" "}
                                ({item.customizations.join(", ")})
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Mock data for default display
const mockOrders: Order[] = [
  {
    id: "ord-001",
    customerName: "John Smith",
    items: [
      {
        name: "Classic Milk Tea",
        customizations: ["50% sugar", "less ice"],
        price: 4.99,
      },
      {
        name: "Taro Milk Tea",
        customizations: ["boba", "pudding"],
        price: 5.99,
      },
    ],
    status: "pending",
    timestamp: new Date(Date.now() - 15 * 60000), // 15 minutes ago
    total: 10.98,
  },
  {
    id: "ord-002",
    customerName: "Emily Johnson",
    items: [
      { name: "Brown Sugar Boba", customizations: ["extra boba"], price: 5.99 },
    ],
    status: "preparing",
    timestamp: new Date(Date.now() - 10 * 60000), // 10 minutes ago
    total: 5.99,
  },
  {
    id: "ord-003",
    customerName: "Michael Chen",
    items: [
      { name: "Matcha Latte", customizations: ["oat milk"], price: 5.49 },
      {
        name: "Jasmine Milk Tea",
        customizations: ["75% sugar", "regular ice"],
        price: 4.99,
      },
    ],
    status: "ready",
    timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
    total: 10.48,
  },
  {
    id: "ord-004",
    customerName: "Sarah Williams",
    items: [
      {
        name: "Strawberry Fruit Tea",
        customizations: ["lychee jelly"],
        price: 5.49,
      },
    ],
    status: "completed",
    timestamp: new Date(Date.now() - 30 * 60000), // 30 minutes ago
    total: 5.49,
  },
  {
    id: "ord-005",
    customerName: "David Lee",
    items: [
      {
        name: "Oolong Milk Tea",
        customizations: ["boba", "25% sugar"],
        price: 4.99,
      },
    ],
    status: "cancelled",
    timestamp: new Date(Date.now() - 45 * 60000), // 45 minutes ago
    total: 4.99,
  },
];

export default OrderQueue;
