'use client'

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

export default function ErrorHandling() {
  // This would typically come from your backend or state management
  const errors = [
    { id: 1, message: 'Incorrect image type uploaded for Foundation stage' },
    { id: 2, message: 'Mismatch detected between image content and selected category' },
  ]

  if (errors.length === 0) return null

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Alerts</h2>
      {errors.map((error) => (
        <Alert variant="destructive" key={error.id} className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      ))}
    </div>
  )
}

