"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import {
  Mail,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  AlertCircle,
  Building,
  Users,
  Award,
} from "lucide-react"
import {
  getSupplierInvitations,
  getManagingAcademies,
  acceptInvitation,
  rejectInvitation,
  type InvitationWithAcademy,
  type ManagingAcademy,
} from "@/services/invitationService"

export default function InvitationsPage() {
  const [invitations, setInvitations] = useState<InvitationWithAcademy[]>([])
  const [managingAcademies, setManagingAcademies] = useState<ManagingAcademy[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [processingInvitation, setProcessingInvitation] = useState<string | null>(null)

  const fetchInvitations = async () => {
    try {
      const result = await getSupplierInvitations()
      if (result.success && result.data) {
        setInvitations(result.data)
      } else {
        toast.error(result.message || "Failed to fetch invitations")
      }
    } catch (error) {
      console.error("Error fetching invitations:", error)
      toast.error("Failed to fetch invitations")
    }
  }

  const fetchManagingAcademies = async () => {
    try {
      const result = await getManagingAcademies()
      if (result.success && result.data) {
        setManagingAcademies(result.data)
      } else {
        toast.error(result.message || "Failed to fetch managing academies")
      }
    } catch (error) {
      console.error("Error fetching managing academies:", error)
      toast.error("Failed to fetch managing academies")
    }
  }

  const loadData = async () => {
    setLoading(true)
    try {
      await Promise.all([fetchInvitations(), fetchManagingAcademies()])
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await loadData()
    toast.success("Data refreshed successfully")
  }

  const handleAcceptInvitation = async (invitation: InvitationWithAcademy) => {
    setProcessingInvitation(invitation.invitationId)
    try {
      const result = await acceptInvitation(invitation.invitationToken)
      if (result.success) {
        toast.success(`Successfully accepted invitation to ${invitation.academy.name}!`)
        await loadData() // Refresh data
      } else {
        toast.error(result.message || "Failed to accept invitation")
      }
    } catch (error) {
      console.error("Error accepting invitation:", error)
      toast.error("Failed to accept invitation")
    } finally {
      setProcessingInvitation(null)
    }
  }

  const handleRejectInvitation = async (invitation: InvitationWithAcademy) => {
    setProcessingInvitation(invitation.invitationId)
    try {
      const result = await rejectInvitation(invitation.invitationToken)
      if (result.success) {
        toast.success(`Invitation to ${invitation.academy.name} has been rejected`)
        await loadData() // Refresh data
      } else {
        toast.error(result.message || "Failed to reject invitation")
      }
    } catch (error) {
      console.error("Error rejecting invitation:", error)
      toast.error("Failed to reject invitation")
    } finally {
      setProcessingInvitation(null)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const pendingInvitations = invitations.filter((inv) => inv.status === "pending")
  const acceptedInvitations = invitations.filter((inv) => inv.status === "accepted")
  const rejectedInvitations = invitations.filter((inv) => inv.status === "rejected")

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Invitations</h1>
          <p className="text-gray-600">Manage your academy invitations and roles</p>
        </div>
        <Button onClick={handleRefresh} disabled={refreshing}>
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending" className="relative">
            Pending
            {pendingInvitations.length > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
                {pendingInvitations.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="managing">Managing ({managingAcademies.length})</TabsTrigger>
          <TabsTrigger value="history">History ({acceptedInvitations.length + rejectedInvitations.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          {pendingInvitations.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Mail className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">No Pending Invitations</h3>
                <p className="text-gray-500">You don't have any pending invitations at the moment.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingInvitations.map((invitation) => (
                <Card key={invitation.invitationId} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{invitation.academy.name}</CardTitle>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        {invitation.role}
                      </Badge>
                    </div>
                    <CardDescription>{invitation.academy.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-400" />
                        <span>Sports: {invitation.academy.sports.join(", ")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>Invited: {new Date(invitation.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>Expires: {new Date(invitation.expiresAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {invitation.metadata.bio && (
                      <div className="p-3 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-600">{invitation.metadata.bio}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleAcceptInvitation(invitation)}
                        disabled={processingInvitation === invitation.invitationId}
                        className="flex-1"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Accept
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleRejectInvitation(invitation)}
                        disabled={processingInvitation === invitation.invitationId}
                        className="flex-1"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="managing" className="space-y-6">
          {managingAcademies.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">No Academies to Manage</h3>
                <p className="text-gray-500">You are not currently managing any academies.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {managingAcademies.map((academy) => (
                <Card key={academy.academyId} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{academy.name}</CardTitle>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Manager
                      </Badge>
                    </div>
                    <CardDescription>{academy.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-gray-400" />
                        <span>Sports: {academy.sports.join(", ")}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-gray-400" />
                        <span>Managing since: {new Date(academy.managerAcceptedAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <Button asChild className="w-full">
                      <a href={`/supplier/academy/${academy.academyId}`}>Manage Academy</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          {acceptedInvitations.length === 0 && rejectedInvitations.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">No Invitation History</h3>
                <p className="text-gray-500">Your invitation history will appear here.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {[...acceptedInvitations, ...rejectedInvitations]
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((invitation) => (
                  <Card key={invitation.invitationId}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-medium text-gray-800">{invitation.academy.name}</h3>
                            <p className="text-sm text-gray-500">{invitation.academy.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={invitation.status === "accepted" ? "default" : "secondary"}
                            className={
                              invitation.status === "accepted"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }
                          >
                            {invitation.status}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">
                            {invitation.status === "accepted" && invitation.acceptedAt
                              ? `Accepted: ${new Date(invitation.acceptedAt).toLocaleDateString()}`
                              : invitation.status === "rejected" && invitation.rejectedAt
                                ? `Rejected: ${new Date(invitation.rejectedAt).toLocaleDateString()}`
                                : `Invited: ${new Date(invitation.createdAt).toLocaleDateString()}`}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
