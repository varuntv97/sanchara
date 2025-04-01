export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      itineraries: {
        Row: {
          id: string
          user_id: string
          title: string
          destination: string
          start_date: string
          end_date: string
          budget: number | null
          interests: string[] | null
          image_url: string | null
          created_at: string
          updated_at: string
          accommodation_type?: string
          transportation_type?: string
          dietary_preferences?: string[]
          accessibility_needs?: string[]
          additional_notes?: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          destination: string
          start_date: string
          end_date: string
          budget?: number | null
          interests?: string[] | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
          accommodation_type?: string
          transportation_type?: string
          dietary_preferences?: string[]
          accessibility_needs?: string[]
          additional_notes?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          destination?: string
          start_date?: string
          end_date?: string
          budget?: number | null
          interests?: string[] | null
          image_url?: string | null
          created_at?: string
          updated_at?: string
          accommodation_type?: string
          transportation_type?: string
          dietary_preferences?: string[]
          accessibility_needs?: string[]
          additional_notes?: string
        }
      }
      itinerary_days: {
        Row: {
          id: string
          itinerary_id: string
          day_number: number
          date: string
          description: string
          activities: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          itinerary_id: string
          day_number: number
          date: string
          description: string
          activities: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          itinerary_id?: string
          day_number?: number
          date?: string
          description?: string
          activities?: Json
          created_at?: string
          updated_at?: string
        }
      }
      packing_lists: {
        Row: {
          id: string
          itinerary_id: string
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          itinerary_id: string
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          itinerary_id?: string
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      packing_items: {
        Row: {
          id: string
          packing_list_id: string
          name: string
          category: string
          quantity: number
          is_packed: boolean
          is_essential: boolean
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          packing_list_id: string
          name: string
          category: string
          quantity: number
          is_packed: boolean
          is_essential: boolean
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          packing_list_id?: string
          name?: string
          category?: string
          quantity?: number
          is_packed?: boolean
          is_essential?: boolean
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

