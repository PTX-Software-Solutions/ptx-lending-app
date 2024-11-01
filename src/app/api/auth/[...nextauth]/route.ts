import NextAuth from 'next-auth'
import { authOptions } from './authOptions'

// Initialize NextAuth with the auth options
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
