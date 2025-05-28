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
import { Edit, Mail, Save, User } from "lucide-react";
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

  useEffect(() => {
    fetchCoach();
    fetchAssignments();
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
              <CardTitle>Schedule</CardTitle>
              <CardDescription>Coach schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Schedule content here</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
              <CardDescription>Coach reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Reviews content here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CoachProfilePage;
