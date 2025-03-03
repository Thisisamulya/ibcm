"use client"

import * as React from "react"

import { Moon, Sun, MonitorSmartphone } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

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
            onClick={() => {
                setTheme(theme === "light" ? "dark" : theme === "dark" ? "system" : "light");
                // Use the `toast` function to display a message
                // toast("Event has been created", {
                //     description: "Sunday, December 03, 2023 at 9:00 AM",
                //     action: {
                //         label: "Undo",
                //         onClick: () => console.log("Undo"),
                //     },
                // });
            }}
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