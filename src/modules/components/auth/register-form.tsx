"use client";

import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerAction } from "@/_actions/auth-actions";
import { registerSchema, RegisterSchemaType } from "@/schemas/auth-schemas";
import { routes } from "@/config/routes";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, LogIn } from "lucide-react";
import { toast } from "sonner";

const RegisterForm = () => {
  const [pendingRegister, startRegisterTransition] = useTransition();

  const router = useRouter();

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });
  const { handleSubmit, control, reset } = form;

  const onSubmit = (data: RegisterSchemaType) => {
    startRegisterTransition(async () => {
      const response = await registerAction(data);
      if (response.success) {
        toast.success(response.message);
        reset();
        router.push(routes.login);
      } else {
        toast.error(response.message);
      }
    });
  };

  return (
    <div className="flex w-full flex-col gap-4 sm:w-sm">
      <Card className="gap-3 p-2 py-6">
        <CardHeader className="mb-0 text-center">
          <CardTitle className="text-xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="register-user" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="gap-4">
              {/* FULL NAME */}
              <Controller
                control={control}
                name="name"
                render={({ field, fieldState }) => {
                  return (
                    <Field className="gap-1">
                      <FieldLabel htmlFor="name">Name</FieldLabel>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        autoComplete="off"
                        aria-invalid={fieldState.invalid}
                        {...field}
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
              {/* EMAIL */}
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState }) => {
                  return (
                    <Field className="gap-1">
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        id="email"
                        type="text"
                        placeholder="Enter your email"
                        autoComplete="off"
                        aria-invalid={fieldState.invalid}
                        {...field}
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
              {/* PASSWORD */}
              <Controller
                control={control}
                name="password"
                render={({ field, fieldState }) => {
                  return (
                    <Field className="gap-1">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Input
                        id="password"
                        type="password"
                        placeholder="********"
                        autoComplete="off"
                        aria-invalid={fieldState.invalid}
                        {...field}
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
              {/* CONFIRM PASSWORD */}
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field, fieldState }) => {
                  return (
                    <Field className="gap-1">
                      <FieldLabel htmlFor="password">
                        Confirm Password
                      </FieldLabel>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="********"
                        autoComplete="off"
                        aria-invalid={fieldState.invalid}
                        {...field}
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
            </FieldGroup>
            {/* ACTION BUTTONS */}
            <FieldGroup className="mt-8 flex w-full flex-col items-center justify-between gap-2">
              <Button
                size="default"
                className="w-full"
                type="submit"
                variant="default"
                form="register-user"
                disabled={pendingRegister}
              >
                {pendingRegister ? (
                  <div className="flex flex-row items-center justify-center gap-2">
                    <Loader2 className="size-3.5 animate-spin" />
                    <span>Pending...</span>
                  </div>
                ) : (
                  <div className="flex flex-row items-center justify-center gap-2">
                    <LogIn className="size-3.5" />
                    <span>Register</span>
                  </div>
                )}
              </Button>
              <div className="flex w-full justify-end">
                <Button
                  size="sm"
                  className="text-xs"
                  type="button"
                  variant="link"
                  disabled={pendingRegister}
                  onClick={() => {
                    reset();
                  }}
                >
                  Reset Form
                </Button>
              </div>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterForm;
