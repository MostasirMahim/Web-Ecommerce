import { SidebarProvider } from "@/components/ui/sidebar"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminMobileNav from "@/components/admin/admin-mobile-nav"

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <SidebarProvider>
        <AdminSidebar />
        <AdminMobileNav />
        <div className="flex-1 overflow-auto">{children}</div>
      </SidebarProvider>
    </div>
  )
}
