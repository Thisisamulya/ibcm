'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function ProgressDashboard() {
  // This would typically come from your backend
  const progressData = [
    { stage: 'Foundation', progress: 100 },
    { stage: 'Super-structure', progress: 60 },
    { stage: 'Interiors', progress: 20 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Construction Progress</CardTitle>
      </CardHeader>
      <CardContent>
        {progressData.map((item, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between mb-1">
              <span>{item.stage}</span>
              <span>{item.progress}%</span>
            </div>
            <Progress value={item.progress} className="w-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

