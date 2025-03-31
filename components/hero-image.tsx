"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"

export function HeroImage() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl bg-muted animate-pulse"></div>
    )
  }

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
      {resolvedTheme === "dark" ? (
        <Image
          src="/dashboard-dark.png"
          alt="Sanchara dashboard in dark mode"
          fill
          className="object-cover"
          priority
        />
      ) : (
        <Image
          src="/dashboard-light.png"
          alt="Sanchara dashboard in light mode"
          fill
          className="object-cover"
          priority
        />
      )}
    </div>
  )
}

