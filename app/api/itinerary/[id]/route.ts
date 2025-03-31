import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()

    // Check if user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, description, days } = await request.json()

    // Validate input
    if (!title || !days) {
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

    // Update itinerary
    const { error: updateError } = await supabase
      .from("itineraries")
      .update({
        title,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .eq("user_id", session.user.id)

    if (updateError) {
      console.error("Error updating itinerary:", updateError)
      return NextResponse.json({ error: "Failed to update itinerary" }, { status: 500 })
    }

    // Update days
    for (const day of days) {
      const { error: dayError } = await supabase
        .from("itinerary_days")
        .update({
          description: day.description,
          activities: day.activities,
          updated_at: new Date().toISOString(),
        })
        .eq("id", day.id)
        .eq("itinerary_id", params.id)

      if (dayError) {
        console.error("Error updating day:", dayError)
        return NextResponse.json({ error: "Failed to update itinerary days" }, { status: 500 })
      }
    }

    return NextResponse.json({
      success: true,
      message: "Itinerary updated successfully",
    })
  } catch (error) {
    console.error("Error updating itinerary:", error)
    return NextResponse.json({ error: "Failed to update itinerary" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()

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

    // Delete itinerary (cascade will delete days)
    const { error: deleteError } = await supabase
      .from("itineraries")
      .delete()
      .eq("id", params.id)
      .eq("user_id", session.user.id)

    if (deleteError) {
      console.error("Error deleting itinerary:", deleteError)
      return NextResponse.json({ error: "Failed to delete itinerary" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: "Itinerary deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting itinerary:", error)
    return NextResponse.json({ error: "Failed to delete itinerary" }, { status: 500 })
  }
}

