import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { requireAuth } from "@/lib/auth-utils";
import { headers } from "next/headers";

const DashboardPage = async () => {
  await requireAuth();
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="flex w-full flex-col justify-between pb-0">
      <div className="flex-1 p-2">
        <h2 className="text-xl font-semibold">Dashboard Content</h2>
        <div className="mt-8 block">
          <Card className="mx-auto w-full max-w-lg overflow-clip">
            <CardContent>
              <pre className="text-xs">{JSON.stringify(session, null, 2)}</pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
