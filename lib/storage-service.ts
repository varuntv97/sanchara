import { createClient } from "@/lib/supabase/server"
import type { Database } from "@/lib/database.types"
import type { PackingItem } from "@/lib/packing-list-generator"

type Itinerary = Database["public"]["Tables"]["itineraries"]["Row"]
type ItineraryDay = Database["public"]["Tables"]["itinerary_days"]["Row"]
type Profile = Database["public"]["Tables"]["profiles"]["Row"]
type PackingList = Database["public"]["Tables"]["packing_lists"]["Row"]
type PackingItemDB = Database["public"]["Tables"]["packing_items"]["Row"]

export class StorageService {
  private supabase = createClient()

  // Profile CRUD operations
  async getProfile(userId: string) {
    const { data, error } = await this.supabase.from("profiles").select("*").eq("id", userId).single()

    if (error) throw error
    return data
  }

  async updateProfile(userId: string, profile: Partial<Profile>) {
    const { data, error } = await this.supabase
      .from("profiles")
      .update({
        ...profile,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  // Itinerary CRUD operations
  async getItineraries(userId: string) {
    const { data, error } = await this.supabase
      .from("itineraries")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data || []
  }

  async getItinerary(itineraryId: string, userId: string) {
    const { data, error } = await this.supabase
      .from("itineraries")
      .select("*")
      .eq("id", itineraryId)
      .eq("user_id", userId)
      .single()

    if (error) throw error
    return data
  }

  async createItinerary(itinerary: Omit<Itinerary, "id" | "created_at" | "updated_at">) {
    const { data, error } = await this.supabase
      .from("itineraries")
      .insert({
        ...itinerary,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  async updateItinerary(itineraryId: string, userId: string, itinerary: Partial<Itinerary>) {
    const { data, error } = await this.supabase
      .from("itineraries")
      .update({
        ...itinerary,
        updated_at: new Date().toISOString(),
      })
      .eq("id", itineraryId)
      .eq("user_id", userId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async deleteItinerary(itineraryId: string, userId: string) {
    const { error } = await this.supabase.from("itineraries").delete().eq("id", itineraryId).eq("user_id", userId)

    if (error) throw error
    return true
  }

  // Itinerary Day CRUD operations
  async getItineraryDays(itineraryId: string) {
    const { data, error } = await this.supabase
      .from("itinerary_days")
      .select("*")
      .eq("itinerary_id", itineraryId)
      .order("day_number", { ascending: true })

    if (error) throw error
    return data || []
  }

  async getItineraryDay(dayId: string, itineraryId: string) {
    const { data, error } = await this.supabase
      .from("itinerary_days")
      .select("*")
      .eq("id", dayId)
      .eq("itinerary_id", itineraryId)
      .single()

    if (error) throw error
    return data
  }

  async createItineraryDay(day: Omit<ItineraryDay, "id" | "created_at" | "updated_at">) {
    const { data, error } = await this.supabase
      .from("itinerary_days")
      .insert({
        ...day,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  async updateItineraryDay(dayId: string, itineraryId: string, day: Partial<ItineraryDay>) {
    const { data, error } = await this.supabase
      .from("itinerary_days")
      .update({
        ...day,
        updated_at: new Date().toISOString(),
      })
      .eq("id", dayId)
      .eq("itinerary_id", itineraryId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async deleteItineraryDay(dayId: string, itineraryId: string) {
    const { error } = await this.supabase
      .from("itinerary_days")
      .delete()
      .eq("id", dayId)
      .eq("itinerary_id", itineraryId)

    if (error) throw error
    return true
  }

  // Activity operations (activities are stored as JSON in itinerary_days)
  async addActivity(dayId: string, itineraryId: string, activity: any) {
    // First get the current day
    const day = await this.getItineraryDay(dayId, itineraryId)

    // Add the new activity
    const activities = [...day.activities, activity]

    // Update the day
    return this.updateItineraryDay(dayId, itineraryId, { activities })
  }

  async updateActivity(dayId: string, itineraryId: string, activityIndex: number, activity: any) {
    // First get the current day
    const day = await this.getItineraryDay(dayId, itineraryId)

    // Update the activity
    const activities = [...day.activities]
    activities[activityIndex] = activity

    // Update the day
    return this.updateItineraryDay(dayId, itineraryId, { activities })
  }

  async deleteActivity(dayId: string, itineraryId: string, activityIndex: number) {
    // First get the current day
    const day = await this.getItineraryDay(dayId, itineraryId)

    // Remove the activity
    const activities = [...day.activities]
    activities.splice(activityIndex, 1)

    // Update the day
    return this.updateItineraryDay(dayId, itineraryId, { activities })
  }

  async reorderActivities(dayId: string, itineraryId: string, activities: any[]) {
    // Update the day with the reordered activities
    return this.updateItineraryDay(dayId, itineraryId, { activities })
  }

  // Complete itinerary with days
  async getCompleteItinerary(itineraryId: string, userId: string) {
    // Get the itinerary
    const itinerary = await this.getItinerary(itineraryId, userId)

    // Get the days
    const days = await this.getItineraryDays(itineraryId)

    // Return the complete itinerary
    return {
      ...itinerary,
      days,
    }
  }

  // Packing List operations
  async getPackingList(itineraryId: string, userId: string) {
    // Check if packing list exists
    const { data: packingList, error: packingListError } = await this.supabase
      .from("packing_lists")
      .select("*")
      .eq("itinerary_id", itineraryId)
      .eq("user_id", userId)
      .single()

    if (packingListError) {
      if (packingListError.code === "PGRST116") {
        // No packing list found
        return null
      }
      throw packingListError
    }

    // Get packing items
    const { data: items, error: itemsError } = await this.supabase
      .from("packing_items")
      .select("*")
      .eq("packing_list_id", packingList.id)
      .order("category", { ascending: true })
      .order("name", { ascending: true })

    if (itemsError) throw itemsError

    return {
      id: packingList.id,
      itinerary_id: packingList.itinerary_id,
      items: items || [],
    }
  }

  async createPackingList(itineraryId: string, userId: string, items: PackingItem[]) {
    // First, create the packing list
    const { data: packingList, error: packingListError } = await this.supabase
      .from("packing_lists")
      .insert({
        itinerary_id: itineraryId,
        user_id: userId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (packingListError) throw packingListError

    // Then, create all the packing items
    if (items.length > 0) {
      const packingItems = items.map((item) => ({
        packing_list_id: packingList.id,
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        is_packed: item.is_packed,
        is_essential: item.is_essential,
        notes: item.notes,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }))

      const { error: itemsError } = await this.supabase.from("packing_items").insert(packingItems)

      if (itemsError) throw itemsError
    }

    return this.getPackingList(itineraryId, userId)
  }

  async updatePackingItem(itemId: string, updates: Partial<PackingItemDB>) {
    const { data, error } = await this.supabase
      .from("packing_items")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", itemId)
      .select()
      .single()

    if (error) throw error
    return data
  }

  async addPackingItem(packingListId: string, item: Omit<PackingItemDB, "id" | "created_at" | "updated_at">) {
    const { data, error } = await this.supabase
      .from("packing_items")
      .insert({
        ...item,
        packing_list_id: packingListId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return data
  }

  async deletePackingItem(itemId: string) {
    const { error } = await this.supabase.from("packing_items").delete().eq("id", itemId)

    if (error) throw error
    return true
  }
}

// Create a singleton instance
// export const storageService = new StorageService()

export const createStorageService = () => new StorageService();


