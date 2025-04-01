import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createStorageService } from "@/lib/storage-service"
import { generatePackingList } from "@/lib/packing-list-generator"

// Replace the entire GET function with this updated version:
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Await params to ensure it's fully resolved
    const { id } = await params

    const supabase = await createClient()
    const storageService = createStorageService();

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get the packing list
    const packingList = await storageService.getPackingList(id, user.id)

    return NextResponse.json({ packingList })
  } catch (error) {
    console.error("Error fetching packing list:", error)
    return NextResponse.json({ error: "Failed to fetch packing list" }, { status: 500 })
  }
}

// Replace the entire POST function with this updated version:
export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    // Await params to ensure it's fully resolved
    const { id } = await params

    const supabase = await createClient()
    const storageService = createStorageService();

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if packing list already exists
    const existingPackingList = await storageService.getPackingList(id, user.id)
    if (existingPackingList) {
      return NextResponse.json({ error: "Packing list already exists for this itinerary" }, { status: 400 })
    }

    // Get the itinerary to generate a packing list
    const itinerary = await storageService.getItinerary(id, user.id)

    // Generate packing list using Gemini
    const generatedList = await generatePackingList(
      itinerary.destination,
      itinerary.start_date,
      itinerary.end_date,
      itinerary.interests || [],
      itinerary.accommodation_type,
      itinerary.transportation_type,
      itinerary.additional_notes,
    )

    // Create the packing list in the database
    const packingList = await storageService.createPackingList(id, user.id, generatedList.items)

    return NextResponse.json({ packingList })
  } catch (error) {
    console.error("Error creating packing list:", error)
    return NextResponse.json({ error: "Failed to create packing list" }, { status: 500 })
  }
}

