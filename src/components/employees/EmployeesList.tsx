import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { DataTable } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";

interface Employee {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: "active" | "inactive";
}

const EmployeesList = () => {
  // Sample data
  const employees: Employee[] = [
    {
      id: "1",
      name: "John Doe",
      role: "Manager",
      email: "john.doe@bubbletea.com",
      phone: "(555) 123-4567",
      status: "active",
    },
    {
      id: "2",
      name: "Jane Smith",
      role: "Staff",
      email: "jane.smith@bubbletea.com",
      phone: "(555) 234-5678",
      status: "active",
    },
    {
      id: "3",
      name: "Mike Johnson",
      role: "Staff",
      email: "mike.johnson@bubbletea.com",
      phone: "(555) 345-6789",
      status: "inactive",
    },
  ];

  const columns = [
    {
      key: "name",
      header: "Name",
    },
    {
      key: "role",
      header: "Role",
    },
    {
      key: "email",
      header: "Email",
    },
    {
      key: "phone",
      header: "Phone",
    },
    {
      key: "status",
      header: "Status",
      cell: (employee: Employee) => (
        <Badge
          variant="outline"
          className={
            employee.status === "active"
              ? "bg-green-500/10 text-green-500"
              : "bg-muted text-muted-foreground"
          }
        >
          {employee.status.charAt(0).toUpperCase() + employee.status.slice(1)}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      cell: () => (
        <Button variant="ghost" size="sm">
          View
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Employees</h1>
        <Button asChild>
          <Link to="/employees/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Link>
        </Button>
      </div>

      <DataTable
        data={employees}
        columns={columns}
        title="Staff List"
        emptyMessage="No employees found"
      />
    </div>
  );
};

export default EmployeesList;
