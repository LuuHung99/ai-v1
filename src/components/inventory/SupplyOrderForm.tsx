import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

const formSchema = z.object({
  itemName: z.string().min(1, { message: "Item name is required" }),
  supplier: z.string().min(1, { message: "Supplier is required" }),
  quantity: z.string().min(1, { message: "Quantity is required" }),
  urgency: z.string().min(1, { message: "Urgency level is required" }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface SupplyOrderFormProps {
  onSubmit?: (data: FormValues) => void;
  isLoading?: boolean;
}

const SupplyOrderForm = ({
  onSubmit,
  isLoading = false,
}: SupplyOrderFormProps = {}) => {
  const [selectedItem, setSelectedItem] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemName: "",
      supplier: "",
      quantity: "",
      urgency: "normal",
      notes: "",
    },
  });

  const handleFormSubmit = (data: FormValues) => {
    if (onSubmit) {
      onSubmit(data);
    } else {
      // Mock submission for UI scaffolding
      console.log("Supply order submitted:", data);
      toast({
        title: "Supply Order Created",
        description: `Order for ${data.quantity} ${data.itemName} has been submitted to ${data.supplier}.`,
        variant: "default",
      });
    }
    reset();
  };

  // Mock inventory items for UI scaffolding
  const inventoryItems = [
    {
      id: "1",
      name: "Milk Tea Powder",
      supplier: "Tea Supplies Co.",
      currentStock: 5,
    },
    {
      id: "2",
      name: "Tapioca Pearls",
      supplier: "Bubble Ingredients Ltd.",
      currentStock: 8,
    },
    {
      id: "3",
      name: "Brown Sugar",
      supplier: "Sweet Supplies Inc.",
      currentStock: 3,
    },
    {
      id: "4",
      name: "Disposable Cups (L)",
      supplier: "Packaging Solutions",
      currentStock: 12,
    },
    {
      id: "5",
      name: "Straws",
      supplier: "Packaging Solutions",
      currentStock: 20,
    },
  ];

  // Mock suppliers for UI scaffolding
  const suppliers = [
    "Tea Supplies Co.",
    "Bubble Ingredients Ltd.",
    "Sweet Supplies Inc.",
    "Packaging Solutions",
    "Beverage Wholesale Inc.",
  ];

  return (
    <Card className="w-full max-w-lg shadow-md bg-card">
      <CardHeader className="border-b bg-muted">
        <CardTitle className="text-xl font-semibold text-foreground">
          Create Supply Order
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Order new supplies for low stock inventory items
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="itemName" className="font-medium text-foreground">
              Item Name
            </Label>
            <Select
              onValueChange={(value) => {
                const item = inventoryItems.find((i) => i.id === value);
                if (item) {
                  setSelectedItem(item.name);
                }
              }}
            >
              <SelectTrigger
                id="itemName"
                className={cn(errors.itemName && "border-destructive")}
              >
                <SelectValue placeholder="Select an item" />
              </SelectTrigger>
              <SelectContent>
                {inventoryItems.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    <div className="flex justify-between items-center w-full">
                      <span className="text-foreground">{item.name}</span>
                      <span
                        className={cn(
                          "ml-2 px-2 py-0.5 text-xs rounded-full",
                          item.currentStock <= 5
                            ? "bg-destructive/10 text-destructive"
                            : "bg-yellow-500/10 text-yellow-500"
                        )}
                      >
                        {item.currentStock} left
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input
              type="hidden"
              {...register("itemName")}
              value={selectedItem}
            />
            {errors.itemName && (
              <p className="text-sm text-destructive flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.itemName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="supplier" className="font-medium text-foreground">
              Supplier
            </Label>
            <Select
              onValueChange={(value) => {
                const supplierField = document.querySelector(
                  'input[name="supplier"]'
                ) as HTMLInputElement;
                if (supplierField) supplierField.value = value;
              }}
            >
              <SelectTrigger
                id="supplier"
                className={cn(errors.supplier && "border-destructive")}
              >
                <SelectValue placeholder="Select a supplier" />
              </SelectTrigger>
              <SelectContent>
                {suppliers.map((supplier) => (
                  <SelectItem key={supplier} value={supplier}>
                    {supplier}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input type="hidden" {...register("supplier")} />
            {errors.supplier && (
              <p className="text-sm text-destructive flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.supplier.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity" className="font-medium text-foreground">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              placeholder="Enter quantity"
              className={cn(errors.quantity && "border-destructive")}
              {...register("quantity")}
            />
            {errors.quantity && (
              <p className="text-sm text-destructive flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.quantity.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="urgency" className="font-medium text-foreground">
              Urgency Level
            </Label>
            <Select
              onValueChange={(value) => {
                const urgencyField = document.querySelector(
                  'input[name="urgency"]'
                ) as HTMLInputElement;
                if (urgencyField) urgencyField.value = value;
              }}
              defaultValue="normal"
            >
              <SelectTrigger
                id="urgency"
                className={cn(errors.urgency && "border-destructive")}
              >
                <SelectValue placeholder="Select urgency level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    <span className="text-foreground">
                      Low - Within 2 weeks
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="normal">
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                    <span className="text-foreground">
                      Normal - Within 1 week
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="high">
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-orange-500 mr-2"></span>
                    <span className="text-foreground">
                      High - Within 3 days
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="critical">
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-destructive mr-2"></span>
                    <span className="text-foreground">Critical - ASAP</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <input
              type="hidden"
              {...register("urgency")}
              defaultValue="normal"
            />
            {errors.urgency && (
              <p className="text-sm text-destructive flex items-center mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.urgency.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="font-medium text-foreground">
              Additional Notes
            </Label>
            <Textarea
              id="notes"
              placeholder="Enter any special instructions or notes"
              className="resize-none h-24"
              {...register("notes")}
            />
          </div>

          <CardFooter className="px-0 pt-2 pb-0 flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={() => reset()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Create Order
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default SupplyOrderForm;
