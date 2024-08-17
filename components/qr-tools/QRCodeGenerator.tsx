import React, { useState } from 'react'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'

interface QRCodeGeneratorProps {
  onGenerate: (url: string) => void;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ onGenerate }) => {
  const [url, setUrl] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onGenerate(url)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <Input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
        required
        className="mb-4"
      />
      <Button type="submit">Generate QR Code</Button>
    </form>
  )
}

export default QRCodeGenerator