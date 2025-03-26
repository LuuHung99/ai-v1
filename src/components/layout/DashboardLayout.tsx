import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Coffee,
  Package,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole?: "staff" | "manager";
  userName?: string;
}

const DashboardLayout = ({
  children,
  userRole = "staff",
  userName = "John Doe",
}: DashboardLayoutProps) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      name: "Dashboard",
      href: `/dashboard/${userRole}`,
      icon: LayoutDashboard,
      roles: ["staff", "manager"],
    },
    {
      name: "Orders",
      href: "/orders/new",
      icon: Coffee,
      roles: ["staff", "manager"],
    },
    {
      name: "Inventory",
      href: "/inventory",
      icon: Package,
      roles: ["staff", "manager"],
    },
    {
      name: "Employees",
      href: "/employees",
      icon: Users,
      roles: ["manager"],
    },
    {
      name: "Reports",
      href: "/reports",
      icon: BarChart3,
      roles: ["manager"],
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      roles: ["staff", "manager"],
    },
  ];

  const filteredNavItems = navigationItems.filter((item) =>
    item.roles.includes(userRole),
  );

  const NavItem = ({ item, isMobile = false }) => {
    const isActive = location.pathname === item.href;
    const Icon = item.icon;

    return (
      <Link
        to={item.href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
          isActive
            ? "bg-primary text-primary-foreground"
            : "hover:bg-muted text-muted-foreground hover:text-foreground",
          isMobile ? "justify-center md:justify-start" : "",
        )}
        onClick={() => isMobile && setIsMobileMenuOpen(false)}
      >
        <Icon className="h-5 w-5" />
        <span className={isMobile ? "md:block hidden" : ""}>{item.name}</span>
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] sm:w-[300px]">
            <div className="flex flex-col gap-6 py-4">
              <div className="flex items-center gap-2 px-2">
                <Coffee className="h-6 w-6 text-primary" />
                <span className="text-lg font-semibold">Bubble Tea Shop</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex flex-col gap-2 px-2">
                {filteredNavItems.map((item) => (
                  <NavItem key={item.name} item={item} isMobile={true} />
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-2">
          <Coffee className="h-6 w-6 text-primary md:hidden" />
          <span className="text-lg font-semibold md:hidden">Bubble Tea</span>
          <div className="hidden items-center gap-2 md:flex">
            <Coffee className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Bubble Tea Management</span>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              3
            </Badge>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=bubble-tea" />
                  <AvatarFallback>
                    {userName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <div>
                  <p>{userName}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {userRole}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/profile" className="flex w-full items-center">
                  Profile Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/" className="flex w-full items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden w-64 border-r bg-background md:block">
          <div className="flex h-full flex-col gap-4 p-4">
            <nav className="flex flex-col gap-2">
              {filteredNavItems.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </nav>

            <div className="mt-auto">
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link to="/">
                  <LogOut className="mr-2 h-5 w-5" />
                  Logout
                </Link>
              </Button>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
