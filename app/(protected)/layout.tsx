import { Navbar } from "./_components/navbar"

interface ProtectedLayoutProps {
  children: React.ReactNode
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen space-y-24 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-100 to-orange-400">
      <Navbar />
      <div className="pb-8">
        {children}
      </div>
    </div>
  )
}

export default ProtectedLayout