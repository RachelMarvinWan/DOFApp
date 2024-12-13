'use client'

import { useState } from 'react'
import { DashboardLayout } from 'components/layout/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card'
import { Input } from 'components/ui/input'
import { Label } from 'components/ui/label'
import { Button } from 'components/ui/button'

export default function AdminSettingsPage() {
  const [email, setEmail] = useState('sbd@mail.com')
  const [username, setUsername] = useState('SBD Admin')
  const [password, setPassword] = useState('***********')
  const [role, setRole] = useState('Admin')

  const handleEdit = () => {
    console.log('Edit user details')
    // Implement edit functionality here
  }

  return (
    <DashboardLayout userRole="admin">
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
                  <Input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    disabled
                  />
                </div>
              </div>
              <Button onClick={handleEdit}>Edit</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Language</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Button variant="secondary">English</Button>
              <Button variant="outline">Bahasa Malaysia</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}