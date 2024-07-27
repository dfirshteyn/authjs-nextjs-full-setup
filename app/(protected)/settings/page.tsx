"use client"

import * as z from "zod"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { useSession } from "next-auth/react"
import { useCurrentUser } from "@/hooks/use-current-user"
import { settings } from "@/actions/settings"

import { SettingsSchema } from "@/schemas"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form"
import {
  Card,
  CardHeader,
  CardContent
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { UserRole } from "@prisma/client"

const SettingsPage = () => {
  const user = useCurrentUser();

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    },
  })

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error)
          }

          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong"))
    })
  }

  return (
    <Card className="w-[600px] shadow-2xl shadow-gray-800">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          ⚙️ Account Settings ⚙️
        </p>
        <p className="text-xs text-muted-foreground font-semibold text-center">
          Update Your Account Settings
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
            {user?.isOauth === false && (
              <div className="space-y-3 border-4 border-slate-500 rounded-xl shadow-md shadow-gray-600 px-2 pt-1 pb-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">Current Password</FormLabel>
                      <FormControl>
                        <Input
                          className="shadow-md shadow-gray-400"
                          placeholder="******"
                          {...field}
                          type="password"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">New Password</FormLabel>
                      <FormControl>
                        <Input
                          className="shadow-md shadow-gray-400"
                          placeholder="******"
                          {...field}
                          type="password"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            <div className="space-y-3 border border-slate-400 rounded-xl shadow-md shadow-gray-600 px-2 pt-1 pb-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold">Name</FormLabel>
                    <FormControl>
                      <Input
                        className="shadow-md shadow-gray-400"
                        placeholder="John Doe"
                        type="text"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {user?.isOauth === false && (
              <div className="space-y-3 border border-slate-400 rounded-xl shadow-md shadow-gray-600 px-2 pt-1 pb-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-semibold">Email</FormLabel>
                      <FormControl>
                        <Input
                          className="shadow-md shadow-gray-400"
                          placeholder="john.doe@example.com"
                          {...field}
                          type="email"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            <div className="space-y-4 border border-slate-400 rounded-xl shadow-md shadow-gray-600 px-2 pt-1 pb-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold">Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      disabled={isPending}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="shadow-md shadow-gray-400">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={UserRole.ADMIN}>
                          Admin
                        </SelectItem>
                        <SelectItem value={UserRole.USER}>
                          User
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {user?.isOauth === false && (
              <FormField
                control={form.control}
                name="isTwoFactorEnabled"
                render={({ field }) => (
                  <FormItem className="flex flow-row items-center justify-between rounded-xl border border-slate-400 p-3 shadow-md shadow-gray-600">
                    <div className="space-y-0.5">
                      <FormLabel className="text-xs font-semibold">Two Factor Authentication</FormLabel>
                      <FormDescription>
                        Enable or disable two factor authentication
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        disabled={isPending}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" disabled={isPending}>
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card >
  );
}

export default SettingsPage;