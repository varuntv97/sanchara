import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createStorageService } from "@/lib/storage-service"

export async function GET(request: Request, { params }: { params: { id: string } }) {
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

    const days = await storageService.getItineraryDays(params.id)

    return NextResponse.json({ days })
  } catch (error) {
    console.error("Error fetching itinerary days:", error)
    return NextResponse.json({ error: "Failed to fetch itinerary days" }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
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

    const dayData = await request.json()

    const day = await storageService.createItineraryDay({
      ...dayData,
      itinerary_id: params.id,
    })

    return NextResponse.json({ day })
  } catch (error) {
    console.error("Error creating itinerary day:", error)
    return NextResponse.json({ error: "Failed to create itinerary day" }, { status: 500 })
  }
}

