"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useRequireAuth } from "@/hooks/use-require-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Plane } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ItineraryLoadingUI } from "./loading-ui"

const interests = [
  { id: "food", label: "Food & Cuisine" },
  { id: "nature", label: "Nature & Outdoors" },
  { id: "culture", label: "Culture & Arts" },
  { id: "history", label: "History & Heritage" },
  { id: "adventure", label: "Adventure & Sports" },
  { id: "shopping", label: "Shopping & Markets" },
  { id: "nightlife", label: "Nightlife & Entertainment" },
  { id: "relaxation", label: "Relaxation & Wellness" },
]

const accommodationTypes = [
  { value: "hotel", label: "Hotel" },
  { value: "hostel", label: "Hostel" },
  { value: "apartment", label: "Apartment/Vacation Rental" },
  { value: "resort", label: "Resort" },
  { value: "boutique", label: "Boutique Hotel" },
  { value: "budget", label: "Budget-friendly" },
  { value: "luxury", label: "Luxury" },
  { value: "any", label: "Any (No Preference)" },
]

const transportationTypes = [
  { value: "public", label: "Public Transportation" },
  { value: "rental", label: "Rental Car" },
  { value: "taxi", label: "Taxi/Rideshare" },
  { value: "walking", label: "Walking/Biking" },
  { value: "guided", label: "Guided Tours" },
  { value: "any", label: "Any (No Preference)" },
]

const dietaryPreferences = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "glutenFree", label: "Gluten-Free" },
  { id: "dairyFree", label: "Dairy-Free" },
  { id: "halal", label: "Halal" },
  { id: "kosher", label: "Kosher" },
  { id: "allergies", label: "Food Allergies (specify in notes)" },
  { id: "none", label: "No Dietary Restrictions" },
]

const accessibilityNeeds = [
  { id: "wheelchair", label: "Wheelchair Accessible" },
  { id: "limitedMobility", label: "Limited Mobility" },
  { id: "noStairs", label: "No Stairs/Elevator Access" },
  { id: "hearingImpaired", label: "Hearing Impaired" },
  { id: "visuallyImpaired", label: "Visually Impaired" },
  { id: "serviceDog", label: "Service Animal Accommodations" },
  { id: "none", label: "No Accessibility Requirements" },
]

