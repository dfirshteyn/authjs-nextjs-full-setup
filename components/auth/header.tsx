import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: "600",
})

interface HeaderProps {
  label: string;
}

export const Header = ({
  label
}: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-3 items-center justify-center drop-shadow-lg">
      <h1 className={cn(
        "text-3xl font-semibold",
        font.className
      )}>
        🔐| AuthZ
      </h1>
      <p className="text-muted-foreground text-sm font-medium">
        {label}
      </p>
    </div>
  )
}