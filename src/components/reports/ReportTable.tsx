import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Download, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReportData {
  id: string;
  date: string;
  product: string;
  quantity: number;
  revenue: number;
  profit: number;
  category: string;
}

interface ReportTableProps {
  data?: ReportData[];
  title?: string;
  description?: string;
  showDownload?: boolean;
  showFilters?: boolean;
  onDownload?: () => void;
  onFilter?: () => void;
}

const ReportTable = ({
  data = [
    {
      id: "1",
      date: "2023-06-01",
      product: "Classic Milk Tea",
      quantity: 42,
      revenue: 168.0,
      profit: 84.0,
      category: "Milk Tea",
    },
    {
      id: "2",
      date: "2023-06-01",
      product: "Taro Milk Tea",
      quantity: 38,
      revenue: 171.0,
      profit: 76.0,
      category: "Milk Tea",
    },
    {
      id: "3",
      date: "2023-06-01",
      product: "Mango Fruit Tea",
      quantity: 35,
      revenue: 140.0,
      profit: 70.0,
      category: "Fruit Tea",
    },
    {
      id: "4",
      date: "2023-06-01",
      product: "Brown Sugar Boba",
      quantity: 45,
      revenue: 202.5,
      profit: 90.0,
      category: "Specialty",
    },
    {
      id: "5",
      date: "2023-06-01",
      product: "Matcha Latte",
      quantity: 28,
      revenue: 140.0,
      profit: 56.0,
      category: "Latte",
    },
  ],
  title = "Sales Report",
  description = "Detailed breakdown of sales by product",
  showDownload = true,
  showFilters = true,
  onDownload = () => console.log("Download report"),
  onFilter = () => console.log("Filter report"),
}: ReportTableProps) => {
  // Calculate totals for the footer
  const totalQuantity = data.reduce((sum, item) => sum + item.quantity, 0);
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalProfit = data.reduce((sum, item) => sum + item.profit, 0);

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="flex space-x-2">
          {showFilters && (
            <Button variant="outline" size="sm" onClick={onFilter}>
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          )}
          {showDownload && (
            <Button variant="outline" size="sm" onClick={onDownload}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableCaption>
              Report generated on {new Date().toLocaleDateString()}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Profit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell className="font-medium">{item.product}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    ${item.revenue.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    ${item.profit.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className={cn("font-medium bg-muted/50")}>
                <TableCell colSpan={3} className="text-right">
                  Total
                </TableCell>
                <TableCell className="text-right">{totalQuantity}</TableCell>
                <TableCell className="text-right">
                  ${totalRevenue.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  ${totalProfit.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportTable;
