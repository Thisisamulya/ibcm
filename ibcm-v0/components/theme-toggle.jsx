"use client"

import * as React from "react"

import { Moon, Sun, MonitorSmartphone } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"


export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light")}
        >
            {theme === "light" ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
            ) : theme === "dark" ? (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
            ) : (
                <MonitorSmartphone className="h-[1.2rem] w-[1.2rem]" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}