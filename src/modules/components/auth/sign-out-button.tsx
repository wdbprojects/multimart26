"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { routes } from "@/config/routes";

const SignOutButton = () => {
  const [pendingLogout, startLogoutTransition] = useTransition();
  const router = useRouter();

  const handleLogout = () => {
    startLogoutTransition(async () => {
      await signOut({
        fetchOptions: {
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: () => {
            toast.info("User signed out successfully!");
            router.push(routes.home);
            router.refresh();
          },
        },
      });
    });
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      className="w-[150px]"
      onClick={handleLogout}
      disabled={pendingLogout}
    >
      {pendingLogout ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="size-3.5 animate-spin" />
          <span>Pending...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <LogOut className="size-3.5" />
          <span>Log out</span>
        </div>
      )}
    </Button>
  );
};

export default SignOutButton;
