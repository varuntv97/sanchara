import './globals.css'
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ClientLayout from "./client-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sanchara - AI-Powered Travel Planner",
  description: "Plan your perfect trip with AI-generated itineraries tailored to your preferences.",
  keywords: "travel, itinerary, AI, planner, personalized, trip planning",
  authors: [{ name: "Sanchara" }],
  creator: "Sanchara",
  publisher: "Sanchara",
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}