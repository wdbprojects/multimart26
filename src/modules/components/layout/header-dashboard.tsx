import DarkMode from "@/components/shared/dark-mode";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import SignOutButton from "@/modules/components/auth/sign-out-button";
import DashboardLinks from "../dashboard/shared/dashboard-links";
import { Badge } from "@/components/ui/badge";
import SidebarTriggerCustom from "@/modules/components/dashboard/shared/sidebar-trigger-custom";

const HeaderDashboard = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <header className="bg-background fixed top-0 right-0 z-50 flex h-16 w-full items-center justify-between border-b px-2 py-2">
      <div className="container mx-auto flex w-full items-center justify-between gap-1 sm:gap-2">
        {/* //INFO: MENU & LOGO  & NAV LINKS */}
        <div className="flex shrink-0 items-center gap-2 p-1">
          <SidebarTriggerCustom />
          <Link href={routes.home} className="flex flex-row items-center gap-0">
            <h6 className="text-primary text-xl font-bold tracking-tight">
              Multi
            </h6>
            <h6 className="text-foreground text-xl font-bold tracking-tight">
              Mart
            </h6>
          </Link>
        </div>
        {/* USER ROLE */}
        {session && (
          <div className="flex flex-1 items-center justify-end gap-2">
            <span className="text-xs">Signed in as:</span>
            <Badge variant="default">{session?.user.role}</Badge>
          </div>
        )}
        {/* //INFO: BUTTONS & AUTH */}
        <div className="flex shrink-0 items-center gap-4 p-1">
          <DashboardLinks />
          {!session ? (
            <Button variant="secondary" size="sm" asChild>
              <Link href={routes.login}>Login</Link>
            </Button>
          ) : (
            <SignOutButton />
          )}
          <DarkMode />
        </div>
      </div>
    </header>
  );
};

export default HeaderDashboard;
