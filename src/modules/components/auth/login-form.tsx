"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAction } from "@/_actions/auth-actions";
import { loginSchema, LoginSchemaType } from "@/schemas/auth-schemas";
import { routes } from "@/config/routes";

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

const LoginForm = () => {
  const [pendingLogin, startLoginTransition] = useTransition();

  const router = useRouter();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });
  const { handleSubmit, control, reset } = form;

  const onSubmit = (data: LoginSchemaType) => {
    startLoginTransition(async () => {
      const response = await loginAction(data);
      if (response.success) {
        toast.success(response.message);
        reset();
        router.push(routes.home);
      } else {
        toast.error(response.message);
      }
    });
  };

  return (
    <div className="flex w-full flex-col gap-4 sm:w-sm">
      <Card className="gap-3 p-2 py-6">
        <CardHeader className="mb-0 text-center">
          <CardTitle className="text-xl">Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="register-user" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup className="gap-4">
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
            </FieldGroup>
            {/* ACTION BUTTONS */}
            <FieldGroup className="mt-8 flex w-full flex-col items-center justify-between gap-2">
              <Button
                size="default"
                className="w-full"
                type="submit"
                variant="default"
                form="register-user"
                disabled={pendingLogin}
              >
                {pendingLogin ? (
                  <div className="flex flex-row items-center justify-center gap-2">
                    <Loader2 className="size-3.5 animate-spin" />
                    <span>Pending...</span>
                  </div>
                ) : (
                  <div className="flex flex-row items-center justify-center gap-2">
                    <LogIn className="size-3.5" />
                    <span>Login</span>
                  </div>
                )}
              </Button>
              <div className="flex w-full justify-end">
                <Button
                  size="sm"
                  className="text-xs"
                  type="button"
                  variant="link"
                  disabled={pendingLogin}
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

export default LoginForm;
