import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  { user: 'John Doe', action: 'uploaded an image for', project: 'Project A', stage: 'Foundation' },
  { user: 'Jane Smith', action: 'updated progress for', project: 'Project B', stage: 'Super-structure' },
  { user: 'Mike Johnson', action: 'reported an issue in', project: 'Project C', stage: 'Interiors' },
]

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity, index) => (
            <li key={index} className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${activity.user}`} />
                <AvatarFallback>{activity.user.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm">
                  <span className="font-semibold">{activity.user}</span> {activity.action}{' '}
                  <span className="font-semibold">{activity.project}</span> ({activity.stage})
                </p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

