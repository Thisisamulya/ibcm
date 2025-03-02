"use client"

import * as React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotificationPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="icon" className="p-2 rounded-full">
          <Bell className="w-6 h-6" />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-4">
          <h4 className="text-lg font-semibold">Notifications</h4>
          <p className="text-sm text-muted">You have no new notifications.</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
