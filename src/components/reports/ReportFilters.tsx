import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import DatePickerWithRange from "../ui/date-picker-with-range";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";
import { CalendarIcon, Filter, RefreshCw } from "lucide-react";
import { addDays, format } from "date-fns";

interface DateRange {
  from: Date;
  to?: Date;
}

interface ReportFiltersProps {
  onFilterChange?: (filters: ReportFilters) => void;
  className?: string;
}

interface ReportFilters {
  dateRange: DateRange;
  productCategory: string;
  employeeId: string;
  minSales: string;
  maxSales: string;
}

const ReportFilters = ({
  onFilterChange,
  className,
}: ReportFiltersProps = {}) => {
  const today = new Date();
  const [date, setDate] = useState<DateRange>({
    from: addDays(today, -30),
    to: today,
  });

  const [filters, setFilters] = useState<ReportFilters>({
    dateRange: date,
    productCategory: "all",
    employeeId: "",
    minSales: "",
    maxSales: "",
  });

  const handleFilterChange = (key: keyof ReportFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleDateRangeChange = (range: DateRange) => {
    setDate(range);
    handleFilterChange("dateRange", range);
  };

  const handleReset = () => {
    const resetFilters = {
      dateRange: {
        from: addDays(today, -30),
        to: today,
      },
      productCategory: "all",
      employeeId: "",
      minSales: "",
      maxSales: "",
    };
    setFilters(resetFilters);
    setDate(resetFilters.dateRange);
    onFilterChange?.(resetFilters);
  };

  return (
    <Card className={cn("p-4 bg-white", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Report Filters</h3>
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date-range">Date Range</Label>
          <div className="flex-1">
            <DatePickerWithRange date={date} setDate={handleDateRangeChange} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="product-category">Product Category</Label>
          <Select
            value={filters.productCategory}
            onValueChange={(value) =>
              handleFilterChange("productCategory", value)
            }
          >
            <SelectTrigger id="product-category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="milk-tea">Milk Tea</SelectItem>
              <SelectItem value="fruit-tea">Fruit Tea</SelectItem>
              <SelectItem value="coffee">Coffee</SelectItem>
              <SelectItem value="smoothie">Smoothie</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="employee-id">Employee</Label>
          <Select
            value={filters.employeeId}
            onValueChange={(value) => handleFilterChange("employeeId", value)}
          >
            <SelectTrigger id="employee-id">
              <SelectValue placeholder="Select employee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Employees</SelectItem>
              <SelectItem value="emp-001">John Doe</SelectItem>
              <SelectItem value="emp-002">Jane Smith</SelectItem>
              <SelectItem value="emp-003">Mike Johnson</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 md:col-span-2 lg:col-span-1">
          <Label>Sales Range</Label>
          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                type="number"
                placeholder="Min"
                value={filters.minSales}
                onChange={(e) => handleFilterChange("minSales", e.target.value)}
              />
            </div>
            <div className="flex-1">
              <Input
                type="number"
                placeholder="Max"
                value={filters.maxSales}
                onChange={(e) => handleFilterChange("maxSales", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button className="flex items-center">
          <Filter className="mr-2 h-4 w-4" />
          Apply Filters
        </Button>
      </div>
    </Card>
  );
};

export default ReportFilters;
