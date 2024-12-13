'use client'

import { useState, useMemo } from 'react'
import { DashboardLayout } from 'components/layout/dashboard-layout'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { format, parseISO, eachDayOfInterval, startOfDay, endOfDay } from 'date-fns'

const columns = [
  { accessorKey: 'date', header: 'Date' },
  { accessorKey: 'item', header: 'Item' },
  { accessorKey: 'incomeAmount', header: 'Income Amount' },
  { accessorKey: 'category', header: 'Category' },
  { accessorKey: 'organisation', header: 'Organisation' },
  { accessorKey: 'user', header: 'User' },
  { accessorKey: 'remarks', header: 'Remarks' },
]

const data = [
  {
    date: '2024-11-10T12:47:00',
    item: 'Fishery Talk',
    incomeAmount: 300.00,
    category: 'Lectures',
    organisation: 'Farm 1',
    user: 'Ahmad',
    remarks: 'SMK Pantai',
  },
  {
    date: '2024-11-10T13:00:00',
    item: 'Fishery Talk',
    incomeAmount: 300.00,
    category: 'Lectures',
    organisation: 'Farm 1',
    user: 'Damian',
    remarks: 'SMK Pantai',
  },
  {
    date: '2024-11-11T14:00:00',
    item: 'Fishery Talk',
    incomeAmount: 300.00,
    category: 'Lectures',
    organisation: 'Farm 1',
    user: 'Dolah',
    remarks: 'SMK Pantai',
  },
  {
    date: '2024-11-12T15:00:00',
    item: 'Fishery Talk',
    incomeAmount: 300.00,
    category: 'Equipment',
    organisation: 'Farm 2',
    user: 'Bong',
    remarks: 'SMK Pantai',
  },
  {
    date: '2024-11-13T16:00:00',
    item: 'Fishery Talk',
    incomeAmount: 100.00,
    category: 'Equipment',
    organisation: 'Farm 2',
    user: 'Fadeel',
    remarks: 'SMK Pantai',
  },
  // Add more rows as needed
]

