import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const DashboardSellerPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div className="flex w-full flex-col justify-between p-4">
      <div className="flex-1">
        <h1 className="text-primary text-center text-2xl font-semibold">
          Seller Dashboard
        </h1>
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

export default DashboardSellerPage;
