"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Bell, ChevronDown, Home, FileText, BookOpen, HelpCircle, Mail, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CommandPalette } from "./command-palette"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { UserAvatarMenu } from "@/components/auth/UserAvatarMenu"
import { cn } from "@/lib/utils"

interface Tab {
  id: string
  label: string
  icon: React.ElementType
}

const tabs: Tab[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "listings", label: "Listings", icon: FileText },
  { id: "blog", label: "Blog", icon: BookOpen },
  { id: "about", label: "About", icon: FileText },
  { id: "faq", label: "FAQ", icon: HelpCircle },
  { id: "contact", label: "Contact Us", icon: Mail },
]

interface TwoLevelNavProps {
  breadcrumbs?: { label: string; href?: string }[]
}

export function TwoLevelNav({ breadcrumbs = [] }: TwoLevelNavProps) {
  const [activeTab, setActiveTab] = React.useState("home")
  const [commandOpen, setCommandOpen] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    setMobileMenuOpen(false)
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between h-16 px-4 md:px-6">
            {/* Left Side - Logo and Project Selector */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Logo */}
              <div className="flex items-center gap-2 md:gap-3">
                <div className="size-6 bg-primary rounded-sm flex items-center justify-center">
                  <div className="size-3 bg-background rounded-sm" />
                </div>
                <span className="font-semibold text-foreground">FairLend</span>
              </div>

              {/* Project Selector - Hidden on mobile */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer">
                <div className="size-2 rounded-full bg-primary" />
                <span className="text-sm text-foreground">Main Project</span>
                <Badge variant="secondary" className="text-xs bg-primary/20 text-primary border-0">
                  Pro
                </Badge>
                <ChevronDown className="size-3 text-muted-foreground" />
              </div>
            </div>

            {/* Center - Tubelight Tabs (Desktop only) */}
            <div className="hidden lg:flex items-center gap-3 bg-background/5 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
              {tabs.map((tab) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                      "text-foreground/80 hover:text-primary",
                      isActive && "bg-muted text-primary",
                    )}
                  >
                    <span>{tab.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="lamp"
                        className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                          <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                          <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                          <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                        </div>
                      </motion.div>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Right Side - User Controls */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Notifications - Visible on all screen sizes */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="size-4" />
                <span className="absolute top-1.5 right-1.5 size-2 bg-primary rounded-full" />
              </Button>

              {/* User Avatar - Visible on all screen sizes */}
              <UserAvatarMenu />

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </Button>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "bg-background/95 backdrop-blur-xl border-b border-border",
            mobileMenuOpen && "lg:block hidden",
          )}
        >
          <div className="flex items-center justify-between h-12 px-4 md:px-6">
            {/* Breadcrumbs */}
            <BreadcrumbNav items={breadcrumbs} />

            {/* Search and Feedback */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Search */}
              <button
                onClick={() => setCommandOpen(true)}
                className="flex items-center gap-2 px-2 md:px-3 py-1.5 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors text-sm text-muted-foreground"
              >
                <Search className="size-4" />
                <span className="text-xs hidden sm:inline">Search...</span>
              </button>

              {/* Feedback - Hidden on small mobile */}
              <Button variant="ghost" size="sm" className="text-sm h-8 hidden sm:flex">
                Feedback
              </Button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-background/80 backdrop-blur-md z-40 lg:hidden"
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Menu Content */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="fixed top-16 left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border shadow-2xl z-50 lg:hidden"
              >
                <div className="px-4 py-6 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
                  {/* Navigation Items */}
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    const isActive = activeTab === tab.id

                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left",
                          isActive
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-foreground/80 hover:bg-secondary hover:text-foreground",
                        )}
                      >
                        <Icon className="size-5" />
                        <span className="text-base">{tab.label}</span>
                        {isActive && (
                          <motion.div
                            layoutId="mobile-active"
                            className="ml-auto size-2 rounded-full bg-primary"
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}
                      </button>
                    )
                  })}

                  {/* Divider */}
                  <div className="h-px bg-border my-4" />

                  {/* Mobile-only actions */}
                  <button
                    onClick={() => {
                      setCommandOpen(true)
                      setMobileMenuOpen(false)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground/80 hover:bg-secondary hover:text-foreground transition-colors text-left"
                  >
                    <Search className="size-5" />
                    <span className="text-base">Search</span>
                  </button>

                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground/80 hover:bg-secondary hover:text-foreground transition-colors text-left sm:hidden">
                    <Bell className="size-5" />
                    <span className="text-base">Notifications</span>
                    <span className="ml-auto size-2 rounded-full bg-primary" />
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Command Palette */}
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  )
}
