'use client'

import { useState, useMemo } from 'react'
import { DashboardLayout } from 'components/layout/v-dashboard-layout'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { format, parseISO, eachDayOfInterval, startOfDay, endOfDay } from 'date-fns'

const columns = [
  { accessorKey: 'date', header: 'Date' },
  { accessorKey: 'item', header: 'Item' },
  { accessorKey: 'expenseAmount', header: 'Expense Amount' },
  { accessorKey: 'category', header: 'Category' },
  { accessorKey: 'user', header: 'User' },
  { accessorKey: 'remarks', header: 'Remarks' },
  { accessorKey: 'action', header: 'Action'}
]

export default function ViewerExpensesPage() {
  const [category, setCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'ascending' })
  const [tableStartDate, setTableStartDate] = useState('')
  const [tableEndDate, setTableEndDate] = useState('')
  const [chartStartDate, setChartStartDate] = useState('')
  const [chartEndDate, setChartEndDate] = useState('')
  const [expenses, setExpenses] = useState([
    {
      date: '2024-11-10T12:47:00',
      item: 'Fishery Talk',
      expenseAmount: 300.00,
      category: 'Lectures',
      user: 'Ahmad',
      remarks: 'SMK Pantai',
    },
    {
      date: '2024-11-10T13:00:00',
      item: 'Workshop Supplies',
      expenseAmount: 150.00,
      category: 'Equipment',
      user: 'Alice',
      remarks: 'Workshop at Farm 1',
    },
    {
      date: '2024-11-11T14:00:00',
      item: 'Field Trip',
      expenseAmount: 200.00,
      category: 'Lectures',
      user: 'John',
      remarks: 'Field trip to the coast',
    },
    {
      date: '2024-11-12T15:00:00',
      item: 'Marketing Materials',
      expenseAmount: 120.00,
      category: 'Marketing',
      user: 'Sarah',
      remarks: 'Printed flyers',
    },
    {
      date: '2024-11-13T16:00:00',
      item: 'Equipment Rental',
      expenseAmount: 500.00,
      category: 'Equipment',
      user: 'Michael',
      remarks: 'Rented equipment for event',
    },
    // Add more data as needed
  ])
  const [newExpense, setNewExpense] = useState({
    date: '',
    item: '',
    expenseAmount: '',
    category: '',
    user: '',
    remarks: '',
  });
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [tempExpense, setTempExpense] = useState(newExpense);
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // Track which row is being edited
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // State for delete confirmation
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null); // Track which row to delete

  const categoryOptions = [
    { label: 'All', value: '' },
    { label: 'Lectures', value: 'Lectures' },
    { label: 'Equipment', value: 'Equipment' },
    { label: 'Marketing', value: 'Marketing' },
    { label: 'Rent', value: 'Rent' },
    { label: 'Manpower', value: 'Manpower' },
  ]

  const filteredData = useMemo(() => {
    return expenses.filter(item => {
      const categoryMatch = category ? item.category === category : true
      const searchMatch = item.item.toLowerCase().includes(searchTerm.toLowerCase())
      const dateMatch = (!tableStartDate || new Date(item.date) >= new Date(tableStartDate)) &&
                        (!tableEndDate || new Date(item.date) <= new Date(tableEndDate))
      return categoryMatch && searchMatch && dateMatch
    })
  }, [expenses, category, searchTerm, tableStartDate, tableEndDate])

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

    const expensesByDate = dateRange.map(date => {
      const formattedDate = format(date, 'yyyy-MM-dd')
      const dayExpenses = sortedData.filter(item => item.date.startsWith(formattedDate))
      const Expense = dayExpenses.reduce((sum, item) => sum + item.expenseAmount, 0)
      
      const categoryTotals: { [key: string]: number } = {}
      dayExpenses.forEach(item => {
        if (!categoryTotals[item.category]) {
          categoryTotals[item.category] = 0
        }
        categoryTotals[item.category] += item.expenseAmount
      })

      return {
        date: formattedDate,
        Expense,
        ...categoryTotals
      }
    })

    return expensesByDate
  }, [sortedData, chartStartDate, chartEndDate])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow">
          <p className="font-bold">{format(parseISO(label), 'dd/MM/yyyy')}</p>
          <p>Total Expense: RM {payload[0].value.toFixed(2)}</p>
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

  const handleAddExpense = () => {
    setTempExpense(newExpense); // Store the current expense temporarily
    setShowConfirmPopup(true); // Show the confirmation pop-up
  };

  const confirmAddExpense = () => {
    setExpenses(prevExpenses => [
      ...prevExpenses,
      { 
        ...tempExpense, 
        date: new Date(tempExpense.date).toISOString(), // Ensure date is in the correct format
        expenseAmount: parseFloat(tempExpense.expenseAmount) // Convert to number
      }
    ]);
    setShowConfirmPopup(false); // Close the pop-up
    setNewExpense({
      date: '',
      item: '',
      expenseAmount: '', // Reset to empty string
      category: '',
      user: '',
      remarks: '',
    }); // Clear the form
  };

  const cancelAddExpense = () => {
    setShowConfirmPopup(false); // Close the pop-up without clearing the form
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index); // Set the index of the row being edited
    const expenseToEdit = sortedData[index];
    setNewExpense({
      ...expenseToEdit,
      expenseAmount: expenseToEdit.expenseAmount.toString() // Convert expenseAmount to string
    }); // Populate newExpense with the selected row's data
  };

  const handleDelete = (index: number) => {
    setDeleteIndex(index); // Set the index of the row to delete
    setShowDeleteConfirm(true); // Show delete confirmation popup
  };

  const confirmDelete = () => {
    setExpenses(prevExpenses => prevExpenses.filter((_, index) => index !== deleteIndex)); // Delete the selected row
    setShowDeleteConfirm(false); // Close the delete confirmation popup
    setDeleteIndex(null); // Reset delete index
  };

  return (
    <DashboardLayout userRole="viewer">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Expenses</h1>
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="flex flex-wrap space-x-4 mb-4">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded p-2 w-56">
              {categoryOptions.map(option => (
                <option key={option.label} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <input 
            type="text" 
            placeholder="Search Expenses" 
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
                    {editingIndex === index ? ( // Check if the row is being edited
                      <>
                        <td className="p-4">
                          <input
                            type="datetime-local"
                            value={newExpense.date}
                            onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                            className="border rounded p-2"
                          />
                        </td>
                        <td className="p-4">
                          <input
                            type="text"
                            value={newExpense.item}
                            onChange={(e) => setNewExpense({ ...newExpense, item: e.target.value })}
                            className="border rounded p-2"
                          />
                        </td>
                        <td className="p-4">
                          <input
                            type="text"
                            value={newExpense.expenseAmount}
                            onChange={(e) => setNewExpense({ ...newExpense, expenseAmount: e.target.value })}
                            className="border rounded p-2"
                          />
                        </td>
                        <td className="p-4">
                          <select
                            value={newExpense.category}
                            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                            className="border rounded p-2"
                          >
                            {categoryOptions.map(option => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                        </td>
                        <td className="p-4">
                          <input
                            type="text"
                            value={newExpense.user}
                            onChange={(e) => setNewExpense({ ...newExpense, user: e.target.value })}
                            className="border rounded p-2"
                          />
                        </td>
                        <td className="p-4">
                          <input
                            type="text"
                            value={newExpense.remarks}
                            onChange={(e) => setNewExpense({ ...newExpense, remarks: e.target.value })}
                            className="border rounded p-2"
                          />
                        </td>
                        <td className="p-4">
                          <button onClick={() => { confirmAddExpense(); setEditingIndex(null); }} className="border rounded p-2 bg-blue-500 text-white">Confirm</button>
                          <button onClick={() => setEditingIndex(null)} className="border rounded p-2">Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-4">{format(parseISO(item.date), 'yyyy/MM/dd, HH:mm:ss')}</td>
                        <td className="p-4">{item.item}</td>
                        <td className="p-4">RM {item.expenseAmount.toFixed(2)}</td>
                        <td className="p-4">{item.category}</td>
                        <td className="p-4">{item.user}</td>
                        <td className="p-4">{item.remarks}</td>
                        <td className="p-4">
                          <button onClick={() => handleEdit(index)} className="border rounded p-2">Edit</button>
                          <button onClick={() => handleDelete(index)} className="border rounded p-2 text-red-500">Delete</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Expense Section */}
          <div className="mt-4 p-4 border rounded shadow-md">
            <h2 className="mb-2 text-lg font-semibold">Add Expense</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="datetime-local"
                value={newExpense.date}
                onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                className="border rounded p-2"
              />
              <input
                type="text"
                placeholder="Item"
                value={newExpense.item}
                onChange={(e) => setNewExpense({ ...newExpense, item: e.target.value })}
                className="border rounded p-2"
              />
              <input
                type="text"
                placeholder="RM 00.00"
                value={newExpense.expenseAmount}
                onChange={(e) => setNewExpense({ ...newExpense, expenseAmount: e.target.value })}
                className="border rounded p-2"
              />
              <select
                value={newExpense.category}
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                className="border rounded p-2"
              >
                {categoryOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="User"
                value={newExpense.user}
                onChange={(e) => setNewExpense({ ...newExpense, user: e.target.value })}
                className="border rounded p-2"
              />
              <input
                type="text"
                placeholder="Remarks"
                value={newExpense.remarks}
                onChange={(e) => setNewExpense({ ...newExpense, remarks: e.target.value })}
                className="border rounded p-2"
              />
            </div>
            <button onClick={handleAddExpense} className="mt-4 border rounded p-2 bg-blue-500 text-white">
              Add Expense
            </button>
          </div>
        </div>

        {/* Chart Section */}
        <div className="rounded-md border p-6 shadow-md">
          <h2 className="mb-4 text-lg font-semibold">Expenses Visualisation</h2>
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
                    dataKey="Expense" 
                    stroke="brown"
                    strokeWidth={2} 
                    dot={{ strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  {categoryOptions.filter(option => option.value).map((category, index) => (
                    <Line 
                      key={category.value}
                      type="monotone" 
                      dataKey={category.value}
                      stroke={category.value === 'Lectures' ? 'pink' : `hsl(${index * 137.5}, 70%, 50%)`}
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

      {/* Confirmation Popup */}
      {showConfirmPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-semibold">Confirm Expense Entry</h3>
            <p>Date: {tempExpense.date}</p>
            <p>Item: {tempExpense.item}</p>
            <p>Amount: RM {parseFloat(tempExpense.expenseAmount).toFixed(2)}</p>
            <p>Category: {tempExpense.category}</p>
            <p>User: {tempExpense.user}</p>
            <p>Remarks: {tempExpense.remarks}</p>
            <div className="flex justify-end mt-4">
              <button onClick={cancelAddExpense} className="border rounded p-2 mr-2">
                Cancel
              </button>
              <button onClick={confirmAddExpense} className="border rounded p-2 bg-blue-500 text-white">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-semibold">Are you sure you want to delete this entry?</h3>
            <div className="flex justify-end mt-4">
              <button onClick={() => setShowDeleteConfirm(false)} className="border rounded p-2 mr-2">
                Cancel
              </button>
              <button onClick={confirmDelete} className="border rounded p-2 bg-red-500 text-white">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

