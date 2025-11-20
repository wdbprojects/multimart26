import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user.role === "ADMIN") {
    redirect("/dashboard/admin");
  } else if (session?.user.role === "SELLER") {
    redirect("/dashboard/seller");
  } else {
    redirect("/");
  }

  return (
    <div className="p-4">
      <h1 className="text-primary text-center text-2xl font-semibold">
        Dashboard Page
      </h1>
      <h2>Welcome love and abundance</h2>
    </div>
  );
};

export default DashboardPage;
