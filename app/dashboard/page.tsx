"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRequireAuth } from "@/hooks/use-require-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { createClient } from "@/lib/supabase/client"
import { Plus, MapPin, Calendar, ArrowRight, Pencil, Trash2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { ItineraryCardSkeleton } from "@/components/skeletons/itinerary-card-skeleton"
import { WelcomeTour } from "@/components/onboarding/welcome-tour"
import { PageTransition } from "@/components/animations/page-transition"
import { FadeIn } from "@/components/animations/fade-in"
import { ButtonAnimation } from "@/components/animations/button-animation"
import { HoverCard } from "@/components/animations/hover-card"
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog"
import { motion, AnimatePresence } from "framer-motion"

interface Itinerary {
  id: string
  title: string
  destination: string
  start_date: string
  end_date: string
  image_url: string | null
  created_at: string
}

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useRequireAuth()
  const [itineraries, setItineraries] = useState<Itinerary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteItineraryId, setDeleteItineraryId] = useState<string | null>(null)
  const [deleteItineraryTitle, setDeleteItineraryTitle] = useState<string>("")
  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    const fetchItineraries = async () => {
      if (!user) return

      try {
        const { data, error } = await supabase
          .from("itineraries")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (error) throw error

        setItineraries(data || [])
      } catch (error) {
        console.error("Error fetching itineraries:", error)
        toast({
          title: "Failed to load itineraries",
          description: "Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchItineraries()
    }
  }, [user, supabase, toast])

  const handleDeleteClick = (id: string, title: string) => {
    setDeleteItineraryId(id)
    setDeleteItineraryTitle(title)
  }

  const handleDeleteConfirm = async () => {
    if (!deleteItineraryId) return

    try {
      const { error } = await supabase.from("itineraries").delete().eq("id", deleteItineraryId).eq("user_id", user?.id)

      if (error) throw error

      // Update UI by removing the deleted itinerary
      setItineraries((prev) => prev.filter((item) => item.id !== deleteItineraryId))

      toast({
        title: "Itinerary deleted",
        description: "Your itinerary has been successfully deleted.",
      })
    } catch (error) {
      console.error("Error deleting itinerary:", error)
      toast({
        title: "Failed to delete itinerary",
        description: "Please try again later.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteCancel = () => {
    setDeleteItineraryId(null)
    setDeleteItineraryTitle("")
  }

  if (authLoading || isLoading) {
    return (
      <div className="container py-10">
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-48" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <ItineraryCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <PageTransition>
      <div className="container py-10">
        <FadeIn>
          <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-3xl font-bold">Your Itineraries</h1>
            <Link href="/create-itinerary">
              <ButtonAnimation>
                <Button className="w-full sm:w-auto">
                  <Plus className="h-4 w-4" /> Create New Itinerary
                </Button>
              </ButtonAnimation>
            </Link>
          </div>
        </FadeIn>

        {itineraries.length === 0 ? (
          <FadeIn delay={0.2}>
            <Card>
              <CardHeader>
                <CardTitle>No itineraries yet</CardTitle>
                <CardDescription>Create your first travel itinerary to get started.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/create-itinerary" className="w-full sm:w-auto">
                  <ButtonAnimation>
                    <Button className="w-full sm:w-auto">
                      <Plus className="mr-2 h-4 w-4" /> Create Itinerary
                    </Button>
                  </ButtonAnimation>
                </Link>
              </CardFooter>
            </Card>
          </FadeIn>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {itineraries.map((itinerary, index) => (
                <motion.div
                  key={itinerary.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  layout
                >
                  <HoverCard>
                    <Card className="overflow-hidden h-full flex flex-col">
                      <div className="relative h-48 w-full overflow-hidden">
                        {itinerary.image_url ? (
                          <Image
                            src={itinerary.image_url || "/placeholder.svg"}
                            alt={itinerary.destination}
                            fill
                            className="object-cover transition-transform duration-500 hover:scale-110"
                            onError={(e) => {
                              // Fallback to placeholder if image fails to load
                              console.error("Image failed to load:", itinerary.image_url)
                              const target = e.target as HTMLImageElement
                              target.src = `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(itinerary.destination)}`
                            }}
                          />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-r from-primary/20 to-primary/40">
                            <div className="flex h-full items-center justify-center">
                              <span className="text-lg font-medium">{itinerary.destination}</span>
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-4">
                          <h3 className="text-xl font-bold text-white">{itinerary.destination}</h3>
                        </div>
                      </div>
                      <CardHeader>
                        <CardTitle className="line-clamp-1">{itinerary.title}</CardTitle>
                        <CardDescription className="flex items-center">
                          <MapPin className="mr-1 h-4 w-4" />
                          {itinerary.destination}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-4 w-4" />
                          {new Date(itinerary.start_date).toLocaleDateString()} -{" "}
                          {new Date(itinerary.end_date).toLocaleDateString()}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between mt-auto">
                        <Link href={`/itinerary/${itinerary.id}`}>
                          <ButtonAnimation>
                            <Button variant="outline" className="group">
                              View Itinerary
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                          </ButtonAnimation>
                        </Link>
                        <div className="flex gap-2">
                          <Link href={`/itinerary/${itinerary.id}/edit`}>
                            <ButtonAnimation>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="transition-transform duration-300 hover:rotate-12"
                                aria-label="Edit itinerary"
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </ButtonAnimation>
                          </Link>
                          <ButtonAnimation>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-muted-foreground hover:text-destructive transition-colors duration-300"
                              onClick={() => handleDeleteClick(itinerary.id, itinerary.title)}
                              aria-label="Delete itinerary"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </ButtonAnimation>
                        </div>
                      </CardFooter>
                    </Card>
                  </HoverCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
        <WelcomeTour />

        <DeleteConfirmationDialog
          isOpen={!!deleteItineraryId}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          title="Delete Itinerary"
          description="Are you sure you want to delete this itinerary? This action cannot be undone."
          itemName={deleteItineraryTitle}
        />
      </div>
    </PageTransition>
  )
}

