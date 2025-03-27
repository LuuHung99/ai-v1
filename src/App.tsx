import { Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./components/home";
import ManagerMetricsPanel from "./components/dashboard/ManagerMetricsPanel";
import DashboardLayout from "./components/layout/DashboardLayout";
import { ThemeProvider } from "./components/providers/ThemeProvider";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import PublicRoute from "./components/auth/PublicRoute";

// Import các components chính
import Reports from "./pages/reports";
import NewOrderPage from "./pages/orders/new";
import InventoryPage from "./pages/inventory";
import EmployeesPage from "./pages/employees";
import Profile from "./components/management/Profile";
import Settings from "./components/management/Settings";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="app-theme">
      <AuthProvider>
        <div className="min-h-screen bg-background text-foreground antialiased">
          <Suspense
            fallback={
              <div className="flex h-screen w-full items-center justify-center bg-background text-foreground">
                <p>Loading...</p>
              </div>
            }
          >
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
                  <Route path="/orders" element={<NewOrderPage />} />

                  {/* Inventory */}
                  <Route path="/inventory" element={<InventoryPage />} />

                  {/* Employees (Manager only) */}
                  <Route path="/employees" element={<EmployeesPage />} />

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
