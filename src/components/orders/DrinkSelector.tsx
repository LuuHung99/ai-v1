import React from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";

interface Drink {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

interface DrinkSelectorProps {
  drinks?: Drink[];
  onSelect?: (drink: Drink) => void;
  selectedDrinkId?: string;
}

const DrinkSelector = ({
  drinks = [
    {
      id: "1",
      name: "Classic Milk Tea",
      price: 4.99,
      image:
        "https://images.unsplash.com/photo-1558857563-c0c6ee6ff8e4?w=400&q=80",
      description: "Traditional milk tea with tapioca pearls",
      category: "milk-tea",
    },
    {
      id: "2",
      name: "Taro Milk Tea",
      price: 5.49,
      image:
        "https://images.unsplash.com/photo-1546439884-996e9f5ff40b?w=400&q=80",
      description: "Creamy taro flavored milk tea",
      category: "milk-tea",
    },
    {
      id: "3",
      name: "Matcha Latte",
      price: 5.99,
      image:
        "https://images.unsplash.com/photo-1515823064-d6e0c504072a?w=400&q=80",
      description: "Japanese green tea with milk",
      category: "latte",
    },
    {
      id: "4",
      name: "Strawberry Fruit Tea",
      price: 5.49,
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80",
      description: "Refreshing strawberry infused tea",
      category: "fruit-tea",
    },
    {
      id: "5",
      name: "Mango Smoothie",
      price: 6.49,
      image:
        "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&q=80",
      description: "Tropical mango blended with ice",
      category: "smoothie",
    },
    {
      id: "6",
      name: "Brown Sugar Boba",
      price: 5.99,
      image:
        "https://images.unsplash.com/photo-1627998792088-f8012d286bef?w=400&q=80",
      description: "Milk tea with brown sugar syrup and pearls",
      category: "milk-tea",
    },
  ],
  onSelect = () => {},
  selectedDrinkId = "",
}: DrinkSelectorProps) => {
  // Group drinks by category
  const drinksByCategory = drinks.reduce<Record<string, Drink[]>>(
    (acc, drink) => {
      if (!acc[drink.category]) {
        acc[drink.category] = [];
      }
      acc[drink.category].push(drink);
      return acc;
    },
    {}
  );

  // Format category name for display
  const formatCategoryName = (category: string) => {
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="w-full bg-card p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-center text-foreground">
        Select Your Drink
      </h2>

      {Object.entries(drinksByCategory).map(([category, categoryDrinks]) => (
        <div key={category} className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-foreground">
            {formatCategoryName(category)}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryDrinks.map((drink) => (
              <Card
                key={drink.id}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md bg-card",
                  selectedDrinkId === drink.id ? "ring-2 ring-primary" : ""
                )}
                onClick={() => onSelect(drink)}
              >
                <div className="relative pt-[56.25%] overflow-hidden rounded-t-lg">
                  <img
                    src={drink.image}
                    alt={drink.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-lg text-foreground">
                      {drink.name}
                    </h4>
                    <span className="font-semibold text-primary">
                      ${drink.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {drink.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DrinkSelector;
