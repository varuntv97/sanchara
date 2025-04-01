import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createStorageService } from "@/lib/storage-service"

export async function GET(request: Request) {
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

    const itineraries = await storageService.getItineraries(session.user.id)

    return NextResponse.json({ itineraries })
  } catch (error) {
    console.error("Error fetching itineraries:", error)
    return NextResponse.json({ error: "Failed to fetch itineraries" }, { status: 500 })
  }
}

