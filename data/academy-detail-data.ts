export const academyDetailData = {
    overview: {
      description:
        "Our academy is a renowned sports facility with state-of-the-art equipment and professional coaching. We offer a range of programs for all skill levels, from beginners to advanced players. Our mission is to provide a supportive environment where athletes can develop their skills and reach their full potential.",
    },
    includes: [
      { name: "Badminton Racket (Provided)", checked: true },
      { name: "Shuttlecocks", checked: true },
      { name: "Clothing/Shoes", checked: false },
      { name: "Multiple Courts", checked: true },
      { name: "Spare Players", checked: false },
      { name: "Indoor Racket", checked: true },
      { name: "Green Turf", checked: true },
      { name: "Coaching", checked: true },
      { name: "Video Analysis", checked: true },
    ],
    rules: [
      "All badminton equipment is maintained regularly, ensuring optimal performance for all players.",
      "A maximum number of members per booking per badminton court is admissible fixed by Venue.",
      "No food or beverages (except for drinks in re-sealable bottles) in the court area.",
      "Proper sports attire and non-marking shoes are required on all courts.",
      "Bookings must be canceled at least 24 hours in advance for a full refund.",
    ],
    amenities: [
      { name: "Parking", available: true },
      { name: "Changing Room", available: true },
      { name: "First Aid", available: true },
      { name: "Shower", available: true },
      { name: "Cafeteria", available: true },
      { name: "Pro Shop", available: true },
      { name: "Fitness Center", available: true },
      { name: "Lounge Area", available: true },
    ],
    gallery: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    reviews: [
      {
        id: 1,
        name: "Amanda Kershaw",
        date: "05/04/2023",
        rating: 5,
        comment:
          "Absolutely perfect! I've been looking for a perfect place for friendly matches with good facilities and this is the best place. The courts are well-maintained and the staff is very helpful.",
        images: [
          "/placeholder.svg?height=60&width=60",
          "/placeholder.svg?height=60&width=60",
          "/placeholder.svg?height=60&width=60",
          "/placeholder.svg?height=60&width=60",
        ],
        verified: true,
      },
      {
        id: 2,
        name: "Michael Chen",
        date: "03/15/2023",
        rating: 4,
        comment:
          "Great academy with excellent facilities. The coaches are very knowledgeable and provide personalized training. The only downside is the limited parking space during peak hours.",
        verified: true,
      },
      {
        id: 3,
        name: "Sarah Johnson",
        date: "02/28/2023",
        rating: 5,
        comment:
          "My kids love this place! The junior program is fantastic and the coaches make learning fun. The facilities are clean and well-maintained. Highly recommended for families.",
        images: ["/placeholder.svg?height=60&width=60", "/placeholder.svg?height=60&width=60"],
        verified: true,
      },
    ],
    location: {
      address: "123 Main Street, New York, NY 10001",
      coordinates: {
        lat: 40.7128,
        lng: -74.006,
      },
    },
    availability: {
      courts: [
        {
          id: "court1",
          name: "Badminton Court 1",
          status: "available",
        },
        {
          id: "court2",
          name: "Badminton Court 2",
          status: "limited",
        },
        {
          id: "court3",
          name: "Badminton Court 3",
          status: "booked",
        },
      ],
      dates: [
        {
          date: "Today",
          slots: [
            { time: "9:00 AM", status: "available" },
            { time: "11:00 AM", status: "available" },
            { time: "1:00 PM", status: "limited" },
            { time: "3:00 PM", status: "available" },
            { time: "5:00 PM", status: "booked" },
            { time: "7:00 PM", status: "available" },
          ],
        },
        {
          date: "Tomorrow",
          slots: [
            { time: "9:00 AM", status: "limited" },
            { time: "11:00 AM", status: "available" },
            { time: "1:00 PM", status: "available" },
            { time: "3:00 PM", status: "booked" },
            { time: "5:00 PM", status: "available" },
            { time: "7:00 PM", status: "limited" },
          ],
        },
        {
          date: "Day After",
          slots: [
            { time: "9:00 AM", status: "available" },
            { time: "11:00 AM", status: "available" },
            { time: "1:00 PM", status: "available" },
            { time: "3:00 PM", status: "limited" },
            { time: "5:00 PM", status: "available" },
            { time: "7:00 PM", status: "available" },
          ],
        },
      ],
    },
  }
  
  