export default function AdminIncomePage() {
  const [organisation, setOrganisation] = useState('')
  const [category, setCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'ascending' })
  const [tableStartDate, setTableStartDate] = useState('')
  const [tableEndDate, setTableEndDate] = useState('')
  const [chartStartDate, setChartStartDate] = useState('')
  const [chartEndDate, setChartEndDate] = useState('')

  const organisationOptions = [
    { label: 'Farm 1', value: 'Farm 1' },
    { label: 'Farm 2', value: 'Farm 2' },
  ]

  const categoryOptions = [
    { label: 'Lectures', value: 'Lectures' },
    { label: 'Equipment', value: 'Equipment' },
    { label: 'Rent', value: 'Rent' },
    { label: 'Demo', value: 'Demo' },
    { label: 'Manpower', value: 'Manpower' },
  ]

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const organisationMatch = organisation ? item.organisation === organisation : true
      const categoryMatch = category ? item.category === category : true
      const searchMatch = item.item.toLowerCase().includes(searchTerm.toLowerCase())
      const dateMatch = (!tableStartDate || new Date(item.date) >= new Date(tableStartDate)) &&
                        (!tableEndDate || new Date(item.date) <= new Date(tableEndDate))
      return organisationMatch && categoryMatch && searchMatch && dateMatch
    })
  }, [data, organisation, category, searchTerm, tableStartDate, tableEndDate])

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
        return sortConfig.direction === 'ascending' ? -1 : 1
      }
      if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
        return sortConfig.direction === 'ascending' ? 1 : -1
      }
      return 0
    })
  }, [filteredData, sortConfig])

  const requestSort = (key: string) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const getArrow = (key: string) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '↑' : '↓'
    }
    return '↕'
  }

  const handleCopy = () => {
    // Implement copy functionality
  }

  const handleExportCSV = () => {
    // Implement CSV export functionality
  }

  const handleExportPDF = () => {
    // Implement PDF export functionality
  }

  const handlePrint = () => {
    window.print()
  }

  const chartData = useMemo(() => {
    if (!chartStartDate || !chartEndDate) return []

    const start = startOfDay(new Date(chartStartDate))
    const end = endOfDay(new Date(chartEndDate))
    const dateRange = eachDayOfInterval({ start, end })

    const incomeByDate = dateRange.map(date => {
      const formattedDate = format(date, 'yyyy-MM-dd')
      const dayIncome = sortedData.filter(item => item.date.startsWith(formattedDate))
      const Income = dayIncome.reduce((sum, item) => sum + item.incomeAmount, 0)
      
      const categoryTotals: { [key: string]: number } = {}
      dayIncome.forEach(item => {
        if (!categoryTotals[item.category]) {
          categoryTotals[item.category] = 0
        }
        categoryTotals[item.category] += item.incomeAmount
      })

      return {
        date: formattedDate,
        Income,
        ...categoryTotals
      }
    })

    return incomeByDate
  }, [sortedData, chartStartDate, chartEndDate])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow">
          <p className="font-bold">{format(parseISO(label), 'dd/MM/yyyy')}</p>
          <p>Total Income: RM {payload[0].value.toFixed(2)}</p>
          {payload.slice(1).map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: RM {entry.value.toFixed(2)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Income</h1>
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="flex flex-wrap space-x-4 mb-4">
            <select value={organisation} onChange={(e) => setOrganisation(e.target.value)} className="border rounded p-2 w-56">
              {organisationOptions.map(option => (
                <option key={option.label} value={option.value}>{option.label}</option>
              ))}
            </select>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded p-2 w-56">
              {categoryOptions.map(option => (
                <option key={option.label} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <input 
            type="text" 
            placeholder="Search Income" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="border rounded p-2 w-56 mb-4 md:mb-0" 
          />
        </div>

        {/* Container for Table and Action Buttons */}
        <div className="rounded-md border p-6 shadow-md">
          {/* Action Buttons and Date Selection */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <button onClick={handleCopy} className="border rounded p-2">Copy</button>
              <button onClick={handleExportCSV} className="border rounded p-2">CSV</button>
              <button onClick={handleExportPDF} className="border rounded p-2">PDF</button>
              <button onClick={handlePrint} className="border rounded p-2">Print</button>
            </div>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <label htmlFor="tableStartDate" className="mr-2 text-sm font-medium text-gray-700">Start:</label>
                <input
                  id="tableStartDate"
                  type="date"
                  value={tableStartDate}
                  onChange={(e) => setTableStartDate(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="tableEndDate" className="mr-2 text-sm font-medium text-gray-700">End:</label>
                <input
                  id="tableEndDate"
                  type="date"
                  value={tableEndDate}
                  onChange={(e) => setTableEndDate(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
          </div>

          {/* Custom Table */}
          <div className="max-h-[300px] overflow-y-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-200 sticky top-0 z-10">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.accessorKey}
                      onClick={() => requestSort(column.accessorKey)}
                      className={`cursor-pointer text-left p-4 ${
                        sortConfig.key === column.accessorKey ? 'text-blue-500' : ''
                      } font-normal justify-between items-center`}
                    >
                      {column.header}{' '}
                      <span className="text-xs text-gray-400">
                        {getArrow(column.accessorKey)}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="p-4">{format(parseISO(item.date), 'yyyy/MM/dd, HH:mm:ss')}</td>
                    <td className="p-4">{item.item}</td>
                    <td className="p-4">RM {item.incomeAmount.toFixed(2)}</td>
                    <td className="p-4">{item.category}</td>
                    <td className="p-4">{item.organisation}</td>
                    <td className="p-4">{item.user}</td>
                    <td className="p-4">{item.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart Section */}
        <div className="rounded-md border p-6 shadow-md">
          <h2 className="mb-4 text-lg font-semibold">Income Visualisation</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="p-1">Range Start</label>
                <input
                  type="date"
                  value={chartStartDate}
                  onChange={(e) => setChartStartDate(e.target.value)}
                  className="rounded border p-2"
                />
              </div>
              <div className="flex flex-col">
                <label className="p-1">Range End</label>
                <input
                  type="date"
                  value={chartEndDate}
                  onChange={(e) => setChartEndDate(e.target.value)}
                  className="rounded border p-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <select 
                value={organisation} 
                onChange={(e) => setOrganisation(e.target.value)} 
                className="border rounded p-2"
              >
                <option value="">Select Organisation</option>
                {organisationOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                className="border rounded p-2"
              >
                <option value="">Select Category</option>
                {categoryOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            {chartStartDate && chartEndDate && (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(date) => format(parseISO(date), 'dd/MM')}
                    type="category"
                  />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="Income" 
                    stroke="blue" 
                    strokeWidth={2} 
                    dot={{ strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  {categoryOptions.filter(option => option.value).map((category, index) => (
                    <Line 
                      key={category.value}
                      type="monotone" 
                      dataKey={category.value}
                      stroke={`hsl(${index * 137.5}, 70%, 50%)`}
                      strokeWidth={2}
                      dot={{ strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

