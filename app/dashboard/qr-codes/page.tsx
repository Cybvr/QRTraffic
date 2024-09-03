import Link from 'next/link'

export default function QRCodes() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-6">QR Codes</h1>
      <Link href="/qr-codes/new" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Create New QR Code
      </Link>
      {/* Add a list or grid of existing QR codes here */}
    </div>
  )
}