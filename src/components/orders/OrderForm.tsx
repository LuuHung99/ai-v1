import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, Check, ShoppingCart } from "lucide-react";
import DrinkSelector from "./DrinkSelector";
import CustomizationPanel from "./CustomizationPanel";
import OrderSummary from "./OrderSummary";

export interface DrinkOption {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface Customization {
  sugarLevel: string;
  iceLevel: string;
  toppings: string[];
}

export interface OrderItem {
  drink: DrinkOption;
  customization: Customization;
  quantity: number;
}

interface OrderFormProps {
  onOrderComplete?: (order: OrderItem[]) => void;
}

const OrderForm = ({ onOrderComplete = () => {} }: OrderFormProps) => {
  const [currentStep, setCurrentStep] = useState<string>("select-drink");
  const [selectedDrink, setSelectedDrink] = useState<DrinkOption | null>(null);
  const [customization, setCustomization] = useState<Customization>({
    sugarLevel: "100%",
    iceLevel: "Regular",
    toppings: [],
  });
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    // Default order items for demonstration
    {
      drink: {
        id: "classic-milk-tea",
        name: "Classic Milk Tea",
        price: 4.99,
        image:
          "https://images.unsplash.com/photo-1558857563-c0c3acb72012?w=400&q=80",
        description: "Traditional milk tea with black tea base",
      },
      customization: {
        sugarLevel: "50%",
        iceLevel: "Less",
        toppings: ["Boba Pearls"],
      },
      quantity: 1,
    },
  ]);

  const handleDrinkSelect = (drink: DrinkOption) => {
    setSelectedDrink(drink);
    setCurrentStep("customize");
  };

  const handleCustomizationChange = (newCustomization: Customization) => {
    setCustomization(newCustomization);
  };

  const handleAddToOrder = () => {
    if (selectedDrink) {
      const newItem: OrderItem = {
        drink: selectedDrink,
        customization,
        quantity: 1,
      };

      setOrderItems([...orderItems, newItem]);
      setCurrentStep("select-drink");
      setSelectedDrink(null);
      setCustomization({
        sugarLevel: "100%",
        iceLevel: "Regular",
        toppings: [],
      });
    }
  };

  const handleCheckout = () => {
    // Process the order
    onOrderComplete(orderItems);
    // Reset the form
    setOrderItems([]);
    setCurrentStep("select-drink");
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full bg-background p-4">
      <div className="flex-1">
        <Card className="shadow-md bg-card">
          <CardContent className="p-6">
            <Tabs
              value={currentStep}
              onValueChange={setCurrentStep}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-muted">
                <TabsTrigger
                  value="select-drink"
                  disabled={currentStep === "checkout"}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground"
                >
                  1. Select Drink
                </TabsTrigger>
                <TabsTrigger
                  value="customize"
                  disabled={!selectedDrink || currentStep === "checkout"}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground"
                >
                  2. Customize
                </TabsTrigger>
                <TabsTrigger
                  value="checkout"
                  disabled={orderItems.length === 0}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-muted-foreground"
                >
                  3. Checkout
                </TabsTrigger>
              </TabsList>

              <TabsContent value="select-drink" className="mt-0">
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                  Select Your Drink
                </h2>
                <DrinkSelector onSelect={handleDrinkSelect} />
              </TabsContent>

              <TabsContent value="customize" className="mt-0">
                <div className="flex items-center mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentStep("select-drink")}
                    className="mr-4"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Menu
                  </Button>
                  <h2 className="text-2xl font-bold text-foreground">
                    Customize Your Drink
                  </h2>
                </div>

                <CustomizationPanel
                  drink={selectedDrink!}
                  customization={customization}
                  onChange={handleCustomizationChange}
                />

                <div className="mt-6 flex justify-end">
                  <Button onClick={handleAddToOrder}>
                    Add to Order <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="checkout" className="mt-0">
                <div className="flex items-center mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentStep("select-drink")}
                    className="mr-4"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Menu
                  </Button>
                  <h2 className="text-2xl font-bold text-foreground">
                    Review & Checkout
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="border rounded-lg p-4 bg-card">
                    <h3 className="font-medium mb-2 text-foreground">
                      Order Items
                    </h3>
                    {orderItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.drink.image}
                            alt={item.drink.name}
                            className="w-12 h-12 rounded-md object-cover"
                          />
                          <div>
                            <p className="font-medium text-foreground">
                              {item.drink.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {item.customization.sugarLevel} sugar,{" "}
                              {item.customization.iceLevel} ice
                              {item.customization.toppings.length > 0 && (
                                <>, {item.customization.toppings.join(", ")}</>
                              )}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-foreground">
                            ${item.drink.price.toFixed(2)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border rounded-lg p-4 bg-card">
                    <h3 className="font-medium mb-2 text-foreground">
                      Payment Method
                    </h3>
                    <div className="flex items-center gap-2 p-2 border rounded-md bg-muted">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-foreground">Cash on Delivery</span>
                    </div>
                  </div>

                  <Button onClick={handleCheckout} className="w-full" size="lg">
                    Complete Order
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
        <OrderSummary onCheckout={() => setCurrentStep("checkout")} />
      </div>
    </div>
  );
};

export default OrderForm;
