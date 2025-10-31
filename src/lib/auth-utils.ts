import { headers } from "next/headers";
import { auth } from "./auth";
import { routes } from "@/config/routes";
import { redirect } from "next/navigation";

export const requireAuth = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect(routes.login);
  }
  return session;
};

export const requireUnauth = async (path: keyof typeof routes) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    redirect(routes[path]);
  }
  return session;
};
