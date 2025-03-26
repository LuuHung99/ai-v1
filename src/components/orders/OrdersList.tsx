import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";

interface Order {
  id: string;
  customerName: string;
  status: "completed" | "pending" | "processing" | "cancelled";
  total: number;
  date: string;
}

const OrdersList = () => {
  // Sample data
  const orders: Order[] = [
    {
      id: "#12345",
      customerName: "John Doe",
      status: "completed",
      total: 25.0,
      date: "2024-03-26",
    },
  ];

  const columns = [
    {
      key: "id",
      header: "Order ID",
    },
    {
      key: "customerName",
      header: "Customer",
    },
    {
      key: "status",
      header: "Status",
      cell: (order: Order) => (
        <Badge
          variant="outline"
          className={
            order.status === "completed"
              ? "bg-green-500/10 text-green-500"
              : order.status === "pending"
              ? "bg-yellow-500/10 text-yellow-500"
              : order.status === "processing"
              ? "bg-blue-500/10 text-blue-500"
              : "bg-red-500/10 text-red-500"
          }
        >
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </Badge>
      ),
    },
    {
      key: "total",
      header: "Total",
      cell: (order: Order) => `$${order.total.toFixed(2)}`,
    },
    {
      key: "date",
      header: "Date",
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      cell: () => (
        <Button variant="ghost" size="sm">
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Orders</h1>
        <Button asChild>
          <Link to="/orders/new">
            <Plus className="mr-2 h-4 w-4" />
            New Order
          </Link>
        </Button>
      </div>

      <DataTable
        data={orders}
        columns={columns}
        title="Recent Orders"
        emptyMessage="No orders found"
      />
    </div>
  );
};

export default OrdersList;
