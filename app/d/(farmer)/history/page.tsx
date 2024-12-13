'use client'

import { useState, useMemo } from 'react'
import { DashboardLayout } from 'components/layout/v-dashboard-layout'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { format, parseISO, eachDayOfInterval, startOfDay, endOfDay } from 'date-fns'

const columns = [
  { accessorKey: 'date', header: 'Date' },
  //{ accessorKey: 'area', header: 'Area' },
  { accessorKey: 'logger', header: 'Logger' },
  { accessorKey: 'temperature', header: 'Temperature' },
  { accessorKey: 'oxygenLevel', header: 'Oxygen Level' },
  { accessorKey: 'oxygenPercentage', header: 'Oxygen Percentage' },
  { accessorKey: 'phValue', header: 'pH Value' },
  { accessorKey: 'salinity', header: 'Salinity' },
]

const data = [
  {
    date: '2024-11-10T12:47:00',
    farm: 'Farm 1',
    area: 'Area 1',
    logger: 'Logger 1',
    temperature: 16,
    oxygenLevel: 7.1,
    oxygenPercentage: 80,
    phValue: 6.5,
    salinity: 120,
  },
  {
    date: '2024-11-10T13:00:00',
    farm: 'Farm 1',
    area: 'Area 1',
    logger: 'Logger 2',
    temperature: 17,
    oxygenLevel: 7.5,
    oxygenPercentage: 82,
    phValue: 6.6,
    salinity: 125,
  },
  {
    date: '2024-11-12T13:00:00',
    farm: 'Farm 1',
    area: 'Area 1',
    logger: 'Logger 2',
    temperature: 16,
    oxygenLevel: 7.5,
    oxygenPercentage: 82,
    phValue: 6.6,
    salinity: 125,
  },
  {
    date: '2024-11-13T13:00:00',
    farm: 'Farm 1',
    area: 'Area 1',
    logger: 'Logger 2',
    temperature: 18,
    oxygenLevel: 7.5,
    oxygenPercentage: 82,
    phValue: 6.6,
    salinity: 125,
  },
  {
    date: '2024-11-13T15:00:00',
    farm: 'Farm 1',
    area: 'Area 1',
    logger: 'Logger 2',
    temperature: 17,
    oxygenLevel: 7.5,
    oxygenPercentage: 82,
    phValue: 6.6,
    salinity: 125,
  },
  {
    date: '2024-11-10T13:00:00',
    farm: 'Farm 2',
    area: 'Area 2',
    logger: 'Logger 1',
    temperature: 18,
    oxygenLevel: 7.0,
    oxygenPercentage: 78,
    phValue: 6.4,
    salinity: 115,
  },{
    date: '2024-11-01T05:55:00',
    farm: 'Farm 1',
    area: 'Area 1',
    logger: 'Logger 1',
    temperature: 20.0,
    oxygenLevel: 7.4,
    oxygenPercentage: 77,
    phValue: 6.2,
    salinity: 104,
  },
  {
    date: '2024-11-01T10:38:00',
    farm: 'Farm 1',
    area: 'Area 1',
    logger: 'Logger 1',
    temperature: 16.9,
    oxygenLevel: 7.3,
    oxygenPercentage: 81,
    phValue: 6.3,
    salinity: 109,
  },
  {
    date: '2024-11-01T23:47:00',
    farm: 'Farm 1',
    area: 'Area 1',
    logger: 'Logger 1',
    temperature: 19.1,
    oxygenLevel: 7.2,
    oxygenPercentage: 80,
    phValue: 6.9,
    salinity: 114,
  },
  {
    date: '2024-11-01T00:05:00',
    farm: 'Farm 1',
    area: 'Area 1',
    logger: 'Logger 2',
    temperature: 15.8,
    oxygenLevel: 7.4,
    oxygenPercentage: 79,
    phValue: 6.7,
    salinity: 108,
  },
  {
    date: '2024-11-01T10:39:00',
    farm: 'Farm 1',
    area: 'Area 1',
    logger: 'Logger 2',
    temperature: 16.7,
    oxygenLevel: 7.9,
    oxygenPercentage: 82,
    phValue: 6.3,
    salinity: 108,
  },{
    date: "2024-11-01T01:34:00",
    farm: "Farm 1",
    area: "Area 1",
    logger: "Logger 1",
    temperature: 16.1,
    oxygenLevel: 7.4,
    oxygenPercentage: 76,
    phValue: 6.5,
    salinity: 119
  },
  {
    date: "2024-11-01T06:02:00",
    farm: "Farm 1",
    area: "Area 1",
    logger: "Logger 1",
    temperature: 18.6,
    oxygenLevel: 7.7,
    oxygenPercentage: 76,
    phValue: 6.3,
    salinity: 103
  },
  {
    date: "2024-11-01T22:37:00",
    farm: "Farm 1",
    area: "Area 1",
    logger: "Logger 2",
    temperature: 19.2,
    oxygenLevel: 7.8,
    oxygenPercentage: 84,
    phValue: 6.1,
    salinity: 105
  },
  {
    date: "2024-11-05T22:37:00",
    farm: "Farm 1",
    area: "Area 1",
    logger: "Logger 2",
    temperature: 20.2,
    oxygenLevel: 7.8,
    oxygenPercentage: 85,
    phValue: 6.1,
    salinity: 105
  },
  {
    date: "2024-11-02T03:18:00",
    farm: "Farm 2",
    area: "Area 2",
    logger: "Logger 3",
    temperature: 17.5,
    oxygenLevel: 7.6,
    oxygenPercentage: 81,
    phValue: 6.4,
    salinity: 110
  },
  {
    date: "2024-11-02T08:45:00",
    farm: "Farm 2",
    area: "Area 2",
    logger: "Logger 3",
    temperature: 16.8,
    oxygenLevel: 7.2,
    oxygenPercentage: 78,
    phValue: 6.6,
    salinity: 122
  }
  // Add more rows as needed
]

