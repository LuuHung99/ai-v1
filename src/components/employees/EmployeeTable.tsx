import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  Search,
  MoreVertical,
  Edit,
  Trash,
  UserPlus,
  Filter,
  ChevronDown,
} from "lucide-react";
import { DataTable } from "@/components/ui/data-table";

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  joinDate: string;
  avatar?: string;
}

interface EmployeeTableProps {
  employees?: Employee[];
  onEdit?: (employee: Employee) => void;
  onDelete?: (employeeId: string) => void;
  onAdd?: () => void;
}

const EmployeeTable = ({
  employees = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@bubbletea.com",
      role: "Manager",
      status: "active",
      joinDate: "2023-01-15",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@bubbletea.com",
      role: "Staff",
      status: "active",
      joinDate: "2023-02-20",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.johnson@bubbletea.com",
      role: "Staff",
      status: "inactive",
      joinDate: "2023-03-10",
    },
    {
      id: "4",
      name: "Sarah Williams",
      email: "sarah.williams@bubbletea.com",
      role: "Staff",
      status: "active",
      joinDate: "2023-04-05",
    },
    {
      id: "5",
      name: "David Brown",
      email: "david.brown@bubbletea.com",
      role: "Staff",
      status: "active",
      joinDate: "2023-05-12",
    },
  ],
  onEdit = () => {},
  onDelete = () => {},
  onAdd = () => {},
}: EmployeeTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleEdit = (employee: Employee) => {
    onEdit(employee);
  };

  const handleDelete = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedEmployee) {
      onDelete(selectedEmployee.id);
      setShowDeleteDialog(false);
      setSelectedEmployee(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const columns = [
    {
      key: "name",
      header: "Employee",
      cell: (employee: Employee) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
            {employee.avatar ? (
              <img
                src={employee.avatar}
                alt={employee.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="text-muted-foreground font-medium">
                {employee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            )}
          </div>
          <div className="font-medium text-foreground">{employee.name}</div>
        </div>
      ),
    },
    {
      key: "email",
      header: "Email",
    },
    {
      key: "role",
      header: "Role",
    },
    {
      key: "status",
      header: "Status",
      cell: (employee: Employee) => (
        <Badge
          variant={employee.status === "active" ? "default" : "secondary"}
          className={
            employee.status === "active"
              ? "bg-green-500/10 text-green-500"
              : "bg-muted text-muted-foreground"
          }
        >
          {employee.status === "active" ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      key: "joinDate",
      header: "Join Date",
      cell: (employee: Employee) => formatDate(employee.joinDate),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      cell: (employee: Employee) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEdit(employee)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(employee)}
              className="text-red-600"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-foreground">Employees</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-[250px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>All Employees</DropdownMenuItem>
              <DropdownMenuItem>Managers</DropdownMenuItem>
              <DropdownMenuItem>Staff</DropdownMenuItem>
              <DropdownMenuItem>Active Only</DropdownMenuItem>
              <DropdownMenuItem>Inactive Only</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={onAdd} className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>

      <DataTable
        data={filteredEmployees}
        columns={columns}
        emptyMessage="No employees found"
      />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {selectedEmployee?.name}'s account
              and remove all their data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EmployeeTable;
