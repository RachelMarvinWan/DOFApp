'use client'

import { useState } from 'react'
import { DashboardLayout } from 'components/layout/dashboard-layout'
import { DataCard } from 'components/ui/data-card'

const telemetryData = [
  { farm: 'Farm 1', area: 'Area 1', logger: 'Logger 1', lastUpdate: '11/10/2024, 12:47 PM', temperature: '16°C', dissolvedOxygenPercentage: '80%', dissolvedOxygenVolume: '7.1 mg/L', pHValue: '6.5', salinity: '120 ppm' },
  { farm: 'Farm 1', area: 'Area 1', logger: 'Logger 2', lastUpdate: '11/10/2024, 12:50 PM', temperature: '17°C', dissolvedOxygenPercentage: '82%', dissolvedOxygenVolume: '7.5 mg/L', pHValue: '6.6', salinity: '125 ppm' },
  { farm: 'Farm 2', area: 'Area 2', logger: 'Logger 1', lastUpdate: '11/10/2024, 12:55 PM', temperature: '15°C', dissolvedOxygenPercentage: '78%', dissolvedOxygenVolume: '6.8 mg/L', pHValue: '6.4', salinity: '115 ppm' },
  // Add more data as needed
]

export default function AdminTelemetryPage() {
  const [farm, setFarm] = useState('Farm 1')
  //const [area, setArea] = useState('Area 1')
  const [logger, setLogger] = useState('Logger 1')

  // Function to filter data based on selected filters
  const filteredData = telemetryData.filter(data => 
    data.farm === farm /*&& data.area === area*/ && data.logger === logger
  );

  // Get the last entry based on the selected filters
  const lastEntry = filteredData[filteredData.length - 1];

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Telemetry</h1>
        <div className="flex space-x-4 justify-start">
          <select value={farm} onChange={(e) => setFarm(e.target.value)} className="border rounded p-2 w-56">
            {['Farm 1', 'Farm 2'].map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {/*
          <select value={area} onChange={(e) => setArea(e.target.value)} className="border rounded p-2 w-56">
            {['Area 1', 'Area 2'].map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          */}
          <select value={logger} onChange={(e) => setLogger(e.target.value)} className="border rounded p-2 w-56">
            {['Logger 1', 'Logger 2'].map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {lastEntry ? (
              <>
                <DataCard title="Last Update" value={lastEntry.lastUpdate} link="#" />
                <DataCard title="Temperature" value={lastEntry.temperature} link="#" />
                <DataCard title="Dissolved Oxygen Percentage" value={lastEntry.dissolvedOxygenPercentage} link="#" />
                <DataCard title="Dissolved Oxygen Volume" value={lastEntry.dissolvedOxygenVolume} link="#" />
                <DataCard title="pH Value" value={lastEntry.pHValue} link="#" />
                <DataCard title="Salinity" value={lastEntry.salinity} link="#" />
              </>
            ) : (
              <p>No data available for the selected filters.</p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}