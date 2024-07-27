"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-2 z-50 bg-background flex justify-between items-center px-3 py-2 rounded-lg w-[800px] shadow-xl shadow-orange-950">
      <div className="flex gap-x-2">
        <Button
          asChild
          size={"sm"}
          variant={pathname === "/admin" ? "default" : "outline"}
        >
          <Link href="/admin">
            Admin
          </Link>
        </Button>
        <Button
          asChild
          size={"sm"}
          variant={pathname === "/client" ? "default" : "outline"}
        >
          <Link href="/client">
            Client
          </Link>
        </Button>
        <Button
          asChild
          size={"sm"}
          variant={pathname === "/server" ? "default" : "outline"}
        >
          <Link href="/server">
            Server
          </Link>
        </Button>
        <Button
          asChild
          size={"sm"}
          variant={pathname === "/settings" ? "default" : "outline"}
        >
          <Link href="/settings">
            Settings
          </Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  )
}
