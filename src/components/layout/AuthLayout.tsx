import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

const AuthLayout = ({
  children,
  title = "Bubble Tea Management System",
  subtitle = "Sign in to your account to continue",
  backgroundImage = "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=1200&q=80",
}: AuthLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Left side - Content */}
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:w-1/2 sm:px-6 lg:px-8 xl:px-12">
        <div className="mx-auto w-full max-w-md">
          <div className="flex flex-col space-y-2 text-center">
            <div className="mb-6 flex justify-center">
              <div className="h-16 w-16 rounded-full bg-primary p-3 text-primary-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-full w-full"
                >
                  <path d="M8 2h8" />
                  <path d="M9 2v2.789a4 4 0 0 1-1.95 3.44l-.11.06" />
                  <path d="M15 2v2.789a4 4 0 0 0 1.95 3.44l.11.06" />
                  <path d="M12 9v3" />
                  <path d="M9.5 12.5 12 15l2.5-2.5" />
                  <path d="M8 16.5V18a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-1.5" />
                  <path d="M18 9h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1" />
                  <path d="M5 9H4a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {title}
            </h1>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          <div className="mt-8">{children}</div>
        </div>
      </div>

      {/* Right side - Background Image */}
      <div
        className="hidden sm:block sm:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="flex h-full items-center justify-center bg-black/40 p-12">
          <div className="max-w-md text-white">
            <h2 className="mb-4 text-3xl font-bold">Manage Your Base</h2>
            <p className="text-lg">
              A comprehensive system for inventory management, order processing,
              and business analytics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
