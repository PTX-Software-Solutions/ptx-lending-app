'use client'

import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

export default function NextAuthProvider({
  children,
  session
}: Readonly<{
  children: React.ReactNode
  session: Session
}>) {
  return <SessionProvider session={session}>{children}</SessionProvider>
}