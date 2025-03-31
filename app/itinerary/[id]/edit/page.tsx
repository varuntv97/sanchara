"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useRequireAuth } from "@/hooks/use-require-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Plus, Save, ArrowLeft, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"

interface Activity {
  type: string
  title: string
  description: string
  time: string
  cost: number
  link: string
  notes?: string
}

interface ItineraryDay {
  id: string
  itinerary_id: string
  day_number: number
  date: string
  description: string
  activities: Activity[]
}

interface Itinerary {
  id: string
  title: string
  destination: string
  start_date: string
  end_date: string
  budget: number
  interests: string[]
  image_url: string | null
  created_at: string
  days: ItineraryDay[]
}

export default function EditItineraryPage() {
  const { user, isLoading: authLoading } = useRequireAuth()
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [itinerary, setItinerary] = useState<Itinerary | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [editingActivity, setEditingActivity] = useState<{
    dayId: string
    activityIndex: number
    activity: Activity
  } | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const fetchItinerary = async () => {
      if (!user) return

      try {
        // Fetch itinerary
        const { data: itineraryData, error: itineraryError } = await supabase
          .from("itineraries")
          .select("*")
          .eq("id", params.id)
          .eq("user_id", user.id)
          .single()

        if (itineraryError) throw itineraryError

        // Fetch itinerary days
        const { data: daysData, error: daysError } = await supabase
          .from("itinerary_days")
          .select("*")
          .eq("itinerary_id", params.id)
          .order("day_number", { ascending: true })

        if (daysError) throw daysError

        setItinerary({
          ...itineraryData,
          days: daysData,
        })
      } catch (error) {
        console.error("Error fetching itinerary:", error)
        toast({
          title: "Failed to load itinerary",
          description: "Please try again later.",
          variant: "destructive",
        })
        router.push("/dashboard")
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchItinerary()
    }
  }, [user, params.id, supabase, router, toast])

  const handleSaveItinerary = async () => {
    if (!itinerary) return

    setIsSaving(true)

    try {
      // Update itinerary details
      const { error: itineraryError } = await supabase
        .from("itineraries")
        .update({
          title: itinerary.title,
          updated_at: new Date().toISOString(),
        })
        .eq("id", itinerary.id)
        .eq("user_id", user?.id)

      if (itineraryError) throw itineraryError

      // Update each day
      for (const day of itinerary.days) {
        const { error: dayError } = await supabase
          .from("itinerary_days")
          .update({
            description: day.description,
            activities: day.activities,
            updated_at: new Date().toISOString(),
          })
          .eq("id", day.id)
          .eq("itinerary_id", itinerary.id)

        if (dayError) throw dayError
      }

      toast({
        title: "Itinerary saved",
        description: "Your changes have been saved successfully.",
      })
    } catch (error) {
      console.error("Error saving itinerary:", error)
      toast({
        title: "Failed to save itinerary",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleTitleChange = (value: string) => {
    if (!itinerary) return
    setItinerary({ ...itinerary, title: value })
  }

  const handleDayDescriptionChange = (dayId: string, value: string) => {
    if (!itinerary) return
    setItinerary({
      ...itinerary,
      days: itinerary.days.map((day) => (day.id === dayId ? { ...day, description: value } : day)),
    })
  }

  const handleActivityChange = (
    dayId: string,
    activityIndex: number,
    field: keyof Activity,
    value: string | number,
  ) => {
    if (!itinerary) return
    setItinerary({
      ...itinerary,
      days: itinerary.days.map((day) => {
        if (day.id === dayId) {
          const updatedActivities = [...day.activities]
          updatedActivities[activityIndex] = {
            ...updatedActivities[activityIndex],
            [field]: field === "cost" ? Number(value) : value,
          }
          return { ...day, activities: updatedActivities }
        }
        return day
      }),
    })
  }

  const handleAddActivity = (dayId: string) => {
    if (!itinerary) return

    const newActivity: Activity = {
      type: "custom",
      title: "New Activity",
      description: "Description of the new activity",
      time: "12:00",
      cost: 0,
      link: "https://example.com",
      notes: "",
    }

    setItinerary({
      ...itinerary,
      days: itinerary.days.map((day) => {
        if (day.id === dayId) {
          return {
            ...day,
            activities: [...day.activities, newActivity],
          }
        }
        return day
      }),
    })
  }

  const handleRemoveActivity = (dayId: string, activityIndex: number) => {
    if (!itinerary) return

    setItinerary({
      ...itinerary,
      days: itinerary.days.map((day) => {
        if (day.id === dayId) {
          const updatedActivities = [...day.activities]
          updatedActivities.splice(activityIndex, 1)
          return { ...day, activities: updatedActivities }
        }
        return day
      }),
    })
  }

  const handleDragEnd = (result: DropResult) => {
    if (!itinerary || !result.destination) return

    const { source, destination } = result
    const dayId = source.droppableId

    // Find the day
    const dayIndex = itinerary.days.findIndex((day) => day.id === dayId)
    if (dayIndex === -1) return

    // Create a copy of the activities
    const activities = [...itinerary.days[dayIndex].activities]

    // Reorder the activities
    const [removed] = activities.splice(source.index, 1)
    activities.splice(destination.index, 0, removed)

    // Update the itinerary state
    const updatedDays = [...itinerary.days]
    updatedDays[dayIndex] = {
      ...updatedDays[dayIndex],
      activities,
    }

    setItinerary({
      ...itinerary,
      days: updatedDays,
    })
  }

  if (authLoading || isLoading) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!itinerary) {
    return (
      <div className="container py-10">
        <Card>
          <CardHeader>
            <CardTitle>Itinerary Not Found</CardTitle>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="mb-6 flex items-center justify-between">
        <Button variant="outline" onClick={() => router.push(`/itinerary/${itinerary.id}`)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Itinerary
        </Button>
        <Button onClick={handleSaveItinerary} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </>
          )}
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Edit Itinerary Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Itinerary Title</Label>
              <Input id="title" value={itinerary.title} onChange={(e) => handleTitleChange(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Destination</Label>
                <p className="mt-1 text-sm text-muted-foreground">{itinerary.destination}</p>
              </div>
              <div>
                <Label>Dates</Label>
                <p className="mt-1 text-sm text-muted-foreground">
                  {new Date(itinerary.start_date).toLocaleDateString()} -{" "}
                  {new Date(itinerary.end_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className="mb-4 text-2xl font-bold">Daily Itinerary</h2>

      {itinerary.days.map((day) => (
        <Card key={day.id} className="mb-6">
          <CardHeader>
            <CardTitle>
              Day {day.day_number}:{" "}
              {new Date(day.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`day-description-${day.id}`}>Day Description</Label>
              <Textarea
                id={`day-description-${day.id}`}
                value={day.description}
                onChange={(e) => handleDayDescriptionChange(day.id, e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Activities</Label>
                <Button variant="outline" size="sm" onClick={() => handleAddActivity(day.id)}>
                  <Plus className="mr-1 h-4 w-4" /> Add Activity
                </Button>
              </div>

              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId={day.id}>
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-3">
                      {day.activities.map((activity, index) => (
                        <Draggable
                          key={`${day.id}-activity-${index}`}
                          draggableId={`${day.id}-activity-${index}`}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="rounded-lg border p-4 hover:border-primary/50"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Input
                                    value={activity.title}
                                    onChange={(e) => handleActivityChange(day.id, index, "title", e.target.value)}
                                    className="font-medium w-full max-w-[300px]"
                                  />
                                  <Input
                                    type="time"
                                    value={activity.time}
                                    onChange={(e) => handleActivityChange(day.id, index, "time", e.target.value)}
                                    className="w-24"
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button variant="outline" size="sm">
                                        Edit Details
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>Edit Activity Details</DialogTitle>
                                        <DialogDescription>Customize all aspects of this activity.</DialogDescription>
                                      </DialogHeader>
                                      <div className="space-y-4 py-4">
                                        <div className="space-y-2">
                                          <Label htmlFor={`activity-${index}-type`}>Activity Type</Label>
                                          <Input
                                            id={`activity-${index}-type`}
                                            value={activity.type}
                                            onChange={(e) =>
                                              handleActivityChange(day.id, index, "type", e.target.value)
                                            }
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor={`activity-${index}-description`}>Description</Label>
                                          <Textarea
                                            id={`activity-${index}-description`}
                                            value={activity.description}
                                            onChange={(e) =>
                                              handleActivityChange(day.id, index, "description", e.target.value)
                                            }
                                            rows={3}
                                          />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                          <div className="space-y-2">
                                            <Label htmlFor={`activity-${index}-time`}>Time</Label>
                                            <Input
                                              id={`activity-${index}-time`}
                                              type="time"
                                              value={activity.time}
                                              onChange={(e) =>
                                                handleActivityChange(day.id, index, "time", e.target.value)
                                              }
                                            />
                                          </div>
                                          <div className="space-y-2">
                                            <Label htmlFor={`activity-${index}-cost`}>Cost (₹)</Label>
                                            <Input
                                              id={`activity-${index}-cost`}
                                              type="number"
                                              value={activity.cost}
                                              onChange={(e) =>
                                                handleActivityChange(day.id, index, "cost", e.target.value)
                                              }
                                            />
                                          </div>
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor={`activity-${index}-link`}>Link</Label>
                                          <Input
                                            id={`activity-${index}-link`}
                                            value={activity.link}
                                            onChange={(e) =>
                                              handleActivityChange(day.id, index, "link", e.target.value)
                                            }
                                          />
                                        </div>
                                        <div className="space-y-2">
                                          <Label htmlFor={`activity-${index}-notes`}>Personal Notes</Label>
                                          <Textarea
                                            id={`activity-${index}-notes`}
                                            value={activity.notes || ""}
                                            onChange={(e) =>
                                              handleActivityChange(day.id, index, "notes", e.target.value)
                                            }
                                            placeholder="Add your personal notes or reminders here..."
                                            rows={3}
                                          />
                                        </div>
                                      </div>
                                      <DialogFooter>
                                        <Button type="submit">Save Changes</Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleRemoveActivity(day.id, index)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <div className="text-sm text-muted-foreground line-clamp-2">{activity.description}</div>
                              <div className="mt-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">
                                    ₹
                                    <Input
                                      type="number"
                                      value={activity.cost}
                                      onChange={(e) => handleActivityChange(day.id, index, "cost", e.target.value)}
                                      className="w-16 inline-block ml-1"
                                    />
                                  </span>
                                </div>
                                {activity.notes && (
                                  <span className="text-xs text-muted-foreground italic">Has personal notes</span>
                                )}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="mt-6 flex justify-end">
        <Button onClick={handleSaveItinerary} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

