import {
  Search,
  Maximize2,
  Moon,
  Clock,
  Bell,
  Menu,
  ChevronRight,
  Sparkles,
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
    <header className="h-16 bg-card/80 backdrop-blur-md border-b border-border/50 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40 shadow-sm">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuToggle}
          className="text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Enhanced Search */}
        <div className="relative hidden md:block group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input
            type="search"
            placeholder="Search anything..."
            className="pl-10 w-80 bg-muted/30 border-transparent focus:border-primary/50 focus:bg-background focus:shadow-lg transition-all duration-200 rounded-xl"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        {/* Action buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden sm:flex text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-xl transition-all"
        >
          <Maximize2 className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hidden sm:flex text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-xl transition-all"
        >
          <Moon className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hidden sm:flex text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-xl transition-all"
        >
          <Clock className="h-5 w-5" />
        </Button>
        
        {/* Notifications with pulse animation */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-xl transition-all"
        >
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-gradient-to-br from-amber-500 to-orange-600 text-white text-xs border-2 border-card shadow-lg animate-pulse">
            21
          </Badge>
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-amber-500 animate-ping opacity-75"></span>
        </Button>

        {/* User profile with gradient border */}
        <div className="flex items-center gap-3 ml-2 pl-4 border-l border-border/50">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-teal-600 rounded-full opacity-75 group-hover:opacity-100 blur transition-all duration-300"></div>
            <Avatar className="relative h-9 w-9 ring-2 ring-background">
              <AvatarImage src="" />
              <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-teal-600 text-white font-semibold text-sm">
                AD
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="hidden lg:block">
            <p className="text-sm font-semibold text-foreground flex items-center gap-1">
              Administrator
              <Sparkles className="h-3 w-3 text-amber-500" />
            </p>
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
    <div className="flex items-center gap-2 text-sm bg-muted/30 px-4 py-1.5 rounded-full">
      <span className="text-muted-foreground font-medium">CRM</span>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className={index === items.length - 1 ? "text-foreground font-semibold" : "text-muted-foreground"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
