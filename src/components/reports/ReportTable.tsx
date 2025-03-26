import React, { useState } from "react";
import { Button } from "../ui/button";
import { Download, Filter } from "lucide-react";
import { DataTable } from "../ui/data-table";
import { TableCell } from "../ui/table";

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
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Calculate totals for the footer
  const totalQuantity = data.reduce((sum, item) => sum + item.quantity, 0);
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalProfit = data.reduce((sum, item) => sum + item.profit, 0);

  const columns = [
    {
      key: "date",
      header: "Date",
    },
    {
      key: "product",
      header: "Product",
      cell: (item: ReportData) => (
        <span className="font-medium text-foreground">{item.product}</span>
      ),
    },
    {
      key: "category",
      header: "Category",
    },
    {
      key: "quantity",
      header: "Quantity",
      className: "text-right",
    },
    {
      key: "revenue",
      header: "Revenue",
      cell: (item: ReportData) => (
        <span className="text-right">${item.revenue.toFixed(2)}</span>
      ),
    },
    {
      key: "profit",
      header: "Profit",
      cell: (item: ReportData) => (
        <span className="text-right">${item.profit.toFixed(2)}</span>
      ),
    },
  ];

  const footerContent = (
    <>
      <TableCell colSpan={3} className="text-right font-medium text-foreground">
        Total
      </TableCell>
      <TableCell className="text-right font-medium text-foreground">
        {totalQuantity}
      </TableCell>
      <TableCell className="text-right font-medium text-foreground">
        ${totalRevenue.toFixed(2)}
      </TableCell>
      <TableCell className="text-right font-medium text-foreground">
        ${totalProfit.toFixed(2)}
      </TableCell>
    </>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-2">
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
      <DataTable
        data={data}
        columns={columns}
        title={title}
        description={description}
        showFooter={true}
        footerContent={footerContent}
        emptyMessage="No report data found"
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        showPagination={true}
      />
    </div>
  );
};

export default ReportTable;
