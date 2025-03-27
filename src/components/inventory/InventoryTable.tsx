import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InventoryForm, { InventoryItem } from "./InventoryForm";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import React from "react";

interface FilterState {
  searchTerm: string;
  category: string;
  status: string;
}

const InventoryTable = ({
  items = sampleInventoryItems,
}: {
  items?: InventoryItem[];
}) => {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: "",
    category: "all",
    status: "all",
  });
  const [filteredItems, setFilteredItems] = useState<InventoryItem[]>([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const filtered = items.filter((item) => {
        const matchesSearch =
          item.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          item.supplier
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase());

        const matchesCategory =
          filters.category === "all" || item.category === filters.category;

        const itemStatus = getItemStatus(item);
        const matchesStatus =
          filters.status === "all" ||
          (filters.status === "low" && itemStatus === "low") ||
          (filters.status === "out" && itemStatus === "out") ||
          (filters.status === "ok" && itemStatus === "ok");

        return matchesSearch && matchesCategory && matchesStatus;
      });

      setFilteredItems(filtered);
      setCurrentPage(1); // Reset to first page when filters change
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

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

  const confirmDelete = async () => {
    setIsDeleteDialogOpen(false);
    setIsLoading(true);
    toast.success("Item deleted successfully");
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setIsLoading(false);
      setSelectedItem(null);
    }
  };

  const handleAddItem = async (item: Partial<InventoryItem>) => {
    setIsLoading(true);
    try {
      // Handle add logic here
      console.log("Adding new item:", item);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setIsLoading(false);
      setIsAddDialogOpen(false);
    }
  };

  const columns = [
    {
      key: "name",
      header: "Item Name",
      className: "w-[250px]",
      cell: (item: InventoryItem) => (
        <span className="font-medium text-foreground">{item.name}</span>
      ),
    },
    {
      key: "category",
      header: "Category",
      cell: (item: InventoryItem) => (
        <Badge variant="outline" className="capitalize bg-background">
          {item.category}
        </Badge>
      ),
    },
    {
      key: "currentStock",
      header: "Current Stock",
      cell: (item: InventoryItem) => (
        <span>
          {item.currentStock} {item.unit}
        </span>
      ),
    },
    {
      key: "threshold",
      header: "Threshold",
      cell: (item: InventoryItem) => (
        <span>
          {item.threshold} {item.unit}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (item: InventoryItem) => getStatusBadge(getItemStatus(item)),
    },
    {
      key: "supplier",
      header: "Supplier",
    },
    {
      key: "lastUpdated",
      header: "Last Updated",
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      cell: (item: InventoryItem) => (
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
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-foreground">
          Inventory Management
        </h2>
        <Button
          className="flex items-center gap-2"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus size={16} />
          Add New Item
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search items or suppliers..."
            className="pl-8"
            value={filters.searchTerm}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))
            }
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <Select
              value={filters.category}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, category: value }))
              }
            >
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
            <Select
              value={filters.status}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, status: value }))
              }
            >
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

      <div className="relative">
        <DataTable
          loading={isLoading}
          data={filteredItems}
          columns={columns}
          emptyMessage="No inventory items found"
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          showPagination={true}
        />
      </div>

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

      {/* Add/Edit Item Form */}
      <InventoryForm
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddItem}
      />
    </div>
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
  {
    id: "9",
    name: "Grass Jelly",
    category: "topping",
    currentStock: 7,
    threshold: 5,
    unit: "kg",
    lastUpdated: "2023-06-13",
    supplier: "Bubble Tea Essentials",
  },
  {
    id: "10",
    name: "Grass Jelly",
    category: "topping",
    currentStock: 7,
    threshold: 5,
    unit: "kg",
    lastUpdated: "2023-06-13",
    supplier: "Bubble Tea Essentials",
  },
  {
    id: "11",
    name: "Grass Jelly",
    category: "topping",
    currentStock: 7,
    threshold: 5,
    unit: "kg",
    lastUpdated: "2023-06-13",
    supplier: "Bubble Tea Essentials",
  },
  {
    id: "12",
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
