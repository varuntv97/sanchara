import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createStorageService } from "@/lib/storage-service"

export async function POST(request: Request, { params }: { params: { id: string } }) {
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

    // Get the packing list
    const packingList = await storageService.getPackingList(params.id, session.user.id)
    if (!packingList) {
      return NextResponse.json({ error: "Packing list not found" }, { status: 404 })
    }

    // Get the new item data
    const newItem = await request.json()

    // Add the item to the packing list
    const item = await storageService.addPackingItem(packingList.id, {
      packing_list_id: packingList.id,
      name: newItem.name,
      category: newItem.category,
      quantity: newItem.quantity || 1,
      is_packed: newItem.is_packed || false,
      is_essential: newItem.is_essential || false,
      notes: newItem.notes || null,
    })

    return NextResponse.json({ item })
  } catch (error) {
    console.error("Error adding packing item:", error)
    return NextResponse.json({ error: "Failed to add packing item" }, { status: 500 })
  }
}

