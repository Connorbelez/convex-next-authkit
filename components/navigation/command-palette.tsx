"use client"

import * as React from "react"
import { Search, Home, FileText, BookOpen, HelpCircle, Mail } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const commands = [
  { icon: Home, label: "Home", shortcut: "" },
  { icon: FileText, label: "Listings", shortcut: "" },
  { icon: BookOpen, label: "Blog", shortcut: "" },
  { icon: HelpCircle, label: "FAQ", shortcut: "" },
  { icon: Mail, label: "Contact Us", shortcut: "" },
]

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [search, setSearch] = React.useState("")

  const filteredCommands = commands.filter((cmd) => cmd.label.toLowerCase().includes(search.toLowerCase()))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-w-2xl">
        <div className="flex items-center border-b border-border px-4">
          <Search className="size-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-12"
          />
        </div>
        <div className="max-h-[400px] overflow-y-auto p-2">
          {filteredCommands.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">No results found.</div>
          ) : (
            <div className="space-y-1">
              {filteredCommands.map((cmd) => (
                <button
                  key={cmd.label}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-md hover:bg-accent text-sm transition-colors"
                  onClick={() => onOpenChange(false)}
                >
                  <cmd.icon className="size-4 text-muted-foreground" />
                  <span>{cmd.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
