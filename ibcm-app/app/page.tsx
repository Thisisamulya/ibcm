import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4 bg-cover bg-center" style={{ backgroundImage: "url('/images/background.jpg')" }}>
      <h1 className="text-7xl font-extrabold mb-6 text-center text-white" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>Welcome to Construction Progress Monitor</h1>
      <p className="text-2xl mb-8 text-center text-white max-w-2xl" style={{ fontFamily: "'Poppins', sans-serif" }}>
        Streamline your construction project monitoring with our AI-powered solution. 
        Track progress, detect issues, and generate reports effortlessly.
      </p>
      <div className="space-x-4">
        <Button variant="default" asChild>
          <Link href="/dashboard">Get Started</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="https://github.com/srinu2003/ibcm">Learn More</Link>
        </Button>
      </div>
    </div>
  )
}
