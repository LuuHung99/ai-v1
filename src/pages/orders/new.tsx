import React from "react";
import { Helmet } from "react-helmet";
import DashboardLayout from "@/components/layout/DashboardLayout";
import OrderForm from "@/components/orders/OrderForm";

const NewOrderPage = () => {
  const handleOrderComplete = (orderItems) => {
    // This would typically send the order to a backend API
    console.log("Order completed:", orderItems);
    // Show success message or redirect to order confirmation
  };

  return (
    <>
      <Helmet>
        <title>New Order - Bubble Tea Management System</title>
      </Helmet>

      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">
            Create New Order
          </h1>
          <p className="text-muted-foreground">
            Create and customize a new bubble tea order
          </p>
        </div>

        <OrderForm onOrderComplete={handleOrderComplete} />
      </div>
    </>
  );
};

export default NewOrderPage;
