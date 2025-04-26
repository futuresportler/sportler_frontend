"use client"

import { useState } from "react"
import Image from "next/image"
import {
  MapPin,
  Calendar,
  Award,
  Clock,
  Users,
  User,
  FileText,
  Upload,
  Edit,
  Save,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  DollarSign,
  Phone,
  Mail,
  UserCheck,
  FileImage,
  Video,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CoachProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    personal: true,
    location: true,
    sports: true,
    certifications: true,
    media: true,
    batches: true,
    social: true,
    professional: true,
  })

  // Mock coach data - in a real app, you would fetch this from your backend
  const [coach, setCoach] = useState({
    name: "Rajiv Kumar",
    profileImage: "/focused-leader.png",
    location: {
      address: "123 Sports Avenue, Sector 15",
      city: "Gurgaon",
      state: "Haryana",
      pincode: "122001",
      coordinates: {
        lat: 28.459497,
        lng: 77.026638,
      },
    },
    contact: {
      email: "rajiv.kumar@gmail.com",
      phone: "+91 98765 43210",
    },
    dob: "1985-06-15",
    sportsCoached: ["Cricket", "Football"],
    certifications: [
      { name: "Level 2 Cricket Coach", issuer: "BCCI", year: "2018", file: "cricket_cert.pdf" },
      { name: "FIFA Grassroots Coach", issuer: "AIFF", year: "2019", file: "football_cert.pdf" },
    ],
    govtId: {
      type: "Aadhaar",
      number: "XXXX-XXXX-1234",
    },
    experience: {
      years: 8,
      maxLevelPlayed: "State Level (Haryana Ranji Trophy)",
      achievements: [
        "Coached U-19 district team to state championship",
        "Developed 3 players who went on to play at national level",
      ],
    },
    specialization: {
      ageGroups: ["6-12", "12-22"],
      classTypes: ["1-1", "Group class"],
    },
    batches: [
      {
        id: 1,
        sport: "Cricket",
        name: "Junior Cricket Academy",
        ageGroup: "6-12",
        timing: "Mon, Wed, Fri (4:00 PM - 6:00 PM)",
        fees: 2500,
        perMonth: true,
        location: "DLF Sports Complex, Sector 10",
        classType: "Group class",
        maxStudents: 15,
      },
      {
        id: 2,
        sport: "Cricket",
        name: "Advanced Cricket Training",
        ageGroup: "12-22",
        timing: "Tue, Thu, Sat (5:00 PM - 7:00 PM)",
        fees: 3500,
        perMonth: true,
        location: "DLF Sports Complex, Sector 10",
        classType: "Group class",
        maxStudents: 10,
      },
      {
        id: 3,
        sport: "Football",
        name: "Football Fundamentals",
        ageGroup: "6-12",
        timing: "Sat, Sun (9:00 AM - 11:00 AM)",
        fees: 2000,
        perMonth: true,
        location: "Sector 15 Community Ground",
        classType: "Group class",
        maxStudents: 12,
      },
      {
        id: 4,
        sport: "Cricket",
        name: "Private Coaching",
        ageGroup: "All ages",
        timing: "By appointment",
        fees: 1000,
        perMonth: false,
        location: "Various locations",
        classType: "1-1",
        maxStudents: 1,
      },
    ],
    media: {
      photos: [
        "/focused-cricket-training.png",
        "/placeholder.svg?key=k221q",
        "/placeholder.svg?key=j7loc",
        "/focused-cricket-net-session.png",
      ],
      videos: [
        { thumbnail: "/placeholder.svg?key=cjh3f", url: "#" },
        { thumbnail: "/intense-football-drill.png", url: "#" },
      ],
    },
    socialMedia: {
      instagram: "coach_rajiv",
      facebook: "rajivkumarcoach",
      twitter: "rajiv_coach",
      youtube: "RajivKumarSports",
      linkedin: "rajiv-kumar-coach",
    },
    professionalReference: {
      name: "Amit Singh",
      relationship: "Former State Team Coach",
      phone: "+91 87654 32109",
    },
    minHourlyFees: 800,
  })

  const [newBatch, setNewBatch] = useState({
    sport: "",
    name: "",
    ageGroup: "",
    timing: "",
    fees: 0,
    perMonth: true,
    location: "",
    classType: "",
    maxStudents: 0,
  })

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleSaveChanges = () => {
    // In a real app, you would save the changes to the database
    setIsEditing(false)
    // Show success message
    alert("Profile updated successfully!")
  }

  const handleAddBatch = () => {
    if (newBatch.name && newBatch.sport) {
      setCoach({
        ...coach,
        batches: [...coach.batches, { ...newBatch, id: coach.batches.length + 1 }],
      })
      setNewBatch({
        sport: "",
        name: "",
        ageGroup: "",
        timing: "",
        fees: 0,
        perMonth: true,
        location: "",
        classType: "",
        maxStudents: 0,
      })
    }
  }

  const handleRemoveBatch = (id) => {
    setCoach({
      ...coach,
      batches: coach.batches.filter((batch) => batch.id !== id),
    })
  }

  const handleAddCertification = () => {
    const newCert = {
      name: "New Certification",
      issuer: "Issuing Organization",
      year: new Date().getFullYear().toString(),
      file: "new_cert.pdf",
    }

    setCoach({
      ...coach,
      certifications: [...coach.certifications, newCert],
    })
  }

  const handleRemoveCertification = (index) => {
    const updatedCerts = [...coach.certifications]
    updatedCerts.splice(index, 1)
    setCoach({
      ...coach,
      certifications: updatedCerts,
    })
  }

  const handleAddMedia = (type) => {
    if (type === "photo") {
      setCoach({
        ...coach,
        media: {
          ...coach.media,
          photos: [...coach.media.photos, "/basketball-alley-oop.png"],
        },
      })
    } else {
      setCoach({
        ...coach,
        media: {
          ...coach.media,
          videos: [
            ...coach.media.videos,
            {
              thumbnail: "/vibrant-tech-review.png",
              url: "#",
            },
          ],
        },
      })
    }
  }

  const handleRemoveMedia = (type, index) => {
    if (type === "photo") {
      const updatedPhotos = [...coach.media.photos]
      updatedPhotos.splice(index, 1)
      setCoach({
        ...coach,
        media: {
          ...coach.media,
          photos: updatedPhotos,
        },
      })
    } else {
      const updatedVideos = [...coach.media.videos]
      updatedVideos.splice(index, 1)
      setCoach({
        ...coach,
        media: {
          ...coach.media,
          videos: updatedVideos,
        },
      })
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Coach Profile</h1>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveChanges}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Profile Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-500">
                    <Image
                      src={coach.profileImage || "/placeholder.svg"}
                      alt={coach.name}
                      fill
                      className="object-cover"
                    />
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
                    className="text-2xl font-bold text-center mb-2"
                  />
                ) : (
                  <h2 className="text-2xl font-bold mb-2">{coach.name}</h2>
                )}

                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {coach.sportsCoached.map((sport, index) => (
                    <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {sport} Coach
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-center mt-3 text-sm text-gray-500">
                  <MapPin className="h-4 w-4 mr-1 text-emerald-600" />
                  <span>
                    {coach.location.city}, {coach.location.state}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-emerald-600 mt-0.5" />
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
                      <p className="text-sm text-gray-600">{coach.contact.phone}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-emerald-600 mt-0.5" />
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
                      <p className="text-sm text-gray-600">{coach.contact.email}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Date of Birth</p>
                    {isEditing ? (
                      <Input
                        type="date"
                        value={coach.dob}
                        onChange={(e) => setCoach({ ...coach, dob: e.target.value })}
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-sm text-gray-600">
                        {new Date(coach.dob).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-emerald-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Min. Hourly Rate</p>
                    {isEditing ? (
                      <Input
                        type="number"
                        value={coach.minHourlyFees}
                        onChange={(e) => setCoach({ ...coach, minHourlyFees: Number.parseInt(e.target.value) })}
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-sm text-gray-600">₹{coach.minHourlyFees}/hour</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Section */}
          <Card>
            <CardHeader
              className="cursor-pointer flex flex-row items-center justify-between space-y-0 pb-2"
              onClick={() => toggleSection("location")}
            >
              <CardTitle className="text-xl">Location</CardTitle>
              {expandedSections.location ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </CardHeader>

            {expandedSections.location && (
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        value={coach.location.address}
                        onChange={(e) =>
                          setCoach({
                            ...coach,
                            location: { ...coach.location, address: e.target.value },
                          })
                        }
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={coach.location.city}
                          onChange={(e) =>
                            setCoach({
                              ...coach,
                              location: { ...coach.location, city: e.target.value },
                            })
                          }
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={coach.location.state}
                          onChange={(e) =>
                            setCoach({
                              ...coach,
                              location: { ...coach.location, state: e.target.value },
                            })
                          }
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        value={coach.location.pincode}
                        onChange={(e) =>
                          setCoach({
                            ...coach,
                            location: { ...coach.location, pincode: e.target.value },
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Full Address</p>
                        <p className="text-sm text-gray-600">
                          {coach.location.address}, {coach.location.city}, {coach.location.state} -{" "}
                          {coach.location.pincode}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-lg overflow-hidden h-48 mt-4">
                      <iframe
                        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.2233913121413!2d${coach.location.coordinates.lng}!3d${coach.location.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI3JzM0LjIiTiA3N8KwMDEnMzUuOSJF!5e0!3m2!1sen!2sin!4v1651825200000!5m2!1sen!2sin`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-700 mt-3">
                      <p>We will try to provide you students within 10 km from this area.</p>
                    </div>
                  </div>
                )}
              </CardContent>
            )}
          </Card>

          {/* Government ID Section */}
          <Card>
            <CardHeader
              className="cursor-pointer flex flex-row items-center justify-between space-y-0 pb-2"
              onClick={() => toggleSection("govtId")}
            >
              <CardTitle className="text-xl">Government ID</CardTitle>
              {expandedSections.govtId ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </CardHeader>

            {expandedSections.govtId && (
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="idType">ID Type</Label>
                      <Select
                        value={coach.govtId.type}
                        onValueChange={(value) =>
                          setCoach({
                            ...coach,
                            govtId: { ...coach.govtId, type: value },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select ID type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Aadhaar">Aadhaar</SelectItem>
                          <SelectItem value="PAN">PAN Card</SelectItem>
                          <SelectItem value="Voter ID">Voter ID</SelectItem>
                          <SelectItem value="Driving License">Driving License</SelectItem>
                          <SelectItem value="Passport">Passport</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="idNumber">ID Number</Label>
                      <Input
                        id="idNumber"
                        value={coach.govtId.number}
                        onChange={(e) =>
                          setCoach({
                            ...coach,
                            govtId: { ...coach.govtId, number: e.target.value },
                          })
                        }
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="idUpload">Upload ID (PDF/Image)</Label>
                      <div className="mt-1 flex items-center justify-center border-2 border-dashed border-gray-300 p-4 rounded-md">
                        <Button variant="outline" className="w-full">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Document
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">{coach.govtId.type}</p>
                        <p className="text-sm text-gray-600">{coach.govtId.number}</p>
                      </div>
                    </div>

                    <div className="mt-2">
                      <Button variant="outline" size="sm" className="text-sm">
                        <FileText className="h-4 w-4 mr-2" />
                        View Document
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            )}
          </Card>

          {/* Professional Reference Section */}
          <Card>
            <CardHeader
              className="cursor-pointer flex flex-row items-center justify-between space-y-0 pb-2"
              onClick={() => toggleSection("professional")}
            >
              <CardTitle className="text-xl">Professional Reference</CardTitle>
              {expandedSections.professional ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </CardHeader>

            {expandedSections.professional && (
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="refName">Reference Name</Label>
                      <Input
                        id="refName"
                        value={coach.professionalReference.name}
                        onChange={(e) =>
                          setCoach({
                            ...coach,
                            professionalReference: {
                              ...coach.professionalReference,
                              name: e.target.value,
                            },
                          })
                        }
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="refRelationship">Relationship/Position</Label>
                      <Input
                        id="refRelationship"
                        value={coach.professionalReference.relationship}
                        onChange={(e) =>
                          setCoach({
                            ...coach,
                            professionalReference: {
                              ...coach.professionalReference,
                              relationship: e.target.value,
                            },
                          })
                        }
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="refPhone">Phone Number</Label>
                      <Input
                        id="refPhone"
                        value={coach.professionalReference.phone}
                        onChange={(e) =>
                          setCoach({
                            ...coach,
                            professionalReference: {
                              ...coach.professionalReference,
                              phone: e.target.value,
                            },
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <UserCheck className="h-5 w-5 text-emerald-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">{coach.professionalReference.name}</p>
                        <p className="text-sm text-gray-600">{coach.professionalReference.relationship}</p>
                        <p className="text-sm text-gray-600">{coach.professionalReference.phone}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            )}
          </Card>

          {/* Social Media Section */}
          <Card>
            <CardHeader
              className="cursor-pointer flex flex-row items-center justify-between space-y-0 pb-2"
              onClick={() => toggleSection("social")}
            >
              <CardTitle className="text-xl">Social Media</CardTitle>
              {expandedSections.social ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </CardHeader>

            {expandedSections.social && (
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Instagram className="h-5 w-5 text-pink-600" />
                      <Input
                        value={coach.socialMedia.instagram}
                        onChange={(e) =>
                          setCoach({
                            ...coach,
                            socialMedia: { ...coach.socialMedia, instagram: e.target.value },
                          })
                        }
                        placeholder="Instagram username"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <Facebook className="h-5 w-5 text-blue-600" />
                      <Input
                        value={coach.socialMedia.facebook}
                        onChange={(e) =>
                          setCoach({
                            ...coach,
                            socialMedia: { ...coach.socialMedia, facebook: e.target.value },
                          })
                        }
                        placeholder="Facebook username"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <Twitter className="h-5 w-5 text-blue-400" />
                      <Input
                        value={coach.socialMedia.twitter}
                        onChange={(e) =>
                          setCoach({
                            ...coach,
                            socialMedia: { ...coach.socialMedia, twitter: e.target.value },
                          })
                        }
                        placeholder="Twitter username"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <Youtube className="h-5 w-5 text-red-600" />
                      <Input
                        value={coach.socialMedia.youtube}
                        onChange={(e) =>
                          setCoach({
                            ...coach,
                            socialMedia: { ...coach.socialMedia, youtube: e.target.value },
                          })
                        }
                        placeholder="YouTube channel"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <Linkedin className="h-5 w-5 text-blue-700" />
                      <Input
                        value={coach.socialMedia.linkedin}
                        onChange={(e) =>
                          setCoach({
                            ...coach,
                            socialMedia: { ...coach.socialMedia, linkedin: e.target.value },
                          })
                        }
                        placeholder="LinkedIn username"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {coach.socialMedia.instagram && (
                      <a
                        href={`https://instagram.com/${coach.socialMedia.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-pink-600 hover:bg-pink-50 transition-colors"
                      >
                        <Instagram size={18} />
                      </a>
                    )}

                    {coach.socialMedia.facebook && (
                      <a
                        href={`https://facebook.com/${coach.socialMedia.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Facebook size={18} />
                      </a>
                    )}

                    {coach.socialMedia.twitter && (
                      <a
                        href={`https://twitter.com/${coach.socialMedia.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-blue-400 hover:bg-blue-50 transition-colors"
                      >
                        <Twitter size={18} />
                      </a>
                    )}

                    {coach.socialMedia.youtube && (
                      <a
                        href={`https://youtube.com/${coach.socialMedia.youtube}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Youtube size={18} />
                      </a>
                    )}

                    {coach.socialMedia.linkedin && (
                      <a
                        href={`https://linkedin.com/in/${coach.socialMedia.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-blue-700 hover:bg-blue-50 transition-colors"
                      >
                        <Linkedin size={18} />
                      </a>
                    )}
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        </div>

        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sports Coached Section */}
          <Card>
            <CardHeader
              className="cursor-pointer flex flex-row items-center justify-between space-y-0 pb-2"
              onClick={() => toggleSection("sports")}
            >
              <CardTitle className="text-xl">Sports Coached</CardTitle>
              {expandedSections.sports ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </CardHeader>

            {expandedSections.sports && (
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label>Sports</Label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        {["Cricket", "Football", "Basketball", "Tennis", "Badminton", "Swimming"].map((sport) => (
                          <div key={sport} className="flex items-center space-x-2">
                            <Switch
                              id={`sport-${sport}`}
                              checked={coach.sportsCoached.includes(sport)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setCoach({
                                    ...coach,
                                    sportsCoached: [...coach.sportsCoached, sport],
                                  })
                                } else {
                                  setCoach({
                                    ...coach,
                                    sportsCoached: coach.sportsCoached.filter((s) => s !== sport),
                                  })
                                }
                              }}
                            />
                            <Label htmlFor={`sport-${sport}`}>{sport}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Age Groups Specialized</Label>
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        {["0-6", "6-12", "12-22"].map((ageGroup) => (
                          <div key={ageGroup} className="flex items-center space-x-2">
                            <Switch
                              id={`age-${ageGroup}`}
                              checked={coach.specialization.ageGroups.includes(ageGroup)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setCoach({
                                    ...coach,
                                    specialization: {
                                      ...coach.specialization,
                                      ageGroups: [...coach.specialization.ageGroups, ageGroup],
                                    },
                                  })
                                } else {
                                  setCoach({
                                    ...coach,
                                    specialization: {
                                      ...coach.specialization,
                                      ageGroups: coach.specialization.ageGroups.filter((a) => a !== ageGroup),
                                    },
                                  })
                                }
                              }}
                            />
                            <Label htmlFor={`age-${ageGroup}`}>{ageGroup} years</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Class Types</Label>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        {["1-1", "Group class"].map((classType) => (
                          <div key={classType} className="flex items-center space-x-2">
                            <Switch
                              id={`class-${classType}`}
                              checked={coach.specialization.classTypes.includes(classType)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setCoach({
                                    ...coach,
                                    specialization: {
                                      ...coach.specialization,
                                      classTypes: [...coach.specialization.classTypes, classType],
                                    },
                                  })
                                } else {
                                  setCoach({
                                    ...coach,
                                    specialization: {
                                      ...coach.specialization,
                                      classTypes: coach.specialization.classTypes.filter((c) => c !== classType),
                                    },
                                  })
                                }
                              }}
                            />
                            <Label htmlFor={`class-${classType}`}>{classType}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="maxLevel">Maximum Level Played</Label>
                      <Input
                        id="maxLevel"
                        value={coach.experience.maxLevelPlayed}
                        onChange={(e) =>
                          setCoach({
                            ...coach,
                            experience: { ...coach.experience, maxLevelPlayed: e.target.value },
                          })
                        }
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input
                        id="experience"
                        type="number"
                        value={coach.experience.years}
                        onChange={(e) =>
                          setCoach({
                            ...coach,
                            experience: { ...coach.experience, years: Number.parseInt(e.target.value) },
                          })
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-lg mb-3 flex items-center">
                          <Globe className="h-5 w-5 mr-2 text-emerald-600" />
                          Sports
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {coach.sportsCoached.map((sport, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {sport}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-lg mb-3 flex items-center">
                          <Users className="h-5 w-5 mr-2 text-emerald-600" />
                          Age Groups
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {coach.specialization.ageGroups.map((age, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-purple-50 text-purple-700 border-purple-200"
                            >
                              {age} years
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-lg mb-3 flex items-center">
                          <User className="h-5 w-5 mr-2 text-emerald-600" />
                          Class Types
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {coach.specialization.classTypes.map((type, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-amber-50 text-amber-700 border-amber-200"
                            >
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-lg mb-3 flex items-center">
                          <Award className="h-5 w-5 mr-2 text-emerald-600" />
                          Experience
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Years of Experience:</span> {coach.experience.years} years
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Maximum Level Played:</span> {coach.experience.maxLevelPlayed}
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-medium text-lg mb-3 flex items-center">
                        <Award className="h-5 w-5 mr-2 text-emerald-600" />
                        Achievements
                      </h3>
                      <ul className="list-disc list-inside space-y-1">
                        {coach.experience.achievements.map((achievement, index) => (
                          <li key={index} className="text-sm text-gray-600">
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            )}
          </Card>

          {/* Certifications Section */}
          <Card>
            <CardHeader
              className="cursor-pointer flex flex-row items-center justify-between space-y-0 pb-2"
              onClick={() => toggleSection("certifications")}
            >
              <CardTitle className="text-xl">Certifications</CardTitle>
              {expandedSections.certifications ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </CardHeader>

            {expandedSections.certifications && (
              <CardContent>
                {isEditing && (
                  <div className="mb-4">
                    <Button onClick={handleAddCertification} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Certification
                    </Button>
                  </div>
                )}

                <div className="space-y-4">
                  {coach.certifications.map((cert, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg relative">
                      {isEditing && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleRemoveCertification(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}

                      {isEditing ? (
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor={`cert-name-${index}`}>Certification Name</Label>
                            <Input
                              id={`cert-name-${index}`}
                              value={cert.name}
                              onChange={(e) => {
                                const updatedCerts = [...coach.certifications]
                                updatedCerts[index] = { ...cert, name: e.target.value }
                                setCoach({ ...coach, certifications: updatedCerts })
                              }}
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label htmlFor={`cert-issuer-${index}`}>Issuing Organization</Label>
                            <Input
                              id={`cert-issuer-${index}`}
                              value={cert.issuer}
                              onChange={(e) => {
                                const updatedCerts = [...coach.certifications]
                                updatedCerts[index] = { ...cert, issuer: e.target.value }
                                setCoach({ ...coach, certifications: updatedCerts })
                              }}
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label htmlFor={`cert-year-${index}`}>Year</Label>
                            <Input
                              id={`cert-year-${index}`}
                              value={cert.year}
                              onChange={(e) => {
                                const updatedCerts = [...coach.certifications]
                                updatedCerts[index] = { ...cert, year: e.target.value }
                                setCoach({ ...coach, certifications: updatedCerts })
                              }}
                              className="mt-1"
                            />
                          </div>

                          <div>
                            <Label htmlFor={`cert-file-${index}`}>Certificate File</Label>
                            <div className="mt-1 flex items-center justify-center border-2 border-dashed border-gray-300 p-4 rounded-md">
                              <Button variant="outline" className="w-full">
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Certificate
                              </Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start gap-4">
                          <div className="bg-emerald-100 p-2 rounded-full">
                            <Award className="h-5 w-5 text-emerald-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{cert.name}</h3>
                            <p className="text-sm text-gray-600">
                              Issued by {cert.issuer} • {cert.year}
                            </p>
                            <Button variant="outline" size="sm" className="mt-2 text-sm">
                              <FileText className="h-4 w-4 mr-2" />
                              View Certificate
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {!isEditing && coach.certifications.length === 0 && (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                    <p className="text-gray-500">No certifications added yet</p>
                  </div>
                )}
              </CardContent>
            )}
          </Card>

          {/* Batches Section */}
          <Card>
            <CardHeader
              className="cursor-pointer flex flex-row items-center justify-between space-y-0 pb-2"
              onClick={() => toggleSection("batches")}
            >
              <CardTitle className="text-xl">Batches, Timings & Fees</CardTitle>
              {expandedSections.batches ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </CardHeader>

            {expandedSections.batches && (
              <CardContent>
                {isEditing && (
                  <div className="mb-6 p-4 border border-dashed border-gray-300 rounded-lg">
                    <h3 className="font-medium mb-3">Add New Batch</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor="batch-sport">Sport</Label>
                        <Select
                          value={newBatch.sport}
                          onValueChange={(value) => setNewBatch({ ...newBatch, sport: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select sport" />
                          </SelectTrigger>
                          <SelectContent>
                            {coach.sportsCoached.map((sport) => (
                              <SelectItem key={sport} value={sport}>
                                {sport}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="batch-name">Batch Name</Label>
                        <Input
                          id="batch-name"
                          value={newBatch.name}
                          onChange={(e) => setNewBatch({ ...newBatch, name: e.target.value })}
                          placeholder="e.g. Junior Cricket Academy"
                        />
                      </div>

                      <div>
                        <Label htmlFor="batch-age">Age Group</Label>
                        <Select
                          value={newBatch.ageGroup}
                          onValueChange={(value) => setNewBatch({ ...newBatch, ageGroup: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select age group" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-6">0-6 years</SelectItem>
                            <SelectItem value="6-12">6-12 years</SelectItem>
                            <SelectItem value="12-22">12-22 years</SelectItem>
                            <SelectItem value="All ages">All ages</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="batch-class">Class Type</Label>
                        <Select
                          value={newBatch.classType}
                          onValueChange={(value) => setNewBatch({ ...newBatch, classType: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select class type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-1">1-1 (Individual)</SelectItem>
                            <SelectItem value="Group class">Group class</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="batch-timing">Timing</Label>
                        <Input
                          id="batch-timing"
                          value={newBatch.timing}
                          onChange={(e) => setNewBatch({ ...newBatch, timing: e.target.value })}
                          placeholder="e.g. Mon, Wed, Fri (4:00 PM - 6:00 PM)"
                        />
                      </div>

                      <div>
                        <Label htmlFor="batch-location">Location</Label>
                        <Input
                          id="batch-location"
                          value={newBatch.location}
                          onChange={(e) => setNewBatch({ ...newBatch, location: e.target.value })}
                          placeholder="e.g. DLF Sports Complex, Sector 10"
                        />
                      </div>

                      <div>
                        <Label htmlFor="batch-fees">Fees</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="batch-fees"
                            type="number"
                            value={newBatch.fees}
                            onChange={(e) => setNewBatch({ ...newBatch, fees: Number.parseInt(e.target.value) })}
                            placeholder="e.g. 2500"
                          />
                          <Select
                            value={newBatch.perMonth ? "monthly" : "hourly"}
                            onValueChange={(value) => setNewBatch({ ...newBatch, perMonth: value === "monthly" })}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="monthly">per month</SelectItem>
                              <SelectItem value="hourly">per hour</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="batch-students">Max Students</Label>
                        <Input
                          id="batch-students"
                          type="number"
                          value={newBatch.maxStudents}
                          onChange={(e) => setNewBatch({ ...newBatch, maxStudents: Number.parseInt(e.target.value) })}
                          placeholder="e.g. 15"
                        />
                      </div>
                    </div>

                    <Button onClick={handleAddBatch} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Batch
                    </Button>
                  </div>
                )}

                <div className="space-y-4">
                  {coach.batches.map((batch) => (
                    <div key={batch.id} className="bg-gray-50 p-4 rounded-lg relative">
                      {isEditing && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleRemoveBatch(batch.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}

                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/4">
                          <Badge className="mb-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-0">
                            {batch.sport}
                          </Badge>
                          <h3 className="font-medium text-lg">{batch.name}</h3>
                          <p className="text-sm text-gray-600">Age Group: {batch.ageGroup} years</p>
                          <p className="text-sm text-gray-600">Class Type: {batch.classType}</p>
                        </div>

                        <div className="md:w-2/4">
                          <div className="flex items-start gap-2 mb-2">
                            <Clock className="h-4 w-4 text-emerald-600 mt-0.5" />
                            <p className="text-sm text-gray-600">{batch.timing}</p>
                          </div>

                          <div className="flex items-start gap-2 mb-2">
                            <MapPin className="h-4 w-4 text-emerald-600 mt-0.5" />
                            <p className="text-sm text-gray-600">{batch.location}</p>
                          </div>

                          <div className="flex items-start gap-2">
                            <Users className="h-4 w-4 text-emerald-600 mt-0.5" />
                            <p className="text-sm text-gray-600">Max {batch.maxStudents} students</p>
                          </div>
                        </div>

                        <div className="md:w-1/4 flex flex-col justify-center items-center bg-white p-3 rounded-lg">
                          <p className="text-sm text-gray-500">Fees</p>
                          <p className="text-xl font-bold text-emerald-600">₹{batch.fees}</p>
                          <p className="text-xs text-gray-500">{batch.perMonth ? "per month" : "per hour"}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {!isEditing && coach.batches.length === 0 && (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                    <p className="text-gray-500">No batches added yet</p>
                  </div>
                )}
              </CardContent>
            )}
          </Card>

          {/* Photos & Videos Section */}
          <Card>
            <CardHeader
              className="cursor-pointer flex flex-row items-center justify-between space-y-0 pb-2"
              onClick={() => toggleSection("media")}
            >
              <CardTitle className="text-xl">Photos & Videos</CardTitle>
              {expandedSections.media ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </CardHeader>

            {expandedSections.media && (
              <CardContent>
                <Tabs defaultValue="photos" className="w-full">
                  <TabsList className="grid grid-cols-2 mb-4">
                    <TabsTrigger value="photos">Photos</TabsTrigger>
                    <TabsTrigger value="videos">Videos</TabsTrigger>
                  </TabsList>

                  <TabsContent value="photos" className="space-y-4">
                    {isEditing && (
                      <div className="mb-4">
                        <Button onClick={() => handleAddMedia("photo")} className="w-full">
                          <FileImage className="h-4 w-4 mr-2" />
                          Add Photo
                        </Button>
                      </div>
                    )}

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {coach.media.photos.map((photo, index) => (
                        <div key={index} className="relative group rounded-lg overflow-hidden aspect-square">
                          <Image
                            src={photo || "/placeholder.svg"}
                            alt={`Coach photo ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />

                          {isEditing && (
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => handleRemoveMedia("photo", index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    {!isEditing && coach.media.photos.length === 0 && (
                      <div className="text-center py-8">
                        <FileImage className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                        <p className="text-gray-500">No photos added yet</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="videos" className="space-y-4">
                    {isEditing && (
                      <div className="mb-4">
                        <Button onClick={() => handleAddMedia("video")} className="w-full">
                          <Video className="h-4 w-4 mr-2" />
                          Add Video
                        </Button>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {coach.media.videos.map((video, index) => (
                        <div key={index} className="relative group rounded-lg overflow-hidden">
                          <div className="aspect-video relative">
                            <Image
                              src={video.thumbnail || "/placeholder.svg"}
                              alt={`Video thumbnail ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6 text-emerald-600 ml-1"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          {isEditing && (
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => handleRemoveMedia("video", index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>

                    {!isEditing && coach.media.videos.length === 0 && (
                      <div className="text-center py-8">
                        <Video className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                        <p className="text-gray-500">No videos added yet</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
