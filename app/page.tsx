import Link from 'next/link'
import { ArrowUpIcon } from '@heroicons/react/24/solid'

export default function Dashboard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-6">Good morning, Jide! 👋</h1>
      <p className="text-gray-600 mb-8">Here is a summary of your QR code campaigns.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">QR Codes</h2>
          <p className="text-sm text-gray-600 mb-4">Linkpages Create your own link-in-bio page</p>
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            </div>
            <div>
              <p className="text-2xl font-bold">1</p>
              <p className="text-sm text-gray-600">Total QR Codes</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Scans</h2>
          <p className="text-2xl font-bold">5,476</p>
          <p className="text-sm text-green-500 flex items-center">
            <ArrowUpIcon className="h-4 w-4 mr-1" />
            15% than the previous month
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Users</h2>
          <p className="text-2xl font-bold">758</p>
          <p className="text-sm text-green-500 flex items-center">
            <ArrowUpIcon className="h-4 w-4 mr-1" />
            20% than the previous month
          </p>
        </div>
      </div>
    </div>
  )
  }