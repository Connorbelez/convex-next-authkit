"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useToast } from "@/hooks/use-toast"
import { Upload } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [brandColor, setBrandColor] = useState("#8CA971")
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your branding preferences have been updated.",
    })
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Settings</h1>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-6">
        <Card>
          <CardHeader>
            <CardTitle>Branding</CardTitle>
            <CardDescription>Customize your broker portal appearance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Logo Upload */}
            <div className="space-y-4">
              <Label>Logo</Label>
              <div className="flex items-center gap-4">
                <div className="flex h-24 w-24 items-center justify-center rounded-lg border-2 border-dashed">
                  {logoPreview ? (
                    <img
                      src={logoPreview || "/placeholder.svg"}
                      alt="Logo preview"
                      className="h-full w-full rounded-lg object-contain"
                    />
                  ) : (
                    <Upload className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo-upload" className="cursor-pointer">
                    <Button variant="outline" asChild>
                      <span>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Logo
                      </span>
                    </Button>
                  </Label>
                  <input id="logo-upload" type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                  <p className="text-xs text-muted-foreground">PNG, JPG or SVG (max. 2MB)</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Color Picker */}
            <div className="space-y-4">
              <Label htmlFor="brand-color">Brand Color</Label>
              <div className="flex items-center gap-4">
                <input
                  id="brand-color"
                  type="color"
                  value={brandColor}
                  onChange={(e) => setBrandColor(e.target.value)}
                  className="h-12 w-24 cursor-pointer rounded-lg border"
                />
                <div className="flex-1 space-y-2">
                  <p className="text-sm font-medium">{brandColor}</p>
                  <p className="text-xs text-muted-foreground">This color will be used for buttons and accents</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Preview */}
            <div className="space-y-4">
              <Label>Preview</Label>
              <div className="rounded-lg border p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    {logoPreview && (
                      <img
                        src={logoPreview || "/placeholder.svg"}
                        alt="Logo"
                        className="h-10 w-10 rounded object-contain"
                      />
                    )}
                    <h3 className="text-lg font-semibold">FairLend Portal</h3>
                  </div>
                  <Button style={{ backgroundColor: brandColor, color: "white" }}>Sample Button</Button>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSave}>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
