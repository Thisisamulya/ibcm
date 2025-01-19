import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ImageUpload from '@/components/ImageUpload'
import ErrorHandling from '@/components/ErrorHandling'

export default function ProjectDashboard({ params }: { params: { id: string } }) {
  // In a real application, you would fetch this data based on the project ID
  const project = {
    id: params.id,
    name: `Project ${params.id}`,
    progress: 75,
    stages: [
      { name: 'Foundation', progress: 100 },
      { name: 'Structure', progress: 80 },
      { name: 'Interior', progress: 45 },
      { name: 'Exterior', progress: 60 },
    ]
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{project.name} Dashboard</h1>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="upload">Upload Images</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Overall Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-2">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="w-full" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Stage Progress</CardTitle>
              </CardHeader>
              <CardContent>
                {project.stages.map((stage, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span>{stage.name}</span>
                      <span>{stage.progress}%</span>
                    </div>
                    <Progress value={stage.progress} className="w-full" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="upload">
          <ImageUpload />
        </TabsContent>
        <TabsContent value="issues">
          <ErrorHandling />
        </TabsContent>
      </Tabs>
    </div>
  )
}

