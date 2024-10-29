import { AuthOptions } from 'next-auth'
import { users as User } from '@prisma/client'
import { compare } from 'bcrypt'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/prisma/client'

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days validity of the access token
  },
  pages: {
    signIn: '/login'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const user: User | null = await prisma.users.findUnique({
          where: { email: credentials?.email }
        })

        if (!user) {
          throw new Error('No user found')
        }

        const passwordCorrect = await compare(
          credentials?.password || '',
          user.password
        )

        if (!passwordCorrect) {
          throw new Error('Incorrect password')
        }

        return {
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as unknown as string
        session.user.email = token.email as unknown as string
      }

      return session
    }
  }
}