export default function ViewerHistoryPage() {
  const [farm, setFarm] = useState('')
  //const [area, setArea] = useState('')
  const [logger, setLogger] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'ascending' });
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [measurement, setMeasurement] = useState('')
  const [tableStartDate, setTableStartDate] = useState('')
  const [tableEndDate, setTableEndDate] = useState('')

  const farmOptions = [
    { label: 'All', value: '' },
    { label: 'Farm 1', value: 'Farm 1' },
    { label: 'Farm 2', value: 'Farm 2' },
  ]

  /*const areaOptions = [
    { label: 'All', value: '' },
    { label: 'Area 1', value: 'Area 1' },
    { label: 'Area 2', value: 'Area 2' },
  ]*/

  const loggerOptions = [
    { label: 'All', value: '' },
    { label: 'Logger 1', value: 'Logger 1' },
    { label: 'Logger 2', value: 'Logger 2' },
  ]

  const measurementOptions = [
    { label: 'Temperature (°C)', value: 'temperature' },
    { label: 'Oxygen Level (mg/L)', value: 'oxygenLevel' },
    { label: 'Dissolved Oxygen Percentage (%)', value: 'oxygenPercentage'},
    { label: 'pH Value', value: 'phValue' },
    { label: 'Salinity (ppm)', value: 'salinity' },
  ]

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const farmMatch = farm ? item.farm === farm : true;
      //const areaMatch = area ? item.area === area : true;
      const loggerMatch = logger ? item.logger === logger : true;
      const searchMatch = item.logger.toLowerCase().includes(searchTerm.toLowerCase());
      const dateMatch = (!tableStartDate || new Date(item.date) >= new Date(tableStartDate)) && (!tableEndDate || new Date(item.date) <= new Date(tableEndDate));
      return farmMatch /*&& areaMatch*/ && loggerMatch && searchMatch && dateMatch;
    });
  }, [data, farm, /*area,*/ logger, searchTerm, tableStartDate, tableEndDate]);


  const handleCopy = () => {
    // Implement copy functionality
  };

  const handleExportCSV = () => {
    // Implement CSV export functionality
  };

  const handleExportPDF = () => {
    // Implement PDF export functionality
  };

  const handlePrint = () => {
    window.print();
  };

  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key as keyof typeof a] < b[sortConfig.key as keyof typeof b]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key as keyof typeof a] > b[sortConfig.key as keyof typeof b]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const getArrow = (key: string) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '↑' : '↓';
    }
    return '↕';
  };

  const chartData = useMemo(() => {
    if (!measurement || !startDate || !endDate) return [];

    // Create a map to store data points for each logger
    const loggerDataPoints = new Map();
    
    // Initialize the map with empty arrays for each logger
    loggerOptions.forEach(logger => {
      if (logger.value) {
        loggerDataPoints.set(logger.value, []);
      }
    });

    // Group data by logger and sort by date
    sortedData.forEach(item => {
      const logger = item.logger;
      if (loggerDataPoints.has(logger)) {
        loggerDataPoints.get(logger).push({
          date: item.date,
          value: item[measurement as keyof typeof item] as number,
          time: format(parseISO(item.date), 'HH:mm')
        });
      }
    });

    // Process data for each logger to handle multiple values on same date
    const processedLoggerData = new Map();
    loggerDataPoints.forEach((points, logger) => {
      const dateGroups = new Map();
      
      // Group points by date
      points.forEach((point: { date: string }) => {
        const date = format(parseISO(point.date), 'yyyy-MM-dd');
        if (!dateGroups.has(date)) {
          dateGroups.set(date, []);
        }
        dateGroups.get(date).push(point);
      });

      // Calculate average for each date
      const processedPoints = Array.from(dateGroups.entries()).map(([date, datePoints]) => {
        const avgValue = datePoints.reduce((sum: number, p: { value: number }) => sum + p.value, 0) / datePoints.length;
        return {
          date,
          value: avgValue,
          times: datePoints.map((p: { time: string; value: number }) => `${p.time} (${p.value})`).join(', ')
        };
      });

      processedLoggerData.set(logger, processedPoints.sort((a, b) => a.date.localeCompare(b.date)));
    });

    // Create the final chart data array
    const start = startOfDay(new Date(startDate));
    const end = endOfDay(new Date(endDate));
    const dateRange = eachDayOfInterval({ start, end });

    return dateRange.map(date => {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const dataPoint: any = { date: formattedDate };
      processedLoggerData.forEach((points, logger) => {
        const point = points.find((p: { date: string }) => p.date === formattedDate);
        if (point) {
          dataPoint[logger] = point.value;
          dataPoint[`${logger}Times`] = point.times;
        } else {
          dataPoint[logger] = null;
          dataPoint[`${logger}Times`] = '';
        }
      });

      return dataPoint;
    });
  }, [sortedData, measurement, startDate, endDate, loggerOptions]);

  const formatXAxis = (tickItem: string) => {
    return format(parseISO(tickItem), 'HH:mm, dd/MM/yy')
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow">
          <p className="font-bold">{format(parseISO(label), 'dd/MM/yyyy')}</p>
          {payload.map((entry: any, index: number) => (
            entry.value !== null && (
              <p key={index} style={{ color: entry.color }}>
                {entry.name}: {entry.value?.toFixed(2)}
                {entry.payload[`${entry.name}Times`] && (
                  <span className="block text-xs">
                    Times: {entry.payload[`${entry.name}Times`]}
                  </span>
                )}
              </p>
            )
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardLayout userRole="viewer">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">History</h1>
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="flex flex-wrap space-x-4 mb-4">
            <select value={farm} onChange={(e) => setFarm(e.target.value)} className="border rounded p-2 w-56">
              {farmOptions.map(option => (
                <option key={option.label} value={option.value}>{option.label}</option>
              ))}
            </select>
            {/*
            <select value={area} onChange={(e) => setArea(e.target.value)} className="border rounded p-2 w-56">
              {areaOptions.map(option => (
                <option key={option.label} value={option.value}>{option.label}</option>
              ))}
            </select>
            */}
            <select value={logger} onChange={(e) => setLogger(e.target.value)} className="border rounded p-2 w-56">
              {loggerOptions.map(option => (
                <option key={option.label} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <input 
            type="text" 
            placeholder="Search by Logger" 
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
                  <th onClick={() => requestSort('date')} className={`cursor-pointer text-left p-4 ${sortConfig.key === 'date' ? 'text-blue-500' : ''} font-normal justify-between items-center`}>
                    Date <span className="text-xs text-gray-400">{getArrow('date')}</span>
                  </th>
                  <th onClick={() => requestSort('logger')} className={`cursor-pointer text-left p-4 ${sortConfig.key === 'logger' ? 'text-blue-500' : ''} font-normal justify-between items-center`}>
                    Logger <span className="text-xs text-gray-400">{getArrow('logger')}</span>
                  </th>
                  <th onClick={() => requestSort('temperature')} className={`cursor-pointer text-left p-4 ${sortConfig.key === 'temperature' ? 'text-blue-500' : ''} font-normal justify-between items-center`}>
                    Temperature <span className="text-xs text-gray-400">{getArrow('temperature')}</span>
                  </th>
                  <th onClick={() => requestSort('oxygenLevel')} className={`cursor-pointer text-left p-4 ${sortConfig.key === 'oxygenLevel' ? 'text-blue-500' : ''} font-normal justify-between items-center`}>
                    Oxygen Level <span className="text-xs text-gray-400">{getArrow('oxygenLevel')}</span>
                  </th>
                  <th onClick={() => requestSort('oxygenPercentage')} className={`cursor-pointer text-left p-4 ${sortConfig.key === 'oxygenPercentage' ? 'text-blue-500' : ''} font-normal justify-between items-center`}>
                    Oxygen Percentage <span className="text-xs text-gray-400">{getArrow('oxygenPercentage')}</span>
                  </th>
                  <th onClick={() => requestSort('phValue')} className={`cursor-pointer text-left p-4 ${sortConfig.key === 'phValue' ? 'text-blue-500' : ''} font-normal justify-between items-center`}>
                    pH Value <span className="text-xs text-gray-400">{getArrow('phValue')}</span>
                  </th>
                  <th onClick={() => requestSort('salinity')} className={`cursor-pointer text-left p-4 ${sortConfig.key === 'salinity' ? 'text-blue-500' : ''} font-normal justify-between items-center`}>
                    Salinity <span className="text-xs text-gray-400">{getArrow('salinity')}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="p-4">{format(parseISO(item.date), 'yyyy/MM/dd, HH:mm:ss')}</td>
                    <td className="p-4">{item.logger}</td>
                    <td className="p-4">{item.temperature}°C</td>
                    <td className="p-4">{item.oxygenLevel} mg/L</td>
                    <td className="p-4">{item.oxygenPercentage}%</td>
                    <td className="p-4">{item.phValue}</td>
                    <td className="p-4">{item.salinity} ppm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-md border p-6 shadow-md">
          <h2 className="mb-4 text-lg font-semibold">Data Visualisation</h2>
          <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="p-1">Range Start</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="rounded border p-2"
                />
              </div>
              <div className="flex flex-col">
                <label className="p-1">Range End</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="rounded border p-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {/*<select 
                value={area} 
                onChange={(e) => setArea(e.target.value)} 
                className="border rounded p-2"
              >
                <option value="">Select Area</option>
                {areaOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>*/}
              <select 
                value={measurement} 
                onChange={(e) => setMeasurement(e.target.value)} 
                className="border rounded p-2"
              >
                <option value="">Select Measurement</option>
                {measurementOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            {measurement && (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(tickItem) => format(parseISO(tickItem), 'dd/MM')}
                    type="category"
                    domain={[startDate, endDate]}
                    ticks={chartData.map(item => item.date)}
                  />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  {loggerOptions.filter(option => option.value).map((logger, index) => (
                    <Line 
                      key={logger.value}
                      type="monotone" 
                      dataKey={logger.value}
                      stroke={`hsl(${index * 137.5}, 70%, 50%)`}
                      dot={{ strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6 }}
                      connectNulls={true}
                      strokeWidth={2}
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

