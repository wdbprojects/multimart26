"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  adminDashboardDataLinks,
  sellerDashboardDataLinks,
} from "@/constants/data";
import { icons } from "@/constants/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavAdmin = ({ role }: { role: string }) => {
  const pathname = usePathname();

  const dataLinks =
    role === "ADMIN" ? adminDashboardDataLinks : sellerDashboardDataLinks;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        {role === "ADMIN" ? "Admin Links" : "Seller Links"}
      </SidebarGroupLabel>
      <SidebarMenu className="gap-1">
        {dataLinks.map((item) => {
          const { id, label, icon, url } = item;
          let iconRendered;
          const iconSearch = icons.find((item) => {
            return item.value === icon;
          });
          if (iconSearch) {
            iconRendered = <iconSearch.path />;
          }
          return (
            <SidebarMenuItem
              key={id}
              className={cn(
                "h-auto rounded-lg",
                (pathname === url) === true && "border-transparent!",
              )}
            >
              <SidebarMenuButton
                asChild
                isActive={pathname === url ? true : false}
                className={cn("h-full w-full")}
              >
                <Link
                  href={url}
                  className={cn(
                    "dark:hover:bg-card! flex items-center justify-start",
                    (pathname === url) === true &&
                      "dark:hover:bg-card! dark:bg-card! cursor-default",
                  )}
                >
                  <span className="block [&>svg]:h-6 [&>svg]:w-6">
                    {iconRendered}
                  </span>
                  <span className="block">{label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavAdmin;
