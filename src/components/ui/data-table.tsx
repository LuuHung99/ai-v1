import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { TablePagination } from "./table-pagination";

interface DataTableProps<T> {
  data: T[];
  columns: {
    key: keyof T | string;
    header: string;
    cell?: (item: T) => React.ReactNode;
    className?: string;
  }[];
  title?: string;
  description?: string;
  emptyMessage?: string;
  className?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  loading?: boolean;
  footerContent?: React.ReactNode;
  // Pagination props
  pageSize?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  showPagination?: boolean;
}

export function DataTable<T>({
  data,
  columns,
  emptyMessage = "No data found",
  loading = false,
  showHeader = true,
  showFooter = false,
  footerContent,
  pageSize = 10,
  currentPage = 1,
  onPageChange,
  showPagination = true,
}: DataTableProps<T>) {
  // Calculate pagination
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        {loading && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        <Table>
          {showHeader && (
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead
                    key={String(column.key)}
                    className={cn("text-foreground", column.className)}
                  >
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
          )}
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell
                      key={String(column.key)}
                      className={cn("text-foreground", column.className)}
                    >
                      {column.cell
                        ? column.cell(item)
                        : String(item[column.key as keyof T])}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
            {showFooter && footerContent && (
              <TableRow className="bg-muted/50">{footerContent}</TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {showPagination && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange || (() => {})}
        />
      )}
    </div>
  );
}
