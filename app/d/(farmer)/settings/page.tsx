'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/v-dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export default function ViewerSettingsPage() {
  const [email] = useState('sbd@mail.com')
  const [username] = useState('SBD Viewer')
  const [password] = useState('***********')
  const [role] = useState('Viewer')

  return (
    <DashboardLayout userRole="viewer">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Card>
          <CardHeader>
            <CardTitle>User Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <p>{email}</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <p>{username}</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <p>{password}</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <p>{role}</p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Language</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </DashboardLayout>
  )
}