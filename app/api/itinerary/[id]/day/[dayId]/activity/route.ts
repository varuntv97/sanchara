import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request, { params }: { params: { id: string; dayId: string } }) {
  try {
    const supabase = createClient()

    // Check if user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { activity } = await request.json()

    // Validate input
    if (!activity) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if itinerary exists and belongs to user
    const { data: itinerary, error: itineraryCheckError } = await supabase
      .from("itineraries")
      .select("*")
      .eq("id", params.id)
      .eq("user_id", session.user.id)
      .single()

    if (itineraryCheckError || !itinerary) {
      return NextResponse.json({ error: "Itinerary not found or access denied" }, { status: 404 })
    }

    // Get the day
    const { data: day, error: dayError } = await supabase
      .from("itinerary_days")
      .select("*")
      .eq("id", params.dayId)
      .eq("itinerary_id", params.id)
      .single()

    if (dayError || !day) {
      return NextResponse.json({ error: "Day not found" }, { status: 404 })
    }

    // Add the new activity
    const activities = [...day.activities, activity]

    // Update the day
    const { error: updateError } = await supabase
      .from("itinerary_days")
      .update({
        activities,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.dayId)
      .eq("itinerary_id", params.id)

    if (updateError) {
      console.error("Error adding activity:", updateError)
      return NextResponse.json({ error: "Failed to add activity" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Activity added successfully",
      activity,
    })
  } catch (error) {
    console.error("Error adding activity:", error)
    return NextResponse.json({ error: "Failed to add activity" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string; dayId: string } }) {
  try {
    const supabase = createClient()

    // Check if user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { activityIndex, updatedActivity } = await request.json()

    // Validate input
    if (activityIndex === undefined || !updatedActivity) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if itinerary exists and belongs to user
    const { data: itinerary, error: itineraryCheckError } = await supabase
      .from("itineraries")
      .select("*")
      .eq("id", params.id)
      .eq("user_id", session.user.id)
      .single()

    if (itineraryCheckError || !itinerary) {
      return NextResponse.json({ error: "Itinerary not found or access denied" }, { status: 404 })
    }

    // Get the day
    const { data: day, error: dayError } = await supabase
      .from("itinerary_days")
      .select("*")
      .eq("id", params.dayId)
      .eq("itinerary_id", params.id)
      .single()

    if (dayError || !day) {
      return NextResponse.json({ error: "Day not found" }, { status: 404 })
    }

    // Update the activity
    const activities = [...day.activities]
    activities[activityIndex] = updatedActivity

    // Update the day
    const { error: updateError } = await supabase
      .from("itinerary_days")
      .update({
        activities,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.dayId)
      .eq("itinerary_id", params.id)

    if (updateError) {
      console.error("Error updating activity:", updateError)
      return NextResponse.json({ error: "Failed to update activity" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Activity updated successfully",
      activity: updatedActivity,
    })
  } catch (error) {
    console.error("Error updating activity:", error)
    return NextResponse.json({ error: "Failed to update activity" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string; dayId: string } }) {
  try {
    const supabase = createClient()
    const url = new URL(request.url)
    const activityIndex = url.searchParams.get("index")

    if (!activityIndex) {
      return NextResponse.json({ error: "Missing activity index" }, { status: 400 })
    }

    // Check if user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if itinerary exists and belongs to user
    const { data: itinerary, error: itineraryCheckError } = await supabase
      .from("itineraries")
      .select("*")
      .eq("id", params.id)
      .eq("user_id", session.user.id)
      .single()

    if (itineraryCheckError || !itinerary) {
      return NextResponse.json({ error: "Itinerary not found or access denied" }, { status: 404 })
    }

    // Get the day
    const { data: day, error: dayError } = await supabase
      .from("itinerary_days")
      .select("*")
      .eq("id", params.dayId)
      .eq("itinerary_id", params.id)
      .single()

    if (dayError || !day) {
      return NextResponse.json({ error: "Day not found" }, { status: 404 })
    }

    // Remove the activity
    const activities = [...day.activities]
    activities.splice(Number.parseInt(activityIndex), 1)

    // Update the day
    const { error: updateError } = await supabase
      .from("itinerary_days")
      .update({
        activities,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.dayId)
      .eq("itinerary_id", params.id)

    if (updateError) {
      console.error("Error removing activity:", updateError)
      return NextResponse.json({ error: "Failed to remove activity" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Activity removed successfully",
    })
  } catch (error) {
    console.error("Error removing activity:", error)
    return NextResponse.json({ error: "Failed to remove activity" }, { status: 500 })
  }
}

