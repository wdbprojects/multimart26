import DarkMode from "@/components/shared/dark-mode";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import Link from "next/link";

const HeaderMain = () => {
  return (
    <header className="bg-background fixed top-0 right-0 z-50 flex h-16 w-full items-center justify-between border-b px-2 py-2">
      <div className="container mx-auto flex w-full items-center justify-between gap-1 sm:gap-2">
        {/* //INFO: MENU & LOGO  & NAV LINKS */}
        <div className="flex shrink-0 items-center gap-2 p-1">
          <Link href={routes.home} className="flex flex-row items-center gap-0">
            <h6 className="text-primary text-xl font-bold tracking-tight">
              Multi
            </h6>
            <h6 className="text-foreground text-xl font-bold tracking-tight">
              Mart
            </h6>
          </Link>
        </div>
        {/* //INFO: BUTTONS & AUTH */}
        <div className="flex shrink-0 items-center gap-2 p-1">
          <Button variant="outline" size="sm" asChild>
            <Link href={routes.dashboard}>Dashboard</Link>
          </Button>
          <Button variant="secondary" size="sm" asChild>
            <Link href={routes.login}>Login</Link>
          </Button>
          <DarkMode />
        </div>
      </div>
    </header>
  );
};

export default HeaderMain;
