import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login | PTX Lending App',
  description: 'Welcome to the login page of PTX Lending Application'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
