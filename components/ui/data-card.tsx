import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card'
import React from 'react'

interface DataCardProps {
  title: string
  value: string | number
  link?: string
}

export function DataCard({ title, value, link }: DataCardProps) {
  const CardWrapper = link ? Link : React.Fragment

  return (
    <CardWrapper href={link || '#'}>
      <Card className="hover:bg-accent hover:text-accent-foreground">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {link && (
            <p className="text-xs text-muted-foreground mt-2">
              See More
            </p>
          )}
        </CardContent>
      </Card>
    </CardWrapper>
  )
}