export default function CreateItineraryPage() {
  const { user, isLoading: authLoading } = useRequireAuth()
  const [destination, setDestination] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [budget, setBudget] = useState("")
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [accommodationType, setAccommodationType] = useState<string>("any")
  const [transportationType, setTransportationType] = useState<string>("any")
  const [selectedDietaryPreferences, setSelectedDietaryPreferences] = useState<string[]>([])
  const [selectedAccessibilityNeeds, setSelectedAccessibilityNeeds] = useState<string[]>([])
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const [loadingStage, setLoadingStage] = useState<string>("idle")
  const [progress, setProgress] = useState<number>(0)

  const handleInterestChange = (interest: string) => {
    setSelectedInterests((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]))
  }

  const handleDietaryChange = (preference: string) => {
    if (preference === "none") {
      setSelectedDietaryPreferences(["none"])
    } else {
      setSelectedDietaryPreferences((prev) => {
        // Remove "none" if it's there and another option is selected
        const filtered = prev.filter((p) => p !== "none")

        // Toggle the selected preference
        if (filtered.includes(preference)) {
          return filtered.filter((p) => p !== preference)
        } else {
          return [...filtered, preference]
        }
      })
    }
  }

  const handleAccessibilityChange = (need: string) => {
    if (need === "none") {
      setSelectedAccessibilityNeeds(["none"])
    } else {
      setSelectedAccessibilityNeeds((prev) => {
        // Remove "none" if it's there and another option is selected
        const filtered = prev.filter((n) => n !== "none")

        // Toggle the selected need
        if (filtered.includes(need)) {
          return filtered.filter((n) => n !== need)
        } else {
          return [...filtered, need]
        }
      })
    }
  }

  // Update the handleSubmit function to handle specific error cases
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLoadingStage("preparing")
    setProgress(10)

    try {
      // Signal that we're making the API request
      setLoadingStage("generating")
      setProgress(30)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 90000) // 90-second timeout

      const response = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          destination,
          startDate,
          endDate,
          budget: Number.parseFloat(budget),
          interests: selectedInterests,
          accommodationType,
          transportationType,
          dietaryPreferences: selectedDietaryPreferences,
          accessibilityNeeds: selectedAccessibilityNeeds,
          additionalNotes,
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      setProgress(70)
      setLoadingStage("processing")

      const data = await response.json()
      setProgress(90)

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("AI service is currently busy. Please try again in a few minutes.")
        }
        throw new Error(data.error || "Failed to generate itinerary")
      }

      setProgress(100)
      setLoadingStage("complete")

      toast({
        title: "Itinerary created!",
        description: "Your AI-generated travel plan is ready.",
      })

      router.push(`/itinerary/${data.itinerary.id}`)
    } catch (error: any) {
      console.error("Error creating itinerary:", error)
      toast({
        title: "Failed to create itinerary",
        description: error.message || "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="container flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container py-10">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Create Your Travel Itinerary</CardTitle>
          <CardDescription>Fill in the details below to generate your personalized travel plan</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                placeholder="e.g., Paris, Tokyo, New York"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget (INR)</Label>
              <Input
                id="budget"
                type="number"
                placeholder="e.g., 50000"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Interests</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {interests.map((interest) => (
                  <div key={interest.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`interest-${interest.id}`}
                      checked={selectedInterests.includes(interest.id)}
                      onCheckedChange={() => handleInterestChange(interest.id)}
                    />
                    <Label htmlFor={`interest-${interest.id}`} className="cursor-pointer">
                      {interest.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="preferences">
                <AccordionTrigger>Travel Preferences</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="accommodation-type">Accommodation Type</Label>
                      <Select value={accommodationType} onValueChange={setAccommodationType}>
                        <SelectTrigger id="accommodation-type">
                          <SelectValue placeholder="Select accommodation type" />
                        </SelectTrigger>
                        <SelectContent>
                          {accommodationTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="transportation-type">Transportation Type</Label>
                      <Select value={transportationType} onValueChange={setTransportationType}>
                        <SelectTrigger id="transportation-type">
                          <SelectValue placeholder="Select transportation type" />
                        </SelectTrigger>
                        <SelectContent>
                          {transportationTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Dietary Preferences</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {dietaryPreferences.map((preference) => (
                          <div key={preference.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`dietary-${preference.id}`}
                              checked={selectedDietaryPreferences.includes(preference.id)}
                              onCheckedChange={() => handleDietaryChange(preference.id)}
                            />
                            <Label htmlFor={`dietary-${preference.id}`} className="cursor-pointer">
                              {preference.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Accessibility Needs</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {accessibilityNeeds.map((need) => (
                          <div key={need.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`accessibility-${need.id}`}
                              checked={selectedAccessibilityNeeds.includes(need.id)}
                              onCheckedChange={() => handleAccessibilityChange(need.id)}
                            />
                            <Label htmlFor={`accessibility-${need.id}`} className="cursor-pointer">
                              {need.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="additional-notes">Additional Notes</Label>
                      <Textarea
                        id="additional-notes"
                        placeholder="Any specific requirements or preferences for your trip..."
                        value={additionalNotes}
                        onChange={(e) => setAdditionalNotes(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          <CardFooter>
            {isLoading ? (
              <div className="w-full">
                <ItineraryLoadingUI stage={loadingStage} progress={progress} />
              </div>
            ) : (
              <Button type="submit" className="w-full">
                Generate Itinerary
                <Plane className="ml-2 h-4 w-4" />
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

