// File: components/qr-tools/QRCodeContentForm.tsx

import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'

interface Props {
  type: string
  onSubmit: (data: any) => void
}

const QRCodeContentForm: FC<Props> = ({ type, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const renderForm = () => {
    switch (type) {
      case 'Website URL':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">QR Code Name</label>
              <input
                type="text"
                id="name"
                {...register('name', { required: 'Name is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700">Website URL</label>
              <input
                type="url"
                id="url"
                {...register('url', { required: 'URL is required', pattern: { value: /^https?:\/\/.+\..+/, message: 'Enter a valid URL' } })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              {errors.url && <p className="mt-1 text-sm text-red-600">{errors.url.message}</p>}
            </div>
          </div>
        )
      // Add more cases for other QR code types
      default:
        return <p>Unsupported QR code type</p>
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add content for {type}</h2>
      {renderForm()}
      <button
        type="submit"
        className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Continue
      </button>
    </form>
  )
}

export default QRCodeContentForm