import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import CategoryDetails from "@/modules/components/dashboard/forms/category-details-form";
import Link from "next/link";

const CategoriesPage = () => {
  return (
    <div className="flex w-full flex-col justify-between p-4">
      <h2 className="text-primary text-center text-2xl font-semibold">
        Categories Page
      </h2>
      <div className="flex items-center justify-start gap-4">
        <CategoryDetails />
        <Button asChild variant="outline" size="sm">
          <Link href={routes.newCategory}>New Category Page</Link>
        </Button>
      </div>
    </div>
  );
};

export default CategoriesPage;
