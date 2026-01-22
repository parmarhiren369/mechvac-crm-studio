import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  Building2,
  ShoppingCart,
  BarChart3,
  CheckSquare,
  Package,
  Wrench,
  UserCircle,
  Calendar,
  Settings,
  Shield,
  Briefcase,
  ChevronDown,
  ChevronRight,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import mechvacLogo from "@/assets/mechvac-logo.png";

interface MenuItem {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  children?: { title: string; path: string }[];
}

const menuItems: MenuItem[] = [
  { title: "Dashboards", icon: LayoutDashboard, path: "/" },
  {
    title: "Leads",
    icon: Users,
    children: [
      { title: "All Leads", path: "/leads" },
      { title: "New Lead", path: "/leads/new" },
    ],
  },
  { title: "Quotations", icon: FileText, path: "/quotations" },
  { title: "Companies", icon: Building2, path: "/companies" },
  {
    title: "Orders",
    icon: ShoppingCart,
    children: [
      { title: "All Orders", path: "/orders" },
      { title: "Pending", path: "/orders/pending" },
    ],
  },
  {
    title: "Reports",
    icon: BarChart3,
    children: [
      { title: "Sales Report", path: "/reports/sales" },
      { title: "Lead Report", path: "/reports/leads" },
    ],
  },
  { title: "Tasks", icon: CheckSquare, path: "/tasks" },
  {
    title: "Products/Spares",
    icon: Package,
    children: [
      { title: "Products", path: "/products" },
      { title: "Spares", path: "/spares" },
    ],
  },
  { title: "Services", icon: Wrench, path: "/services" },
  { title: "Staff", icon: UserCircle, path: "/staff" },
  { title: "Calendar", icon: Calendar, path: "/calendar" },
];

const settingsItems: MenuItem[] = [
  {
    title: "General",
    icon: Settings,
    children: [
      { title: "Profile", path: "/settings/profile" },
      { title: "Preferences", path: "/settings/preferences" },
    ],
  },
  { title: "Roles", icon: Shield, path: "/settings/roles" },
  { title: "Workspaces", icon: Briefcase, path: "/settings/workspaces" },
  {
    title: "Leads Settings",
    icon: Users,
    children: [
      { title: "Lead Sources", path: "/settings/leads/sources" },
      { title: "Lead Status", path: "/settings/leads/status" },
    ],
  },
  {
    title: "Fields",
    icon: FileText,
    children: [
      { title: "Custom Fields", path: "/settings/fields/custom" },
      { title: "Field Groups", path: "/settings/fields/groups" },
    ],
  },
  {
    title: "Inspection Reports",
    icon: CheckSquare,
    children: [
      { title: "Templates", path: "/settings/inspection/templates" },
      { title: "Checklists", path: "/settings/inspection/checklists" },
    ],
  },
  {
    title: "Localization",
    icon: Briefcase,
    children: [
      { title: "Languages", path: "/settings/localization/languages" },
      { title: "Currency", path: "/settings/localization/currency" },
      { title: "Date Format", path: "/settings/localization/date-format" },
    ],
  },
];

interface SidebarItemProps {
  item: MenuItem;
  isCollapsed: boolean;
}

const SidebarItem = ({ item, isCollapsed }: SidebarItemProps) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;
  
  const isActive = item.path === location.pathname || 
    item.children?.some(child => child.path === location.pathname);

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
            "text-sidebar-foreground hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-teal-500/10 hover:text-cyan-400 hover:shadow-md",
            isActive && "bg-gradient-to-r from-cyan-500/20 to-teal-500/20 text-cyan-400 shadow-lg shadow-cyan-500/20"
          )}
        >
          <item.icon className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left">{item.title}</span>
              {isOpen ? (
                <ChevronDown className="h-4 w-4 transition-transform" />
              ) : (
                <ChevronRight className="h-4 w-4 transition-transform" />
              )}
            </>
          )}
        </button>
        {!isCollapsed && isOpen && (
          <div className="ml-8 mt-1 space-y-1 animate-slide-up">
            {item.children?.map((child) => (
              <NavLink
                key={child.path}
                to={child.path}
                className={({ isActive }) =>
                  cn(
                    "block px-3 py-2 rounded-lg text-sm transition-all duration-200 relative",
                    "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-cyan-400 hover:pl-4",
                    isActive && "bg-gradient-to-r from-cyan-500 to-teal-600 text-white shadow-lg shadow-cyan-500/30"
                  )
                }
              >
                {child.title}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <NavLink
      to={item.path || "/"}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
          "text-sidebar-foreground hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-teal-500/10 hover:text-cyan-400 hover:shadow-md",
          isActive && "bg-gradient-to-r from-cyan-500 to-teal-600 text-white shadow-lg shadow-cyan-500/30"
        )
      }
    >
      <item.icon className="h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
      {!isCollapsed && <span>{item.title}</span>}
    </NavLink>
  );
};

interface AppSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export const AppSidebar = ({ isCollapsed, onToggle }: AppSidebarProps) => {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-gradient-to-b from-[hsl(222,47%,11%)] via-[hsl(222,47%,9%)] to-[hsl(222,47%,7%)] border-r border-sidebar-border/50 transition-all duration-300 z-50 shadow-2xl",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-amber-500/5 pointer-events-none"></div>
      
      {/* Logo with enhanced styling */}
      <div className="relative flex items-center gap-3 px-4 h-16 border-b border-sidebar-border/50 backdrop-blur-sm">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-lg blur-md opacity-50"></div>
          <img
            src={mechvacLogo}
            alt="Mechvac Technologies"
            className="relative h-10 w-10 object-contain"
          />
        </div>
        {!isCollapsed && (
          <div className="flex flex-col">
            <span className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-transparent">
              MECHVAC
            </span>
            <span className="text-[10px] text-sidebar-foreground/60 tracking-widest">TECHNOLOGIES</span>
          </div>
        )}
      </div>

      {/* Menu */}
      <div className="relative flex flex-col h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin">
        <div className="p-3 flex-1">
          <div className="mb-3">
            {!isCollapsed && (
              <span className="px-3 text-xs font-bold text-sidebar-foreground/40 uppercase tracking-wider flex items-center gap-2">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-sidebar-foreground/20 to-transparent"></div>
                Menu
                <div className="h-px flex-1 bg-gradient-to-r from-sidebar-foreground/20 via-transparent to-transparent"></div>
              </span>
            )}
          </div>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <SidebarItem key={item.title} item={item} isCollapsed={isCollapsed} />
            ))}
          </nav>

          <div className="mt-8 mb-3">
            {!isCollapsed && (
              <span className="px-3 text-xs font-bold text-sidebar-foreground/40 uppercase tracking-wider flex items-center gap-2">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-sidebar-foreground/20 to-transparent"></div>
                Settings
                <div className="h-px flex-1 bg-gradient-to-r from-sidebar-foreground/20 via-transparent to-transparent"></div>
              </span>
            )}
          </div>
          <nav className="space-y-1">
            {settingsItems.map((item) => (
              <SidebarItem key={item.title} item={item} isCollapsed={isCollapsed} />
            ))}
          </nav>
        </div>

        {/* Enhanced Footer */}
        <div className="relative p-4 border-t border-sidebar-border/50 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none"></div>
          {!isCollapsed && (
            <div className="relative text-center">
              <p className="text-xs text-sidebar-foreground/60 font-medium">
                2026 © <span className="text-cyan-500">mechvactech</span>
              </p>
              <p className="text-[10px] text-sidebar-foreground/40 mt-1">
                Powered by Innovation
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
