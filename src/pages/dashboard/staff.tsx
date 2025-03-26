import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import MetricsPanel from "@/components/dashboard/MetricsPanel";
import OrderQueue from "@/components/orders/OrderQueue";
import InventoryStatus from "@/components/inventory/InventoryStatus";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coffee, Plus, RefreshCw, Clock } from "lucide-react";

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for staff dashboard
  const metricsData = {
    dailySales: 1250.75,
    ordersCompleted: 42,
    popularItems: [
      { name: "Taro Milk Tea", count: 15 },
      { name: "Brown Sugar Boba", count: 12 },
      { name: "Matcha Latte", count: 8 },
    ],
    averageOrderValue: 29.8,
    customerCount: 36,
  };

  // Handler for order status changes
  const handleOrderStatusChange = (orderId: string, newStatus: string) => {
    console.log(`Order ${orderId} status changed to ${newStatus}`);
    // In a real app, this would update the order status in the database
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Staff Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
            <Button
              size="sm"
              className="gap-1"
              onClick={() => navigate("/orders/new")}
            >
              <Plus className="h-4 w-4" /> New Order
            </Button>
          </div>
        </div>

        {/* Metrics Panel */}
        <MetricsPanel {...metricsData} />

        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Order Queue (Left Side) */}
              <OrderQueue onStatusChange={handleOrderStatusChange} />

              {/* Right Side Cards */}
              <div className="space-y-4">
                <InventoryStatus />

                {/* Quick Actions Card */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className="h-24 flex flex-col items-center justify-center gap-2"
                      onClick={() => navigate("/orders/new")}
                    >
                      <Coffee className="h-8 w-8" />
                      <span>New Order</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="h-24 flex flex-col items-center justify-center gap-2"
                      onClick={() => navigate("/inventory")}
                    >
                      <Clock className="h-8 w-8" />
                      <span>Check Inventory</span>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <Card className="p-6">
              <OrderQueue onStatusChange={handleOrderStatusChange} />
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <Card className="p-6">
              <InventoryStatus showHeader={false} />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StaffDashboard;
