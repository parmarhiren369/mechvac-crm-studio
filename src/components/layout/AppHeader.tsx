import {
  Search,
  Maximize2,
  Moon,
  Bell,
  Menu,
  ChevronRight,
  Sparkles,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AppHeaderProps {
  onMenuToggle: () => void;
  breadcrumb?: { label: string; path?: string }[];
}

export const AppHeader = ({ onMenuToggle, breadcrumb = [] }: AppHeaderProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      navigate('/login');
    } catch (error: any) {
      toast.error('Failed to sign out');
    }
  };

  const getUserInitials = () => {
    if (user?.user_metadata?.name) {
      return user.user_metadata.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.slice(0, 2).toUpperCase() || 'U';
  };

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

        {/* Breadcrumb */}
        {breadcrumb.length > 0 && (
          <div className="hidden md:flex items-center gap-2 text-sm">
            <span className="text-muted-foreground font-medium">CRM</span>
            {breadcrumb.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <span className={index === breadcrumb.length - 1 ? "text-foreground font-semibold" : "text-muted-foreground"}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Center - Search */}
      <div className="flex-1 max-w-2xl mx-4 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search anything..."
            className="pl-10 pr-20 h-10 bg-background/50 border-border/50 focus:bg-background transition-colors"
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
          className="relative text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-xl transition-all"
        >
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-amber-500 text-white text-xs border-2 border-card shadow-lg animate-pulse">
            21
          </Badge>
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-amber-500 animate-ping opacity-75"></span>
        </Button>

        {/* User profile with dropdown */}
        <div className="flex items-center gap-3 ml-2 pl-4 border-l border-border/50">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-3 hover:bg-muted/50">
                <div className="relative group">
                  <Avatar className="relative h-9 w-9 ring-2 ring-background">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-cyan-500 text-white font-semibold text-sm">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-semibold text-foreground flex items-center gap-1">
                    {user?.user_metadata?.name || 'User'}
                    <Sparkles className="h-3 w-3 text-amber-500" />
                  </p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
