"use client"

import { admin } from "@/actions/admin";
import { RoleGate } from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {
  const onServerActionClick = () => {
    admin()
      .then((response) => {
        if (response.success) {
          toast.success("Allowed Server Action!")
        } else {
          toast.error(response.error)
        }
      })
  }
  const onApiRouteClick = () => {
    fetch("/api/admin")
      .then((response) => {
        if (response.ok) {
          toast.success("Allowed API Route")
        } else {
          toast.error("Forbidden!")
        }
      })
  }


  return (
    <Card className="w-[600px] shadow-2xl shadow-gray-800">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          🔑 Admin
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess
            message="You are allowed to see this content"
          />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-md shadow-gray-400">
          <p className="text-lg font-semibold">
            Admin-only API Route
          </p>
          <Button onClick={onApiRouteClick}>
            Click to test
          </Button>

        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-md shadow-gray-400">
          <p className="text-lg font-semibold">
            Admin-only Server Action
          </p>
          <Button onClick={onServerActionClick}>
            Click to test
          </Button>

        </div>
      </CardContent>
    </Card>
  );
}

export default AdminPage;