import { useState } from 'react'

interface VCardToolProps {
  setQRCodeData: (data: string) => void
}

export default function VCardTool({ setQRCodeData }: VCardToolProps) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [title, setTitle] = useState('')

  const handleGenerate = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName}
FN:${firstName} ${lastName}
TEL:${phone}
EMAIL:${email}
ORG:${company}
TITLE:${title}
END:VCARD`
    setQRCodeData(vCardData)
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">1. Setup</h2>
      <p className="text-gray-600 mb-4">Create a QR code for your contact information</p>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="border border-gray-300 rounded-md shadow-sm p-2"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          className="w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company"
          className="w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Job Title"
          className="w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
        <button 
          onClick={handleGenerate}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Generate QR Code
        </button>
      </div>
    </div>
  )
}