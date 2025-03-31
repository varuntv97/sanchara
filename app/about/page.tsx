import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PageTransition } from "@/components/animations/page-transition"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggeredChildren } from "@/components/animations/staggered-children"
import { Globe, Sparkles, Shield } from "lucide-react"

export default function AboutPage() {
    const teamMembers = [
        {
            name: "Aanya Sharma",
            role: "Founder & CEO",
            bio: "Travel enthusiast with a passion for technology and AI.",
            image: "/placeholder.svg?height=200&width=200&text=AS",
        },
        {
            name: "Raj Patel",
            role: "CTO",
            bio: "AI expert with a background in travel tech solutions.",
            image: "/placeholder.svg?height=200&width=200&text=RP",
        },
        {
            name: "Mei Lin",
            role: "Head of Design",
            bio: "UX/UI specialist focused on creating intuitive travel experiences.",
            image: "/placeholder.svg?height=200&width=200&text=ML",
        },
        {
            name: "David Kim",
            role: "Travel Curator",
            bio: "Professional traveler who has visited over 50 countries.",
            image: "/placeholder.svg?height=200&width=200&text=DK",
        },
    ]

    return (
        <PageTransition>
            <div className="container py-12">
                {/* Hero Section */}
                <FadeIn>
                    <div className="relative rounded-xl overflow-hidden mb-16">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 z-10"></div>
                        <div className="relative h-[300px] md:h-[400px] w-full bg-muted">
                            <Image
                                src="/placeholder.svg?height=400&width=1200&text=Sanchara+Team"
                                alt="Sanchara Team"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-6 text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Sanchara</h1>
                            <p className="text-lg md:text-xl max-w-2xl">
                                Reimagining travel planning with the power of artificial intelligence
                            </p>
                        </div>
                    </div>
                </FadeIn>

                {/* Our Story */}
                <FadeIn delay={0.1}>
                    <div className="mb-16">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-1 w-10 bg-primary"></div>
                            <h2 className="text-xl font-medium text-primary">Our Story</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <h3 className="text-3xl font-bold mb-4">Transforming Travel Planning</h3>
                                <p className="text-muted-foreground mb-4">
                                    Sanchara was born from a simple observation: planning travel should be as enjoyable as the journey
                                    itself.
                                </p>
                                <p className="mb-4">
                                    Founded in 2025, our team of travel enthusiasts and AI experts came together to create a platform that
                                    makes personalized travel planning accessible to everyone. We believe that every traveler deserves a
                                    unique itinerary tailored to their preferences, interests, and budget.
                                </p>
                                <p>
                                    Our mission is to eliminate the stress of travel planning while maximizing the joy of discovery. By
                                    leveraging cutting-edge AI technology, we're able to create detailed, personalized itineraries in
                                    seconds that would take hours or days to research manually.
                                </p>
                            </div>
                            <div className="relative h-[300px] rounded-xl overflow-hidden">
                                <Image
                                    src="/placeholder.svg?height=300&width=500&text=Our+Journey"
                                    alt="Our Journey"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </FadeIn>

                {/* Our Values */}
                <FadeIn delay={0.2}>
                    <div className="mb-16">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-1 w-10 bg-primary"></div>
                            <h2 className="text-xl font-medium text-primary">Our Values</h2>
                        </div>
                        <h3 className="text-3xl font-bold mb-8 text-center">What Drives Us</h3>

                        <StaggeredChildren className="grid md:grid-cols-3 gap-6">
                            <Card className="border-t-4 border-t-primary">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
                                        <Globe className="h-6 w-6 text-primary" />
                                    </div>
                                    <h4 className="text-xl font-bold mb-2">Personalization</h4>
                                    <p className="text-muted-foreground">
                                        We believe every traveler is unique, and their itineraries should be too. Our AI creates truly
                                        personalized experiences based on your preferences.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-t-4 border-t-primary">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
                                        <Sparkles className="h-6 w-6 text-primary" />
                                    </div>
                                    <h4 className="text-xl font-bold mb-2">Innovation</h4>
                                    <p className="text-muted-foreground">
                                        We're constantly pushing the boundaries of what's possible with AI in travel planning, always
                                        looking for new ways to enhance your experience.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-t-4 border-t-primary">
                                <CardContent className="pt-6">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
                                        <Shield className="h-6 w-6 text-primary" />
                                    </div>
                                    <h4 className="text-xl font-bold mb-2">Trust</h4>
                                    <p className="text-muted-foreground">
                                        We prioritize the security of your data and the reliability of our recommendations, ensuring you can
                                        trust Sanchara with your travel plans.
                                    </p>
                                </CardContent>
                            </Card>
                        </StaggeredChildren>
                    </div>
                </FadeIn>

                {/* Our Team */}
                {/* <FadeIn delay={0.3}>
                    <div className="mb-16">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-1 w-10 bg-primary"></div>
                            <h2 className="text-xl font-medium text-primary">Our Team</h2>
                        </div>
                        <h3 className="text-3xl font-bold mb-8 text-center">Meet the Minds Behind Sanchara</h3>

                        <StaggeredChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {teamMembers.map((member, index) => (
                                <Card key={index} className="overflow-hidden">
                                    <div className="relative h-48 w-full">
                                        <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                                    </div>
                                    <CardContent className="pt-4">
                                        <h4 className="text-lg font-bold">{member.name}</h4>
                                        <p className="text-sm text-primary mb-2">{member.role}</p>
                                        <p className="text-sm text-muted-foreground">{member.bio}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </StaggeredChildren>
                    </div>
                </FadeIn> */}

                {/* Stats */}
                {/* <FadeIn delay={0.4}>
                    <div className="mb-16 bg-muted rounded-xl p-8">
                        <h3 className="text-3xl font-bold mb-8 text-center">Sanchara by the Numbers</h3>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div>
                                <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                                <p className="text-muted-foreground">Itineraries Created</p>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                                <p className="text-muted-foreground">Countries Covered</p>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                                <p className="text-muted-foreground">Satisfaction Rate</p>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-primary mb-2">5K+</div>
                                <p className="text-muted-foreground">Happy Travelers</p>
                            </div>
                        </div>
                    </div>
                </FadeIn> */}

                {/* CTA */}
                <FadeIn delay={0.5}>
                    <div className="text-center">
                        <h3 className="text-3xl font-bold mb-4">Ready to Plan Your Next Adventure?</h3>
                        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                            Join thousands of travelers who have discovered their perfect itinerary with Sanchara.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/create-itinerary">
                                <Button size="lg" className="w-full sm:w-auto">
                                    Create Your Itinerary
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                    Contact Us
                                </Button>
                            </Link>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </PageTransition>
    )
}

