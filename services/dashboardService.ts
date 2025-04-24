// Define interfaces for all data types
export interface UserProfile {
    id: string
    name: string
    email: string
    phone: string
    joinedDate: string
    avatar: string
    bio: string
    location: string
    primarySport: string
    secondarySports: string[]
    experience: string
    goals: string
    preferredTrainingDays: string[]
    preferredTrainingTime: string
    academies: Academy[]
  }
  
  export interface Academy {
    id: string
    name: string
    logo: string
  }
  
  export interface ProgressData {
    dailyStreak: {
      current: number
      max: number
      percentage: number
    }
    consistencyLevel: {
      current: number
      next: number
      percentage: number
    }
    skillLevel: {
      current: string
      progress: {
        beginner: { completed: number; total: number }
        intermediate: { completed: number; total: number }
        advanced: { completed: number; total: number }
      }
    }
    skillDetails: {
      [key: string]: SkillDetail[]
    }
  }
  
  export interface SkillDetail {
    id: string
    name: string
    completed: boolean
  }
  
  export interface TrainingStats {
    totalHours: number
    targetHours: number
    percentComplete: number
    upcomingSessions: number
    percentileRank: number
    sessionsCompleted: number
    sessionsScheduled: number
    averageSessionDuration: number
    mostActiveDay: string
    skillsImproved: string[]
  }
  
  export interface UpcomingSession {
    id: string
    date: string
    dayOfWeek: string
    startTime: string
    endTime: string
    location: string
    sessionType: string
    coach: {
      id: string
      name: string
      avatar: string
    }
  }
  
  export interface RecommendedActivity {
    id: number
    title: string
    dateRange: string
    image: string
    academy: {
      name: string
      logo: string
    }
  }
  
  export interface LeaderboardEntry {
    id: number
    name: string
    avatar: string
    points: number
    rank: number
    sport: string
    isCurrentUser?: boolean
  }
  
  export interface AchievementData {
    coachesBooked: number
    academiesJoined: number
    upcomingEvents: number
    achievements: Achievement[]
  }
  
  export interface Achievement {
    id: string
    title: string
    description: string
    icon: string
    unlocked: boolean
    unlockedDate?: string
  }
  
  export interface PerformanceMetrics {
    skillRatings: {
      [key: string]: number
    }
    recentProgress: {
      date: string
      rating: number
    }[]
    coachFeedback: {
      id: string
      date: string
      coach: string
      message: string
      rating: number
    }[]
  }
  
  // This file would typically contain API calls to your backend
  // For now, we'll use mock data that simulates API responses
  
  // User profile data
  export async function getUserProfile(): Promise<UserProfile> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
  
    return {
      id: "usr_123456",
      name: "Mushir S.",
      email: "mushir@example.com",
      phone: "+91 9876543210",
      joinedDate: "2025-04-13",
      avatar: "/placeholder.svg?height=128&width=128&text=MS",
      bio: "Passionate badminton player looking to improve my skills and compete at a higher level.",
      location: "Mumbai, India",
      primarySport: "Badminton",
      secondarySports: ["Tennis", "Table Tennis"],
      experience: "Intermediate (2-5 years)",
      goals: "Improve technique and participate in local tournaments",
      preferredTrainingDays: ["Monday", "Wednesday", "Friday"],
      preferredTrainingTime: "Evening (4PM-8PM)",
      academies: [
        { id: "acad_123", name: "Padukone Badminton Academy", logo: "/placeholder.svg?height=24&width=24&text=P" },
        { id: "acad_456", name: "East Zone Pro Academy", logo: "/placeholder.svg?height=24&width=24&text=E" },
      ],
    }
  }
  
  // User academies data
  export async function getUserAcademies(): Promise<Academy[]> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
  
    return [
      { id: "acad_123", name: "Padukone Badminton Academy", logo: "/placeholder.svg?height=24&width=24&text=P" },
      { id: "acad_456", name: "East Zone Pro Academy", logo: "/placeholder.svg?height=24&width=24&text=E" },
    ]
  }
  
  // Progress data
  export async function getUserProgress(academyId?: string): Promise<ProgressData> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 700))
  
    // Mock data for Padukone Badminton Academy
    const padukoneProgress: ProgressData = {
      dailyStreak: {
        current: 7,
        max: 10,
        percentage: 70,
      },
      consistencyLevel: {
        current: 3,
        next: 4,
        percentage: 60,
      },
      skillLevel: {
        current: "beginner",
        progress: {
          beginner: { completed: 5, total: 10 },
          intermediate: { completed: 0, total: 10 },
          advanced: { completed: 0, total: 10 },
        },
      },
      skillDetails: {
        beginner: [
          { id: "b1", name: "Basic Grip", completed: true },
          { id: "b2", name: "Forehand Clear", completed: true },
          { id: "b3", name: "Backhand Clear", completed: true },
          { id: "b4", name: "Footwork Basics", completed: true },
          { id: "b5", name: "Service", completed: true },
          { id: "b6", name: "Net Play", completed: false },
          { id: "b7", name: "Drive", completed: false },
          { id: "b8", name: "Drop Shot", completed: false },
          { id: "b9", name: "Smash", completed: false },
          { id: "b10", name: "Basic Strategy", completed: false },
        ],
      },
    }
  
    // Mock data for East Zone Pro Academy
    const eastZoneProgress: ProgressData = {
      dailyStreak: {
        current: 5,
        max: 7,
        percentage: 71,
      },
      consistencyLevel: {
        current: 2,
        next: 3,
        percentage: 45,
      },
      skillLevel: {
        current: "intermediate",
        progress: {
          beginner: { completed: 10, total: 10 },
          intermediate: { completed: 3, total: 10 },
          advanced: { completed: 0, total: 10 },
        },
      },
      skillDetails: {
        intermediate: [
          { id: "i1", name: "Advanced Footwork", completed: true },
          { id: "i2", name: "Deceptive Shots", completed: true },
          { id: "i3", name: "Advanced Service", completed: true },
          { id: "i4", name: "Defensive Skills", completed: false },
          { id: "i5", name: "Net Kill", completed: false },
          { id: "i6", name: "Jump Smash", completed: false },
          { id: "i7", name: "Tactical Play", completed: false },
          { id: "i8", name: "Doubles Play", completed: false },
          { id: "i9", name: "Match Fitness", completed: false },
          { id: "i10", name: "Mental Toughness", completed: false },
        ],
      },
    }
  
    // Return data based on academyId
    if (academyId === "acad_456") {
      return eastZoneProgress
    } else {
      return padukoneProgress
    }
  }
  
  // Training stats
  export async function getTrainingStats(academyId?: string): Promise<TrainingStats> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 600))
  
    // Mock data for Padukone Badminton Academy
    const padukoneStats: TrainingStats = {
      totalHours: 20,
      targetHours: 50,
      percentComplete: 40,
      upcomingSessions: 3,
      percentileRank: 85,
      sessionsCompleted: 12,
      sessionsScheduled: 15,
      averageSessionDuration: 75,
      mostActiveDay: "Wednesday",
      skillsImproved: ["Forehand", "Backhand", "Service"],
    }
  
    // Mock data for East Zone Pro Academy
    const eastZoneStats: TrainingStats = {
      totalHours: 35,
      targetHours: 60,
      percentComplete: 58,
      upcomingSessions: 5,
      percentileRank: 92,
      sessionsCompleted: 20,
      sessionsScheduled: 22,
      averageSessionDuration: 90,
      mostActiveDay: "Tuesday",
      skillsImproved: ["Footwork", "Net Play", "Smash"],
    }
  
    // Return data based on academyId
    if (academyId === "acad_456") {
      return eastZoneStats
    } else {
      return padukoneStats
    }
  }
  
  // Upcoming session
  export async function getUpcomingSession(academyId?: string): Promise<UpcomingSession> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 550))
  
    // Mock data for Padukone Badminton Academy
    const padukoneSession: UpcomingSession = {
      id: "sess_789",
      date: "2025-04-20",
      dayOfWeek: "Sunday",
      startTime: "10:00 AM",
      endTime: "11:30 AM",
      location: "Court 3, Padukone Badminton Academy",
      sessionType: "Footwork & Smash Training",
      coach: {
        id: "coach_456",
        name: "J. Dhavan",
        avatar: "/placeholder.svg?height=48&width=48&text=JD",
      },
    }
  
    // Mock data for East Zone Pro Academy
    const eastZoneSession: UpcomingSession = {
      id: "sess_101",
      date: "2025-04-22",
      dayOfWeek: "Tuesday",
      startTime: "6:00 PM",
      endTime: "7:30 PM",
      location: "Main Court, East Zone Pro Badminton Academy",
      sessionType: "Doubles Strategy Session",
      coach: {
        id: "coach_789",
        name: "Rahul K.",
        avatar: "/placeholder.svg?height=48&width=48&text=RK",
      },
    }
  
    // Return data based on academyId
    if (academyId === "acad_456") {
      return eastZoneSession
    } else {
      return padukoneSession
    }
  }
  
  // Recommended activities
  export async function getRecommendedActivities(academyId?: string): Promise<RecommendedActivity[]> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 650))
  
    // Mock data for Padukone Badminton Academy
    const padukoneActivities: RecommendedActivity[] = [
      {
        id: 1,
        title: "Pro Badminton Championship 2025",
        dateRange: "01 May 2025 - 17 May 2025",
        image: "/placeholder.svg?height=60&width=60&text=🏸",
        academy: {
          name: "Padukone Badminton Academy",
          logo: "/placeholder.svg?height=24&width=24&text=P",
        },
      },
      {
        id: 2,
        title: "Advanced Badminton Training Batch",
        dateRange: "New batch starting on 20 May 2025",
        image: "/placeholder.svg?height=60&width=60&text=🎯",
        academy: {
          name: "Padukone Badminton Academy",
          logo: "/placeholder.svg?height=24&width=24&text=P",
        },
      },
    ]
  
    // Mock data for East Zone Pro Academy
    const eastZoneActivities: RecommendedActivity[] = [
      {
        id: 3,
        title: "East Zone Badminton Club",
        dateRange: "25 May 2025 - 10 June 2025",
        image: "/placeholder.svg?height=60&width=60&text=🏆",
        academy: {
          name: "East Zone Pro Badminton Academy",
          logo: "/placeholder.svg?height=24&width=24&text=E",
        },
      },
    ]
  
    // Return data based on academyId
    if (academyId === "acad_456") {
      return eastZoneActivities
    } else {
      return padukoneActivities
    }
  }
  
  // Leaderboard data
  export async function getLeaderboardData(academyId?: string): Promise<LeaderboardEntry[]> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))
  
    // Mock data for Padukone Badminton Academy
    const padukoneLeaderboard: LeaderboardEntry[] = [
      {
        id: 1,
        name: "Rohan Badminton Boys",
        avatar: "/placeholder.svg?height=40&width=40&text=R",
        points: 1250,
        rank: 1,
        sport: "Badminton",
      },
      {
        id: 2,
        name: "Mushir S.",
        avatar: "/placeholder.svg?height=40&width=40&text=MS",
        points: 980,
        rank: 2,
        sport: "Badminton",
        isCurrentUser: true,
      },
      {
        id: 4,
        name: "Ajay K.",
        avatar: "/placeholder.svg?height=40&width=40&text=AK",
        points: 820,
        rank: 4,
        sport: "Badminton",
      },
    ]
  
    // Mock data for East Zone Pro Academy
    const eastZoneLeaderboard: LeaderboardEntry[] = [
      {
        id: 3,
        name: "Priya Tennis Academy",
        avatar: "/placeholder.svg?height=40&width=40&text=P",
        points: 875,
        rank: 1,
        sport: "Tennis",
      },
      {
        id: 5,
        name: "Sarah Tennis Club",
        avatar: "/placeholder.svg?height=40&width=40&text=S",
        points: 790,
        rank: 2,
        sport: "Tennis",
      },
    ]
  
    // Return data based on academyId
    if (academyId === "acad_456") {
      return eastZoneLeaderboard
    } else {
      return padukoneLeaderboard
    }
  }
  
  // Achievement data
  export async function getAchievements(academyId?: string): Promise<AchievementData> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 550))
  
    // Mock data for Padukone Badminton Academy
    const padukoneAchievements: AchievementData = {
      coachesBooked: 3,
      academiesJoined: 1,
      upcomingEvents: 2,
      achievements: [
        {
          id: "ach_1",
          title: "First Session",
          description: "Completed your first training session",
          icon: "🏆",
          unlocked: true,
          unlockedDate: "2025-03-15",
        },
        {
          id: "ach_2",
          title: "5-Day Streak",
          description: "Trained for 5 consecutive days",
          icon: "🔥",
          unlocked: true,
          unlockedDate: "2025-03-28",
        },
        {
          id: "ach_3",
          title: "Skill Master",
          description: "Mastered all beginner skills",
          icon: "🥇",
          unlocked: false,
        },
      ],
    }
  
    // Mock data for East Zone Pro Academy
    const eastZoneAchievements: AchievementData = {
      coachesBooked: 5,
      academiesJoined: 2,
      upcomingEvents: 3,
      achievements: [
        {
          id: "ach_4",
          title: "Tournament Ready",
          description: "Participated in your first tournament",
          icon: "🏅",
          unlocked: true,
          unlockedDate: "2025-04-01",
        },
        {
          id: "ach_5",
          title: "Social Butterfly",
          description: "Connected with 5 other players",
          icon: "🦋",
          unlocked: true,
          unlockedDate: "2025-04-05",
        },
      ],
    }
  
    // Return data based on academyId
    if (academyId === "acad_456") {
      return eastZoneAchievements
    } else {
      return padukoneAchievements
    }
  }
  
  // Performance metrics
  export async function getPerformanceMetrics(academyId?: string): Promise<PerformanceMetrics> {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 600))
  
    // Mock data for Padukone Badminton Academy
    const padukoneMetrics: PerformanceMetrics = {
      skillRatings: {
        technique: 7.5,
        footwork: 6.8,
        stamina: 8.2,
        strategy: 6.5,
        mentalStrength: 7.0,
      },
      recentProgress: [
        { date: "2025-03-15", rating: 6.2 },
        { date: "2025-03-22", rating: 6.5 },
        { date: "2025-03-29", rating: 6.8 },
        { date: "2025-04-05", rating: 7.0 },
        { date: "2025-04-12", rating: 7.3 },
      ],
      coachFeedback: [
        {
          id: "fb_1",
          date: "2025-04-10",
          coach: "J. Dhavan",
          message: "Great improvement in footwork. Focus on backhand technique next.",
          rating: 4,
        },
        {
          id: "fb_2",
          date: "2025-04-03",
          coach: "S. Mehta",
          message: "Good session today. Work on your smash power and accuracy.",
          rating: 3.5,
        },
      ],
    }
  
    // Mock data for East Zone Pro Academy
    const eastZoneMetrics: PerformanceMetrics = {
      skillRatings: {
        technique: 8.0,
        footwork: 7.2,
        stamina: 8.5,
        strategy: 7.0,
        mentalStrength: 7.5,
      },
      recentProgress: [
        { date: "2025-03-15", rating: 6.5 },
        { date: "2025-03-22", rating: 7.0 },
        { date: "2025-03-29", rating: 7.5 },
        { date: "2025-04-05", rating: 8.0 },
        { date: "2025-04-12", rating: 8.2 },
      ],
      coachFeedback: [
        {
          id: "fb_3",
          date: "2025-04-11",
          coach: "Rahul K.",
          message: "Excellent progress in smash power. Keep up the hard work!",
          rating: 4.5,
        },
      ],
    }
  
    // Return data based on academyId
    if (academyId === "acad_456") {
      return eastZoneMetrics
    } else {
      return padukoneMetrics
    }
  }
  