"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  ChevronLeft,
  Edit,
  Save,
  Plus,
  Trash2,
  Upload,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Calendar,
  Users,
  Award,
  FileText,
  Camera,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { getAcademyCoaches, type CoachListItem } from "@/services/coachService"
import { AddCoachModal } from "@/components/modals/AddCoachModal"

interface Props {
  params: {
    id: string
  }
}

export default function AcademyDetailsPage({ params }: Props) {
  const router = useRouter()
  const academyId = params.id
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("details")

  const [coaches, setCoaches] = useState<CoachListItem[]>([])
  const [isAddCoachModalOpen, setIsAddCoachModalOpen] = useState(false)
  const [isLoadingCoaches, setIsLoadingCoaches] = useState(false)


  // Mock academy data - in a real app, you would fetch this based on the ID
  const [academy, setAcademy] = useState({
    id: academyId,
    name: "Premier Cricket Academy",
    description:
      "A premier cricket academy focused on developing young talent through professional coaching and world-class facilities.",
    location: "123 Sports Complex, Andheri West, Mumbai, Maharashtra 400053",
    phone: "+91 98765 43210",
    email: "info@premiercricket.com",
    website: "www.premiercricket.com",
    foundedYear: "2015",
    operatingHours: "Mon-Sat: 6:00 AM - 9:00 PM, Sun: 7:00 AM - 6:00 PM",
    sports: ["Cricket", "Fitness Training"],
    facilities: [
      "4 Cricket Pitches",
      "Batting Cages",
      "Bowling Machines",
      "Video Analysis Room",
      "Fitness Center",
      "Swimming Pool",
      "Cafeteria",
    ],
    coaches: [
      { id: "1", name: "Ajay Patel", role: "Head Coach", image: "/cricket-coach-demonstration.png" },
      { id: "2", name: "Rahul Dravid", role: "Batting Coach", image: "/cricket-coach-demonstration.png" },
      { id: "3", name: "Zaheer Khan", role: "Bowling Coach", image: "/cricket-coach-demonstration.png" },
    ],
    programs: [
      { id: "1", name: "Junior Cricket Program", ageGroup: "8-12 years", duration: "3 months", fee: "₹15,000" },
      { id: "2", name: "Advanced Batting Technique", ageGroup: "13-16 years", duration: "2 months", fee: "₹12,000" },
      { id: "3", name: "Fast Bowling Masterclass", ageGroup: "14-18 years", duration: "6 weeks", fee: "₹10,000" },
      { id: "4", name: "Cricket Fitness Program", ageGroup: "All ages", duration: "Ongoing", fee: "₹8,000/month" },
    ],
    students: 120,
    activeStudents: 112,
    images: [
      "/placeholder.svg?key=3u4ua",
      "/placeholder.svg?key=z0u12",
      "/cricket-pitch-overview.png",
      "/placeholder.svg?key=xuqrg",
    ],
    logo: "/placeholder.svg?height=200&width=200&query=cricket academy logo",
    rating: 4.8,
    reviews: 45,
    featuredImage: "/placeholder.svg?height=800&width=1200&query=cricket academy main",
    achievements: [
      "Produced 5 state-level players in the last 2 years",
      "Winner of Inter-Academy Tournament 2022",
      "Best Cricket Academy Award by Sports Association of Mumbai 2021",
    ],
    feeCollection: {
      totalCollected: "₹18,50,000",
      pending: "₹2,40,000",
      collectionRate: "88.5%",
    },
    batches: [
      { id: "1", name: "Morning Batch", time: "6:00 AM - 8:00 AM", days: "Mon, Wed, Fri", students: 28 },
      { id: "2", name: "Evening Batch", time: "5:00 PM - 7:00 PM", days: "Mon, Wed, Fri", students: 32 },
      { id: "3", name: "Weekend Batch", time: "9:00 AM - 12:00 PM", days: "Sat, Sun", students: 45 },
    ],
  })

  // State for new image upload
  const [newImage, setNewImage] = useState("")
  const [newFacility, setNewFacility] = useState("")
  const [newSport, setNewSport] = useState("")
  const [newAchievement, setNewAchievement] = useState("")

  const handleSaveChanges = () => {
    // In a real app, you would save the changes to the database
    setIsEditing(false)
    // Show success message
    alert("Academy details updated successfully!")
  }

  const handleAddImage = () => {
    if (newImage) {
      setAcademy({
        ...academy,
        images: [...academy.images, newImage],
      })
      setNewImage("")
    }
  }

  const handleRemoveImage = (index: number) => {
    const updatedImages = [...academy.images]
    updatedImages.splice(index, 1)
    setAcademy({
      ...academy,
      images: updatedImages,
    })
  }

  const handleAddFacility = () => {
    if (newFacility) {
      setAcademy({
        ...academy,
        facilities: [...academy.facilities, newFacility],
      })
      setNewFacility("")
    }
  }

  const handleAddSport = () => {
    if (newSport) {
      setAcademy({
        ...academy,
        sports: [...academy.sports, newSport],
      })
      setNewSport("")
    }
  }

  const handleAddAchievement = () => {
    if (newAchievement) {
      setAcademy({
        ...academy,
        achievements: [...academy.achievements, newAchievement],
      })
      setNewAchievement("")
    }
  }

  const fetchCoaches = async () => {
    setIsLoadingCoaches(true)
    try {
      const result = await getAcademyCoaches(academyId)
      if (result.success && result.coaches) {
        setCoaches(result.coaches)
      } else {
        console.error("Failed to fetch coaches:", result.error)
      }
    } catch (error) {
      console.error("Error fetching coaches:", error)
    } finally {
      setIsLoadingCoaches(false)
    }
  }

  useEffect(() => {
    fetchCoaches()
  }, [academyId])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/supplier/dashboard">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
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
              Edit Academy
            </Button>
          )}
        </div>
      </div>

      {/* Academy Header */}
      <div className="relative h-[300px] rounded-xl overflow-hidden">
        <Image src={academy.featuredImage || "/placeholder.svg"} alt={academy.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

        {isEditing && (
          <div className="absolute top-4 right-4 z-10">
            <Button variant="secondary" size="sm">
              <Camera className="h-4 w-4 mr-2" />
              Change Cover Image
            </Button>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="relative w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={academy.logo || "/placeholder.svg"}
                alt={`${academy.name} logo`}
                fill
                className="object-cover"
              />
              {isEditing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Button variant="ghost" size="sm" className="text-white p-1 h-auto">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            <div>
              {isEditing ? (
                <Input
                  value={academy.name}
                  onChange={(e) => setAcademy({ ...academy, name: e.target.value })}
                  className="text-2xl font-bold bg-transparent text-white border-gray-500 mb-2"
                />
              ) : (
                <h1 className="text-2xl font-bold">{academy.name}</h1>
              )}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Mumbai</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Est. {academy.foundedYear}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{academy.students} Students</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-1" />
                  <span>
                    {academy.rating} Rating ({academy.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Academy Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{academy.students}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{academy.activeStudents}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{Math.round((academy.activeStudents / academy.students) * 100)}%</span>{" "}
              active rate
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Fee Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{academy.feeCollection.totalCollected}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">{academy.feeCollection.pending}</span> pending
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{academy.feeCollection.collectionRate}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.5%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="details" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="coaches">Coaches</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="fees">Fee Collection</TabsTrigger>
        </TabsList>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Academy Information</CardTitle>
                  <CardDescription>Basic details about your academy</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Description</Label>
                    {isEditing ? (
                      <Textarea
                        value={academy.description}
                        onChange={(e) => setAcademy({ ...academy, description: e.target.value })}
                        className="min-h-[100px]"
                      />
                    ) : (
                      <p className="text-sm text-gray-600">{academy.description}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Location</Label>
                      {isEditing ? (
                        <Textarea
                          value={academy.location}
                          onChange={(e) => setAcademy({ ...academy, location: e.target.value })}
                          className="min-h-[80px]"
                        />
                      ) : (
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <span className="text-sm text-gray-600">{academy.location}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        {isEditing ? (
                          <Input
                            value={academy.phone}
                            onChange={(e) => setAcademy({ ...academy, phone: e.target.value })}
                          />
                        ) : (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-gray-600">{academy.phone}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Email</Label>
                        {isEditing ? (
                          <Input
                            value={academy.email}
                            onChange={(e) => setAcademy({ ...academy, email: e.target.value })}
                          />
                        ) : (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-gray-600">{academy.email}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label>Website</Label>
                        {isEditing ? (
                          <Input
                            value={academy.website}
                            onChange={(e) => setAcademy({ ...academy, website: e.target.value })}
                          />
                        ) : (
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-gray-600">{academy.website}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Founded Year</Label>
                      {isEditing ? (
                        <Input
                          value={academy.foundedYear}
                          onChange={(e) => setAcademy({ ...academy, foundedYear: e.target.value })}
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-gray-600">{academy.foundedYear}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Operating Hours</Label>
                      {isEditing ? (
                        <Input
                          value={academy.operatingHours}
                          onChange={(e) => setAcademy({ ...academy, operatingHours: e.target.value })}
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-gray-600">{academy.operatingHours}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Sports & Facilities</CardTitle>
                  <CardDescription>Sports offered and available facilities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Sports Offered</Label>
                      {isEditing && (
                        <div className="flex items-center gap-2">
                          <Input
                            placeholder="Add new sport"
                            value={newSport}
                            onChange={(e) => setNewSport(e.target.value)}
                            className="w-48"
                          />
                          <Button size="sm" onClick={handleAddSport}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {academy.sports.map((sport, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                          {sport}
                          {isEditing && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-4 w-4 p-0 ml-1"
                              onClick={() => {
                                const updatedSports = [...academy.sports]
                                updatedSports.splice(index, 1)
                                setAcademy({ ...academy, sports: updatedSports })
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Facilities</Label>
                      {isEditing && (
                        <div className="flex items-center gap-2">
                          <Input
                            placeholder="Add new facility"
                            value={newFacility}
                            onChange={(e) => setNewFacility(e.target.value)}
                            className="w-48"
                          />
                          <Button size="sm" onClick={handleAddFacility}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {academy.facilities.map((facility, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 rounded-md bg-gray-50">
                          <CheckCircle className="h-4 w-4 text-emerald-600" />
                          <span className="text-sm">{facility}</span>
                          {isEditing && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0 ml-auto"
                              onClick={() => {
                                const updatedFacilities = [...academy.facilities]
                                updatedFacilities.splice(index, 1)
                                setAcademy({ ...academy, facilities: updatedFacilities })
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Notable achievements of your academy</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Academy Achievements</Label>
                    {isEditing && (
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Add new achievement"
                          value={newAchievement}
                          onChange={(e) => setNewAchievement(e.target.value)}
                          className="w-64"
                        />
                        <Button size="sm" onClick={handleAddAchievement}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    {academy.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 rounded-md bg-yellow-50">
                        <Award className="h-5 w-5 text-yellow-600" />
                        <span className="text-sm">{achievement}</span>
                        {isEditing && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 ml-auto"
                            onClick={() => {
                              const updatedAchievements = [...academy.achievements]
                              updatedAchievements.splice(index, 1)
                              setAcademy({ ...academy, achievements: updatedAchievements })
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

            <div className="space-y-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Academy Gallery</CardTitle>
                  <CardDescription>Photos of your academy</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing && (
                    <div className="flex items-center gap-2 mb-4">
                      <Input placeholder="Image URL" value={newImage} onChange={(e) => setNewImage(e.target.value)} />
                      <Button size="sm" onClick={handleAddImage}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2">
                    {academy.images.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-md overflow-hidden group">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Academy image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        {isEditing && (
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Button variant="destructive" size="sm" onClick={() => handleRemoveImage(index)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Batches</CardTitle>
                  <CardDescription>Training batches and schedules</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {academy.batches.map((batch, index) => (
                    <div key={index} className="p-3 rounded-md border">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{batch.name}</h3>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {batch.students} Students
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{batch.time}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" />
                          <span>{batch.days}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isEditing && (
                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Batch
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Programs Tab */}
        <TabsContent value="programs" className="space-y-6">
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Training Programs</CardTitle>
                <CardDescription>All programs offered by your academy</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Program
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {academy.programs.map((program) => (
                  <Card key={program.id} className="bg-white hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{program.name}</CardTitle>
                      <CardDescription>Age Group: {program.ageGroup}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Duration:</span>
                          <span className="text-sm font-medium">{program.duration}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Fee:</span>
                          <span className="text-sm font-medium">{program.fee}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => router.push(`/supplier/academy/${academyId}/programs/${program.id}`)}
                      >
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Coaches Tab */}
        <TabsContent value="coaches">
          <div className="mb-4 flex justify-end">
            <Button size="sm" onClick={() => setIsAddCoachModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Coach
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoadingCoaches ? (
              <div className="col-span-full text-center py-8">Loading coaches...</div>
            ) : coaches.length > 0 ? (
              coaches.map((coach) => (
                <Card key={coach.id} className="bg-white hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src="/placeholder.svg?height=48&width=48"
                          alt={coach.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <CardTitle className="text-base">{coach.name}</CardTitle>
                        <CardDescription>{coach?.sport || "Unknown sport"}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                        {coach?.sport || "Unknown sport"}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={
                          coach.isVerified
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-yellow-50 text-yellow-700 border-yellow-200"
                        }
                      >
                        {coach.isVerified ? "Verified" : "Pending"}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => router.push(`/supplier/academy/${academyId}/coaches/${coach.id}`)}
                    >
                      View Profile
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500">
                No coaches found. Add your first coach to get started.
              </div>
            )}
          </div>
          <AddCoachModal
            isOpen={isAddCoachModalOpen}
            onClose={() => setIsAddCoachModalOpen(false)}
            academyId={academyId}
            onCoachAdded={fetchCoaches}
          />
        </TabsContent>

        {/* Students Tab */}
        <TabsContent value="students" className="space-y-6">
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Students</CardTitle>
                <CardDescription>All students enrolled in your academy</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button size="sm" onClick={() => router.push(`/supplier/academy/players`)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-2 p-4 bg-muted/50 text-sm font-medium">
                  <div className="col-span-4">Student</div>
                  <div className="col-span-2">Batch</div>
                  <div className="col-span-2">Attendance</div>
                  <div className="col-span-2">Fees Status</div>
                  <div className="col-span-2">Actions</div>
                </div>
                <div className="divide-y">
                  {[1, 2, 3, 4, 5].map((id) => (
                    <div
                      key={id}
                      className="grid grid-cols-12 gap-2 p-4 items-center hover:bg-muted/30 transition-colors"
                    >
                      <div className="col-span-4">
                        <div className="flex items-center gap-3">
                          <Image
                            src={`/placeholder.svg?height=40&width=40&query=student ${id}`}
                            alt="Student"
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                          />
                          <div>
                            <div className="font-medium">Student Name {id}</div>
                            <div className="text-sm text-muted-foreground">14 years • Cricket</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="font-medium">Evening Batch</div>
                        <div className="text-sm text-muted-foreground">Intermediate</div>
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${85 + id}%` }}></div>
                          </div>
                          <span className="text-sm font-medium">{85 + id}%</span>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <Badge
                          className={id % 2 === 0 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                        >
                          {id % 2 === 0 ? "Paid" : "Due"}
                        </Badge>
                      </div>
                      <div className="col-span-2 flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/supplier/academy/players/${id}`)}
                        >
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">Showing 5 of 120 students</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fees Tab */}
        <TabsContent value="fees" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{academy.feeCollection.totalCollected}</div>
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
                <div className="text-2xl font-bold">{academy.feeCollection.pending}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-600">18 students</span> with pending fees
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{academy.feeCollection.collectionRate}</div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-emerald-600 h-2.5 rounded-full"
                    style={{ width: academy.feeCollection.collectionRate }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Fee Collection</CardTitle>
                <CardDescription>Track and manage student fee payments</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Record Payment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-2 p-4 bg-muted/50 text-sm font-medium">
                  <div className="col-span-3">Student</div>
                  <div className="col-span-2">Program</div>
                  <div className="col-span-2">Amount</div>
                  <div className="col-span-2">Due Date</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-2">Actions</div>
                </div>
                <div className="divide-y">
                  {[1, 2, 3, 4, 5].map((id) => (
                    <div
                      key={id}
                      className="grid grid-cols-12 gap-2 p-4 items-center hover:bg-muted/30 transition-colors"
                    >
                      <div className="col-span-3">
                        <div className="flex items-center gap-3">
                          <Image
                            src={`/placeholder.svg?height=40&width=40&query=student ${id}`}
                            alt="Student"
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                          />
                          <div className="font-medium">Student Name {id}</div>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div className="font-medium">Junior Cricket</div>
                      </div>
                      <div className="col-span-2">
                        <div className="font-medium">₹5,000</div>
                      </div>
                      <div className="col-span-2">
                        <div className="font-medium">15 May 2023</div>
                      </div>
                      <div className="col-span-1">
                        <Badge
                          className={id % 2 === 0 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                        >
                          {id % 2 === 0 ? "Paid" : "Due"}
                        </Badge>
                      </div>
                      <div className="col-span-2 flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">Showing 5 of 120 records</div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
