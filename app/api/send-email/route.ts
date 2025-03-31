import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const supabase = createClient()

    // Check if user is authenticated
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { email, itineraryId } = await request.json()

    if (!email || !itineraryId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get itinerary data
    const { data: itinerary, error: itineraryError } = await supabase
      .from("itineraries")
      .select("*")
      .eq("id", itineraryId)
      .eq("user_id", session.user.id)
      .single()

    if (itineraryError || !itinerary) {
      return NextResponse.json({ error: "Itinerary not found" }, { status: 404 })
    }

    // Get itinerary days
    const { data: days, error: daysError } = await supabase
      .from("itinerary_days")
      .select("*")
      .eq("itinerary_id", itineraryId)
      .order("day_number", { ascending: true })

    if (daysError) {
      return NextResponse.json({ error: "Failed to fetch itinerary days" }, { status: 500 })
    }

    // Mock email sending
    console.log(`Sending email to ${email} with itinerary for ${itinerary.destination}`)

    // In a real application, you would use an email service like Resend or Nodemailer here

    return NextResponse.json({
      success: true,
      message: `Itinerary sent to ${email}`,
    })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}

