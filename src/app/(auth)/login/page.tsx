import Login from '@/src/features/auth/component/Login'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Login Page | PTX Lending App',
  description: 'Login Page | PTX Lending App'
}

export default function Page() {
  return (
    <>
      <div className='container relative h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none md:grid-cols-2 lg:px-0 sm:grid sm:place-items-center xs:grid xs:place-items-center'>
        <div className='relative hidden h-full w-full flex-col bg-muted p-10 text-white dark:border-r lg:flex md:flex xs:flex'>
          <div className='absolute inset-0 bg-zinc-900' />
          <div className='relative flex items-center text-lg font-medium'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='mr-2 h-6 w-6'
            >
              <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
            </svg>
            MCZ Lending App
          </div>
        </div>
        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-center'>
              <h1 className='text-2xl font-semibold tracking-tight'>
                Login to our app
              </h1>
            </div>
            <Login />
            <p className='px-8 text-center text-sm text-muted-foreground'>
              By continuing, you agree to our{' '}
              <Link
                href='/terms'
                className='underline underline-offset-4 hover:text-primary'
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href='/privacy'
                className='underline underline-offset-4 hover:text-primary'
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
