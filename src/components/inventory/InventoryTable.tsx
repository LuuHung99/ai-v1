import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  threshold: number;
  unit: string;
  lastUpdated: string;
  supplier: string;
}

const InventoryTable = ({
  items = sampleInventoryItems,
}: {
  items?: InventoryItem[];
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  // Filter items based on search term and filters
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;

    const itemStatus = getItemStatus(item);
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "low" && itemStatus === "low") ||
      (statusFilter === "out" && itemStatus === "out") ||
      (statusFilter === "ok" && itemStatus === "ok");

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Determine status based on current stock and threshold
  function getItemStatus(item: InventoryItem): "ok" | "low" | "out" {
    if (item.currentStock <= 0) return "out";
    if (item.currentStock < item.threshold) return "low";
    return "ok";
  }

  // Get status badge color
  function getStatusBadge(status: "ok" | "low" | "out") {
    switch (status) {
      case "ok":
        return <Badge className="bg-green-500">In Stock</Badge>;
      case "low":
        return (
          <Badge className="bg-amber-500 flex items-center gap-1">
            <AlertTriangle size={12} /> Low Stock
          </Badge>
        );
      case "out":
        return <Badge className="bg-red-500">Out of Stock</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  }

  const handleDeleteClick = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // Handle delete logic here
    console.log(`Deleting item: ${selectedItem?.name}`);
    setIsDeleteDialogOpen(false);
    setSelectedItem(null);
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-2xl font-bold">
            Inventory Management
          </CardTitle>
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            Add New Item
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items or suppliers..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-muted-foreground" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="tea">Tea</SelectItem>
                  <SelectItem value="milk">Milk</SelectItem>
                  <SelectItem value="topping">Toppings</SelectItem>
                  <SelectItem value="syrup">Syrups</SelectItem>
                  <SelectItem value="cup">Cups & Lids</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="ok">In Stock</SelectItem>
                  <SelectItem value="low">Low Stock</SelectItem>
                  <SelectItem value="out">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Item Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Threshold</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {item.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {item.currentStock} {item.unit}
                    </TableCell>
                    <TableCell>
                      {item.threshold} {item.unit}
                    </TableCell>
                    <TableCell>{getStatusBadge(getItemStatus(item))}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon">
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteClick(item)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No inventory items found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{selectedItem?.name}</span>?
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

// Sample inventory data
const sampleInventoryItems: InventoryItem[] = [
  {
    id: "1",
    name: "Black Tea",
    category: "tea",
    currentStock: 25,
    threshold: 10,
    unit: "kg",
    lastUpdated: "2023-06-15",
    supplier: "Premium Tea Suppliers",
  },
  {
    id: "2",
    name: "Whole Milk",
    category: "milk",
    currentStock: 8,
    threshold: 10,
    unit: "L",
    lastUpdated: "2023-06-17",
    supplier: "Local Dairy Farm",
  },
  {
    id: "3",
    name: "Tapioca Pearls",
    category: "topping",
    currentStock: 15,
    threshold: 5,
    unit: "kg",
    lastUpdated: "2023-06-14",
    supplier: "Bubble Tea Essentials",
  },
  {
    id: "4",
    name: "Brown Sugar Syrup",
    category: "syrup",
    currentStock: 0,
    threshold: 3,
    unit: "bottles",
    lastUpdated: "2023-06-10",
    supplier: "Sweet Flavors Inc.",
  },
  {
    id: "5",
    name: "Medium Cups",
    category: "cup",
    currentStock: 350,
    threshold: 100,
    unit: "pcs",
    lastUpdated: "2023-06-12",
    supplier: "Packaging Solutions",
  },
  {
    id: "6",
    name: "Green Tea",
    category: "tea",
    currentStock: 18,
    threshold: 10,
    unit: "kg",
    lastUpdated: "2023-06-15",
    supplier: "Premium Tea Suppliers",
  },
  {
    id: "7",
    name: "Almond Milk",
    category: "milk",
    currentStock: 5,
    threshold: 8,
    unit: "L",
    lastUpdated: "2023-06-16",
    supplier: "Plant-Based Beverages",
  },
  {
    id: "8",
    name: "Grass Jelly",
    category: "topping",
    currentStock: 7,
    threshold: 5,
    unit: "kg",
    lastUpdated: "2023-06-13",
    supplier: "Bubble Tea Essentials",
  },
];

export default InventoryTable;
