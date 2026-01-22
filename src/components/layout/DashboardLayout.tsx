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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 mesh-gradient-bg">
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
              <h1 className="text-3xl font-bold text-foreground mb-2 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                {title}
              </h1>
              <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-full"></div>
            </div>
            <Breadcrumb items={[{ label: title }]} />
          </div>
          
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
