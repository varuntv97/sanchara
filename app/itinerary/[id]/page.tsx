"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { useRequireAuth } from "@/hooks/use-require-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { createClient } from "@/lib/supabase/client"
import {
  Loader2,
  Calendar,
  DollarSign,
  MapPin,
  Send,
  Download,
  Share2,
  Pencil,
  Bed,
  Bus,
  Utensils,
  Accessibility,
  CheckSquare,
  Settings,
  Mail,
  ArrowRight,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ItineraryDetailSkeleton } from "@/components/skeletons/itinerary-detail-skeleton"
import { PackingList } from "@/components/packing-list/packing-list"
import { PageTransition } from "@/components/animations/page-transition"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggeredChildren } from "@/components/animations/staggered-children"
import { ButtonAnimation } from "@/components/animations/button-animation"
import { AnimatedCounter } from "@/components/animations/animated-counter"
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog"

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
  accommodation_type?: string
  transportation_type?: string
  dietary_preferences?: string[]
  accessibility_needs?: string[]
  additional_notes?: string
  days: ItineraryDay[]
}

function ClientOnlyDate({ date, format }: { date: string; format: Intl.DateTimeFormatOptions }) {
  const [formattedDate, setFormattedDate] = useState<string>("")

  useEffect(() => {
    setFormattedDate(new Date(date).toLocaleDateString("en-GB", format))
  }, [date, format])

  return <>{formattedDate}</>
}

