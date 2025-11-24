import { type FC } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { SidebarProps } from "@/config/types";
import UserInfo from "@/modules/components/dashboard/shared/user-info";
import NavAdmin from "@/modules/components/dashboard/shared/nav-admin";
import SidebarSearchForm from "../components/dashboard/forms/sidebar-search-form";

const DashboardSidebar: FC<SidebarProps> = async ({ role, user }) => {
  return (
    <Sidebar
      className="z-40 rounded-sm border-none pt-18"
      variant="floating"
      collapsible="offcanvas"
    >
      <div className="p-1">
        <SidebarHeader>
          <UserInfo role={role!} user={user!} />
          <SidebarSearchForm />
        </SidebarHeader>
        <SidebarContent>
          <NavAdmin role={role!} />
        </SidebarContent>
      </div>
    </Sidebar>
  );
};

export default DashboardSidebar;
