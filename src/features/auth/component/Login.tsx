'use client'

import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Label } from '@/src/components/ui/label'
import { cn } from '@/src/lib/utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import * as React from 'react'
import { loginSchema, LoginType } from '../utils/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { Form, FormField, FormDescription } from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import { LoaderIcon } from 'lucide-react'

export default function Login() {
  const router = useRouter()
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const onSubmit: SubmitHandler<LoginType> = async (data: LoginType) => {
    try {
      setIsLoading(true)
      const response = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      })

      if (!response?.ok) {
        router.push('/login')
        toast({
          duration: 3000,
          title: 'Invalid credentials has been used',
          variant: 'destructive'
        })
        return
      }

      router.push('/')
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Something went wrong'

      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('grid gap-6')}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <>
                    <Input
                      id='email'
                      placeholder='name@example.com'
                      type='text'
                      autoCapitalize='none'
                      autoComplete='email'
                      autoCorrect='off'
                      {...field}
                      disabled={isLoading}
                    />
                    {form.formState.errors?.email?.message && (
                      <small className={'text-red-500'}>
                        {form.formState.errors.email?.message}
                      </small>
                    )}
                  </>
                )}
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <>
                    <Input
                      id='password'
                      type='password'
                      autoCapitalize='none'
                      autoComplete='password'
                      autoCorrect='off'
                      {...field}
                      disabled={isLoading}
                    />
                    {form.formState.errors?.password?.message && (
                      <FormDescription>
                        {form.formState.errors.password?.message}
                      </FormDescription>
                    )}
                  </>
                )}
              />
            </div>
            <Button disabled={isLoading}>
              {isLoading && <LoaderIcon className='animate-spin' />}
              Sign In
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
