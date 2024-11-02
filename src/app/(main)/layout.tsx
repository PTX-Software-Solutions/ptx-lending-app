import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/src/components/ui/sidebar'
import { AppSidebar } from '@/src/components/custom/AppSideBar'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/authOptions'
import NextAuthProvider from '@/src/components/provider/NextAuthProvider'

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)

  return (
    <NextAuthProvider session={session!}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </NextAuthProvider>
  )
}
