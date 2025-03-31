// Function to fetch a destination image from Unsplash
export async function fetchDestinationImage(destination: string): Promise<string> {
  try {
    // Use a fallback image if we can't fetch one
    const fallbackImage = `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(destination)}`

    // If we're in a development or testing environment without API keys
    if (!process.env.UNSPLASH_ACCESS_KEY) {
      console.warn("UNSPLASH_ACCESS_KEY not found, using fallback image")
      return fallbackImage
    }

    console.log("Fetching image for destination:", destination)
    console.log("Using Unsplash Access Key:", process.env.UNSPLASH_ACCESS_KEY ? "Key is present" : "Key is missing")

    // Fetch image from Unsplash
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      destination,
    )}&per_page=1&orientation=landscape`

    console.log("Fetching from URL:", url)

    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    })

    if (!response.ok) {
      console.error("Unsplash API error:", response.status, response.statusText)
      throw new Error(`Failed to fetch image: ${response.statusText}`)
    }

    const data = await response.json()
    console.log("Unsplash API response:", JSON.stringify(data).substring(0, 200) + "...")

    // Check if we got results
    if (data.results && data.results.length > 0) {
      console.log("Found image URL:", data.results[0].urls.regular)
      return data.results[0].urls.regular
    } else {
      console.warn(`No images found for destination: ${destination}`)
      return fallbackImage
    }
  } catch (error) {
    console.error("Error fetching destination image:", error)
    // Return a placeholder image with the destination name
    return `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(destination)}`
  }
}

