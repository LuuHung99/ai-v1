import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface DrinkOption {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface Customization {
  sugarLevel: string;
  iceLevel: string;
  toppings: string[];
}

interface Topping {
  id: string;
  name: string;
  price: number;
  available: boolean;
}

interface CustomizationPanelProps {
  drink: DrinkOption;
  customization: Customization;
  onChange: (customization: Customization) => void;
}

const CustomizationPanel = ({
  drink,
  customization,
  onChange,
}: CustomizationPanelProps) => {
  const [sugarLevel, setSugarLevel] = useState<number>(50);
  const [iceLevel, setIceLevel] = useState<number>(50);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

  // Mock toppings data
  const toppings: Topping[] = [
    { id: "pearl", name: "Tapioca Pearls", price: 0.5, available: true },
    { id: "jelly", name: "Grass Jelly", price: 0.5, available: true },
    { id: "pudding", name: "Pudding", price: 0.75, available: true },
    { id: "aloe", name: "Aloe Vera", price: 0.75, available: true },
    { id: "redbean", name: "Red Bean", price: 0.5, available: true },
    { id: "coconut", name: "Coconut Jelly", price: 0.5, available: false },
    { id: "cheese", name: "Cheese Foam", price: 1.0, available: true },
    { id: "whipped", name: "Whipped Cream", price: 0.75, available: true },
  ];

  const handleSugarLevelChange = (value: number[]) => {
    const newSugarLevel = value[0];
    setSugarLevel(newSugarLevel);
    updateCustomizations(newSugarLevel, iceLevel, selectedToppings);
  };

  const handleIceLevelChange = (value: number[]) => {
    const newIceLevel = value[0];
    setIceLevel(newIceLevel);
    updateCustomizations(sugarLevel, newIceLevel, selectedToppings);
  };

  const handleToppingChange = (toppingId: string, checked: boolean) => {
    const newSelectedToppings = checked
      ? [...selectedToppings, toppingId]
      : selectedToppings.filter((id) => id !== toppingId);

    setSelectedToppings(newSelectedToppings);
    updateCustomizations(sugarLevel, iceLevel, newSelectedToppings);
  };

  const updateCustomizations = (
    sugar: number,
    ice: number,
    selectedToppingIds: string[]
  ) => {
    onChange({
      sugarLevel: getSugarLevelText(sugar),
      iceLevel: getIceLevelText(ice),
      toppings: selectedToppingIds.map((id) => {
        const topping = toppings.find((t) => t.id === id);
        return topping?.name || id;
      }),
    });
  };

  const getSugarLevelText = (level: number) => {
    if (level === 0) return "No Sugar";
    if (level <= 25) return "25% Sugar";
    if (level <= 50) return "50% Sugar";
    if (level <= 75) return "75% Sugar";
    return "100% Sugar";
  };

  const getIceLevelText = (level: number) => {
    if (level === 0) return "No Ice";
    if (level <= 25) return "Light Ice";
    if (level <= 50) return "Regular Ice";
    if (level <= 75) return "Extra Ice";
    return "Max Ice";
  };

  return (
    <Card className="w-full shadow-md bg-card">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center text-foreground">
          Customize Your Drink
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sugar Level Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label
              htmlFor="sugar-level"
              className="text-sm font-medium text-foreground"
            >
              Sugar Level
            </Label>
            <Badge variant="outline" className="font-normal">
              {getSugarLevelText(sugarLevel)}
            </Badge>
          </div>
          <Slider
            id="sugar-level"
            min={0}
            max={100}
            step={25}
            value={[sugarLevel]}
            onValueChange={handleSugarLevelChange}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Ice Level Slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label
              htmlFor="ice-level"
              className="text-sm font-medium text-foreground"
            >
              Ice Level
            </Label>
            <Badge variant="outline" className="font-normal">
              {getIceLevelText(iceLevel)}
            </Badge>
          </div>
          <Slider
            id="ice-level"
            min={0}
            max={100}
            step={25}
            value={[iceLevel]}
            onValueChange={handleIceLevelChange}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Toppings Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">
            Toppings
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {toppings.map((topping) => (
              <div
                key={topping.id}
                className={cn(
                  "flex items-center space-x-2 rounded-md border p-3 bg-card",
                  !topping.available && "opacity-50"
                )}
              >
                <Checkbox
                  id={`topping-${topping.id}`}
                  checked={selectedToppings.includes(topping.id)}
                  onCheckedChange={(checked) =>
                    topping.available &&
                    handleToppingChange(topping.id, checked as boolean)
                  }
                  disabled={!topping.available}
                />
                <div className="flex flex-col">
                  <Label
                    htmlFor={`topping-${topping.id}`}
                    className={cn(
                      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
                    )}
                  >
                    {topping.name}
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    +${topping.price.toFixed(2)}
                  </p>
                  {!topping.available && (
                    <p className="text-xs text-destructive">Out of stock</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomizationPanel;
