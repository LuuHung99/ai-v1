import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  threshold: number;
  unit: string;
  lastUpdated: string;
  supplier: string;
}

const inventorySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  category: z.string().min(1, "Category is required"),
  currentStock: z
    .string()
    .min(1, "Current stock is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Current stock must be a non-negative number",
    }),
  threshold: z
    .string()
    .min(1, "Threshold is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
      message: "Threshold must be a non-negative number",
    }),
  unit: z
    .string()
    .min(1, "Unit is required")
    .max(20, "Unit must be less than 20 characters"),
  supplier: z
    .string()
    .min(1, "Supplier is required")
    .max(100, "Supplier must be less than 100 characters"),
});

type FormData = z.infer<typeof inventorySchema>;

interface InventoryFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (item: Partial<InventoryItem>) => void;
  initialData?: Partial<InventoryItem>;
  title?: string;
}

const InventoryForm = ({
  isOpen,
  onOpenChange,
  onSubmit,
  initialData,
  title = "Add New Inventory Item",
}: InventoryFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(inventorySchema),
    defaultValues: initialData
      ? {
          ...initialData,
          currentStock: initialData.currentStock?.toString() || "",
          threshold: initialData.threshold?.toString() || "",
        }
      : {
          name: "",
          category: "",
          currentStock: "",
          threshold: "",
          unit: "",
          supplier: "",
        },
  });

  React.useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        currentStock: initialData.currentStock?.toString() || "",
        threshold: initialData.threshold?.toString() || "",
      });
    }
  }, [initialData, reset]);

  const onFormSubmit = (data: FormData) => {
    onSubmit({
      ...data,
      currentStock: Number(data.currentStock),
      threshold: Number(data.threshold),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[425px]"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {initialData
              ? "Update the inventory item details below."
              : "Fill in the details to add a new inventory item."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onFormSubmit)} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Item Name</Label>
            <Input
              id="name"
              placeholder="Enter item name"
              {...register("name")}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select
              onValueChange={(value) => setValue("category", value)}
              defaultValue={initialData?.category}
            >
              <SelectTrigger
                className={errors.category ? "border-red-500" : ""}
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tea">Tea</SelectItem>
                <SelectItem value="milk">Milk</SelectItem>
                <SelectItem value="topping">Toppings</SelectItem>
                <SelectItem value="syrup">Syrups</SelectItem>
                <SelectItem value="cup">Cups & Lids</SelectItem>
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="currentStock">Current Stock</Label>
            <Input
              id="currentStock"
              type="text"
              placeholder="Enter current stock"
              {...register("currentStock")}
              className={errors.currentStock ? "border-red-500" : ""}
            />
            {errors.currentStock && (
              <p className="text-sm text-red-500">
                {errors.currentStock.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="threshold">Threshold</Label>
            <Input
              id="threshold"
              type="text"
              placeholder="Enter threshold"
              {...register("threshold")}
              className={errors.threshold ? "border-red-500" : ""}
            />
            {errors.threshold && (
              <p className="text-sm text-red-500">{errors.threshold.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="unit">Unit</Label>
            <Input
              id="unit"
              placeholder="Enter unit (e.g., kg, pcs)"
              {...register("unit")}
              className={errors.unit ? "border-red-500" : ""}
            />
            {errors.unit && (
              <p className="text-sm text-red-500">{errors.unit.message}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="supplier">Supplier</Label>
            <Input
              id="supplier"
              placeholder="Enter supplier name"
              {...register("supplier")}
              className={errors.supplier ? "border-red-500" : ""}
            />
            {errors.supplier && (
              <p className="text-sm text-red-500">{errors.supplier.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? "Update Item" : "Add Item"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryForm;
