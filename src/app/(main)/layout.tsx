import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/authOptions'
import NextAuthProvider from '@/src/components/provider/NextAuthProvider'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { AppSidebar } from '@/src/components/app-sidebar'
import CustomContainer from '@/src/components/custom/CustomContainer'

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
        <SidebarInset>
          <CustomContainer>{children}</CustomContainer>
        </SidebarInset>
      </SidebarProvider>
    </NextAuthProvider>
  )
}
