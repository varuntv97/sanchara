import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PageTransition } from "@/components/animations/page-transition"
import { FadeIn } from "@/components/animations/fade-in"
import { ArrowLeft, Cookie, Settings, Info } from "lucide-react"

export default function CookiePolicyPage() {
    const cookieTypes = [
        {
            type: "Essential Cookies",
            description:
                "These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms.",
            examples: ["Authentication cookies", "Security cookies", "Load balancing cookies"],
        },
        {
            type: "Performance Cookies",
            description:
                "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.",
            examples: ["Google Analytics", "Cloudflare analytics", "Performance monitoring"],
        },
        {
            type: "Functional Cookies",
            description:
                "These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages.",
            examples: ["Language preference cookies", "Region selection cookies", "User interface customization"],
        },
        {
            type: "Targeting Cookies",
            description:
                "These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.",
            examples: ["Social media sharing cookies", "Ad network cookies", "Marketing cookies"],
        },
    ]

    return (
        <PageTransition>
            <div className="container py-12">
                <FadeIn>
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-8">
                            <Link href="/">
                                <Button variant="ghost" size="sm" className="mb-4">
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                                </Button>
                            </Link>
                            <h1 className="text-3xl font-bold mb-2">Cookie Policy</h1>
                            <p className="text-muted-foreground">Last updated: March 31, 2025</p>
                        </div>

                        <div className="mb-8 bg-muted p-6 rounded-xl">
                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                                    <Cookie className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold mb-2">What Are Cookies?</h2>
                                    <p className="text-muted-foreground">
                                        Cookies are small text files that are placed on your device when you visit a website. They are
                                        widely used to make websites work more efficiently and provide information to the website owners.
                                        Cookies help us understand how you use our website, remember your preferences, and improve your
                                        overall experience.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Card className="mb-8">
                            <CardContent className="p-6">
                                <div className="prose prose-sm max-w-none">
                                    <section className="mb-6">
                                        <h2 className="text-xl font-semibold mb-3" id="how-we-use">
                                            How We Use Cookies
                                        </h2>
                                        <p>Sanchara uses cookies for a variety of purposes, including:</p>
                                        <ul className="list-disc pl-6 mt-2 space-y-1">
                                            <li>To enable core functionality such as user authentication and security</li>
                                            <li>To remember your preferences and settings</li>
                                            <li>To analyze how you use our website so we can improve it</li>
                                            <li>To personalize your experience and deliver content relevant to your interests</li>
                                            <li>To measure the effectiveness of our marketing campaigns</li>
                                        </ul>
                                    </section>

                                    <section className="mb-6">
                                        <h2 className="text-xl font-semibold mb-3" id="types">
                                            Types of Cookies We Use
                                        </h2>
                                        <Accordion type="single" collapsible className="w-full">
                                            {cookieTypes.map((cookie, index) => (
                                                <AccordionItem key={index} value={`item-${index}`}>
                                                    <AccordionTrigger className="text-left font-medium">{cookie.type}</AccordionTrigger>
                                                    <AccordionContent>
                                                        <p className="mb-2 text-muted-foreground">{cookie.description}</p>
                                                        <div className="mt-3">
                                                            <p className="font-medium mb-1">Examples:</p>
                                                            <ul className="list-disc pl-6 space-y-1">
                                                                {cookie.examples.map((example, i) => (
                                                                    <li key={i} className="text-sm">
                                                                        {example}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    </section>

                                    <section className="mb-6">
                                        <h2 className="text-xl font-semibold mb-3" id="third-party">
                                            Third-Party Cookies
                                        </h2>
                                        <p>
                                            In addition to our own cookies, we may also use various third-party cookies to report usage
                                            statistics of the service, deliver advertisements on and through the service, and so on.
                                        </p>
                                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="border rounded-lg p-4">
                                                <h3 className="font-medium mb-2">Analytics Providers</h3>
                                                <ul className="list-disc pl-6 space-y-1 text-sm">
                                                    <li>Google Analytics</li>
                                                    <li>Hotjar</li>
                                                    <li>Mixpanel</li>
                                                </ul>
                                            </div>
                                            <div className="border rounded-lg p-4">
                                                <h3 className="font-medium mb-2">Marketing & Advertising</h3>
                                                <ul className="list-disc pl-6 space-y-1 text-sm">
                                                    <li>Google Ads</li>
                                                    <li>Facebook Pixel</li>
                                                    <li>LinkedIn Insight Tag</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="mb-6">
                                        <h2 className="text-xl font-semibold mb-3" id="managing">
                                            Managing Cookies
                                        </h2>
                                        <p>
                                            Most web browsers allow you to control cookies through their settings preferences. However, if you
                                            limit the ability of websites to set cookies, you may impact your overall user experience. Below
                                            are links to instructions on how to manage cookies in common web browsers:
                                        </p>
                                        <ul className="list-disc pl-6 mt-2 space-y-1">
                                            <li>
                                                <a href="#" className="text-primary hover:underline">
                                                    Google Chrome
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="text-primary hover:underline">
                                                    Mozilla Firefox
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="text-primary hover:underline">
                                                    Apple Safari
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="text-primary hover:underline">
                                                    Microsoft Edge
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="mt-4 p-4 bg-muted rounded-lg flex items-start gap-3">
                                            <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                            <p className="text-sm">
                                                Please note that disabling cookies may affect the functionality of this and many other websites
                                                that you visit. Therefore, it is recommended that you do not disable cookies.
                                            </p>
                                        </div>
                                    </section>

                                    <section className="mb-6">
                                        <h2 className="text-xl font-semibold mb-3" id="consent">
                                            Cookie Consent
                                        </h2>
                                        <p>
                                            When you first visit our website, you will be shown a cookie banner requesting your consent to set
                                            cookies. By clicking "Accept All Cookies," you consent to the use of all cookies described in this
                                            policy. You can choose to decline non-essential cookies by clicking "Cookie Settings" and
                                            selecting your preferences.
                                        </p>
                                        <p className="mt-2">
                                            You can change your cookie preferences at any time by clicking on the "Cookie Settings" link in
                                            the footer of our website.
                                        </p>
                                        <div className="mt-4 flex gap-4">
                                            <div className="flex items-center gap-2">
                                                <Settings className="h-5 w-5 text-primary" />
                                                <Button variant="outline" size="sm">
                                                    Cookie Settings
                                                </Button>
                                            </div>
                                        </div>
                                    </section>

                                    <section className="mb-6">
                                        <h2 className="text-xl font-semibold mb-3" id="changes">
                                            Changes to This Cookie Policy
                                        </h2>
                                        <p>
                                            We may update our Cookie Policy from time to time. We will notify you of any changes by posting
                                            the new Cookie Policy on this page and updating the "Last updated" date at the top of this Cookie
                                            Policy.
                                        </p>
                                        <p className="mt-2">
                                            You are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie
                                            Policy are effective when they are posted on this page.
                                        </p>
                                    </section>

                                    <section>
                                        <h2 className="text-xl font-semibold mb-3" id="contact">
                                            Contact Us
                                        </h2>
                                        <p>If you have any questions about our Cookie Policy, please contact us:</p>
                                        <p className="mt-2">
                                            Email: privacy@sanchara-example.com
                                            <br />
                                            Address: Sanchara Technologies, 123 Travel Street, Tech Park, Bengaluru, Karnataka 560001, India
                                        </p>
                                    </section>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-between items-center">
                            <Link href="/terms">
                                <Button variant="outline">Terms of Service</Button>
                            </Link>
                            <Link href="/privacy">
                                <Button variant="outline">Privacy Policy</Button>
                            </Link>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </PageTransition>
    )
}

