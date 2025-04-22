"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ChevronLeft,
  Search,
  Download,
  Plus,
  Calendar,
  DollarSign,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FeeCollectionPage({ params }: { params: { id: string } }) {
  const academyId = params.id
  const [activeTab, setActiveTab] = useState("all")
  const [selectedProgram, setSelectedProgram] = useState("all")
  const [selectedMonth, setSelectedMonth] = useState("all")

  // Mock fee data - in a real app, you would fetch this based on the academy ID
  const feeData = {
    totalCollection: "₹18,50,000",
    pendingAmount: "₹2,40,000",
    collectionRate: "88.5%",
    overdueAmount: "₹75,000",
    upcomingDue: "₹1,65,000",
    students: 120,
    pendingStudents: 18,
    overdueStudents: 5,
    payments: [
      {
        id: "1",
        student: { id: "1", name: "Rahul Sharma", image: "/placeholder.svg?height=40&width=40&query=student 1" },
        program: "Junior Cricket Program",
        amount: "₹5,000",
        dueDate: "15 May 2023",
        status: "paid",
        paymentDate: "10 May 2023",
        paymentMethod: "Online Transfer",
      },
      {
        id: "2",
        student: { id: "2", name: "Priya Patel", image: "/placeholder.svg?height=40&width=40&query=student 2" },
        program: "Advanced Batting Technique",
        amount: "₹6,000",
        dueDate: "15 May 2023",
        status: "paid",
        paymentDate: "12 May 2023",
        paymentMethod: "Credit Card",
      },
      {
        id: "3",
        student: { id: "3", name: "Arjun Singh", image: "/placeholder.svg?height=40&width=40&query=student 3" },
        program: "Junior Cricket Program",
        amount: "₹5,000",
        dueDate: "15 May 2023",
        status: "due",
        paymentDate: null,
        paymentMethod: null,
      },
      {
        id: "4",
        student: { id: "4", name: "Ananya Gupta", image: "/placeholder.svg?height=40&width=40&query=student 4" },
        program: "Cricket Fitness Program",
        amount: "₹4,000",
        dueDate: "10 May 2023",
        status: "overdue",
        paymentDate: null,
        paymentMethod: null,
      },
      {
        id: "5",
        student: { id: "5", name: "Mohammed Khan", image: "/placeholder.svg?height=40&width=40&query=student 5" },
        program: "Advanced Batting Technique",
        amount: "₹6,000",
        dueDate: "15 May 2023",
        status: "paid",
        paymentDate: "8 May 2023",
        paymentMethod: "Cash",
      },
    ],
    programs: [
      { id: "1", name: "Junior Cricket Program", fee: "₹5,000", students: 45, collectionRate: "85%" },
      { id: "2", name: "Advanced Batting Technique", fee: "₹6,000", students: 35, collectionRate: "92%" },
      { id: "3", name: "Fast Bowling Masterclass", fee: "₹6,000", students: 25, collectionRate: "88%" },
      { id: "4", name: "Cricket Fitness Program", fee: "₹4,000", students: 15, collectionRate: "93%" },
    ],
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "due":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "due":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const filteredPayments = feeData.payments.filter((payment) => {
    if (activeTab !== "all" && payment.status !== activeTab) return false
    if (selectedProgram !== "all" && payment.program !== selectedProgram) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/supplier/academy/${academyId}`}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Academy
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Record Payment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feeData.totalCollection}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feeData.pendingAmount}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">{feeData.pendingStudents} students</span> with pending fees
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feeData.collectionRate}</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: feeData.collectionRate }}></div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{feeData.overdueAmount}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">{feeData.overdueStudents} students</span> with overdue fees
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Fee Collection</CardTitle>
          <CardDescription>Track and manage student fee payments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
                <TabsTrigger value="due">Due</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search students..." className="w-full pl-8 bg-white" />
              </div>
              <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Select Program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Programs</SelectItem>
                  {feeData.programs.map((program) => (
                    <SelectItem key={program.id} value={program.name}>
                      {program.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Select Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Months</SelectItem>
                  <SelectItem value="may">May 2023</SelectItem>
                  <SelectItem value="april">April 2023</SelectItem>
                  <SelectItem value="march">March 2023</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <div className="grid grid-cols-12 gap-2 p-4 bg-muted/50 text-sm font-medium">
              <div className="col-span-3">Student</div>
              <div className="col-span-3">Program</div>
              <div className="col-span-2">Amount</div>
              <div className="col-span-2">Due Date</div>
              <div className="col-span-2">Status</div>
            </div>
            <div className="divide-y">
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="grid grid-cols-12 gap-2 p-4 items-center hover:bg-muted/30 transition-colors"
                  >
                    <div className="col-span-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={payment.student.image || "/placeholder.svg"}
                          alt={payment.student.name}
                          width={40}
                          height={40}
                          className="rounded-full object-cover"
                        />
                        <div className="font-medium">{payment.student.name}</div>
                      </div>
                    </div>
                    <div className="col-span-3">
                      <div className="font-medium">{payment.program}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="font-medium">{payment.amount}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="font-medium">{payment.dueDate}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(payment.status)}
                        <Badge className={getStatusColor(payment.status)}>
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </Badge>
                      </div>
                      {payment.status === "paid" && (
                        <div className="text-xs text-muted-foreground mt-1">Paid on {payment.paymentDate}</div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <p className="text-muted-foreground">No payments match your filters.</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Program-wise Collection</CardTitle>
            <CardDescription>Fee collection by program</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feeData.programs.map((program) => (
                <div key={program.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{program.name}</span>
                      <div className="text-xs text-muted-foreground">
                        {program.students} students • {program.fee}/month
                      </div>
                    </div>
                    <span className="text-sm font-medium">{program.collectionRate}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-emerald-600 h-2 rounded-full" style={{ width: program.collectionRate }}></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Distribution by payment method</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 p-2 rounded-full mb-2">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium">Online</p>
                  <p className="text-lg font-bold text-blue-700">65%</p>
                </div>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-emerald-100 p-2 rounded-full mb-2">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                  </div>
                  <p className="text-sm font-medium">Cash</p>
                  <p className="text-lg font-bold text-emerald-700">25%</p>
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-purple-100 p-2 rounded-full mb-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                  </div>
                  <p className="text-sm font-medium">Cheque</p>
                  <p className="text-lg font-bold text-purple-700">10%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
