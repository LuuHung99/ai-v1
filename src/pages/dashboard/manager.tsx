import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import ManagerMetricsPanel from "@/components/dashboard/ManagerMetricsPanel";
import QuickActions from "@/components/management/QuickActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  AlertCircle,
  BarChart4,
  Calendar,
  Clock,
  Package,
  Users,
} from "lucide-react";

interface InventoryAlertItem {
  id: string;
  name: string;
  currentStock: number;
  threshold: number;
  status: "critical" | "low" | "normal";
}

interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  type: "meeting" | "task" | "reminder";
}

const ManagerDashboard = () => {
  const navigate = useNavigate();

  // Sample data for inventory alerts
  const inventoryAlerts: InventoryAlertItem[] = [
    {
      id: "1",
      name: "Milk",
      currentStock: 2,
      threshold: 10,
      status: "critical",
    },
    {
      id: "2",
      name: "Tapioca Pearls",
      currentStock: 5,
      threshold: 15,
      status: "critical",
    },
    {
      id: "3",
      name: "Taro Powder",
      currentStock: 8,
      threshold: 12,
      status: "low",
    },
  ];

  // Sample data for upcoming events
  const upcomingEvents: UpcomingEvent[] = [
    {
      id: "1",
      title: "Staff Meeting",
      date: "2023-06-15 10:00 AM",
      type: "meeting",
    },
    {
      id: "2",
      title: "Inventory Restock",
      date: "2023-06-16 09:00 AM",
      type: "task",
    },
    {
      id: "3",
      title: "Monthly Report Due",
      date: "2023-06-30 05:00 PM",
      type: "reminder",
    },
  ];

  // Handle quick action navigation
  const handleQuickAction = (destination: string) => {
    navigate(destination);
  };

  // Custom quick actions with navigation
  const quickActions = [
    {
      id: "inventory",
      label: "Inventory",
      icon: <Package className="h-6 w-6 text-blue-500" />,
      onClick: () => handleQuickAction("/inventory"),
    },
    {
      id: "employees",
      label: "Employees",
      icon: <Users className="h-6 w-6 text-green-500" />,
      onClick: () => handleQuickAction("/employees"),
    },
    {
      id: "reports",
      label: "Reports",
      icon: <BarChart4 className="h-6 w-6 text-purple-500" />,
      onClick: () => handleQuickAction("/reports"),
    },
    {
      id: "schedule",
      label: "Schedule",
      icon: <Calendar className="h-6 w-6 text-amber-500" />,
      onClick: () => handleQuickAction("/schedule"),
    },
    {
      id: "shifts",
      label: "Shifts",
      icon: <Clock className="h-6 w-6 text-red-500" />,
      onClick: () => handleQuickAction("/shifts"),
    },
    {
      id: "alerts",
      label: "Alerts",
      icon: <AlertCircle className="h-6 w-6 text-gray-500" />,
      onClick: () => handleQuickAction("/alerts"),
    },
  ];

  return (
    <DashboardLayout userRole="manager" userName="Manager Name">
      <div className="flex flex-col gap-6 bg-gray-50">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            Manager Dashboard
          </h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate("/orders/new")}>
              New Order
            </Button>
            <Button onClick={() => navigate("/reports")}>View Reports</Button>
          </div>
        </div>

        {/* Manager Metrics Panel */}
        <ManagerMetricsPanel
          dailyRevenue="$1,458.92"
          weeklyRevenue="$9,875.45"
          monthlyRevenue="$42,350.78"
          ordersToday={92}
          averageOrderValue="$15.86"
          inventoryAlerts={3}
        />

        {/* Quick Actions */}
        <QuickActions actions={quickActions} />

        {/* Additional Manager-specific sections */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Inventory Alerts */}
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-md font-medium">
                Inventory Alerts
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/inventory")}
              >
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventoryAlerts.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-2 last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          item.status === "critical" ? "destructive" : "outline"
                        }
                        className="h-2 w-2 rounded-full p-2"
                      />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        {item.currentStock}/{item.threshold}
                      </span>
                      <Button size="sm" variant="outline">
                        Restock
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-md font-medium">
                Upcoming Events
              </CardTitle>
              <Button variant="outline" size="sm">
                Add Event
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between border-b pb-2 last:border-0"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{event.title}</span>
                      <span className="text-sm text-muted-foreground">
                        {event.date}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{event.type}</Badge>
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${event.id}`}
                        />
                        <AvatarFallback>EV</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Staff Overview */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-md font-medium">
              Staff Overview
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/employees")}
            >
              Manage Staff
            </Button>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="active">Active Today</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
              </TabsList>
              <TabsContent value="active">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    {
                      name: "Alex Chen",
                      role: "Barista",
                      status: "active",
                      shift: "8:00 AM - 4:00 PM",
                      avatar: "1",
                    },
                    {
                      name: "Sarah Kim",
                      role: "Cashier",
                      status: "active",
                      shift: "10:00 AM - 6:00 PM",
                      avatar: "2",
                    },
                    {
                      name: "David Lee",
                      role: "Barista",
                      status: "break",
                      shift: "9:00 AM - 5:00 PM",
                      avatar: "3",
                    },
                    {
                      name: "Emily Wong",
                      role: "Manager",
                      status: "active",
                      shift: "8:00 AM - 5:00 PM",
                      avatar: "4",
                    },
                    {
                      name: "Michael Tan",
                      role: "Barista",
                      status: "active",
                      shift: "12:00 PM - 8:00 PM",
                      avatar: "5",
                    },
                  ].map((staff, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="flex p-4">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${staff.avatar}`}
                          />
                          <AvatarFallback>
                            {staff.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{staff.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {staff.role}
                          </p>
                          <div className="flex items-center mt-1">
                            <Badge
                              variant={
                                staff.status === "active"
                                  ? "default"
                                  : "outline"
                              }
                              className="text-xs"
                            >
                              {staff.status}
                            </Badge>
                            <span className="text-xs ml-2">{staff.shift}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="performance">
                <div className="text-center p-4">
                  <p className="text-muted-foreground">
                    Staff performance metrics will be displayed here
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="schedule">
                <div className="text-center p-4">
                  <p className="text-muted-foreground">
                    Staff schedule calendar will be displayed here
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ManagerDashboard;
