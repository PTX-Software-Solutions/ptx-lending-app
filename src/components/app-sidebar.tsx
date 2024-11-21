'use client'

import * as React from 'react'
import {
  BookUser,
  Command,
  Landmark,
  LifeBuoy,
  Send,
  Settings2
} from 'lucide-react'

import { NavMain } from '@/src/components/nav-main'
import { NavSecondary } from '@/src/components/nav-secondary'
import { NavUser } from '@/src/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import Link from 'next/link'

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg'
  },
  navMain: [
    {
      title: 'Loan',
      url: '#',
      icon: Landmark,
      isActive: true,
      items: [
        {
          title: 'Calculator',
          url: '#'
        },
        {
          title: 'Plan',
          url: '#'
        },
        {
          title: 'Application',
          url: '/loan'
        }
      ]
    },
    {
      title: 'Borrower',
      url: '#',
      icon: BookUser,
      items: [
        {
          title: 'Apply',
          url: '#'
        },
        {
          title: '(Soon) Loan Checker',
          url: '#'
        }
      ]
    },
    {
      title: 'Billing',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'Loan Payment',
          url: '#'
        }
      ]
    }
  ],
  navSecondary: [
    {
      title: 'Support',
      url: '#',
      icon: LifeBuoy
    },
    {
      title: 'Feedback',
      url: '#',
      icon: Send
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant='inset' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <Link href='/'>
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                  <Command className='size-4' />
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>MCZ Lending</span>
                  <span className='truncate text-xs'>Financial Assistance</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className='mt-auto' />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
