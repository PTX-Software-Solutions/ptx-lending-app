'use client'

import * as React from 'react'
import {
  Command,
  LifeBuoy,
  Send,
  Settings2,
  Landmark,
  BookUser
} from 'lucide-react'

import { NavMain } from './NavMain'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '../ui/sidebar'
import { NavSecondary } from './NavSecondary'
import { NavUser } from './NavUser'

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
          url: '#'
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
              <a href='#'>
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                  <Command className='size-4' />
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>MCZ Lending</span>
                  <span className='truncate text-xs'>Financial Assistance</span>
                </div>
              </a>
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
