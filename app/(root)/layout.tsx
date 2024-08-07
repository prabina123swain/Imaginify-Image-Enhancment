import MobileNav from '@/components/shared/MobileNav'
import Sidebar from '@/components/shared/Sidebar'
import { Toaster } from '@/components/ui/toaster'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root min-h-screen">
      <Sidebar />
      <MobileNav />
      
      <div className="root-container">
        <div className="wrapper">
          {children}
        </div>
        <Toaster/>
      </div>
      
    </main>
  )
}

export default Layout