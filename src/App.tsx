import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { supabaseConfigError } from "@/lib/supabase";
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
import SettingsProfilePage from "./pages/SettingsProfilePage";
import AppSettingsPage from "./pages/AppSettingsPage";
import SettingsPreferencesPage from "./pages/SettingsPreferencesPage";
import RolesPage from "./pages/RolesPage";
import CreateRolePage from "./pages/CreateRolePage";
import WorkspacesPage from "./pages/WorkspacesPage";
import CreateWorkspacePage from "./pages/CreateWorkspacePage";
import SettingsLeadSourcesPage from "./pages/SettingsLeadSourcesPage";
import LeadStatusPage from "./pages/LeadStatusPage";
import CreateLeadStatusPage from "./pages/CreateLeadStatusPage";
import SettingsCustomFieldsPage from "./pages/SettingsCustomFieldsPage";
import SettingsFieldGroupsPage from "./pages/SettingsFieldGroupsPage";
import SettingsInspectionTemplatesPage from "./pages/SettingsInspectionTemplatesPage";
import SettingsInspectionChecklistsPage from "./pages/SettingsInspectionChecklistsPage";
import SettingsLocalizationLanguagesPage from "./pages/SettingsLocalizationLanguagesPage";
import SettingsLocalizationCurrencyPage from "./pages/SettingsLocalizationCurrencyPage";
import SettingsLocalizationDateFormatPage from "./pages/SettingsLocalizationDateFormatPage";
import ReportsSalesPage from "./pages/ReportsSalesPage";
import ReportsLeadsPage from "./pages/ReportsLeadsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {supabaseConfigError ? (
          <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-xl rounded-lg border bg-white p-6 shadow-sm">
              <h1 className="text-2xl font-bold text-slate-900">Missing Supabase configuration</h1>
              <p className="mt-2 text-slate-600">
                Set <strong>VITE_SUPABASE_URL</strong> and <strong>VITE_SUPABASE_ANON_KEY</strong>
                in your Vercel Environment Variables and redeploy.
              </p>
              <p className="mt-2 text-slate-600">
                You can find these in your Supabase project settings → API.
              </p>
            </div>
          </div>
        ) : (
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
                <Route path="/reports/sales" element={<ReportsSalesPage />} />
                <Route path="/reports/leads" element={<ReportsLeadsPage />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/spares" element={<ProductsPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/staff" element={<StaffPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/settings/app" element={<AppSettingsPage />} />
                <Route path="/settings/profile" element={<SettingsProfilePage />} />
                <Route path="/settings/preferences" element={<SettingsPreferencesPage />} />
                <Route path="/roles" element={<RolesPage />} />
                <Route path="/roles/create" element={<CreateRolePage />} />
                <Route path="/roles/edit/:id" element={<CreateRolePage />} />
                <Route path="/workspaces" element={<WorkspacesPage />} />
                <Route path="/workspaces/create" element={<CreateWorkspacePage />} />
                <Route path="/workspaces/edit/:id" element={<CreateWorkspacePage />} />
                <Route path="/settings/leads/sources" element={<SettingsLeadSourcesPage />} />
                <Route path="/settings/leads/status" element={<LeadStatusPage />} />
                <Route path="/settings/leads/status/create" element={<CreateLeadStatusPage />} />
                <Route path="/settings/leads/status/edit/:id" element={<CreateLeadStatusPage />} />
                <Route path="/settings/fields/custom" element={<SettingsCustomFieldsPage />} />
                <Route path="/settings/fields/groups" element={<SettingsFieldGroupsPage />} />
                <Route path="/settings/inspection/templates" element={<SettingsInspectionTemplatesPage />} />
                <Route path="/settings/inspection/checklists" element={<SettingsInspectionChecklistsPage />} />
                <Route path="/settings/localization/languages" element={<SettingsLocalizationLanguagesPage />} />
                <Route path="/settings/localization/currency" element={<SettingsLocalizationCurrencyPage />} />
                <Route path="/settings/localization/date-format" element={<SettingsLocalizationDateFormatPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
