import { getGeminiClient } from "@/lib/gemini"

export interface PackingItem {
  name: string
  category: string
  quantity: number
  is_packed: boolean
  is_essential: boolean
  notes: string | null
}

export interface PackingList {
  categories: string[]
  items: PackingItem[]
}

export async function generatePackingList(
  destination: string,
  startDate: string,
  endDate: string,
  interests: string[],
  accommodationType?: string,
  transportationType?: string,
  additionalNotes?: string,
): Promise<PackingList> {
  try {
    const genAI = getGeminiClient()
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

    const start = new Date(startDate)
    const end = new Date(endDate)
    const tripDuration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1

    // Format preferences for the prompt
    const formattedAccommodationType =
      accommodationType && accommodationType !== "any"
        ? `Accommodation: ${accommodationType}`
        : "No specific accommodation preference"

    const formattedTransportationType =
      transportationType && transportationType !== "any"
        ? `Transportation: ${transportationType}`
        : "No specific transportation preference"

    const formattedAdditionalNotes = additionalNotes ? `Additional Notes: ${additionalNotes}` : ""

    const prompt = `
      Create a detailed packing list for a ${tripDuration}-day trip to ${destination}.
      
      Trip details:
      - Start date: ${startDate}
      - End date: ${endDate}
      - Duration: ${tripDuration} days
      - Interests: ${interests.join(", ")}
      - ${formattedAccommodationType}
      - ${formattedTransportationType}
      - ${formattedAdditionalNotes}
      
      Generate a comprehensive packing list organized by categories (like Clothing, Toiletries, Electronics, Documents, etc.).
      For each item, include:
      1. Name of the item
      2. Category it belongs to
      3. Recommended quantity
      4. Whether it's essential (true/false)
      5. Optional notes or tips about the item
      
      Format the response as a JSON object with this structure:
      {
        "categories": ["Category1", "Category2", ...],
        "items": [
          {
            "name": "Item name",
            "category": "Category name",
            "quantity": 1,
            "is_essential": true,
            "notes": "Optional note about the item"
          }
        ]
      }
      
      IMPORTANT: 
      - Ensure all property names and string values are properly double-quoted in the JSON.
      - Tailor the packing list to the destination's typical weather during the travel dates.
      - Include items specific to the listed interests.
      - Return ONLY the JSON object without any additional text or code blocks.
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Extract the JSON from the response
    let jsonString = text

    // If the response is wrapped in code blocks, extract just the JSON
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/)
    if (jsonMatch && jsonMatch[1]) {
      jsonString = jsonMatch[1]
    }

    try {
      // Parse the JSON
      const packingListData = JSON.parse(jsonString)

      // Add is_packed: false to each item
      const items = packingListData.items.map((item: any) => ({
        ...item,
        is_packed: false,
      }))

      return {
        categories: packingListData.categories,
        items,
      }
    } catch (parseError) {
      console.error("JSON parsing failed:", parseError)

      // Return a fallback packing list
      return generateFallbackPackingList(destination, tripDuration)
    }
  } catch (error) {
    console.error("Error generating packing list with Gemini:", error)
    return generateFallbackPackingList(destination, tripDuration)
  }
}

function generateFallbackPackingList(destination: string, duration: number): PackingList {
  // Create a basic packing list as fallback
  const categories = ["Clothing", "Toiletries", "Electronics", "Documents", "Miscellaneous"]

  const items: PackingItem[] = [
    {
      name: "T-shirts",
      category: "Clothing",
      quantity: Math.min(duration, 7),
      is_packed: false,
      is_essential: true,
      notes: null,
    },
    {
      name: "Underwear",
      category: "Clothing",
      quantity: Math.min(duration + 2, 10),
      is_packed: false,
      is_essential: true,
      notes: null,
    },
    {
      name: "Socks",
      category: "Clothing",
      quantity: Math.min(duration, 7),
      is_packed: false,
      is_essential: true,
      notes: null,
    },
    {
      name: "Pants/Shorts",
      category: "Clothing",
      quantity: Math.ceil(duration / 3),
      is_packed: false,
      is_essential: true,
      notes: null,
    },
    { name: "Toothbrush", category: "Toiletries", quantity: 1, is_packed: false, is_essential: true, notes: null },
    { name: "Toothpaste", category: "Toiletries", quantity: 1, is_packed: false, is_essential: true, notes: null },
    { name: "Shampoo", category: "Toiletries", quantity: 1, is_packed: false, is_essential: true, notes: null },
    { name: "Soap/Body wash", category: "Toiletries", quantity: 1, is_packed: false, is_essential: true, notes: null },
    { name: "Phone charger", category: "Electronics", quantity: 1, is_packed: false, is_essential: true, notes: null },
    { name: "Phone", category: "Electronics", quantity: 1, is_packed: false, is_essential: true, notes: null },
    {
      name: "Passport",
      category: "Documents",
      quantity: 1,
      is_packed: false,
      is_essential: true,
      notes: "Keep in a secure place",
    },
    { name: "Travel insurance", category: "Documents", quantity: 1, is_packed: false, is_essential: true, notes: null },
    {
      name: "Credit/Debit cards",
      category: "Documents",
      quantity: 2,
      is_packed: false,
      is_essential: true,
      notes: null,
    },
    {
      name: "First aid kit",
      category: "Miscellaneous",
      quantity: 1,
      is_packed: false,
      is_essential: true,
      notes: null,
    },
    {
      name: "Water bottle",
      category: "Miscellaneous",
      quantity: 1,
      is_packed: false,
      is_essential: false,
      notes: null,
    },
  ]

  return { categories, items }
}

