import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { LeadsStatus } from "@/components/dashboard/LeadsStatus";
import { MyTasks } from "@/components/dashboard/MyTasks";
import { UpcomingEvents } from "@/components/dashboard/UpcomingEvents";

const Index = () => {
  return (
    <DashboardLayout title="DASHBOARD">
      {/* Stats Overview */}
      <StatsCards />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leads Status - Takes 2 columns */}
        <div className="lg:col-span-2">
          <LeadsStatus />
        </div>

        {/* My Tasks - Takes 1 column */}
        <div className="lg:col-span-1">
          <MyTasks />
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mt-6">
        <UpcomingEvents />
      </div>
    </DashboardLayout>
  );
};

export default Index;
