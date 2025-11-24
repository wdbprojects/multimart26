"use client";

import { FC, useEffect, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, CategorySchemaType } from "@/schemas/category-schemas";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Loader2, LogIn } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import ImageUploads from "../shared/image-uploads";
import { CategoryDetailsProps } from "@/config/types";

const CategoryDetails: FC<CategoryDetailsProps> = ({ data, cloudinaryKey }) => {
  const [pendingCreateCategory, startCreateCategoryTransition] =
    useTransition();

  const form = useForm<CategorySchemaType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: data?.name || "",
      // image: data?.image ? [{ url: data?.image }] : [{}],
      url: data?.url || "",
      featured: data?.featured || false,
    },
    mode: "onChange",
  });
  const { handleSubmit, control, reset } = form;

  const onSubmit = (data: CategorySchemaType) => {
    startCreateCategoryTransition(async () => {
      console.log(data);
    });
  };

  useEffect(() => {
    if (data) {
      reset({
        name: data?.name,
        // image: data?.image ? [{ url: data?.image }] : [{}],
        url: data?.url,
        featured: data?.featured,
      });
    }
  }, [data, reset]);

  return (
    <Dialog>
      <form id="create-category" onSubmit={handleSubmit(onSubmit)}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            Create New Category
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Category Information</DialogTitle>
            <DialogDescription>
              {data?.id
                ? `Update ${data?.name} category information`
                : "Create a new category. You can edit the category later."}
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="gap-2 space-y-4">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <Field className="gap-2">
                    <FieldLabel htmlFor="name">Category Name</FieldLabel>
                    <Input
                      {...field}
                      id="name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Category name"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-xs italic"
                      />
                    )}
                  </Field>
                );
              }}
            />
            <Controller
              name="image"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <Field className="gap-2">
                    <FieldLabel htmlFor="image">Image</FieldLabel>
                    <ImageUploads
                      cloudinaryKey={cloudinaryKey}
                      type="profile"
                      value={field?.value?.map((image) => {
                        return image.url;
                      })}
                      disabled={pendingCreateCategory}
                      onChange={(url) => {
                        field.onChange([{ url: url }]);
                      }}
                      onRemove={(url) => {
                        return field.onChange([
                          ...field.value.filter((current) => {
                            return current.url !== url;
                          }),
                        ]);
                      }}
                    />
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-xs italic"
                      />
                    )}
                  </Field>
                );
              }}
            />
            <Controller
              name="url"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <Field className="gap-2">
                    <FieldLabel htmlFor="url">URL</FieldLabel>
                    <Input
                      {...field}
                      id="url"
                      aria-invalid={fieldState.invalid}
                      placeholder="Category URL"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-xs italic"
                      />
                    )}
                  </Field>
                );
              }}
            />
            <Controller
              name="featured"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <Field className="gap-2">
                    <div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
                      <Switch
                        id="featured"
                        name="featured"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-invalid={fieldState.invalid}
                        className="order-1 h-5 w-9 cursor-pointer after:absolute after:inset-0 [&_span]:size-4 [&_span]:-translate-y-[0.5px] data-[state=checked]:[&_span]:translate-x-4 data-[state=checked]:[&_span]:rtl:-translate-x-4"
                      />
                      <div className="grid grow gap-2">
                        <Label htmlFor="featured">
                          Featured{" "}
                          <span className="text-muted-foreground text-xs leading-[inherit] font-normal">
                            category
                          </span>
                        </Label>
                        <p
                          id="featured"
                          className="text-muted-foreground text-xs"
                        >
                          Featured categories go to the top
                        </p>
                      </div>
                    </div>
                  </Field>
                );
              }}
            />
          </FieldGroup>
          {/* ACTION BUTTONS */}

          <div className="flex flex-col gap-2">
            <div className="mt-6 flex w-full flex-row items-center justify-between gap-2">
              <DialogClose asChild className="block w-full flex-1">
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button
                size="default"
                className="block w-full flex-1"
                type="submit"
                variant="default"
                form="create-category"
                disabled={pendingCreateCategory}
              >
                {pendingCreateCategory ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="size-3.5 animate-spin" />
                    <span>Pending...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <LogIn className="size-3.5" />
                    <span>Create Category</span>
                  </div>
                )}
              </Button>
            </div>
            <div className="flex w-full justify-end">
              <Button
                size="sm"
                className="text-xs"
                type="button"
                variant="link"
                disabled={pendingCreateCategory}
                onClick={() => {
                  reset();
                }}
              >
                Reset Form
              </Button>
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CategoryDetails;
