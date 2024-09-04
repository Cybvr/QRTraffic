import React, { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { getAnalytics, ScanData } from '@/services/qrCodeService'

export default function ScanActivityChart({ qrCodeId }: { qrCodeId: string }) {
  const [data, setData] = useState<ScanData[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const startDate = new Date("2024-07-18")
      const endDate = new Date("2024-08-18")
      const analytics = await getAnalytics(startDate, endDate, qrCodeId)
      setData(analytics.scansData)
    }
    fetchData()
  }, [qrCodeId])

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-4">Scan Activity</h3>
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="scans" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-sm text-gray-500">Not enough data to show statistics</p>
        )}
      </CardContent>
    </Card>
  )
}