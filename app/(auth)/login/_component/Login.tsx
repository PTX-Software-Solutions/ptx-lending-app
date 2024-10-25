'use client'

import { useState } from 'react'

import { Icons } from '@/app/_common/component/Icons'
import { cn } from '@/lib/utils'
import * as React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>

export default function Login({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function onSubmit() {
    setIsLoading(true)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className='grid gap-2'>
          <div className='grid gap-1'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              placeholder='name@example.com'
              type='email'
              autoCapitalize='none'
              autoComplete='email'
              autoCorrect='off'
              disabled={isLoading}
            />
          </div>
          <div className='grid gap-1'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              autoCapitalize='none'
              autoComplete='password'
              autoCorrect='off'
              disabled={isLoading}
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
