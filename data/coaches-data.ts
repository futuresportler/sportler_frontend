import type { Coach } from "@/types/coach"

export const dummyCoaches: Coach[] = [
  {
    id: 1,
    name: "Joshua Rogers",
    image: "/placeholder.svg?height=400&width=300",
    sport: "Badminton",
    hourlyRate: 180,
    rating: 4.5,
    reviewCount: 80,
    location: "Port Alsworth, AK",
    description: "Detail-oriented badminton enthusiast with a patient coaching approach.",
    certificationLevel: "Professional",
    sessionTypes: ["One-on-One", "Group Training"],
    nextAvailability: "20 May 2023",
    languages: ["English", "Spanish"],
    trainedProfessionals: true,
    shortBio:
      "Joshua Rogers is a professional badminton coach with 8+ years of experience coaching beginners and advanced skill levels.",
    experience: "8+ years",
    lessonTypes: [
      {
        title: "Single Lesson",
        description: "One-on-one personalized coaching",
      },
      {
        title: "2 Player Lesson",
        description: "Training with a partner",
      },
      {
        title: "Small Group Session",
        description: "3-6 players per session",
      },
    ],
    availabilityCalendar: [
      {
        date: "Mon, May 20, 2023",
        slots: [
          { time: "9:00 AM", status: "available" },
          { time: "11:00 AM", status: "limited" },
          { time: "1:00 PM", status: "booked" },
          { time: "3:00 PM", status: "available" },
        ],
      },
      {
        date: "Tue, May 21, 2023",
        slots: [
          { time: "9:00 AM", status: "limited" },
          { time: "11:00 AM", status: "available" },
          { time: "1:00 PM", status: "available" },
          { time: "3:00 PM", status: "booked" },
        ],
      },
      {
        date: "Wed, May 22, 2023",
        slots: [
          { time: "9:00 AM", status: "booked" },
          { time: "11:00 AM", status: "booked" },
          { time: "1:00 PM", status: "limited" },
          { time: "3:00 PM", status: "available" },
        ],
      },
      {
        date: "Thu, May 23, 2023",
        slots: [
          { time: "9:00 AM", status: "available" },
          { time: "11:00 AM", status: "available" },
          { time: "1:00 PM", status: "available" },
          { time: "3:00 PM", status: "limited" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Jamal Dean",
    image: "/placeholder.svg?height=400&width=300",
    sport: "Badminton",
    hourlyRate: 150,
    rating: 4.5,
    reviewCount: 212,
    location: "Roseau, MN",
    description: "Meticulous badminton enthusiast with a gentle coaching style",
    certificationLevel: "Advanced",
    sessionTypes: ["One-on-One", "Online Coaching"],
    nextAvailability: "20 May 2023",
    languages: ["English", "French"],
    trainedProfessionals: false,
    shortBio: "Jamal Dean is an advanced badminton coach with a focus on technique and strategy development.",
    experience: "6+ years",
    lessonTypes: [
      {
        title: "Single Lesson",
        description: "One-on-one personalized coaching",
      },
      {
        title: "Online Coaching",
        description: "Remote training sessions via video call",
      },
    ],
    availabilityCalendar: [
      {
        date: "Mon, May 20, 2023",
        slots: [
          { time: "9:00 AM", status: "booked" },
          { time: "11:00 AM", status: "available" },
          { time: "1:00 PM", status: "available" },
          { time: "3:00 PM", status: "limited" },
        ],
      },
      {
        date: "Tue, May 21, 2023",
        slots: [
          { time: "9:00 AM", status: "available" },
          { time: "11:00 AM", status: "available" },
          { time: "1:00 PM", status: "limited" },
          { time: "3:00 PM", status: "booked" },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Kevin Anderson",
    image: "/placeholder.svg?height=400&width=300",
    sport: "Tennis",
    hourlyRate: 350,
    rating: 4.5,
    reviewCount: 80,
    location: "Port Alsworth, AK",
    description: "Certified Badminton Coach with a deep understanding of the sport's techniques and strategies.",
    certificationLevel: "Professional",
    sessionTypes: ["One-on-One", "Group Training", "In-Person Training"],
    nextAvailability: "20 May 2023",
    languages: ["English", "Hindi"],
    trainedProfessionals: true,
    shortBio: "Kevin Anderson is a professional tennis coach who has trained several national-level players.",
    experience: "10+ years",
    lessonTypes: [
      {
        title: "Single Lesson",
        description: "One-on-one personalized coaching",
      },
      {
        title: "Group Training",
        description: "Small group sessions for 3-6 players",
      },
      {
        title: "Elite Training",
        description: "Advanced training for competitive players",
      },
    ],
    availabilityCalendar: [
      {
        date: "Mon, May 20, 2023",
        slots: [
          { time: "9:00 AM", status: "available" },
          { time: "11:00 AM", status: "available" },
          { time: "1:00 PM", status: "limited" },
          { time: "3:00 PM", status: "booked" },
        ],
      },
      {
        date: "Tue, May 21, 2023",
        slots: [
          { time: "9:00 AM", status: "limited" },
          { time: "11:00 AM", status: "booked" },
          { time: "1:00 PM", status: "booked" },
          { time: "3:00 PM", status: "available" },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Angela Roudrigez",
    image: "/placeholder.svg?height=400&width=300",
    sport: "Badminton",
    hourlyRate: 120,
    rating: 4.5,
    reviewCount: 80,
    location: "Guysville, OH",
    description:
      "Experienced coach dedicated to enhancing your badminton skills and unlocking your full potential and strategies.",
    certificationLevel: "Intermediate",
    sessionTypes: ["Group Training", "Online Coaching"],
    nextAvailability: "21 May 2023",
    languages: ["English", "Spanish"],
    trainedProfessionals: false,
    shortBio: "Kevin Anderson is a professional tennis coach who has trained several national-level players.",
    experience: "10+ years",
    lessonTypes: [
      {
        title: "Single Lesson",
        description: "One-on-one personalized coaching",
      },
      {
        title: "Group Training",
        description: "Small group sessions for 3-6 players",
      },
      {
        title: "Elite Training",
        description: "Advanced training for competitive players",
      },
    ],
    availabilityCalendar: [
      {
        date: "Mon, May 20, 2023",
        slots: [
          { time: "9:00 AM", status: "available" },
          { time: "11:00 AM", status: "available" },
          { time: "1:00 PM", status: "limited" },
          { time: "3:00 PM", status: "booked" },
        ],
      },
      {
        date: "Tue, May 21, 2023",
        slots: [
          { time: "9:00 AM", status: "limited" },
          { time: "11:00 AM", status: "booked" },
          { time: "1:00 PM", status: "booked" },
          { time: "3:00 PM", status: "available" },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Michael Johnson",
    image: "/placeholder.svg?height=400&width=300",
    sport: "Basketball",
    hourlyRate: 200,
    rating: 4.8,
    reviewCount: 95,
    location: "Chicago, IL",
    description:
      "Former pro basketball player with 10+ years of coaching experience. Specializes in shooting techniques.",
    certificationLevel: "Professional",
    sessionTypes: ["One-on-One", "Group Training", "In-Person Training"],
    nextAvailability: "22 May 2023",
    languages: ["English"],
    trainedProfessionals: true,
    shortBio: "Kevin Anderson is a professional tennis coach who has trained several national-level players.",
    experience: "10+ years",
    lessonTypes: [
      {
        title: "Single Lesson",
        description: "One-on-one personalized coaching",
      },
      {
        title: "Group Training",
        description: "Small group sessions for 3-6 players",
      },
      {
        title: "Elite Training",
        description: "Advanced training for competitive players",
      },
    ],
    availabilityCalendar: [
      {
        date: "Mon, May 20, 2023",
        slots: [
          { time: "9:00 AM", status: "available" },
          { time: "11:00 AM", status: "available" },
          { time: "1:00 PM", status: "limited" },
          { time: "3:00 PM", status: "booked" },
        ],
      },
      {
        date: "Tue, May 21, 2023",
        slots: [
          { time: "9:00 AM", status: "limited" },
          { time: "11:00 AM", status: "booked" },
          { time: "1:00 PM", status: "booked" },
          { time: "3:00 PM", status: "available" },
        ],
      },
    ],
  },
  {
    id: 6,
    name: "Sarah Williams",
    image: "/placeholder.svg?height=400&width=300",
    sport: "Swimming",
    hourlyRate: 160,
    rating: 4.7,
    reviewCount: 68,
    location: "Miami, FL",
    description: "Olympic swimmer turned coach. Expert in all swimming styles with focus on competitive techniques.",
    certificationLevel: "Professional",
    sessionTypes: ["One-on-One", "Group Training"],
    nextAvailability: "19 May 2023",
    languages: ["English", "French"],
    trainedProfessionals: true,
    shortBio: "Kevin Anderson is a professional tennis coach who has trained several national-level players.",
    experience: "10+ years",
    lessonTypes: [
      {
        title: "Single Lesson",
        description: "One-on-one personalized coaching",
      },
      {
        title: "Group Training",
        description: "Small group sessions for 3-6 players",
      },
      {
        title: "Elite Training",
        description: "Advanced training for competitive players",
      },
    ],
    availabilityCalendar: [
      {
        date: "Mon, May 20, 2023",
        slots: [
          { time: "9:00 AM", status: "available" },
          { time: "11:00 AM", status: "available" },
          { time: "1:00 PM", status: "limited" },
          { time: "3:00 PM", status: "booked" },
        ],
      },
      {
        date: "Tue, May 21, 2023",
        slots: [
          { time: "9:00 AM", status: "limited" },
          { time: "11:00 AM", status: "booked" },
          { time: "1:00 PM", status: "booked" },
          { time: "3:00 PM", status: "available" },
        ],
      },
    ],
  },
  {
    id: 7,
    name: "David Chen",
    image: "/placeholder.svg?height=400&width=300",
    sport: "Tennis",
    hourlyRate: 190,
    rating: 4.6,
    reviewCount: 112,
    location: "San Francisco, CA",
    description: "Tennis coach with 15 years of experience. Specializes in serve techniques and match strategy.",
    certificationLevel: "Professional",
    sessionTypes: ["One-on-One", "Group Training", "Online Coaching"],
    nextAvailability: "23 May 2023",
    languages: ["English", "Mandarin"],
    trainedProfessionals: true,
    shortBio: "Kevin Anderson is a professional tennis coach who has trained several national-level players.",
    experience: "10+ years",
    lessonTypes: [
      {
        title: "Single Lesson",
        description: "One-on-one personalized coaching",
      },
      {
        title: "Group Training",
        description: "Small group sessions for 3-6 players",
      },
      {
        title: "Elite Training",
        description: "Advanced training for competitive players",
      },
    ],
    availabilityCalendar: [
      {
        date: "Mon, May 20, 2023",
        slots: [
          { time: "9:00 AM", status: "available" },
          { time: "11:00 AM", status: "available" },
          { time: "1:00 PM", status: "limited" },
          { time: "3:00 PM", status: "booked" },
        ],
      },
      {
        date: "Tue, May 21, 2023",
        slots: [
          { time: "9:00 AM", status: "limited" },
          { time: "11:00 AM", status: "booked" },
          { time: "1:00 PM", status: "booked" },
          { time: "3:00 PM", status: "available" },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Maria Rodriguez",
    image: "/placeholder.svg?height=400&width=300",
    sport: "Football",
    hourlyRate: 140,
    rating: 4.4,
    reviewCount: 56,
    location: "Dallas, TX",
    description:
      "Former college football player with a passion for coaching youth. Focus on fundamentals and teamwork.",
    certificationLevel: "Intermediate",
    sessionTypes: ["Group Training", "In-Person Training"],
    nextAvailability: "25 May 2023",
    languages: ["English", "Spanish"],
    trainedProfessionals: false,
    shortBio: "Kevin Anderson is a professional tennis coach who has trained several national-level players.",
    experience: "10+ years",
    lessonTypes: [
      {
        title: "Single Lesson",
        description: "One-on-one personalized coaching",
      },
      {
        title: "Group Training",
        description: "Small group sessions for 3-6 players",
      },
      {
        title: "Elite Training",
        description: "Advanced training for competitive players",
      },
    ],
    availabilityCalendar: [
      {
        date: "Mon, May 20, 2023",
        slots: [
          { time: "9:00 AM", status: "available" },
          { time: "11:00 AM", status: "available" },
          { time: "1:00 PM", status: "limited" },
          { time: "3:00 PM", status: "booked" },
        ],
      },
      {
        date: "Tue, May 21, 2023",
        slots: [
          { time: "9:00 AM", status: "limited" },
          { time: "11:00 AM", status: "booked" },
          { time: "1:00 PM", status: "booked" },
          { time: "3:00 PM", status: "available" },
        ],
      },
    ],
  },
  {
    id: 9,
    name: "James Wilson",
    image: "/placeholder.svg?height=400&width=300",
    sport: "Cricket",
    hourlyRate: 170,
    rating: 4.9,
    reviewCount: 87,
    location: "London, UK",
    description:
      "Professional cricket coach with experience training national-level players. Expert in batting techniques.",
    certificationLevel: "Professional",
    sessionTypes: ["One-on-One", "Group Training", "Online Coaching"],
    nextAvailability: "21 May 2023",
    languages: ["English"],
    trainedProfessionals: true,
    shortBio: "Kevin Anderson is a professional tennis coach who has trained several national-level players.",
    experience: "10+ years",
    lessonTypes: [
      {
        title: "Single Lesson",
        description: "One-on-one personalized coaching",
      },
      {
        title: "Group Training",
        description: "Small group sessions for 3-6 players",
      },
      {
        title: "Elite Training",
        description: "Advanced training for competitive players",
      },
    ],
    availabilityCalendar: [
      {
        date: "Mon, May 20, 2023",
        slots: [
          { time: "9:00 AM", status: "available" },
          { time: "11:00 AM", status: "available" },
          { time: "1:00 PM", status: "limited" },
          { time: "3:00 PM", status: "booked" },
        ],
      },
      {
        date: "Tue, May 21, 2023",
        slots: [
          { time: "9:00 AM", status: "limited" },
          { time: "11:00 AM", status: "booked" },
          { time: "1:00 PM", status: "booked" },
          { time: "3:00 PM", status: "available" },
        ],
      },
    ],
  },
  {
    id: 10,
    name: "Priya Patel",
    image: "/placeholder.svg?height=400&width=300",
    sport: "Badminton",
    hourlyRate: 160,
    rating: 4.7,
    reviewCount: 93,
    location: "New Delhi, India",
    description:
      "National badminton champion turned coach. Specializes in advanced techniques and competition strategy.",
    certificationLevel: "Professional",
    sessionTypes: ["One-on-One", "Group Training", "In-Person Training"],
    nextAvailability: "24 May 2023",
    languages: ["English", "Hindi"],
    trainedProfessionals: true,
    shortBio: "Kevin Anderson is a professional tennis coach who has trained several national-level players.",
    experience: "10+ years",
    lessonTypes: [
      {
        title: "Single Lesson",
        description: "One-on-one personalized coaching",
      },
      {
        title: "Group Training",
        description: "Small group sessions for 3-6 players",
      },
      {
        title: "Elite Training",
        description: "Advanced training for competitive players",
      },
    ],
    availabilityCalendar: [
      {
        date: "Mon, May 20, 2023",
        slots: [
          { time: "9:00 AM", status: "available" },
          { time: "11:00 AM", status: "available" },
          { time: "1:00 PM", status: "limited" },
          { time: "3:00 PM", status: "booked" },
        ],
      },
      {
        date: "Tue, May 21, 2023",
        slots: [
          { time: "9:00 AM", status: "limited" },
          { time: "11:00 AM", status: "booked" },
          { time: "1:00 PM", status: "booked" },
          { time: "3:00 PM", status: "available" },
        ],
      },
    ],
  },
  {
    id: 11,
    name: "Robert Kim",
    image: "/placeholder.svg?height=400&width=300",
    sport: "Swimming",
    hourlyRate: 150,
    rating: 4.5,
    reviewCount: 72,
    location: "Seattle, WA",
    description:
      "Certified swimming instructor with 8 years of experience. Specializes in stroke refinement and endurance training.",
    certificationLevel: "Advanced",
    sessionTypes: ["One-on-One", "Group Training"],
    nextAvailability: "26 May 2023",
    languages: ["English", "Korean"],
    trainedProfessionals: false,
    shortBio: "Kevin Anderson is a professional tennis coach who has trained several national-level players.",
    experience: "10+ years",
    lessonTypes: [
      {
        title: "Single Lesson",
        description: "One-on-one personalized coaching",
      },
      {
        title: "Group Training",
        description: "Small group sessions for 3-6 players",
      },
      {
        title: "Elite Training",
        description: "Advanced training for competitive players",
      },
    ],
    availabilityCalendar: [
      {
        date: "Mon, May 20, 2023",
        slots: [
          { time: "9:00 AM", status: "available" },
          { time: "11:00 AM", status: "available" },
          { time: "1:00 PM", status: "limited" },
          { time: "3:00 PM", status: "booked" },
        ],
      },
      {
        date: "Tue, May 21, 2023",
        slots: [
          { time: "9:00 AM", status: "limited" },
          { time: "11:00 AM", status: "booked" },
          { time: "1:00 PM", status: "booked" },
          { time: "3:00 PM", status: "available" },
        ],
      },
    ],
  },
  {
    id: 12,
    name: "Emma Thompson",
    image: "/placeholder.svg?height=400&width=300",
    sport: "Tennis",
    hourlyRate: 210,
    rating: 4.8,
    reviewCount: 105,
    location: "Melbourne, Australia",
    description: "Former WTA player with a passion for coaching. Focuses on mental game and technical excellence.",
    certificationLevel: "Professional",
    sessionTypes: ["One-on-One", "Group Training", "Online Coaching"],
    nextAvailability: "22 May 2023",
    languages: ["English"],
    trainedProfessionals: true,
    shortBio: "Kevin Anderson is a professional tennis coach who has trained several national-level players.",
    experience: "10+ years",
    lessonTypes: [
      {
        title: "Single Lesson",
        description: "One-on-one personalized coaching",
      },
      {
        title: "Group Training",
        description: "Small group sessions for 3-6 players",
      },
      {
        title: "Elite Training",
        description: "Advanced training for competitive players",
      },
    ],
    availabilityCalendar: [
      {
        date: "Mon, May 20, 2023",
        slots: [
          { time: "9:00 AM", status: "available" },
          { time: "11:00 AM", status: "available" },
          { time: "1:00 PM", status: "limited" },
          { time: "3:00 PM", status: "booked" },
        ],
      },
      {
        date: "Tue, May 21, 2023",
        slots: [
          { time: "9:00 AM", status: "limited" },
          { time: "11:00 AM", status: "booked" },
          { time: "1:00 PM", status: "booked" },
          { time: "3:00 PM", status: "available" },
        ],
      },
    ],
  },
  {
    id: 13,
    name: "Carlos Mendez",
    image: "/placeholder.svg?height=400&width=300",
    sport: "Football",
    hourlyRate: 175,
    rating: 4.6,
    reviewCount: 89,
    location: "Barcelona, Spain",
    description:
      "Former professional footballer with UEFA coaching license. Specializes in technical skills and tactical awareness.",
    certificationLevel: "Professional",
    sessionTypes: ["One-on-One", "Group Training", "In-Person Training"],
    nextAvailability: "27 May 2023",
    languages: ["English", "Spanish", "Catalan"],
    trainedProfessionals: true,
    shortBio: "Kevin Anderson is a professional tennis coach who has trained several national-level players.",
    experience: "10+ years",
    lessonTypes: [
      {
        title: "Single Lesson",
        description: "One-on-one personalized coaching",
      },
      {
        title: "Group Training",
        description: "Small group sessions for 3-6 players",
      },
      {
        title: "Elite Training",
        description: "Advanced training for competitive players",
      },
    ],
    availabilityCalendar: [
      {
        date: "Mon, May 20, 2023",
        slots: [
          { time: "9:00 AM", status: "available" },
          { time: "11:00 AM", status: "available" },
          { time: "1:00 PM", status: "limited" },
          { time: "3:00 PM", status: "booked" },
        ],
      },
      {
        date: "Tue, May 21, 2023",
        slots: [
          { time: "9:00 AM", status: "limited" },
          { time: "11:00 AM", status: "booked" },
          { time: "1:00 PM", status: "booked" },
          { time: "3:00 PM", status: "available" },
        ],
      },
    ],
  },
  {
    id: 14,
    name: "Aisha Khan",
    image: "/placeholder.svg?height=400&width=300",
    sport: "Badminton",
    hourlyRate: 140,
    rating: 4.7,
    reviewCount: 65,
    location: "Dubai, UAE",
    description:
      "National badminton player with 7 years of coaching experience. Focuses on footwork and court positioning.",
    certificationLevel: "Advanced",
    sessionTypes: ["One-on-One", "Group Training"],
    nextAvailability: "23 May 2023",
    languages: ["English", "Arabic", "Hindi"],
    trainedProfessionals: false,
    shortBio: "Kevin Anderson is a professional tennis coach who has trained several national-level players.",
    experience: "10+ years",
    lessonTypes: [
      {
        title: "Single Lesson",
        description: "One-on-one personalized coaching",
      },
      {
        title: "Group Training",
        description: "Small group sessions for 3-6 players",
      },
      {
        title: "Elite Training",
        description: "Advanced training for competitive players",
      },
    ],
    availabilityCalendar: [
      {
        date: "Mon, May 20, 2023",
        slots: [
          { time: "9:00 AM", status: "available" },
          { time: "11:00 AM", status: "available" },
          { time: "1:00 PM", status: "limited" },
          { time: "3:00 PM", status: "booked" },
        ],
      },
      {
        date: "Tue, May 21, 2023",
        slots: [
          { time: "9:00 AM", status: "limited" },
          { time: "11:00 AM", status: "booked" },
          { time: "1:00 PM", status: "booked" },
          { time: "3:00 PM", status: "available" },
        ],
      },
    ],
  },
  {
    id: 15,
    name: "Hiroshi Tanaka",
    image: "/placeholder.svg?height=400&width=300",
    sport: "Tennis",
    hourlyRate: 220,
    rating: 4.9,
    reviewCount: 118,
    location: "Tokyo, Japan",
    description: "Former ATP player with over 15 years of coaching experience. Expert in all aspects of the game.",
    certificationLevel: "Professional",
    sessionTypes: ["One-on-One", "Group Training", "In-Person Training"],
    nextAvailability: "25 May 2023",
    languages: ["English", "Japanese"],
    trainedProfessionals: true,
    shortBio: "Kevin Anderson is a professional tennis coach who has trained several national-level players.",
    experience: "10+ years",
    lessonTypes: [
      {
        title: "Single Lesson",
        description: "One-on-one personalized coaching",
      },
      {
        title: "Group Training",
        description: "Small group sessions for 3-6 players",
      },
      {
        title: "Elite Training",
        description: "Advanced training for competitive players",
      },
    ],
    availabilityCalendar: [
      {
        date: "Mon, May 20, 2023",
        slots: [
          { time: "9:00 AM", status: "available" },
          { time: "11:00 AM", status: "available" },
          { time: "1:00 PM", status: "limited" },
          { time: "3:00 PM", status: "booked" },
        ],
      },
      {
        date: "Tue, May 21, 2023",
        slots: [
          { time: "9:00 AM", status: "limited" },
          { time: "11:00 AM", status: "booked" },
          { time: "1:00 PM", status: "booked" },
          { time: "3:00 PM", status: "available" },
        ],
      },
    ],
  },
]

