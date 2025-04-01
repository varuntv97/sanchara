import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createStorageService } from "@/lib/storage-service"

export async function GET(request: Request) {
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

    const profile = await storageService.getProfile(session.user.id)

    return NextResponse.json({ profile })
  } catch (error) {
    console.error("Error fetching profile:", error)
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
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

    const profile = await storageService.updateProfile(session.user.id, updates)

    return NextResponse.json({ profile })
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
}

