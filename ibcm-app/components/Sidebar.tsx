'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Briefcase, FileText, Settings, History, User } from 'lucide-react'

const navItems = [
  { href: '/', icon: Home, label: 'Dashboard' },
  { href: '/projects', icon: Briefcase, label: 'Projects' },
  { href: '/history', icon: History, label: 'History' },
  { href: '/reports', icon: FileText, label: 'Reports' },
  { href: '/settings', icon: Settings, label: 'Settings' },
  { href: '/profile', icon: User, label: 'Profile' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
              pathname === item.href ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}

