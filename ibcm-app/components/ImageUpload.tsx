'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ImageUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [activity, setActivity] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the file and activity to your backend
    console.log('Uploading file:', file)
    console.log('Activity:', activity)
    // Reset form
    setFile(null)
    setActivity('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Construction Image</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input type="file" onChange={handleFileChange} accept="image/*" />
          </div>
          <div>
            <Select value={activity} onValueChange={setActivity}>
              <SelectTrigger>
                <SelectValue placeholder="Select activity type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="foundation">Foundation</SelectItem>
                <SelectItem value="super-structure">Super-structure</SelectItem>
                <SelectItem value="interiors">Interiors</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" disabled={!file || !activity}>Upload Image</Button>
        </form>
      </CardContent>
    </Card>
  )
}

