import React, { useState } from "react";
import { Helmet } from "react-helmet";
import DashboardLayout from "@/components/layout/DashboardLayout";
import EmployeeTable from "@/components/employees/EmployeeTable";
import EmployeeForm from "@/components/employees/EmployeeForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Users, UserPlus, ArrowLeft } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  joinDate: string;
  avatar?: string;
}

const EmployeesPage = () => {
  const [activeTab, setActiveTab] = useState("all-employees");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const handleAddEmployee = (data: any) => {
    // In a real app, this would send data to an API
    console.log("Adding employee:", data);
    setShowAddDialog(false);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setShowAddDialog(true);
  };

  const handleDeleteEmployee = (employeeId: string) => {
    // In a real app, this would send a delete request to an API
    console.log("Deleting employee:", employeeId);
  };

  return (
    <DashboardLayout>
      <Helmet>
        <title>Employee Management | Base</title>
      </Helmet>

      <div className="flex flex-col gap-6 bg-gray-50 min-h-screen">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Employee Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your staff and their access to the system
            </p>
          </div>
          <Button onClick={() => setShowAddDialog(true)} className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add New Employee
          </Button>
        </div>

        <Tabs
          defaultValue="all-employees"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="all-employees" className="gap-2">
                <Users className="h-4 w-4" />
                All Employees
              </TabsTrigger>
              <TabsTrigger value="managers" className="gap-2">
                Managers
              </TabsTrigger>
              <TabsTrigger value="staff" className="gap-2">
                Staff
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all-employees" className="space-y-4">
            <EmployeeTable
              onEdit={handleEditEmployee}
              onDelete={handleDeleteEmployee}
              onAdd={() => setShowAddDialog(true)}
            />
          </TabsContent>

          <TabsContent value="managers" className="space-y-4">
            <EmployeeTable
              employees={[
                {
                  id: "1",
                  name: "John Doe",
                  email: "john.doe@bubbletea.com",
                  role: "Manager",
                  status: "active",
                  joinDate: "2023-01-15",
                },
              ]}
              onEdit={handleEditEmployee}
              onDelete={handleDeleteEmployee}
              onAdd={() => setShowAddDialog(true)}
            />
          </TabsContent>

          <TabsContent value="staff" className="space-y-4">
            <EmployeeTable
              employees={[
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
              ]}
              onEdit={handleEditEmployee}
              onDelete={handleDeleteEmployee}
              onAdd={() => setShowAddDialog(true)}
            />
          </TabsContent>
        </Tabs>

        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingEmployee ? "Edit Employee" : "Add New Employee"}
              </DialogTitle>
            </DialogHeader>
            <EmployeeForm
              isEditing={!!editingEmployee}
              employeeData={
                editingEmployee
                  ? {
                      firstName: editingEmployee.name.split(" ")[0],
                      lastName: editingEmployee.name.split(" ")[1] || "",
                      email: editingEmployee.email,
                      phone: "", // Assuming this would come from the API in a real app
                      role: editingEmployee.role.toLowerCase(),
                      password: "",
                      confirmPassword: "",
                    }
                  : undefined
              }
              onSubmit={handleAddEmployee}
            />
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default EmployeesPage;
