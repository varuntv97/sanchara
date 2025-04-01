import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createStorageService } from "@/lib/storage-service"

export async function POST(request: Request, { params }: { params: { id: string; dayId: string } }) {
  try {
    const supabase = createClient()
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

    const { activity } = await request.json()

    const updatedDay = await storageService.addActivity(params.dayId, params.id, activity)

    return NextResponse.json({ success: true, day: updatedDay })
  } catch (error) {
    console.error("Error adding activity:", error)
    return NextResponse.json({ error: "Failed to add activity" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string; dayId: string } }) {
  try {
    const supabase = createClient()
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

    const { activities } = await request.json()

    const updatedDay = await storageService.reorderActivities(params.dayId, params.id, activities)

    return NextResponse.json({ success: true, day: updatedDay })
  } catch (error) {
    console.error("Error reordering activities:", error)
    return NextResponse.json({ error: "Failed to reorder activities" }, { status: 500 })
  }
}

