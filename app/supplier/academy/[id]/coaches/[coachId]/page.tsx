"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ChevronLeft,
  Edit,
  Save,
  Plus,
  Trash2,
  Phone,
  Mail,
  Calendar,
  Award,
  FileText,
  Star,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CoachProfilePage({ params }: { params: { id: string; coachId: string } }) {
  const academyId = params.id
  const coachId = params.coachId
  const [isEditing, setIsEditing] = useState(false)

  // Mock coach data - in a real app, you would fetch this based on the ID
  const [coach, setCoach] = useState({
    id: coachId,
    name: "Ajay Patel",
    role: "Head Coach",
    specialization: "Batting Technique",
    bio: "Ajay Patel is a former state-level cricket player with over 15 years of coaching experience. He specializes in batting technique and has trained several players who have gone on to play at the state and national levels. His coaching philosophy emphasizes technical excellence, mental strength, and disciplined practice.",
    experience: "15+ years",
    qualifications: [
      "Level 3 Cricket Coach Certification",
      "Former State-Level Player",
      "Sports Science Diploma",
      "First Aid Certified",
    ],
    contact: {
      phone: "+91 98765 43210",
      email: "ajay.patel@premiercricket.com",
      address: "Mumbai, Maharashtra",
    },
    joinDate: "March 2015",
    rating: 4.8,
    reviews: 45,
    image: "/cricket-coach-demonstration.png",
    achievements: [
      "Coach of the Year 2020 - Mumbai Cricket Association",
      "Produced 5 state-level players in the last 3 years",
      "Led academy team to victory in Inter-Academy Tournament 2022",
    ],
    programs: [
      { id: "1", name: "Junior Cricket Program", ageGroup: "8-12 years", students: 24 },
      { id: "2", name: "Advanced Batting Technique", ageGroup: "13-16 years", students: 18 },
      { id: "3", name: "Cricket Fitness Program", ageGroup: "All ages", students: 15 },
    ],
    schedule: [
      { day: "Monday", time: "5:00 PM - 7:00 PM", program: "Junior Cricket Program" },
      { day: "Tuesday", time: "5:00 PM - 7:00 PM", program: "Advanced Batting Technique" },
      { day: "Wednesday", time: "5:00 PM - 7:00 PM", program: "Junior Cricket Program" },
      { day: "Thursday", time: "5:00 PM - 7:00 PM", program: "Advanced Batting Technique" },
      { day: "Friday", time: "5:00 PM - 7:00 PM", program: "Cricket Fitness Program" },
      { day: "Saturday", time: "9:00 AM - 12:00 PM", program: "All Programs" },
    ],
    studentReviews: [
      {
        id: "1",
        name: "Rahul Sharma",
        rating: 5,
        comment:
          "Coach Ajay has transformed my batting technique. His attention to detail and personalized coaching has helped me improve significantly.",
      },
      {
        id: "2",
        name: "Priya Patel",
        rating: 4,
        comment: "Very knowledgeable and patient coach. Always motivates students to do their best.",
      },
      {
        id: "3",
        name: "Arjun Singh",
        rating: 5,
        comment: "The best cricket coach I've trained with. His technical insights are exceptional.",
      },
    ],
  })

  const [newQualification, setNewQualification] = useState("")
  const [newAchievement, setNewAchievement] = useState("")

  const handleSaveChanges = () => {
    // In a real app, you would save the changes to the database
    setIsEditing(false)
    // Show success message
    alert("Coach profile updated successfully!")
  }

  const handleAddQualification = () => {
    if (newQualification) {
      setCoach({
        ...coach,
        qualifications: [...coach.qualifications, newQualification],
      })
      setNewQualification("")
    }
  }

  const handleAddAchievement = () => {
    if (newAchievement) {
      setCoach({
        ...coach,
        achievements: [...coach.achievements, newAchievement],
      })
      setNewAchievement("")
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
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-6">
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden">
                    <Image src={coach.image || "/placeholder.svg"} alt={coach.name} fill className="object-cover" />
                  </div>
                  {isEditing && (
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-sm"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                {isEditing ? (
                  <Input
                    value={coach.name}
                    onChange={(e) => setCoach({ ...coach, name: e.target.value })}
                    className="text-2xl font-bold text-center mb-1"
                  />
                ) : (
                  <h2 className="text-2xl font-bold">{coach.name}</h2>
                )}
                {isEditing ? (
                  <Input
                    value={coach.role}
                    onChange={(e) => setCoach({ ...coach, role: e.target.value })}
                    className="text-lg text-muted-foreground text-center mb-2"
                  />
                ) : (
                  <p className="text-lg text-muted-foreground">{coach.role}</p>
                )}
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={star <= coach.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">({coach.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {coach.specialization}
                  </Badge>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    {coach.experience}
                  </Badge>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    {isEditing ? (
                      <Input
                        value={coach.contact.phone}
                        onChange={(e) =>
                          setCoach({
                            ...coach,
                            contact: { ...coach.contact, phone: e.target.value },
                          })
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">{coach.contact.phone}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    {isEditing ? (
                      <Input
                        value={coach.contact.email}
                        onChange={(e) =>
                          setCoach({
                            ...coach,
                            contact: { ...coach.contact, email: e.target.value },
                          })
                        }
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">{coach.contact.email}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Joined</p>
                    {isEditing ? (
                      <Input
                        value={coach.joinDate}
                        onChange={(e) => setCoach({ ...coach, joinDate: e.target.value })}
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">{coach.joinDate}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Qualifications</CardTitle>
              <CardDescription>Certifications and credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing && (
                <div className="flex items-center gap-2 mb-4">
                  <Input
                    placeholder="Add qualification"
                    value={newQualification}
                    onChange={(e) => setNewQualification(e.target.value)}
                  />
                  <Button size="sm" onClick={handleAddQualification}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="space-y-2">
                {coach.qualifications.map((qualification, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 rounded-md bg-gray-50">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                      <FileText className="h-3 w-3" />
                    </div>
                    <span className="text-sm">{qualification}</span>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 ml-auto"
                        onClick={() => {
                          const updatedQualifications = [...coach.qualifications]
                          updatedQualifications.splice(index, 1)
                          setCoach({ ...coach, qualifications: updatedQualifications })
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

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>Notable accomplishments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing && (
                <div className="flex items-center gap-2 mb-4">
                  <Input
                    placeholder="Add achievement"
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                  />
                  <Button size="sm" onClick={handleAddAchievement}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="space-y-2">
                {coach.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 rounded-md bg-yellow-50">
                    <Award className="h-5 w-5 text-yellow-600" />
                    <span className="text-sm">{achievement}</span>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 ml-auto"
                        onClick={() => {
                          const updatedAchievements = [...coach.achievements]
                          updatedAchievements.splice(index, 1)
                          setCoach({ ...coach, achievements: updatedAchievements })
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
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Coach Bio</CardTitle>
              <CardDescription>Professional background and expertise</CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  value={coach.bio}
                  onChange={(e) => setCoach({ ...coach, bio: e.target.value })}
                  className="min-h-[150px]"
                />
              ) : (
                <p className="text-sm text-gray-600">{coach.bio}</p>
              )}
            </CardContent>
          </Card>

          <Tabs defaultValue="programs" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="programs">Programs</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="programs" className="space-y-4">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Training Programs</CardTitle>
                  <CardDescription>Programs taught by this coach</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {coach.programs.map((program) => (
                      <Card key={program.id} className="bg-white hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{program.name}</CardTitle>
                          <CardDescription>Age Group: {program.ageGroup}</CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                              <Users className="h-3 w-3" />
                            </div>
                            <span className="text-sm">{program.students} Students</span>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-2">
                          <Button variant="outline" size="sm" className="w-full" asChild>
                            <Link href={`/supplier/academy/${academyId}/programs/${program.id}`}>View Program</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Weekly Schedule</CardTitle>
                  <CardDescription>Coach's training schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 gap-2 p-4 bg-muted/50 text-sm font-medium">
                      <div className="col-span-3">Day</div>
                      <div className="col-span-4">Time</div>
                      <div className="col-span-5">Program</div>
                    </div>
                    <div className="divide-y">
                      {coach.schedule.map((item, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-12 gap-2 p-4 items-center hover:bg-muted/30 transition-colors"
                        >
                          <div className="col-span-3">
                            <div className="font-medium">{item.day}</div>
                          </div>
                          <div className="col-span-4">
                            <div className="font-medium">{item.time}</div>
                          </div>
                          <div className="col-span-5">
                            <div className="font-medium">{item.program}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Student Reviews</CardTitle>
                  <CardDescription>Feedback from students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {coach.studentReviews.map((review) => (
                      <div key={review.id} className="p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium">{review.name}</p>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={16}
                                className={star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
