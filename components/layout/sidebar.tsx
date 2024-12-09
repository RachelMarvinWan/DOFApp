'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Activity, Clock, CreditCard, DollarSign, Info, LogOut, Menu, Settings, Users, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

interface SidebarProps {
  userRole?: 'admin' | 'viewer'
}

export function Sidebar({ userRole = 'admin' }: SidebarProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    {
      label: 'Telemetry',
      icon: Activity,
      href: `/telemetry`,
      active: pathname === `/${userRole}/telemetry`,
    },
    {
      label: 'History',
      icon: Clock,
      href: `/history`,
      active: pathname === `/${userRole}/history`,
    },
    {
      label: 'Expenses',
      icon: CreditCard,
      href: `/expenses`,
      active: pathname === `/${userRole}/expenses`,
    },
    {
      label: 'Income',
      icon: DollarSign,
      href: `/income`,
      active: pathname === `/${userRole}/income`,
    },
    ...(userRole === 'admin'
      ? [
          {
            label: 'Users',
            icon: Users,
            href: '/users',
            active: pathname === '/admin/users',
          },
        ]
      : []),
    {
      label: 'About',
      icon: Info,
      href: `/about`,
      active: pathname === `/about`,
    },
    {
      label: 'Settings',
      icon: Settings,
      href: `/settings`,
      active: pathname === `/settings`,
    },
  ]

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <SidebarContent routes={routes} />
        </SheetContent>
      </Sheet>
      <nav className="hidden border-r bg-gray-100/40 md:block">
        <SidebarContent routes={routes} />
      </nav>
    </>
  )
}

function SidebarContent({ routes }: { routes: any[] }) {
  return (
    <div className="flex h-full flex-col">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8">
            <img 
              src="@/public/logo.svg" 
              alt="Logo" 
              className="h-full w-full"
            />
          </div>
          <span className="font-bold">Ikanmeter</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-2 p-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-gray-100 hover:text-gray-900 ${
                route.active ? 'bg-gray-100 text-gray-900' : 'text-gray-500'
              }`}
            >
              <route.icon className="h-4 w-4" />
              {route.label}
            </Link>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4">
        <Button variant="secondary" className="w-full" asChild>
          <Link href="/logout" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Link>
        </Button>
      </div>
    </div>
  )
}