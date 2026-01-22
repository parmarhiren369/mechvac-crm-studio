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
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
            "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            isActive && "bg-sidebar-accent text-sidebar-primary"
          )}
        >
          <item.icon className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left">{item.title}</span>
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </>
          )}
        </button>
        {!isCollapsed && isOpen && (
          <div className="ml-8 mt-1 space-y-1">
            {item.children?.map((child) => (
              <NavLink
                key={child.path}
                to={child.path}
                className={({ isActive }) =>
                  cn(
                    "block px-3 py-2 rounded-lg text-sm transition-all duration-200",
                    "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive && "bg-sidebar-primary text-sidebar-primary-foreground"
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
          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
          "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          isActive && "bg-sidebar-primary text-sidebar-primary-foreground"
        )
      }
    >
      <item.icon className="h-5 w-5 flex-shrink-0" />
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
        "fixed left-0 top-0 h-screen gradient-sidebar border-r border-sidebar-border transition-all duration-300 z-50",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
        <img
          src={mechvacLogo}
          alt="Mechvac Technologies"
          className="h-10 w-10 object-contain"
        />
        {!isCollapsed && (
          <div className="flex flex-col">
            <span className="text-lg font-bold text-brand-teal">MECHVAC</span>
            <span className="text-[10px] text-sidebar-foreground/60 tracking-widest">TECHNOLOGIES</span>
          </div>
        )}
      </div>

      {/* Menu */}
      <div className="flex flex-col h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="p-3 flex-1">
          <div className="mb-2">
            {!isCollapsed && (
              <span className="px-3 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
                Menu
              </span>
            )}
          </div>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <SidebarItem key={item.title} item={item} isCollapsed={isCollapsed} />
            ))}
          </nav>

          <div className="mt-6 mb-2">
            {!isCollapsed && (
              <span className="px-3 text-xs font-semibold text-sidebar-foreground/50 uppercase tracking-wider">
                Settings
              </span>
            )}
          </div>
          <nav className="space-y-1">
            {settingsItems.map((item) => (
              <SidebarItem key={item.title} item={item} isCollapsed={isCollapsed} />
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          {!isCollapsed && (
            <p className="text-xs text-sidebar-foreground/50 text-center">
              2026 © mechvactech
            </p>
          )}
        </div>
      </div>
    </aside>
  );
};
