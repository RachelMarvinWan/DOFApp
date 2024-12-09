import { ReactNode } from 'react'
import { Sidebar } from '@/components/layout/sidebar'

interface DashboardLayoutProps {
  children: ReactNode
  userRole: 'admin' | 'viewer'
}

export function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar userRole={userRole} />
      <main className="flex-1 overflow-y-auto bg-background">
        <div className="container mx-auto py-6">
          {children}
        </div>
      </main>
    </div>
  )
}