export default function ItineraryPage() {
  const { user, isLoading: authLoading } = useRequireAuth()
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [itinerary, setItinerary] = useState<Itinerary | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [activeTab, setActiveTab] = useState("itinerary")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
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

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          itineraryId: itinerary?.id,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email")
      }

      toast({
        title: "Email sent!",
        description: `Your itinerary has been sent to ${email}`,
      })
      setEmail("")
    } catch (error) {
      console.error("Error sending email:", error)
      toast({
        title: "Failed to send email",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSending(false)
    }
  }

  const handleDeleteClick = () => {
    setShowDeleteDialog(true)
  }

  const handleDeleteConfirm = async () => {
    if (!itinerary) return

    try {
      const { error } = await supabase.from("itineraries").delete().eq("id", itinerary.id).eq("user_id", user?.id)

      if (error) throw error

      toast({
        title: "Itinerary deleted",
        description: "Your itinerary has been successfully deleted.",
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Error deleting itinerary:", error)
      toast({
        title: "Failed to delete itinerary",
        description: "Please try again later.",
        variant: "destructive",
      })
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="container py-10">
        <ItineraryDetailSkeleton />
      </div>
    )
  }

  if (!itinerary) {
    return (
      <div className="container py-10">
        <Card>
          <CardHeader>
            <CardTitle>Itinerary Not Found</CardTitle>
            <CardDescription>
              The itinerary you're looking for doesn't exist or you don't have permission to view it.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="container py-10">
        <FadeIn>
          <div className="mb-6">
            <div className="relative mb-6 h-64 w-full overflow-hidden rounded-xl">
              {itinerary.image_url && !imageError ? (
                <Image
                  src={itinerary.image_url || "/placeholder.svg"}
                  alt={itinerary.destination}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  onError={() => setImageError(true)}
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-primary/20 to-primary/40">
                  <h2 className="text-2xl font-bold">{itinerary.destination}</h2>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h1 className="text-3xl font-bold text-white">{itinerary.title}</h1>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-white">
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {itinerary.destination}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {isLoading ? (
                      "..."
                    ) : (
                      <>
                        <ClientOnlyDate date={itinerary.start_date} format={{}} /> -{" "}
                        <ClientOnlyDate date={itinerary.end_date} format={{}} />
                      </>
                    )}
                  </div>
                  <div className="flex items-center">
                    ₹
                    <AnimatedCounter
                      value={itinerary.budget}
                      formatValue={(val) => Math.round(val).toLocaleString()}
                      duration={1500}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 justify-end">
              <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
                <ButtonAnimation>
                  <Button variant="outline" size="sm" className="group flex-1 sm:flex-initial">
                    <Download className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" />
                    <span className="whitespace-nowrap">Download</span>
                  </Button>
                </ButtonAnimation>
                <ButtonAnimation>
                  <Button variant="outline" size="sm" className="group flex-1 sm:flex-initial">
                    <Share2 className="mr-2 h-4 w-4 transition-all duration-300 group-hover:rotate-45" />
                    <span className="whitespace-nowrap">Share</span>
                  </Button>
                </ButtonAnimation>
              </div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
                <Link href={`/itinerary/${itinerary?.id}/edit`} className="flex-1 sm:flex-initial">
                  <ButtonAnimation>
                    <Button variant="outline" size="sm" className="group w-full">
                      <Pencil className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                      <span className="whitespace-nowrap">Edit</span>
                    </Button>
                  </ButtonAnimation>
                </Link>
                <ButtonAnimation className="flex-1 sm:flex-initial">
                  <Button
                    variant="outline"
                    size="sm"
                    className="group text-muted-foreground hover:text-destructive hover:border-destructive w-full"
                    onClick={handleDeleteClick}
                  >
                    <Trash2 className="mr-2 h-4 w-4 transition-all duration-300" />
                    <span className="whitespace-nowrap">Delete</span>
                  </Button>
                </ButtonAnimation>
              </div>
            </div>
          </div>
        </FadeIn>

        <Tabs defaultValue="itinerary" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4 w-full overflow-x-auto flex-nowrap justify-start">
            <TabsTrigger value="itinerary" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span className="whitespace-nowrap">Itinerary</span>
            </TabsTrigger>
            <TabsTrigger value="packing" className="flex items-center">
              <CheckSquare className="mr-2 h-4 w-4" />
              <span className="whitespace-nowrap">Packing List</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span className="whitespace-nowrap">Preferences</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              <span className="whitespace-nowrap">Email</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="itinerary" className="space-y-6">
            <StaggeredChildren className="space-y-6">
              {itinerary.days.map((day, index) => (
                <Card key={day.id}>
                  <CardHeader>
                    <CardTitle>
                      Day {day.day_number}:{" "}
                      <ClientOnlyDate
                        date={day.date}
                        format={{
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        }}
                      />
                    </CardTitle>
                    <CardDescription>{day.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {day.activities.map((activity, activityIndex) => (
                        <FadeIn key={activityIndex} delay={0.1 + activityIndex * 0.05} direction="up">
                          <div className="rounded-lg border p-4 transition-all duration-300 hover:border-primary/50 hover:shadow-md">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <h3 className="font-semibold">{activity.title}</h3>
                              <span className="text-sm text-muted-foreground mt-1 sm:mt-0">
                                {new Date(`2000-01-01T${activity.time}`).toLocaleTimeString("en-US", {
                                  hour: "numeric",
                                  minute: "numeric",
                                  hour12: true,
                                })}
                              </span>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">{activity.description}</p>
                            {activity.notes && (
                              <div className="mt-2 p-2 bg-muted rounded-md">
                                <p className="text-sm italic">
                                  <span className="font-medium">Personal Note:</span> {activity.notes}
                                </p>
                              </div>
                            )}
                            <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                              <span className="text-sm font-medium">
                                ₹
                                <AnimatedCounter
                                  value={activity.cost}
                                  duration={800}
                                  formatValue={(val) => Math.round(val).toLocaleString()}
                                />
                              </span>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="transition-all duration-300 hover:bg-primary/10">
                                  {activity.type}
                                </Badge>
                                <a
                                  // href={activity.link}
                                  href="/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm text-primary hover:underline group flex items-center"
                                >
                                  More Info
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </FadeIn>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </StaggeredChildren>
          </TabsContent>

          <TabsContent value="packing" className="mt-0">
            <FadeIn>
              <PackingList itineraryId={itinerary.id} />
            </FadeIn>
          </TabsContent>

          <TabsContent value="preferences">
            <FadeIn>
              <Card>
                <CardHeader>
                  <CardTitle>Travel Preferences</CardTitle>
                  <CardDescription>Your specified preferences for this trip</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FadeIn delay={0.1} direction="right">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Bed className="h-5 w-5 text-primary" />
                          <h3 className="font-medium">Accommodation</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {itinerary.accommodation_type && itinerary.accommodation_type !== "any"
                            ? itinerary.accommodation_type.charAt(0).toUpperCase() +
                            itinerary.accommodation_type.slice(1)
                            : "No specific preference"}
                        </p>
                      </div>
                    </FadeIn>

                    <FadeIn delay={0.2} direction="left">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Bus className="h-5 w-5 text-primary" />
                          <h3 className="font-medium">Transportation</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {itinerary.transportation_type && itinerary.transportation_type !== "any"
                            ? itinerary.transportation_type.charAt(0).toUpperCase() +
                            itinerary.transportation_type.slice(1)
                            : "No specific preference"}
                        </p>
                      </div>
                    </FadeIn>

                    <FadeIn delay={0.3} direction="right">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Utensils className="h-5 w-5 text-primary" />
                          <h3 className="font-medium">Dietary Preferences</h3>
                        </div>
                        {itinerary.dietary_preferences &&
                          itinerary.dietary_preferences.length > 0 &&
                          !itinerary.dietary_preferences.includes("none") ? (
                          <div className="flex flex-wrap gap-2">
                            {itinerary.dietary_preferences.map((pref, index) => (
                              <Badge
                                key={pref}
                                variant="secondary"
                                className="transition-all duration-300 hover:scale-105"
                              >
                                {pref.charAt(0).toUpperCase() + pref.slice(1)}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">No specific dietary preferences</p>
                        )}
                      </div>
                    </FadeIn>

                    <FadeIn delay={0.4} direction="left">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Accessibility className="h-5 w-5 text-primary" />
                          <h3 className="font-medium">Accessibility Needs</h3>
                        </div>
                        {itinerary.accessibility_needs &&
                          itinerary.accessibility_needs.length > 0 &&
                          !itinerary.accessibility_needs.includes("none") ? (
                          <div className="flex flex-wrap gap-2">
                            {itinerary.accessibility_needs.map((need) => (
                              <Badge
                                key={need}
                                variant="secondary"
                                className="transition-all duration-300 hover:scale-105"
                              >
                                {need.charAt(0).toUpperCase() + need.slice(1)}
                              </Badge>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">No specific accessibility requirements</p>
                        )}
                      </div>
                    </FadeIn>
                  </div>

                  {itinerary.additional_notes && (
                    <FadeIn delay={0.5}>
                      <div className="space-y-2">
                        <h3 className="font-medium">Additional Notes</h3>
                        <div className="rounded-md bg-muted p-3">
                          <p className="text-sm">{itinerary.additional_notes}</p>
                        </div>
                      </div>
                    </FadeIn>
                  )}

                  <FadeIn delay={0.6}>
                    <div className="space-y-2">
                      <h3 className="font-medium">Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {itinerary.interests &&
                          itinerary.interests.map((interest, index) => (
                            <Badge
                              key={interest}
                              variant="outline"
                              className="transition-all duration-300 hover:bg-primary/10"
                              style={{
                                transitionDelay: `${index * 50}ms`,
                              }}
                            >
                              {interest.charAt(0).toUpperCase() + interest.slice(1)}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </FadeIn>
                </CardContent>
              </Card>
            </FadeIn>
          </TabsContent>

          <TabsContent value="email">
            <FadeIn>
              <Card>
                <CardHeader>
                  <CardTitle>Email Your Itinerary</CardTitle>
                  <CardDescription>Send this itinerary to your email for easy access during your trip.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSendEmail}>
                  <CardContent>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <ButtonAnimation>
                      <Button type="submit" disabled={isSending} className="group">
                        {isSending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />{" "}
                            Send Itinerary
                          </>
                        )}
                      </Button>
                    </ButtonAnimation>
                  </CardFooter>
                </form>
              </Card>
            </FadeIn>
          </TabsContent>
        </Tabs>
        <DeleteConfirmationDialog
          isOpen={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          onConfirm={handleDeleteConfirm}
          title="Delete Itinerary"
          description="Are you sure you want to delete this itinerary? This action cannot be undone."
          itemName={itinerary?.title}
        />
      </div>
    </PageTransition>
  )
}

