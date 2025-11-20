import { User } from "better-auth";
import { ReactNode } from "react";

export type LayoutPropsMain = {
  children: ReactNode;
};

/* SIDEBAR */
export interface SidebarProps {
  role?: string | null | undefined;
  user?: User | null | undefined;
}
export interface IDashboardSidebarMenu {
  id: number;
  label: string;
  icon: string;
  url: string;
}
