'use client'

import { Icons } from '@/src/components/custom/Icons'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { cn } from '@/src/lib/utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

import * as React from 'react'
import { loginSchema, LoginType } from '../utils/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { FormDescription } from '@/components/ui/form'

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

export default function Login({ className, ...props }: UserAuthFormProps) {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange'
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit: SubmitHandler<LoginType> = async (data: LoginType) => {
    try {
      setIsLoading(true)
      const response = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      })

      if (response?.error) {
        console.error(`error: ${response.error}`)
        router.push('/login')
      }

      if (!response?.ok) {
        throw new Error('Network response was not ok')
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Something went wrong'

      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-2'>
          <div className='grid gap-1'>
            <Label htmlFor='email'>Email</Label>
            <Controller
              control={control}
              name='email'
              render={({ field: { onChange, value } }) => (
                <>
                  <Input
                    id='email'
                    placeholder='name@example.com'
                    type='email'
                    autoCapitalize='none'
                    autoComplete='email'
                    autoCorrect='off'
                    onChange={(e) => onChange(e)}
                    value={value}
                    disabled={isLoading}
                  />
                  {errors.email?.message && (
                    <FormDescription>{errors.email?.message}</FormDescription>
                  )}
                </>
              )}
            />
          </div>
          <div className='grid gap-1'>
            <Label htmlFor='password'>Password</Label>
            <Controller
              control={control}
              name='password'
              render={({ field: { onChange, value } }) => (
                <>
                  <Input
                    id='password'
                    type='password'
                    autoCapitalize='none'
                    autoComplete='password'
                    autoCorrect='off'
                    onChange={(e) => onChange(e)}
                    value={value}
                    disabled={isLoading}
                  />
                  {errors.password?.message && (
                    <FormDescription>
                      {errors.password?.message}
                    </FormDescription>
                  )}
                </>
              )}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            )}
            Sign In
          </Button>
        </div>
      </form>
    </div>
  )
}
