import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createStorageService } from "@/lib/storage-service";

export async function GET(request: Request, { params }: { params: { id: string } }) {
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

    const itinerary = await storageService.getCompleteItinerary(params.id, session.user.id)

    return NextResponse.json({ itinerary })
  } catch (error) {
    console.error("Error fetching itinerary:", error)
    return NextResponse.json({ error: "Failed to fetch itinerary" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
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

    const updates = await request.json()

    const updatedItinerary = await storageService.updateItinerary(params.id, session.user.id, updates)

    return NextResponse.json({ itinerary: updatedItinerary })
  } catch (error) {
    console.error("Error updating itinerary:", error)
    return NextResponse.json({ error: "Failed to update itinerary" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
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

    await storageService.deleteItinerary(params.id, session.user.id)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting itinerary:", error)
    return NextResponse.json({ error: "Failed to delete itinerary" }, { status: 500 })
  }
}

