"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Edit, Save, Plus, Trash2, Users, Calendar, Clock, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProgramDetailsPage({ params }: { params: { id: string; programId: string } }) {
  const academyId = params.id
  const programId = params.programId
  const [isEditing, setIsEditing] = useState(false)

  // Mock program data - in a real app, you would fetch this based on the ID
  const [program, setProgram] = useState({
    id: programId,
    name: "Junior Cricket Program",
    description:
      "A comprehensive cricket training program designed for young players aged 8-12 years. This program focuses on developing fundamental cricket skills, game awareness, and physical fitness in a fun and engaging environment.",
    ageGroup: "8-12 years",
    duration: "3 months",
    fee: "₹15,000",
    schedule: "Mon, Wed, Fri (5:00 PM - 6:30 PM)",
    startDate: "1 Jun 2023",
    endDate: "31 Aug 2023",
    maxCapacity: 30,
    currentEnrollment: 24,
    coach: "Ajay Patel",
    coachImage: "/cricket-coach-demonstration.png",
    features: [
      "Basic batting techniques",
      "Bowling fundamentals",
      "Fielding skills",
      "Game rules and strategy",
      "Physical fitness training",
      "Practice matches",
    ],
    curriculum: [
      {
        week: "Week 1-2",
        title: "Cricket Fundamentals",
        description: "Introduction to cricket equipment, basic stance, and grip techniques.",
      },
      {
        week: "Week 3-4",
        title: "Batting Basics",
        description: "Front foot defense, back foot defense, and straight drive.",
      },
      {
        week: "Week 5-6",
        title: "Bowling Fundamentals",
        description: "Basic bowling action, run-up, and delivery techniques.",
      },
      {
        week: "Week 7-8",
        title: "Fielding Skills",
        description: "Catching, throwing, and ground fielding techniques.",
      },
      {
        week: "Week 9-10",
        title: "Game Awareness",
        description: "Understanding game situations, decision making, and cricket rules.",
      },
      {
        week: "Week 11-12",
        title: "Practice Matches",
        description: "Applying learned skills in match situations.",
      },
    ],
    students: [
      { id: "1", name: "Rahul Sharma", age: 10, joinDate: "15 Apr 2023", attendance: 92 },
      { id: "2", name: "Priya Patel", age: 11, joinDate: "20 Apr 2023", attendance: 88 },
      { id: "3", name: "Arjun Singh", age: 9, joinDate: "10 Apr 2023", attendance: 95 },
      { id: "4", name: "Ananya Gupta", age: 12, joinDate: "5 Apr 2023", attendance: 90 },
      { id: "5", name: "Mohammed Khan", age: 10, joinDate: "25 Apr 2023", attendance: 85 },
    ],
    image: "/placeholder.svg?key=bpzsh",
  })

  const [newFeature, setNewFeature] = useState("")

  const handleSaveChanges = () => {
    // In a real app, you would save the changes to the database
    setIsEditing(false)
    // Show success message
    alert("Program details updated successfully!")
  }

  const handleAddFeature = () => {
    if (newFeature) {
      setProgram({
        ...program,
        features: [...program.features, newFeature],
      })
      setNewFeature("")
    }
  }

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
          {isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSaveChanges}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Program
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  {isEditing ? (
                    <Input
                      value={program.name}
                      onChange={(e) => setProgram({ ...program, name: e.target.value })}
                      className="text-2xl font-bold mb-2"
                    />
                  ) : (
                    <CardTitle className="text-2xl">{program.name}</CardTitle>
                  )}
                  <CardDescription>Training program details</CardDescription>
                </div>
                <Badge className="bg-emerald-100 text-emerald-800">
                  {program.currentEnrollment}/{program.maxCapacity} Enrolled
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative rounded-md overflow-hidden h-[250px]">
                <Image src={program.image || "/placeholder.svg"} alt={program.name} fill className="object-cover" />
                {isEditing && (
                  <div className="absolute bottom-4 right-4">
                    <Button variant="secondary" size="sm">
                      Change Image
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Description</Label>
                  {isEditing ? (
                    <Textarea
                      value={program.description}
                      onChange={(e) => setProgram({ ...program, description: e.target.value })}
                      className="min-h-[100px]"
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{program.description}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Age Group</Label>
                    {isEditing ? (
                      <Input
                        value={program.ageGroup}
                        onChange={(e) => setProgram({ ...program, ageGroup: e.target.value })}
                      />
                    ) : (
                      <p className="text-sm font-medium">{program.ageGroup}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Duration</Label>
                    {isEditing ? (
                      <Input
                        value={program.duration}
                        onChange={(e) => setProgram({ ...program, duration: e.target.value })}
                      />
                    ) : (
                      <p className="text-sm font-medium">{program.duration}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Fee</Label>
                    {isEditing ? (
                      <Input value={program.fee} onChange={(e) => setProgram({ ...program, fee: e.target.value })} />
                    ) : (
                      <p className="text-sm font-medium">{program.fee}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Coach</Label>
                    {isEditing ? (
                      <Input
                        value={program.coach}
                        onChange={(e) => setProgram({ ...program, coach: e.target.value })}
                      />
                    ) : (
                      <p className="text-sm font-medium">{program.coach}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Schedule</Label>
                    {isEditing ? (
                      <Input
                        value={program.schedule}
                        onChange={(e) => setProgram({ ...program, schedule: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">{program.schedule}</p>
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Program Dates</Label>
                    {isEditing ? (
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          value={program.startDate}
                          onChange={(e) => setProgram({ ...program, startDate: e.target.value })}
                          placeholder="Start Date"
                        />
                        <Input
                          value={program.endDate}
                          onChange={(e) => setProgram({ ...program, endDate: e.target.value })}
                          placeholder="End Date"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">
                          {program.startDate} to {program.endDate}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="curriculum" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
            </TabsList>

            <TabsContent value="curriculum" className="space-y-4">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Program Curriculum</CardTitle>
                  <CardDescription>Week-by-week training plan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {program.curriculum.map((item, index) => (
                      <div key={index} className="relative pl-8 pb-6">
                        {index !== program.curriculum.length - 1 && (
                          <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200"></div>
                        )}
                        <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-700">{index + 1}</span>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">{item.week}</div>
                          <h3 className="text-base font-medium mt-1">{item.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="space-y-4">
              <Card className="bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Program Features</CardTitle>
                      <CardDescription>What students will learn</CardDescription>
                    </div>
                    {isEditing && (
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Add new feature"
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          className="w-64"
                        />
                        <Button size="sm" onClick={handleAddFeature}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {program.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 rounded-md bg-gray-50">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        <span className="text-sm">{feature}</span>
                        {isEditing && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 ml-auto"
                            onClick={() => {
                              const updatedFeatures = [...program.features]
                              updatedFeatures.splice(index, 1)
                              setProgram({ ...program, features: updatedFeatures })
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students" className="space-y-4">
              <Card className="bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Enrolled Students</CardTitle>
                      <CardDescription>Students currently in this program</CardDescription>
                    </div>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Student
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 gap-2 p-4 bg-muted/50 text-sm font-medium">
                      <div className="col-span-5">Student</div>
                      <div className="col-span-2">Age</div>
                      <div className="col-span-3">Join Date</div>
                      <div className="col-span-2">Attendance</div>
                    </div>
                    <div className="divide-y">
                      {program.students.map((student) => (
                        <div
                          key={student.id}
                          className="grid grid-cols-12 gap-2 p-4 items-center hover:bg-muted/30 transition-colors"
                        >
                          <div className="col-span-5">
                            <div className="flex items-center gap-3">
                              <Image
                                src={`/placeholder.svg?height=40&width=40&query=student ${student.id}`}
                                alt={student.name}
                                width={40}
                                height={40}
                                className="rounded-full object-cover"
                              />
                              <div className="font-medium">{student.name}</div>
                            </div>
                          </div>
                          <div className="col-span-2">
                            <div className="font-medium">{student.age} years</div>
                          </div>
                          <div className="col-span-3">
                            <div className="font-medium">{student.joinDate}</div>
                          </div>
                          <div className="col-span-2">
                            <div className="flex items-center gap-2">
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                  className={`h-2.5 rounded-full ${
                                    student.attendance >= 90
                                      ? "bg-green-600"
                                      : student.attendance >= 75
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                  }`}
                                  style={{ width: `${student.attendance}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{student.attendance}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Program Stats</CardTitle>
              <CardDescription>Key metrics and information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Enrollment</p>
                      <p className="text-lg font-bold">
                        {program.currentEnrollment}/{program.maxCapacity}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="text-sm font-medium">Fee</p>
                      <p className="text-lg font-bold">{program.fee}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Capacity Filled</span>
                  <span className="text-sm font-medium">
                    {Math.round((program.currentEnrollment / program.maxCapacity) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${(program.currentEnrollment / program.maxCapacity) * 100}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Program Coach</CardTitle>
              <CardDescription>Lead instructor for this program</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={program.coachImage || "/placeholder.svg"}
                    alt={program.coach}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{program.coach}</h3>
                  <p className="text-sm text-muted-foreground">Head Coach</p>
                  <Button variant="link" className="p-0 h-auto text-sm" asChild>
                    <Link href={`/supplier/academy/${academyId}/coaches/1`}>View Profile</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage program operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Manage Students
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Sessions
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <DollarSign className="h-4 w-4 mr-2" />
                Manage Fees
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
