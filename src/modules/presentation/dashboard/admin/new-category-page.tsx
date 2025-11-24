import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CategoryDetailsProps } from "@/config/types";
import NewCatNoDialog from "@/modules/components/dashboard/forms/new-cat-no-dialog";

const NewCategoryPage: FC<CategoryDetailsProps> = ({ data }) => {
  return (
    <div className="h-screen w-full p-8">
      <h2 className="text-center text-xl font-semibold tracking-wider">
        Create a new Category
      </h2>
      <p className="text-center">
        {data?.id
          ? `Update ${data?.name} category information`
          : "You can edit the category later in your admin dashboard"}
      </p>

      <Card className="mx-auto mt-8 block w-full max-w-lg">
        <CardContent>
          <NewCatNoDialog data={data} />
        </CardContent>
      </Card>
    </div>
  );
};

export default NewCategoryPage;
