'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Project A', planned: 100, actual: 80 },
  { name: 'Project B', planned: 80, actual: 70 },
  { name: 'Project C', planned: 60, actual: 55 },
  { name: 'Project D', planned: 40, actual: 45 },
]

export default function Reports() {
  const [reportType, setReportType] = useState('progress')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Reports</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center space-x-4">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="progress">Progress Report</SelectItem>
              <SelectItem value="issues">Issues Report</SelectItem>
              <SelectItem value="comparison">Comparison Report</SelectItem>
            </SelectContent>
          </Select>
          <Button>Generate Report</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Project Progress Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="planned" fill="#8884d8" name="Planned Progress" />
              <Bar dataKey="actual" fill="#82ca9d" name="Actual Progress" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

