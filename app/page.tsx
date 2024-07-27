import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: "600",
})
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-100 to-orange-400">
      <div className="space-y-6 text-center">
        <h1 className={cn(
          "text-6xl font-semibold text-black drop-shadow-md",
          font.className,
        )}>
          🔐| Auth-Z
        </h1>
        <p className="text-black text-lg">
          An example of a simple Authentication Service
        </p>
        <div>
          <LoginButton mode="modal" asChild>
            <Button variant="secondary" size="lg">
              Sign In
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
