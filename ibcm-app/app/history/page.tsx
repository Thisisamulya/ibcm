import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const activities = [
  { id: 1, user: 'John Doe', action: 'Uploaded image', project: 'Project A', date: '2023-06-01' },
  { id: 2, user: 'Jane Smith', action: 'Updated progress', project: 'Project B', date: '2023-06-02' },
  { id: 3, user: 'Mike Johnson', action: 'Reported issue', project: 'Project C', date: '2023-06-03' },
  { id: 4, user: 'Emily Brown', action: 'Resolved issue', project: 'Project A', date: '2023-06-04' },
  { id: 5, user: 'David Wilson', action: 'Generated report', project: 'Project D', date: '2023-06-05' },
]

export default function History() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Activity History</h1>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.user}</TableCell>
                  <TableCell>{activity.action}</TableCell>
                  <TableCell>{activity.project}</TableCell>
                  <TableCell>{activity.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

