import { SidebarProvider } from "@/components/ui/sidebar";
import { LayoutPropsMain } from "@/config/types";
import { auth } from "@/lib/auth";
import HeaderDashboard from "@/modules/components/layout/header-dashboard";
import DashboardSidebar from "@/modules/sidebar/dashboard-sidebar";
import { cookies, headers } from "next/headers";

const DashboardLayout = async ({ children }: LayoutPropsMain) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  const session = await auth.api.getSession({ headers: await headers() });
  const role = session?.user?.role;

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <HeaderDashboard />
      <div className="flex w-full overflow-y-auto">
        <DashboardSidebar role={role} user={session?.user} />
        <main className="w-full pt-16">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
