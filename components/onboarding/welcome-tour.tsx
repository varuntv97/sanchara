"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const steps = [
  {
    title: "Welcome to Sanchara!",
    description: "Your AI-powered travel companion that helps you create personalized travel itineraries.",
  },
  {
    title: "Create Your First Itinerary",
    description: "Click on 'Create New Itinerary' to start planning your next adventure with AI assistance.",
  },
  {
    title: "Customize Your Plans",
    description: "Edit any generated itinerary to make it perfect for your travel style and preferences.",
  },
  {
    title: "Access Anywhere",
    description: "Your itineraries are available on all your devices, even during your travels.",
  },
]

export function WelcomeTour() {
  const [open, setOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    // Check if this is the user's first visit
    const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding")
    if (!hasSeenOnboarding) {
      setOpen(true)
    }
  }, [])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleClose()
    }
  }

  const handleClose = () => {
    localStorage.setItem("hasSeenOnboarding", "true")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md max-w-[90vw] p-4 sm:p-6 rounded-lg">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl sm:text-2xl">{steps[currentStep].title || ''}</DialogTitle>
          <DialogDescription className="mt-2 text-sm sm:text-base">{steps[currentStep].description}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center py-4">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${index === currentStep ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between">
          <Button variant="outline" onClick={handleClose} className="w-full sm:w-auto order-2 sm:order-1">
            Skip Tour
          </Button>
          <Button onClick={handleNext} className="w-full sm:w-auto order-1 sm:order-2">
            {currentStep < steps.length - 1 ? "Next" : "Get Started"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

