"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PageTransition } from "@/components/animations/page-transition"
import { FadeIn } from "@/components/animations/fade-in"
import { ButtonAnimation } from "@/components/animations/button-animation"
import { Loader2, Mail, MapPin, Phone, MessageSquare, HelpCircle } from "lucide-react"

export default function ContactPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [message, setMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { toast } = useToast()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate form submission
        setTimeout(() => {
            toast({
                title: "Message sent!",
                description: "We'll get back to you as soon as possible.",
            })
            setName("")
            setEmail("")
            setSubject("")
            setMessage("")
            setIsSubmitting(false)
        }, 1500)
    }

    const faqs = [
        {
            question: "How does Sanchara generate travel itineraries?",
            answer:
                "Sanchara uses advanced AI technology to analyze your preferences, budget, and travel dates to create personalized itineraries. Our system considers factors like your interests, accommodation preferences, and dietary needs to suggest the most suitable activities and destinations.",
        },
        {
            question: "Can I edit my itinerary after it's generated?",
            answer:
                "Yes! All itineraries are fully customizable. You can add, remove, or modify activities, change accommodations, adjust timings, and more to make the itinerary perfect for your needs.",
        },
        {
            question: "Is Sanchara available worldwide?",
            answer:
                "Currently, Sanchara supports destinations across Asia, Europe, North America, and parts of South America and Oceania. We're continuously expanding our coverage to include more destinations worldwide.",
        },
        {
            question: "How much does it cost to use Sanchara?",
            answer:
                "Sanchara offers a free tier that allows you to create basic itineraries. For more advanced features like unlimited itineraries, offline access, and premium recommendations, we offer subscription plans starting at ₹499 per month.",
        },
        {
            question: "Can I share my itinerary with travel companions?",
            answer:
                "You can easily share your itineraries via email or generate a shareable link that allows your travel companions to view the complete plan.",
        },
    ]

    return (
        <PageTransition>
            <div className="container py-12">
                {/* Hero Section */}
                <FadeIn>
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                            Have questions, feedback, or need assistance? We're here to help!
                        </p>
                    </div>
                </FadeIn>

                {/* Contact Options */}
                <FadeIn delay={0.1}>
                    <Tabs defaultValue="form" className="mb-12">
                        <TabsList className="grid w-full grid-cols-3 mb-8">
                            <TabsTrigger value="form" className="flex items-center gap-2">
                                <MessageSquare className="h-4 w-4" />
                                <span>Contact Form</span>
                            </TabsTrigger>
                            <TabsTrigger value="faq" className="flex items-center gap-2">
                                <HelpCircle className="h-4 w-4" />
                                <span>FAQs</span>
                            </TabsTrigger>
                            <TabsTrigger value="info" className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>Contact Info</span>
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="form">
                            <div className="grid md:grid-cols-2 gap-8">
                                <Card>
                                    <form onSubmit={handleSubmit}>
                                        <CardHeader>
                                            <CardTitle>Send us a message</CardTitle>
                                            <CardDescription>
                                                Fill out the form below and we'll get back to you as soon as possible.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Name</Label>
                                                <Input
                                                    id="name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="subject">Subject</Label>
                                                <Input
                                                    id="subject"
                                                    value={subject}
                                                    onChange={(e) => setSubject(e.target.value)}
                                                    required
                                                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="message">Message</Label>
                                                <Textarea
                                                    id="message"
                                                    rows={5}
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    required
                                                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                                                />
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <ButtonAnimation className="w-full">
                                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                                    {isSubmitting ? (
                                                        <>
                                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                                                        </>
                                                    ) : (
                                                        "Send Message"
                                                    )}
                                                </Button>
                                            </ButtonAnimation>
                                        </CardFooter>
                                    </form>
                                </Card>

                                <div className="relative rounded-xl overflow-hidden h-[400px]">
                                    <Image
                                        src="/placeholder.svg?height=400&width=600&text=Contact+Us"
                                        alt="Contact Us"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                                        <h3 className="text-2xl font-bold mb-4">We'd Love to Hear From You</h3>
                                        <p className="mb-4">
                                            Whether you have a question about features, pricing, or anything else, our team is ready to answer
                                            all your questions.
                                        </p>
                                        <p className="text-sm opacity-80">Response time: Usually within 24 hours</p>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="faq">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Frequently Asked Questions</CardTitle>
                                    <CardDescription>Find quick answers to common questions about Sanchara.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Accordion type="single" collapsible className="w-full">
                                        {faqs.map((faq, index) => (
                                            <AccordionItem key={index} value={`item-${index}`}>
                                                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                                                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </CardContent>
                                <CardFooter className="flex-col items-start">
                                    <p className="text-muted-foreground mb-4">
                                        Didn't find what you're looking for? Contact us directly.
                                    </p>
                                    <ButtonAnimation>
                                        <Button variant="outline" onClick={() => document.querySelector('[data-value="form"]')?.click()}>
                                            Contact Support
                                        </Button>
                                    </ButtonAnimation>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        <TabsContent value="info">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Contact Information</CardTitle>
                                    <CardDescription>Multiple ways to reach our team</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div className="flex flex-col items-center text-center p-4 rounded-lg border">
                                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                                <Mail className="h-6 w-6 text-primary" />
                                            </div>
                                            <h3 className="font-medium mb-2">Email Us</h3>
                                            <p className="text-sm text-muted-foreground mb-2">For general inquiries:</p>
                                            <p className="text-sm font-medium">contact@sanchara-example.com</p>
                                            <p className="text-sm text-muted-foreground mt-2 mb-2">For support:</p>
                                            <p className="text-sm font-medium">support@sanchara-example.com</p>
                                        </div>

                                        <div className="flex flex-col items-center text-center p-4 rounded-lg border">
                                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                                <Phone className="h-6 w-6 text-primary" />
                                            </div>
                                            <h3 className="font-medium mb-2">Call Us</h3>
                                            <p className="text-sm text-muted-foreground mb-2">Customer Support:</p>
                                            <p className="text-sm font-medium">+91 12345 67890</p>
                                            <p className="text-sm text-muted-foreground mt-2 mb-2">Business Inquiries:</p>
                                            <p className="text-sm font-medium">+91 12345 67890</p>
                                        </div>

                                        <div className="flex flex-col items-center text-center p-4 rounded-lg border">
                                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                                <MapPin className="h-6 w-6 text-primary" />
                                            </div>
                                            <h3 className="font-medium mb-2">Visit Us</h3>
                                            <p className="text-sm text-muted-foreground mb-2">Our Office:</p>
                                            <p className="text-sm">
                                                Sanchara Technologies
                                                <br />
                                                123 Dummy Street, Tech Park
                                                <br />
                                                Mysore, Karnataka 570001
                                                <br />
                                                India
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-8 rounded-xl overflow-hidden h-[300px] relative">
                                        <div className="absolute inset-0 flex items-center justify-center bg-muted">
                                            {/* <p className="text-muted-foreground">Map would be displayed here</p> */}
                                            <iframe src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d62372.724400173174!2d76.59809524979207!3d12.295891168240297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m5!1s0x3baf70381d572ef9%3A0x2b89ece8c0f8396d!2sMysuru%2C%20Karnataka!3m2!1d12.295810399999999!2d76.6393805!4m0!5e0!3m2!1sen!2sin!4v1743445939365!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <h3 className="font-medium mb-4">Business Hours</h3>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div>Monday - Friday:</div>
                                            <div>9:00 AM - 6:00 PM IST</div>
                                            <div>Saturday:</div>
                                            <div>10:00 AM - 4:00 PM IST</div>
                                            <div>Sunday:</div>
                                            <div>Closed</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </FadeIn>

                {/* Social Media */}
                <FadeIn delay={0.2}>
                    <div className="text-center mt-12">
                        <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
                        <div className="flex justify-center gap-6">
                            <ButtonAnimation>
                                <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-twitter"
                                    >
                                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                                    </svg>
                                    <span className="sr-only">Twitter</span>
                                </Button>
                            </ButtonAnimation>
                            <ButtonAnimation>
                                <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-instagram"
                                    >
                                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                    </svg>
                                    <span className="sr-only">Instagram</span>
                                </Button>
                            </ButtonAnimation>
                            <ButtonAnimation>
                                <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-facebook"
                                    >
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                    </svg>
                                    <span className="sr-only">Facebook</span>
                                </Button>
                            </ButtonAnimation>
                            <ButtonAnimation>
                                <Button variant="outline" size="icon" className="rounded-full h-12 w-12">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-linkedin"
                                    >
                                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                        <rect width="4" height="12" x="2" y="9" />
                                        <circle cx="4" cy="4" r="2" />
                                    </svg>
                                    <span className="sr-only">LinkedIn</span>
                                </Button>
                            </ButtonAnimation>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </PageTransition>
    )
}

