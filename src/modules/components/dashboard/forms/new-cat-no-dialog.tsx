"use client";

import { FC, useEffect, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageUploads from "@/modules/components/dashboard/shared/image-uploads";
import { categorySchema, CategorySchemaType } from "@/schemas/category-schemas";
import { CategoryDetailsProps } from "@/config/types";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Loader2, Plus } from "lucide-react";

const NewCatNoDialog: FC<CategoryDetailsProps> = ({ data }) => {
  const [pendingCreateCategory, startCreateCategoryTransition] =
    useTransition();

  const form = useForm<CategorySchemaType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: data?.name || "",
      image: data?.image
        ? [{ url: data?.image }]
        : [
            /* {
              url: "https://res.cloudinary.com/ronywebdev/image/upload/v1763996700/categories/wezklpg73aea653eapub.webp",
            }, */
          ],
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
        image: data?.image
          ? [{ url: data?.image }]
          : [
              /*  {
                url: "https://res.cloudinary.com/ronywebdev/image/upload/v1763996700/categories/wezklpg73aea653eapub.webp",
              }, */
            ],
        url: data?.url,
        featured: data?.featured,
      });
    }
  }, [data, reset]);

  return (
    <form id="create-category" onSubmit={handleSubmit(onSubmit)}>
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
          name="image"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <Field className="gap-2">
                <FieldLabel htmlFor="image">Image</FieldLabel>
                <ImageUploads
                  type="profile"
                  value={
                    field.value.length > 0
                      ? field.value.map((image) => {
                          return image.url;
                        })
                      : [
                          "https://res.cloudinary.com/ronywebdev/image/upload/v1763996700/categories/wezklpg73aea653eapub.webp",
                        ]
                  }
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
                    <p id="featured" className="text-muted-foreground text-xs">
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
                <Plus />
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
    </form>
  );
};

export default NewCatNoDialog;
