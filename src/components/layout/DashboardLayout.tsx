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
    <div className="min-h-screen bg-slate-50">
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
        
        <main className="p-6 lg:p-8 max-w-[1920px] mx-auto">
          {/* Enhanced Page header */}
          <div className="flex items-center justify-between mb-8 animate-slide-up">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {title}
              </h1>
              <div className="h-1 w-20 bg-cyan-500 rounded-full"></div>
            </div>
            <Breadcrumb items={breadcrumb.length ? breadcrumb : [{ label: title }]} />
          </div>
          
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
