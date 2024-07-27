import { UserRole } from "@prisma/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { DefaultSession } from "next-auth";

interface UserInfoProps {
  user?: {
    role: UserRole
    isTwoFactorEnabled: boolean
  } & DefaultSession["user"]
  label: string
}

export const UserInfo = ({
  user,
  label
}: UserInfoProps) => {
  return (
    <Card className="w-[600px] shadow-2xl shadow-gray-800">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          {label}
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-md shadow-gray-400">
          <p className="text-lg font-semibold">
            ID
          </p>
          <p className="text-sm truncate max-w-[210px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-md shadow-gray-400">
          <p className="text-lg font-semibold">
            Name
          </p>
          <p className="text-sm truncate max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-md shadow-gray-400">
          <p className="text-lg font-semibold">
            Email
          </p>
          <p className="text-sm truncate max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-md shadow-gray-400">
          <p className="text-lg font-semibold">
            Role
          </p>
          <p className="text-sm truncate max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user?.role}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-md shadow-gray-400">
          <p className="text-lg font-semibold">
            Two-Factor Authentication
          </p>
          <Badge
            variant={user?.isTwoFactorEnabled ? "success" : "destructive"}
          >
            {user?.isTwoFactorEnabled ? "Enabled" : "Disabled"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}