// File: app/qr-codes/QRCodeContentForm.tsx
import { FC, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/components/ui/card"

interface Props {
  type: string
  initialContent?: string
  initialName?: string
  onSubmit: (data: any) => void
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  url: z.string().url({
    message: "Please enter a valid URL.",
  }),
})

const QRCodeContentForm: FC<Props> = ({ type, initialContent, initialName, onSubmit }) => {
  const [showCustomizer, setShowCustomizer] = useState(false)
  const [formData, setFormData] = useState<any>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialName || "",
      url: initialContent || ""
    },
  })

  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    setFormData(data)
    setShowCustomizer(true)
    onSubmit(data)
  }

  useEffect(() => {
    form.reset({
      name: initialName || "",
      url: initialContent || ""
    });
  }, [initialContent, initialName, form]);

  return (
    <div className="w-full max-w-1xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add content for {type}</CardTitle>
          <CardDescription>Enter the details for your QR code content.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>QR Code Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My QR Code" {...field} />
                    </FormControl>
                    <FormDescription>
                      Give your QR code a memorable name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the full URL including http:// or https://
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Continue to Customization
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default QRCodeContentForm