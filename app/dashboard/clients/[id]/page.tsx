"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { CheckCircle2, Send, UserX, Archive } from "lucide-react"

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const [kycVerified, setKycVerified] = useState(false)
  const [ltvValue, setLtvValue] = useState([70])
  const [loanAmount, setLoanAmount] = useState([500000])
  const [selectedLoanTypes, setSelectedLoanTypes] = useState<string[]>([])

  const handleAttest = () => {
    setKycVerified(true)
    toast.success("KYC Verified", {
      description: "Client has been successfully verified.",
    })
  }

  const handleSendOTP = () => {
    if (!kycVerified) {
      toast.error("Verification Required", {
        description: "Please verify KYC before sending sign-in code.",
      })
      return
    }
    toast.success("Sign-In Code Sent", {
      description: "One-time password has been sent to the client.",
    })
  }

  const handleSaveFilters = () => {
    toast.success("Filters Saved", {
      description: "Client filter preferences have been updated.",
    })
  }

  const loanTypes = ["Residential", "Commercial", "Investment", "Refinance"]

  const toggleLoanType = (type: string) => {
    setSelectedLoanTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold">Client Details</h1>
      </header>

      <div className="flex flex-1 flex-col gap-6 p-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="filters">Filters</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
                <CardDescription>View and edit client details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Smith" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.smith@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input id="tags" defaultValue="Premium, Verified" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>KYC Verification</CardTitle>
                <CardDescription>Verify client identity and compliance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-1">
                    <p className="font-medium">KYC Status</p>
                    <p className="text-sm text-muted-foreground">Client identity verification</p>
                  </div>
                  {kycVerified ? (
                    <Badge className="gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Verified
                    </Badge>
                  ) : (
                    <Button onClick={handleAttest}>Attest</Button>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kyc-id">KYC ID</Label>
                  <Input id="kyc-id" defaultValue="KYC-2024-001234" disabled />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Filters Tab */}
          <TabsContent value="filters" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Investment Filters</CardTitle>
                <CardDescription>Configure client investment preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Loan-to-Value Ratio (LTV)</Label>
                    <div className="flex items-center gap-4">
                      <Slider value={ltvValue} onValueChange={setLtvValue} max={100} step={5} className="flex-1" />
                      <span className="w-12 text-sm font-medium">{ltvValue}%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Loan Amount</Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={loanAmount}
                        onValueChange={setLoanAmount}
                        max={2000000}
                        step={50000}
                        className="flex-1"
                      />
                      <span className="w-24 text-sm font-medium">${loanAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Loan Types</Label>
                    <div className="space-y-2">
                      {loanTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={type}
                            checked={selectedLoanTypes.includes(type)}
                            onCheckedChange={() => toggleLoanType(type)}
                          />
                          <label
                            htmlFor={type}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedLoanTypes.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedLoanTypes.map((type) => (
                        <Badge key={type} variant="secondary">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveFilters}>Save Filters</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle>Client Actions</CardTitle>
            <CardDescription>Manage client account and access</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button onClick={handleSendOTP} disabled={!kycVerified}>
              <Send className="mr-2 h-4 w-4" />
              Send Sign-In Code
            </Button>
            <Button variant="outline">
              <UserX className="mr-2 h-4 w-4" />
              Suspend Account
            </Button>
            <Button variant="outline">
              <Archive className="mr-2 h-4 w-4" />
              Archive Client
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
