"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Edit, Mail, Save, User, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getCoachById,
  updateCoach,
  getCoachAssignments,
  type Coach,
  type CoachAssignments,
} from "@/services/coachService";
import {
  getCoachSchedule,
  type CoachScheduleResponse,
} from "@/services/scheduleService";
import {
  getRecentFeedback,
  getAcademyCoachFeedback,
  type FeedbackItem,
  type CoachFeedbackSummary,
} from "@/services/feedbackService";
import { useEffect } from "react";

interface Params {
  id: string;
  coachId: string;
}

type SearchParams = {};

interface Props {
  params: Params;
  searchParams: SearchParams;
}

const CoachProfilePage = ({ params }: Props) => {
  const { id: academyId, coachId } = params;
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [coach, setCoach] = useState<Coach | null>(null);
  const [assignments, setAssignments] = useState<CoachAssignments | null>(null);
  const [isLoadingCoach, setIsLoadingCoach] = useState(true);
  const [isLoadingAssignments, setIsLoadingAssignments] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [schedule, setSchedule] = useState<CoachScheduleResponse | null>(null);
  const [isLoadingSchedule, setIsLoadingSchedule] = useState(true);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(true);
  const [coachRating, setCoachRating] = useState<CoachFeedbackSummary | null>(
    null
  );
  const [isLoadingRating, setIsLoadingRating] = useState(true);

  const fetchCoach = async () => {
    setIsLoadingCoach(true);
    try {
      const result = await getCoachById(coachId);
      if (result.success && result.coach) {
        setCoach(result.coach);
      } else {
        console.error("Failed to fetch coach:", result.error);
      }
    } catch (error) {
      console.error("Error fetching coach:", error);
    } finally {
      setIsLoadingCoach(false);
    }
  };

  const fetchAssignments = async () => {
    setIsLoadingAssignments(true);
    try {
      const result = await getCoachAssignments(coachId);
      if (result.success && result.assignments) {
        setAssignments(result.assignments);
      } else {
        console.error("Failed to fetch assignments:", result.error);
      }
    } catch (error) {
      console.error("Error fetching assignments:", error);
    } finally {
      setIsLoadingAssignments(false);
    }
  };

  const fetchSchedule = async () => {
    setIsLoadingSchedule(true);
    try {
      const result = await getCoachSchedule(coachId);
      if (result.success && result.data) {
        setSchedule(result.data);
      } else {
        console.error("Failed to fetch schedule:", result.error);
      }
    } catch (error) {
      console.error("Error fetching schedule:", error);
    } finally {
      setIsLoadingSchedule(false);
    }
  };

  const fetchFeedback = async () => {
    setIsLoadingFeedback(true);
    try {
      const result = await getRecentFeedback("coach", coachId);
      if (result.success && result.data) {
        setFeedback(result.data);
      } else {
        console.error("Failed to fetch feedback:", result.error);
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setIsLoadingFeedback(false);
    }
  };

  const fetchCoachRating = async () => {
    setIsLoadingRating(true);
    try {
      const result = await getAcademyCoachFeedback(academyId);
      if (result.success && result.data) {
        const coachFeedback = result.data.find(
          (item) => item.coachId === coachId
        );
        setCoachRating(coachFeedback || null);
      } else {
        console.error("Failed to fetch coach rating:", result.error);
      }
    } catch (error) {
      console.error("Error fetching coach rating:", error);
    } finally {
      setIsLoadingRating(false);
    }
  };

  useEffect(() => {
    fetchCoach();
    fetchAssignments();
    fetchSchedule();
    fetchFeedback();
    fetchCoachRating();
  }, [coachId]);

  const handleSaveChanges = async () => {
    if (!coach) return;

    setIsSaving(true);
    try {
      const updateData = {
        name: coach.name,
        email: coach.email,
        mobileNumber: coach.mobileNumber,
        bio: coach.bio,
        hourlyRate: coach.hourlyRate,
        experienceLevel: coach.experienceLevel,
        sport: coach.sport,
      };

      const result = await updateCoach(coachId, updateData);
      if (result.success) {
        setIsEditing(false);
        alert("Coach profile updated successfully!");
      } else {
        alert(`Failed to update coach: ${result.error}`);
      }
    } catch (error) {
      alert("An error occurred while updating the coach profile");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoadingCoach) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading coach profile...</p>
        </div>
      </div>
    );
  }

  if (!coach) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-gray-500">Coach not found</p>
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="mt-4"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-4xl mx-auto bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Coach Profile</CardTitle>
          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSaveChanges} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          ) : (
            <Button size="sm" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Name</p>
                  {isEditing ? (
                    <Input
                      value={coach.name}
                      onChange={(e) =>
                        setCoach({
                          ...coach,
                          name: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {coach.name}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  {isEditing ? (
                    <Input
                      value={coach.email}
                      onChange={(e) =>
                        setCoach({
                          ...coach,
                          email: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {coach.email}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-phone h-5 w-5 text-muted-foreground mt-0.5"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 0 0 1-8.63-3.07 19.5 0 0 1-6-6 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.08 2h3a2 2 0 0 1 2 2 15.71 0 0 0 .94 4.31 2.2 2.2 0 0 0 .7 1.21l.27.27a2.39 2.39 0 0 1 .7.7 2.39 2.39 0 0 1 .7.7l.27.27a2.22 0 0 0 1.21.7 15.71 0 0 0 4.31.94 2 2 0 0 1 2 2Z" />
                </svg>
                <div>
                  <p className="text-sm font-medium">Contact Information</p>
                  {isEditing ? (
                    <Input
                      value={coach.mobileNumber}
                      onChange={(e) =>
                        setCoach({
                          ...coach,
                          mobileNumber: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {coach.mobileNumber}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-info h-5 w-5 text-muted-foreground mt-0.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" x2="12" y1="16" y2="12" />
                  <line x1="12" x2="12.01" y1="8" y2="8" />
                </svg>
                <div>
                  <p className="text-sm font-medium">About</p>
                  {isEditing ? (
                    <Input
                      value={coach.bio || ""}
                      onChange={(e) =>
                        setCoach({
                          ...coach,
                          bio: e.target.value,
                        })
                      }
                      className="mt-1"
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {coach.bio || "No bio available."}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-700 border-blue-200"
              >
                {coach.sport}
              </Badge>
              <Badge
                variant="outline"
                className="bg-emerald-50 text-emerald-700 border-emerald-200"
              >
                {coach.experienceLevel} years exp
              </Badge>
              <Badge
                variant="outline"
                className="bg-purple-50 text-purple-700 border-purple-200"
              >
                ₹{coach.hourlyRate}/hr
              </Badge>
              {coachRating && (
                <Badge
                  variant="outline"
                  className="bg-yellow-50 text-yellow-700 border-yellow-200"
                >
                  ⭐ {coachRating.averageRating.toFixed(1)} (
                  {coachRating.totalReviews} reviews)
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="programs" className="w-full max-w-4xl mx-auto mt-6">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="programs">Programs</TabsTrigger>
          <TabsTrigger value="batches">Batches</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="programs" className="space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Assigned Programs</CardTitle>
              <CardDescription>Programs assigned to this coach</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingAssignments ? (
                <div className="text-center py-8">Loading assignments...</div>
              ) : assignments?.programs && assignments.programs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {assignments.programs.map((program) => (
                    <Card
                      key={program.id}
                      className="bg-white hover:shadow-md transition-shadow"
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">
                          {program.name}
                        </CardTitle>
                      </CardHeader>
                      <CardFooter className="pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          asChild
                        >
                          <Link
                            href={`/supplier/academy/${academyId}/programs/${program.id}`}
                          >
                            View Program
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No programs assigned to this coach.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="batches" className="space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Assigned Batches</CardTitle>
              <CardDescription>Batches assigned to this coach</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingAssignments ? (
                <div className="text-center py-8">Loading assignments...</div>
              ) : assignments?.batches && assignments.batches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {assignments.batches.map((batch) => (
                    <Card
                      key={batch.id}
                      className="bg-white hover:shadow-md transition-shadow"
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{batch.name}</CardTitle>
                      </CardHeader>
                      <CardFooter className="pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          asChild
                        >
                          <Link
                            href={`/supplier/academy/${academyId}/batches/${batch.id}`}
                          >
                            View Batch
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No batches assigned to this coach.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="schedule">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Weekly Schedule</CardTitle>
              <CardDescription>Coach's training schedule</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingSchedule ? (
                <div className="text-center py-8">Loading schedule...</div>
              ) : schedule ? (
                <div className="space-y-6">
                  {/* Personal Schedule */}
                  <div>
                    <h3 className="font-medium mb-3">Personal Schedule</h3>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-8 gap-2 p-4 bg-muted/50 text-sm font-medium">
                        <div className="col-span-1">Day</div>
                        <div className="col-span-7">Time Slots</div>
                      </div>
                      <div className="divide-y">
                        {[
                          "monday",
                          "tuesday",
                          "wednesday",
                          "thursday",
                          "friday",
                          "saturday",
                          "sunday",
                        ].map((day) => (
                          <div
                            key={day}
                            className="grid grid-cols-8 gap-2 p-4 items-center hover:bg-muted/30 transition-colors"
                          >
                            <div className="col-span-1">
                              <div className="font-medium capitalize">
                                {day}
                              </div>
                            </div>
                            <div className="col-span-7">
                              <div className="flex flex-wrap gap-2">
                                {schedule.schedule.personal[
                                  day as keyof typeof schedule.schedule.personal
                                ]?.map((timeSlot, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="bg-blue-50 text-blue-700"
                                  >
                                    {timeSlot}
                                  </Badge>
                                )) || (
                                  <span className="text-gray-500 text-sm">
                                    No slots
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Batch Schedule */}
                  {schedule.schedule.batches.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-3">Batch Schedule</h3>
                      <div className="space-y-4">
                        {schedule.schedule.batches.map((batch) => (
                          <div
                            key={batch.batchId}
                            className="border rounded-lg p-4"
                          >
                            <h4 className="font-medium mb-2">{batch.name}</h4>
                            <div className="grid grid-cols-7 gap-2 text-sm">
                              {[
                                "monday",
                                "tuesday",
                                "wednesday",
                                "thursday",
                                "friday",
                                "saturday",
                                "sunday",
                              ].map((day) => (
                                <div key={day} className="text-center">
                                  <div className="font-medium capitalize mb-1">
                                    {day.slice(0, 3)}
                                  </div>
                                  <div className="space-y-1">
                                    {batch.schedule[
                                      day as keyof typeof batch.schedule
                                    ]?.map((timeSlot, index) => (
                                      <Badge
                                        key={index}
                                        variant="outline"
                                        className="bg-green-50 text-green-700 text-xs"
                                      >
                                        {timeSlot}
                                      </Badge>
                                    )) || (
                                      <span className="text-gray-400 text-xs">
                                        -
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Program Schedule */}
                  {schedule.schedule.programs.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-3">Program Schedule</h3>
                      <div className="space-y-4">
                        {schedule.schedule.programs.map((program) => (
                          <div
                            key={program.programId}
                            className="border rounded-lg p-4"
                          >
                            <h4 className="font-medium mb-2">{program.name}</h4>
                            <div className="grid grid-cols-7 gap-2 text-sm">
                              {[
                                "monday",
                                "tuesday",
                                "wednesday",
                                "thursday",
                                "friday",
                                "saturday",
                                "sunday",
                              ].map((day) => (
                                <div key={day} className="text-center">
                                  <div className="font-medium capitalize mb-1">
                                    {day.slice(0, 3)}
                                  </div>
                                  <div className="space-y-1">
                                    {program.schedule[
                                      day as keyof typeof program.schedule
                                    ]?.map((timeSlot, index) => (
                                      <Badge
                                        key={index}
                                        variant="outline"
                                        className="bg-purple-50 text-purple-700 text-xs"
                                      >
                                        {timeSlot}
                                      </Badge>
                                    )) || (
                                      <span className="text-gray-400 text-xs">
                                        -
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No schedule data available.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Student Reviews</CardTitle>
              <CardDescription>Feedback from students</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingFeedback ? (
                <div className="text-center py-8">Loading reviews...</div>
              ) : feedback.length > 0 ? (
                <div className="space-y-4">
                  {feedback.map((review, index) => (
                    <div key={index} className="p-4 rounded-lg border">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium">{review.user}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={16}
                                className={
                                  star <= review.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No reviews available for this coach.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CoachProfilePage;
