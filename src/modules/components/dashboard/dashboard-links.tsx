"use client";

import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { routes } from "@/config/routes";
import Link from "next/link";
import { cn } from "@/lib/utils";

const DashboardLinks = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-center gap-2">
      <Link
        href={routes.dashboardAdmin}
        className={cn(
          buttonVariants({ size: "sm", variant: "outline" }),
          pathname === routes.dashboardAdmin && "cursor-default",
        )}
      >
        Admin Dashboard
      </Link>
      <Link
        href={routes.dashboardSeller}
        className={cn(
          buttonVariants({ size: "sm", variant: "outline" }),
          pathname === routes.dashboardSeller && "cursor-default",
        )}
      >
        Seller Dashboard
      </Link>
    </div>
  );
};

export default DashboardLinks;
