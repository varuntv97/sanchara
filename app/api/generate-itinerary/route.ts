import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { generateItineraryWithGemini } from "@/lib/gemini"
import { fetchDestinationImage } from "@/lib/image-service"

export async function POST(request: Request) {
  try {
    const supabase = createClient()

    // Check if user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const {
      destination,
      startDate,
      endDate,
      budget,
      interests,
      accommodationType,
      transportationType,
      dietaryPreferences,
      accessibilityNeeds,
      additionalNotes,
    } = await request.json()

    // Validate input
    if (!destination || !startDate || !endDate || !budget || !interests) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    try {
      // Generate itinerary using Gemini
      const itineraryData = await generateItineraryWithGemini(
        destination,
        startDate,
        endDate,
        budget,
        interests,
        accommodationType,
        transportationType,
        dietaryPreferences,
        accessibilityNeeds,
        additionalNotes,
      )

      // Fetch a destination image
      const imageUrl = await fetchDestinationImage(destination)

      // Save to database with image URL and new preferences
      const { data: itinerary, error: itineraryError } = await supabase
        .from("itineraries")
        .insert({
          user_id: session.user.id,
          title: itineraryData.title,
          destination,
          start_date: startDate,
          end_date: endDate,
          budget,
          interests,
          image_url: imageUrl,
          accommodation_type: accommodationType || "any",
          transportation_type: transportationType || "any",
          dietary_preferences: dietaryPreferences || [],
          accessibility_needs: accessibilityNeeds || [],
          additional_notes: additionalNotes || "",
        })
        .select()
        .single()

      if (itineraryError) {
        console.error("Error saving itinerary:", itineraryError)
        return NextResponse.json({ error: "Failed to save itinerary" }, { status: 500 })
      }

      // Save itinerary days
      const itineraryDays = itineraryData.days.map((day) => ({
        itinerary_id: itinerary.id,
        day_number: day.day_number,
        date: day.date,
        description: day.description,
        activities: day.activities,
      }))

      const { error: daysError } = await supabase.from("itinerary_days").insert(itineraryDays)

      if (daysError) {
        console.error("Error saving itinerary days:", daysError)
        return NextResponse.json({ error: "Failed to save itinerary days" }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        itinerary: {
          ...itinerary,
          days: itineraryData.days,
        },
      })
    } catch (error: any) {
      console.error("Error with API:", error)

      // Handle rate limiting or API errors
      if (error.message?.includes("rate limit") || error.message?.includes("quota")) {
        return NextResponse.json(
          {
            error: "AI service is currently busy. Please try again in a few minutes.",
          },
          { status: 429 },
        )
      }

      return NextResponse.json(
        {
          error: "Failed to generate itinerary. Please try again later.",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error generating itinerary:", error)
    return NextResponse.json({ error: "Failed to generate itinerary" }, { status: 500 })
  }
}

