import { Sidebar } from "@/components/ui/sidebar";

const DashboardSidebar = () => {
  return (
    <Sidebar
      className="z-40 rounded-sm border-none pt-18"
      variant="floating"
      collapsible="offcanvas"
    >
      <div className="p-4">Dashboard Sidebar</div>
    </Sidebar>
  );
};

export default DashboardSidebar;
