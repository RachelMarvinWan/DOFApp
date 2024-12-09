'use client'

import { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'

interface DateFormatterProps {
  date: string
  formatString?: string
}

export function DateFormatter({ date, formatString = 'yyyy/MM/dd, HH:mm:ss' }: DateFormatterProps) {
  const [formattedDate, setFormattedDate] = useState<string>('')

  useEffect(() => {
    setFormattedDate(format(parseISO(date), formatString))
  }, [date, formatString])

  // Return a placeholder during SSR
  if (!formattedDate) {
    return <span className="opacity-0">Loading...</span>
  }

  return <span>{formattedDate}</span>
}

