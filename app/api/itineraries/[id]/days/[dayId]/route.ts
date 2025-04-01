import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createStorageService } from "@/lib/storage-service"

export async function GET(request: Request, { params }: { params: { id: string; dayId: string } }) {
  try {
    const supabase = await createClient()
    const storageService = createStorageService();

    // Check if user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify user owns the itinerary
    await storageService.getItinerary(params.id, session.user.id)

    const day = await storageService.getItineraryDay(params.dayId, params.id)

    return NextResponse.json({ day })
  } catch (error) {
    console.error("Error fetching itinerary day:", error)
    return NextResponse.json({ error: "Failed to fetch itinerary day" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string; dayId: string } }) {
  try {
    const supabase = await createClient()
    const storageService = createStorageService();

    // Check if user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify user owns the itinerary
    await storageService.getItinerary(params.id, session.user.id)

    const updates = await request.json()

    const day = await storageService.updateItineraryDay(params.dayId, params.id, updates)

    return NextResponse.json({ day })
  } catch (error) {
    console.error("Error updating itinerary day:", error)
    return NextResponse.json({ error: "Failed to update itinerary day" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string; dayId: string } }) {
  try {
    const supabase = await createClient()
    const storageService = createStorageService();

    // Check if user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify user owns the itinerary
    await storageService.getItinerary(params.id, session.user.id)

    await storageService.deleteItineraryDay(params.dayId, params.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting itinerary day:", error)
    return NextResponse.json({ error: "Failed to delete itinerary day" }, { status: 500 })
  }
}

