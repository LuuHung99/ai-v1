import { Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./components/home";
import ManagerMetricsPanel from "./components/dashboard/ManagerMetricsPanel";
import DashboardLayout from "./components/layout/DashboardLayout";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";
import "./styles/colors.css";
import "./styles/globals.css";

// Import các components chính
import NewOrder from "./components/orders/NewOrder";
import Reports from "./components/reports/Reports";
import Settings from "./components/management/Settings";
import Profile from "./components/management/Profile";
import InventoryTable from "./components/inventory/InventoryTable";
import OrderQueue from "./components/orders/OrderQueue";
import EmployeeTable from "./components/employees/EmployeeTable";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="app-theme">
      <AuthProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Suspense fallback={<p>Loading...</p>}>
            <Routes>
              {/* Public Routes */}
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<Home />} />
              </Route>

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                {/* Dashboard Routes */}
                <Route
                  element={
                    <DashboardLayout>
                      <Outlet />
                    </DashboardLayout>
                  }
                >
                  {/* Dashboard */}
                  <Route path="/" element={<ManagerMetricsPanel />} />
                  <Route
                    path="/dashboard/staff"
                    element={<ManagerMetricsPanel />}
                  />

                  {/* Orders */}
                  <Route path="/orders" element={<OrderQueue />} />
                  <Route path="/orders/new" element={<NewOrder />} />

                  {/* Inventory */}
                  <Route path="/inventory" element={<InventoryTable />} />

                  {/* Employees (Manager only) */}
                  <Route path="/employees" element={<EmployeeTable />} />

                  {/* Reports (Manager only) */}
                  <Route path="/reports" element={<Reports />} />

                  {/* Settings & Profile */}
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
