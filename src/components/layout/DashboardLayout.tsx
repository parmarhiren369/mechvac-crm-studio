import { useState } from "react";
import { AppSidebar } from "./AppSidebar";
import { AppHeader, Breadcrumb } from "./AppHeader";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  breadcrumb?: { label: string; path?: string }[];
}

export const DashboardLayout = ({ children, title, breadcrumb = [] }: DashboardLayoutProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AppSidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      
      <div
        className={cn(
          "transition-all duration-300",
          isSidebarCollapsed ? "ml-16" : "ml-64"
        )}
      >
        <AppHeader onMenuToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        
        <main className="p-4 lg:p-6">
          {/* Page header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            <Breadcrumb items={[{ label: title }]} />
          </div>
          
          {children}
        </main>
      </div>
    </div>
  );
};
