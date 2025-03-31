import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Compass, ArrowRight } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggeredChildren } from "@/components/animations/staggered-children"
import { ButtonAnimation } from "@/components/animations/button-animation"
import { HeroImage } from "@/components/hero-image"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <FadeIn direction="right">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Your AI Travel Companion
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Plan your perfect trip with AI-generated itineraries tailored to your preferences.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/create-itinerary">
                    <ButtonAnimation>
                      <Button size="lg" className="gap-1.5 group">
                        Plan Your Trip
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </ButtonAnimation>
                  </Link>
                  <Link href="/signup">
                    <ButtonAnimation>
                      <Button size="lg" variant="outline" className="transition-all duration-300 hover:bg-primary/10">
                        Sign Up Free
                      </Button>
                    </ButtonAnimation>
                  </Link>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="left" delay={0.3}>
              <div className="flex items-center justify-center">
                <HeroImage />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <FadeIn>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Create personalized travel itineraries in just a few simple steps.
                </p>
              </div>
            </div>
          </FadeIn>
          <StaggeredChildren className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 hover:scale-110">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Choose Destination</h3>
                <p className="text-muted-foreground">Select your dream destination and tell us about your interests.</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 hover:scale-110">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Set Dates & Budget</h3>
                <p className="text-muted-foreground">Tell us when you're traveling and how much you want to spend.</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 hover:scale-110">
                <Compass className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Get Your Itinerary</h3>
                <p className="text-muted-foreground">Receive a personalized day-by-day plan for your perfect trip.</p>
              </div>
            </div>
          </StaggeredChildren>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <FadeIn>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Plan Your Next Adventure?
                </h2>
                <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Start your next trip with Sanchara - the smart travel planner for personalized itineraries.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row mt-4">
                <Link href="/create-itinerary">
                  <ButtonAnimation>
                    <Button size="lg" className="gap-1.5 group">
                      Create Your Itinerary
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </ButtonAnimation>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}

