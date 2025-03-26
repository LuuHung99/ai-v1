import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  customizations: {
    sugarLevel: string;
    iceLevel: string;
    toppings: Array<{
      name: string;
      price: number;
    }>;
  };
}

interface OrderSummaryProps {
  items?: OrderItem[];
  subtotal?: number;
  tax?: number;
  total?: number;
  onCheckout?: () => void;
  isProcessing?: boolean;
}

const OrderSummary = ({
  items = [
    {
      id: "1",
      name: "Classic Milk Tea",
      price: 4.5,
      customizations: {
        sugarLevel: "50%",
        iceLevel: "Regular",
        toppings: [
          { name: "Boba Pearls", price: 0.5 },
          { name: "Grass Jelly", price: 0.75 },
        ],
      },
    },
    {
      id: "2",
      name: "Taro Milk Tea",
      price: 5.0,
      customizations: {
        sugarLevel: "75%",
        iceLevel: "Less",
        toppings: [{ name: "Pudding", price: 0.75 }],
      },
    },
  ],
  subtotal = 11.5,
  tax = 0.92,
  total = 12.42,
  onCheckout = () => console.log("Checkout clicked"),
  isProcessing = false,
}: OrderSummaryProps) => {
  return (
    <Card className="w-full max-w-[350px] h-full bg-white shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">{item.name}</span>
                <span>${(item.price || 0).toFixed(2)}</span>
              </div>

              <div className="text-sm text-gray-500 pl-2 space-y-1">
                {item.customizations && (
                  <>
                    <div className="flex justify-between">
                      <span>Sugar: {item.customizations.sugarLevel}</span>
                      <span>Ice: {item.customizations.iceLevel}</span>
                    </div>

                    {item.customizations.toppings &&
                      item.customizations.toppings.length > 0 && (
                        <div className="space-y-1">
                          <span>Toppings:</span>
                          {item.customizations.toppings.map(
                            (topping, index) => (
                              <div
                                key={index}
                                className="flex justify-between pl-2"
                              >
                                <span>{topping.name}</span>
                                <span>+${(topping.price || 0).toFixed(2)}</span>
                              </div>
                            ),
                          )}
                        </div>
                      )}
                  </>
                )}
              </div>

              <Separator className="my-2" />
            </div>
          ))}
        </div>

        {/* Price Summary */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className={cn(
            "w-full",
            isProcessing && "opacity-70 cursor-not-allowed",
          )}
          onClick={onCheckout}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Checkout"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;
