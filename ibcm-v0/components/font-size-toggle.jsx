"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { AArrowDown, AArrowUp } from "lucide-react"


export function FontSizeToggle({ increaseFontSize, decreaseFontSize }) {
    return (
        <div>
            <Button variant="ghost" size="icon" onClick={increaseFontSize} className="btn">
                <AArrowDown className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon"  onClick={decreaseFontSize} className="btn">
                <AArrowUp className="h-5 w-5" />
            </Button>
        </div>
    )
}
