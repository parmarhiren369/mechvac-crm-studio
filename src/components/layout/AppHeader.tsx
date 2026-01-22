import {
  Search,
  Maximize2,
  Moon,
  Clock,
  Bell,
  Menu,
  ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AppHeaderProps {
  onMenuToggle: () => void;
  breadcrumb?: { label: string; path?: string }[];
}

export const AppHeader = ({ onMenuToggle, breadcrumb = [] }: AppHeaderProps) => {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="text-muted-foreground hover:text-foreground"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 w-64 bg-muted/50 border-transparent focus:border-primary focus:bg-background"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        {/* Action buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden sm:flex text-muted-foreground hover:text-foreground"
        >
          <Maximize2 className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hidden sm:flex text-muted-foreground hover:text-foreground"
        >
          <Moon className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hidden sm:flex text-muted-foreground hover:text-foreground"
        >
          <Clock className="h-5 w-5" />
        </Button>
        
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground"
        >
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-brand-amber text-white text-xs border-2 border-card">
            21
          </Badge>
        </Button>

        {/* User profile */}
        <div className="flex items-center gap-3 ml-2 pl-4 border-l border-border">
          <Avatar className="h-9 w-9 ring-2 ring-primary/20">
            <AvatarImage src="" />
            <AvatarFallback className="bg-brand-teal text-white font-semibold">
              AD
            </AvatarFallback>
          </Avatar>
          <div className="hidden lg:block">
            <p className="text-sm font-semibold text-foreground">Administrator</p>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

interface BreadcrumbProps {
  items: { label: string; path?: string }[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-muted-foreground">CRM</span>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className={index === items.length - 1 ? "text-foreground font-medium" : "text-muted-foreground"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
