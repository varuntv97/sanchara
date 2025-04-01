import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createStorageService } from "@/lib/storage-service"

export async function PUT(request: Request, { params }: { params: { id: string; itemId: string } }) {
  try {
    // Await params to ensure it's fully resolved
    const { id, itemId } = await params

    const supabase = await createClient()
    const storageService = createStorageService();

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get the packing list to verify ownership
    const packingList = await storageService.getPackingList(id, user.id)
    if (!packingList) {
      return NextResponse.json({ error: "Packing list not found" }, { status: 404 })
    }

    // Get the updates
    const updates = await request.json()

    // Update the item
    const item = await storageService.updatePackingItem(itemId, updates)

    return NextResponse.json({ item })
  } catch (error) {
    console.error("Error updating packing item:", error)
    return NextResponse.json({ error: "Failed to update packing item" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string; itemId: string } }) {
  try {
    // Await params to ensure it's fully resolved
    const { id, itemId } = await params

    const supabase = await createClient()
    const storageService = createStorageService();

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get the packing list to verify ownership
    const packingList = await storageService.getPackingList(id, user.id)
    if (!packingList) {
      return NextResponse.json({ error: "Packing list not found" }, { status: 404 })
    }

    // Delete the item
    await storageService.deletePackingItem(itemId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting packing item:", error)
    return NextResponse.json({ error: "Failed to delete packing item" }, { status: 500 })
  }
}

