import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createStorageService } from "@/lib/storage-service"

export async function PUT(request: Request, { params }: { params: { id: string; dayId: string; index: string } }) {
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

    const { activity } = await request.json()
    const index = Number.parseInt(params.index)

    const updatedDay = await storageService.updateActivity(params.dayId, params.id, index, activity)

    return NextResponse.json({ success: true, day: updatedDay })
  } catch (error) {
    console.error("Error updating activity:", error)
    return NextResponse.json({ error: "Failed to update activity" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string; dayId: string; index: string } }) {
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

    const index = Number.parseInt(params.index)

    await storageService.deleteActivity(params.dayId, params.id, index)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting activity:", error)
    return NextResponse.json({ error: "Failed to delete activity" }, { status: 500 })
  }
}

