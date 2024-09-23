"use client";
import { FC, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface Props {
  type: string;
  initialContent?: string;
  initialName?: string;
  onSubmit: (data: any) => void;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  url: z.string().url({
    message: "Please enter a valid URL.",
  }),
});

const QRCodeContentForm: FC<Props> = ({ type, initialContent, initialName, onSubmit }) => {
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialName || "",
      url: initialContent || ""
    },
  });

  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    setFormData(data);
    setShowCustomizer(true);
    onSubmit(data);
  };

  useEffect(() => {
    form.reset({
      name: initialName || "",
      url: initialContent || ""
    });
  }, [initialContent, initialName, form]);

  return (
    <div className="w-full">
      <div>
        <h2 className="text-lg font-semibold mb-3">Add content for {type}</h2>
        <p className="text-sm text-gray-500 mb-6">Enter the details for your QR code content.</p>
        <hr className="mb-6" />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>
          <div className="flex justify-end">
            <Button type="submit">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default QRCodeContentForm;