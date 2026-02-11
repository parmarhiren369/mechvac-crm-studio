import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LeadsPage from "./pages/LeadsPage";
import QuotationsPage from "./pages/QuotationsPage";
import OrdersPage from "./pages/OrdersPage";
import TasksPage from "./pages/TasksPage";
import CalendarPage from "./pages/CalendarPage";
import CompaniesPage from "./pages/CompaniesPage";
import StaffPage from "./pages/StaffPage";
import ProductsPage from "./pages/ProductsPage";
import ServicesPage from "./pages/ServicesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Index />} />
              <Route path="/leads" element={<LeadsPage />} />
              <Route path="/leads/new" element={<LeadsPage />} />
              <Route path="/quotations" element={<QuotationsPage />} />
              <Route path="/companies" element={<CompaniesPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/orders/pending" element={<OrdersPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/spares" element={<ProductsPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/staff" element={<StaffPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
