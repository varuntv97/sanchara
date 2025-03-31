"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageTransition } from "@/components/animations/page-transition"
import { FadeIn } from "@/components/animations/fade-in"
import { StaggeredChildren } from "@/components/animations/staggered-children"
import { HoverCard } from "@/components/animations/hover-card"
import { CalendarIcon, Clock, Search, ArrowRight } from "lucide-react"

export default function BlogPage() {
    const [searchQuery, setSearchQuery] = useState("")

    // Sample blog posts
    const posts = [
        {
            id: 1,
            title: "Top 10 Hidden Gems in Southeast Asia",
            excerpt:
                "Discover lesser-known destinations in Southeast Asia that offer authentic experiences away from the tourist crowds.",
            date: "March 28, 2025",
            category: "Destinations",
            readTime: "5 min read",
            image: "/placeholder.svg?height=300&width=500&text=Southeast+Asia",
            featured: true,
            tags: ["asia", "hidden gems", "budget travel"],
        },
        {
            id: 2,
            title: "How AI is Transforming Travel Planning",
            excerpt:
                "Explore how artificial intelligence is making travel planning more personalized and efficient than ever before.",
            date: "March 20, 2025",
            category: "Technology",
            readTime: "7 min read",
            image: "/placeholder.svg?height=300&width=500&text=AI+Travel",
            featured: true,
            tags: ["technology", "ai", "future of travel"],
        },
        {
            id: 3,
            title: "Budget Travel: See More for Less",
            excerpt: "Practical tips and strategies for maximizing your travel experiences while minimizing costs.",
            date: "March 15, 2025",
            category: "Travel Tips",
            readTime: "6 min read",
            image: "/placeholder.svg?height=300&width=500&text=Budget+Travel",
            featured: false,
            tags: ["budget", "tips", "saving"],
        },
        {
            id: 4,
            title: "The Ultimate Guide to Solo Travel",
            excerpt: "Everything you need to know about planning, preparing for, and enjoying a solo adventure.",
            date: "March 10, 2025",
            category: "Solo Travel",
            readTime: "8 min read",
            image: "/placeholder.svg?height=300&width=500&text=Solo+Travel",
            featured: false,
            tags: ["solo travel", "safety", "planning"],
        },
        {
            id: 5,
            title: "Sustainable Tourism: Travel Responsibly",
            excerpt: "Learn how to minimize your environmental impact while traveling and support local communities.",
            date: "March 5, 2025",
            category: "Sustainable Travel",
            readTime: "6 min read",
            image: "/placeholder.svg?height=300&width=500&text=Sustainable+Tourism",
            featured: false,
            tags: ["sustainability", "eco-friendly", "responsible travel"],
        },
        {
            id: 6,
            title: "Family-Friendly Destinations for 2025",
            excerpt: "The best destinations for families with children of all ages, with activities everyone will enjoy.",
            date: "February 28, 2025",
            category: "Family Travel",
            readTime: "7 min read",
            image: "/placeholder.svg?height=300&width=500&text=Family+Travel",
            featured: false,
            tags: ["family", "kid-friendly", "destinations"],
        },
    ]

    const categories = [
        "All",
        "Destinations",
        "Technology",
        "Travel Tips",
        "Solo Travel",
        "Sustainable Travel",
        "Family Travel",
    ]

    const featuredPosts = posts.filter((post) => post.featured)
    const filteredPosts = searchQuery
        ? posts.filter(
            (post) =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
        )
        : posts

    return (
        <PageTransition>
            <div className="container py-12">
                {/* Hero Section */}
                <FadeIn>
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">Sanchara Travel Blog</h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            Insights, tips, and inspiration for your next adventure
                        </p>
                    </div>
                </FadeIn>

                {/* Search Bar */}
                <FadeIn delay={0.1}>
                    <div className="relative max-w-xl mx-auto mb-12">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Search articles..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </FadeIn>

                {/* Featured Posts */}
                {!searchQuery && (
                    <FadeIn delay={0.2}>
                        <div className="mb-16">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="h-1 w-10 bg-primary"></div>
                                <h2 className="text-xl font-medium text-primary">Featured Articles</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {featuredPosts.map((post, index) => (
                                    <HoverCard key={post.id}>
                                        <Card className="overflow-hidden h-full flex flex-col">
                                            <div className="relative h-60 w-full">
                                                <Image
                                                    src={post.image || "/placeholder.svg"}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 hover:scale-105"
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <Badge className="bg-primary text-white hover:bg-primary/90">{post.category}</Badge>
                                                </div>
                                            </div>
                                            <CardHeader>
                                                <div className="flex items-center text-sm text-muted-foreground mb-2">
                                                    <CalendarIcon className="mr-1 h-3 w-3" />
                                                    <span>{post.date}</span>
                                                    <span className="mx-2">•</span>
                                                    <Clock className="mr-1 h-3 w-3" />
                                                    <span>{post.readTime}</span>
                                                </div>
                                                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                                            </CardContent>
                                            <CardFooter className="mt-auto">
                                                <Button variant="outline" className="w-full group">
                                                    Read Article
                                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </HoverCard>
                                ))}
                            </div>
                        </div>
                    </FadeIn>
                )}

                {/* Categories and All Posts */}
                <FadeIn delay={0.3}>
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="h-1 w-10 bg-primary"></div>
                            <h2 className="text-xl font-medium text-primary">{searchQuery ? "Search Results" : "All Articles"}</h2>
                        </div>

                        {!searchQuery && (
                            <Tabs defaultValue="All" className="mb-8">
                                <TabsList className="mb-4 flex-nowrap overflow-x-auto">
                                    {categories.map((category) => (
                                        <TabsTrigger key={category} value={category} className="whitespace-nowrap">
                                            {category}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>

                                {categories.map((category) => (
                                    <TabsContent key={category} value={category}>
                                        <StaggeredChildren className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {(category === "All" ? posts : posts.filter((post) => post.category === category)).map((post) => (
                                                <HoverCard key={post.id}>
                                                    <Card className="overflow-hidden h-full flex flex-col">
                                                        <div className="relative h-48 w-full">
                                                            <Image
                                                                src={post.image || "/placeholder.svg"}
                                                                alt={post.title}
                                                                fill
                                                                className="object-cover transition-transform duration-500 hover:scale-105"
                                                            />
                                                        </div>
                                                        <CardHeader>
                                                            <div className="flex items-center justify-between mb-2">
                                                                <Badge variant="outline">{post.category}</Badge>
                                                                <div className="flex items-center text-xs text-muted-foreground">
                                                                    <Clock className="mr-1 h-3 w-3" />
                                                                    <span>{post.readTime}</span>
                                                                </div>
                                                            </div>
                                                            <CardTitle className="line-clamp-2 text-lg">{post.title}</CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                                                        </CardContent>
                                                        <CardFooter className="mt-auto pt-0">
                                                            <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 group">
                                                                Read More
                                                                <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                                                            </Button>
                                                        </CardFooter>
                                                    </Card>
                                                </HoverCard>
                                            ))}
                                        </StaggeredChildren>
                                    </TabsContent>
                                ))}
                            </Tabs>
                        )}

                        {/* Search Results */}
                        {searchQuery && (
                            <>
                                <p className="mb-6 text-muted-foreground">
                                    Found {filteredPosts.length} {filteredPosts.length === 1 ? "result" : "results"} for "{searchQuery}"
                                </p>

                                <StaggeredChildren className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredPosts.map((post) => (
                                        <HoverCard key={post.id}>
                                            <Card className="overflow-hidden h-full flex flex-col">
                                                <div className="relative h-48 w-full">
                                                    <Image
                                                        src={post.image || "/placeholder.svg"}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover transition-transform duration-500 hover:scale-105"
                                                    />
                                                </div>
                                                <CardHeader>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <Badge variant="outline">{post.category}</Badge>
                                                        <div className="flex items-center text-xs text-muted-foreground">
                                                            <Clock className="mr-1 h-3 w-3" />
                                                            <span>{post.readTime}</span>
                                                        </div>
                                                    </div>
                                                    <CardTitle className="line-clamp-2 text-lg">{post.title}</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                                                </CardContent>
                                                <CardFooter className="mt-auto pt-0">
                                                    <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/80 group">
                                                        Read More
                                                        <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        </HoverCard>
                                    ))}
                                </StaggeredChildren>
                            </>
                        )}
                    </div>
                </FadeIn>

                {/* Newsletter */}
                <FadeIn delay={0.4}>
                    <div className="mt-16 bg-muted rounded-xl p-8 text-center">
                        <h3 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h3>
                        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                            Get the latest travel tips, destination guides, and Sanchara updates delivered straight to your inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <Input placeholder="Your email address" className="flex-grow" />
                            <Button>Subscribe</Button>
                        </div>
                    </div>
                </FadeIn>

                <div className="text-center mt-12">
                    <p className="text-muted-foreground mb-4">
                        This is a placeholder blog page. In a real application, these articles would be dynamic content.
                    </p>
                    <Link href="/">
                        <Button variant="outline">Return to Home</Button>
                    </Link>
                </div>
            </div>
        </PageTransition>
    )
}

