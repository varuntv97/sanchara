import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Google Generative AI with the API key
export function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not defined in environment variables")
  }

  return new GoogleGenerativeAI(apiKey)
}

// Function to generate travel itinerary using Gemini
export async function generateItineraryWithGemini(
  destination: string,
  startDate: string,
  endDate: string,
  budget: number,
  interests: string[],
  accommodationType = "any",
  transportationType = "any",
  dietaryPreferences: string[] = [],
  accessibilityNeeds: string[] = [],
  additionalNotes = "",
) {
  try {
    const genAI = getGeminiClient()
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" })

    const start = new Date(startDate)
    const end = new Date(endDate)
    const dayCount = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1

    // Format preferences for the prompt
    const formattedDietaryPreferences =
      dietaryPreferences && dietaryPreferences.length > 0 && !dietaryPreferences.includes("none")
        ? `Dietary Preferences: ${dietaryPreferences.join(", ")}`
        : "No specific dietary preferences"

    const formattedAccessibilityNeeds =
      accessibilityNeeds && accessibilityNeeds.length > 0 && !accessibilityNeeds.includes("none")
        ? `Accessibility Needs: ${accessibilityNeeds.join(", ")}`
        : "No specific accessibility requirements"

    const formattedAccommodationType =
      accommodationType && accommodationType !== "any"
        ? `Preferred Accommodation: ${accommodationType}`
        : "No specific accommodation preference"

    const formattedTransportationType =
      transportationType && transportationType !== "any"
        ? `Preferred Transportation: ${transportationType}`
        : "No specific transportation preference"

    const formattedAdditionalNotes = additionalNotes ? `Additional Notes: ${additionalNotes}` : ""

    const prompt = `
      Create a detailed ${dayCount}-day travel itinerary for ${destination}.
      
      Trip details:
      - Start date: ${startDate}
      - End date: ${endDate}
      - Budget: ₹${budget}
      
      For each day, provide:
      1. A day number
      2. The date (YYYY-MM-DD format)
      3. A brief description of the day
      4. 3-4 activities that align with the interests and preferences, including:
         - Type (matching one of the interests when possible)
         - Title
         - Description (mention if it accommodates dietary preferences or accessibility needs when relevant)
         - Recommended time
         - Estimated cost in INR
         - A placeholder link (use https://example.com/...)
      
      Format the response as a JSON object with this structure:
      {
        "title": "X-Day Adventure in [Destination]",
        "days": [
          {
            "day_number": 1,
            "date": "YYYY-MM-DD",
            "description": "Day 1 description",
            "activities": [
              {
                "type": "interest-type",
                "title": "Activity title",
                "description": "Activity description",
                "time": "HH:MM",
                "cost": 5000,
                "link": "https://example.com/..."
              }
            ]
          }
        ]
      }
      
      IMPORTANT: 
      - Ensure all property names and string values are properly double-quoted in the JSON. Do not use single quotes or unquoted property names.
      - Ensure all costs add up to be within the total budget of ₹${budget}.
      - When relevant, include accommodation recommendations that match the preferred type.
      - Include transportation options that align with the preferred type.
      - For food recommendations, respect dietary preferences.
      - Ensure activities are accessible according to the specified accessibility needs.
      - Return ONLY the JSON object without any additional text, markdown formatting, or code blocks.
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
      // First try to parse the JSON as-is
      return JSON.parse(jsonString)
    } catch (parseError) {
      console.error("Initial JSON parsing failed:", parseError)

      // If that fails, try to fix common JSON formatting issues
      try {
        // Fix unquoted property names
        const fixedJson = jsonString
          // Replace property names that aren't properly quoted
          .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3')
          // Replace single quotes with double quotes (but not within content)
          .replace(/([{,]\s*"\w+")\s*:\s*'([^']*?)'/g, '$1: "$2"')
          // Remove trailing commas in objects and arrays
          .replace(/,(\s*[}\]])/g, "$1")
          // Fix any // comments that might be in the JSON
          .replace(/\/\/.*$/gm, "")
          // Fix any /* */ comments that might be in the JSON
          .replace(/\/\*[\s\S]*?\*\//g, "")

        console.log("Attempting to parse fixed JSON:", fixedJson.substring(0, 100) + "...")
        return JSON.parse(fixedJson)
      } catch (fixedParseError) {
        console.error("Failed to parse fixed JSON:", fixedParseError)

        // If all else fails, create a minimal valid response
        console.log("Generating fallback itinerary data")
        return {
          title: `${dayCount}-Day Adventure in ${destination}`,
          days: Array.from({ length: dayCount }, (_, i) => {
            const currentDate = new Date(startDate)
            currentDate.setDate(currentDate.getDate() + i)
            return {
              day_number: i + 1,
              date: currentDate.toISOString().split("T")[0],
              description: `Day ${i + 1} in ${destination}`,
              activities: [
                {
                  type: interests[0] || "sightseeing",
                  title: `Explore ${destination}`,
                  description: `Spend the day exploring the highlights of ${destination}.`,
                  time: "09:00",
                  cost: Math.round(budget / (dayCount * 3)),
                  link: "https://example.com/explore",
                },
              ],
            }
          }),
        }
      }
    }
  } catch (error) {
    console.error("Error generating itinerary with Gemini:", error)
    throw error
  }
}

