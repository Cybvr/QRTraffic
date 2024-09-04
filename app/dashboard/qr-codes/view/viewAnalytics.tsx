import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import ScanActivityChart from '@/app/dashboard/analytics/ScanActivityChart'
import ScansByOS from '@/app/dashboard/analytics/ScansByOS'
import ScansByCountry from '@/app/dashboard/analytics/ScansByCountry'
import ScansByCity from '@/app/dashboard/analytics/ScansByCity'
import { getAnalytics } from '@/services/qrCodeService'

export default function ViewAnalytics({ qrCodeId }: { qrCodeId: string }) {
  const [analyticsData, setAnalyticsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const startDate = new Date("2024-07-18")
    const endDate = new Date("2024-08-18")

    const fetchData = async () => {
      try {
        console.log('Fetching analytics for QRCode ID:', qrCodeId);
        const data = await getAnalytics(startDate, endDate, qrCodeId);
        console.log('Analytics data received:', data);
        setAnalyticsData(data);
      } catch (error) {
        console.error('Error fetching analytics', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData()
  }, [qrCodeId])

  if (loading) return <div>Loading...</div>
  if (!analyticsData) return <div>No analytics data available.</div>

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-blue-500">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold">{analyticsData.scansData?.reduce((sum, day) => sum + (day.scans || 0), 0) ?? 0}</p>
                <p className="text-sm text-gray-500">Total scans</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="bg-green-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold">{analyticsData.usersData?.reduce((sum, day) => sum + (day.users || 0), 0) ?? 0}</p>
                <p className="text-sm text-gray-500">Unique scans</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ScanActivityChart qrCodeId={qrCodeId} />
        <ScansByOS qrCodeId={qrCodeId} />
        <ScansByCountry qrCodeId={qrCodeId} />
        <ScansByCity qrCodeId={qrCodeId} />
      </div>
    </div>
  )
}