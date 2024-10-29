import { SidebarProvider, SidebarTrigger } from '@/src/components/ui/sidebar'
import { AppSidebar } from '@/src/components/custom/AppSideBar'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      {children}
    </SidebarProvider>
  )
}
