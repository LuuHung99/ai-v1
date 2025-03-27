import React from "react";
import { Helmet } from "react-helmet";
import DashboardLayout from "@/components/layout/DashboardLayout";
import InventoryTable from "@/components/inventory/InventoryTable";
import SupplyOrderForm from "@/components/inventory/SupplyOrderForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package, ShoppingCart, AlertTriangle, TrendingUp } from "lucide-react";

const InventoryPage = () => {
  // Mock inventory statistics for UI scaffolding
  const inventoryStats = [
    {
      title: "Total Items",
      value: "42",
      icon: Package,
      description: "Across all categories",
      change: "+3 from last month",
      changeType: "positive",
    },
    {
      title: "Low Stock Items",
      value: "7",
      icon: AlertTriangle,
      description: "Below threshold level",
      change: "+2 from last week",
      changeType: "negative",
    },
    {
      title: "Pending Orders",
      value: "3",
      icon: ShoppingCart,
      description: "Awaiting delivery",
      change: "-1 from last week",
      changeType: "positive",
    },
    {
      title: "Monthly Spend",
      value: "$1,245",
      icon: TrendingUp,
      description: "On inventory supplies",
      change: "-$120 from last month",
      changeType: "positive",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Inventory Management | Base</title>
      </Helmet>

      <div className="flex flex-col gap-6 p-4">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {inventoryStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <h3 className="text-2xl font-bold mt-1 text-foreground">
                        {stat.value}
                      </h3>
                    </div>
                    <div
                      className={`p-2 rounded-full ${
                        stat.changeType === "positive"
                          ? "bg-green-100 dark:bg-green-900/30"
                          : "bg-red-100 dark:bg-red-900/30"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          stat.changeType === "positive"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {stat.description}
                  </p>
                  <p
                    className={`text-xs font-medium mt-1 ${
                      stat.changeType === "positive"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="inventory" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Inventory Items
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Supply Orders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-4">
            <InventoryTable />
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="bg-card shadow-sm">
                  <CardHeader>
                    <CardTitle>Recent Supply Orders</CardTitle>
                    <CardDescription>
                      Track the status of your recent supply orders
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-muted">
                            <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                              Order ID
                            </th>
                            <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                              Item
                            </th>
                            <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                              Supplier
                            </th>
                            <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                              Date
                            </th>
                            <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="px-4 py-3 font-medium text-foreground">
                              ORD-2023-001
                            </td>
                            <td className="px-4 py-3 text-foreground">
                              Brown Sugar Syrup
                            </td>
                            <td className="px-4 py-3 text-foreground">
                              Sweet Flavors Inc.
                            </td>
                            <td className="px-4 py-3 text-foreground">
                              2023-06-18
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-900/30 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:text-amber-400">
                                In Transit
                              </span>
                            </td>
                          </tr>
                          <tr className="border-b">
                            <td className="px-4 py-3 font-medium text-foreground">
                              ORD-2023-002
                            </td>
                            <td className="px-4 py-3 text-foreground">
                              Tapioca Pearls
                            </td>
                            <td className="px-4 py-3 text-foreground">
                              Bubble Tea Essentials
                            </td>
                            <td className="px-4 py-3 text-foreground">
                              2023-06-15
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/30 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:text-green-400">
                                Delivered
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 font-medium text-foreground">
                              ORD-2023-003
                            </td>
                            <td className="px-4 py-3 text-foreground">
                              Almond Milk
                            </td>
                            <td className="px-4 py-3 text-foreground">
                              Plant-Based Beverages
                            </td>
                            <td className="px-4 py-3 text-foreground">
                              2023-06-20
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-400">
                                Processing
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-1">
                <SupplyOrderForm />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default InventoryPage;
