import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageTransition } from "@/components/animations/page-transition"
import { FadeIn } from "@/components/animations/fade-in"
import { ArrowLeft, Shield, Eye, Database, Lock, UserCheck } from "lucide-react"

export default function PrivacyPolicyPage() {
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
                            <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
                            <p className="text-muted-foreground">Last updated: March 31, 2025</p>
                        </div>

                        <div className="mb-8 flex flex-wrap gap-4">
                            <Card className="p-4 flex-1 min-w-[200px]">
                                <div className="flex flex-col items-center text-center">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                                        <Shield className="h-5 w-5 text-primary" />
                                    </div>
                                    <h3 className="font-medium mb-1">Data Protection</h3>
                                    <p className="text-sm text-muted-foreground">
                                        We implement robust security measures to protect your data
                                    </p>
                                </div>
                            </Card>

                            <Card className="p-4 flex-1 min-w-[200px]">
                                <div className="flex flex-col items-center text-center">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                                        <Eye className="h-5 w-5 text-primary" />
                                    </div>
                                    <h3 className="font-medium mb-1">Transparency</h3>
                                    <p className="text-sm text-muted-foreground">
                                        We're clear about what data we collect and how we use it
                                    </p>
                                </div>
                            </Card>

                            <Card className="p-4 flex-1 min-w-[200px]">
                                <div className="flex flex-col items-center text-center">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                                        <UserCheck className="h-5 w-5 text-primary" />
                                    </div>
                                    <h3 className="font-medium mb-1">Your Control</h3>
                                    <p className="text-sm text-muted-foreground">You have control over your personal information</p>
                                </div>
                            </Card>
                        </div>

                        <Tabs defaultValue="policy" className="mb-8">
                            <TabsList className="w-full">
                                <TabsTrigger value="policy">Full Policy</TabsTrigger>
                                <TabsTrigger value="summary">Summary</TabsTrigger>
                            </TabsList>

                            <TabsContent value="policy">
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="prose prose-sm max-w-none">
                                            <p className="text-muted-foreground mb-6">
                                                This Privacy Policy describes how Sanchara ("we", "our", or "us") collects, uses, and discloses
                                                your personal information when you use our website and services.
                                            </p>

                                            <div className="space-y-6">
                                                <section>
                                                    <h2 className="text-xl font-semibold mb-3" id="information-collection">
                                                        1. Information We Collect
                                                    </h2>
                                                    <p>We collect several types of information from and about users of our website, including:</p>
                                                    <ul className="list-disc pl-6 mt-2 space-y-1">
                                                        <li>
                                                            <strong>Personal Information:</strong> This includes information that can be used to
                                                            identify you, such as your name, email address, postal address, phone number, and other
                                                            identifiers.
                                                        </li>
                                                        <li>
                                                            <strong>Account Information:</strong> Information you provide when you register for an
                                                            account, such as your username, password, and profile information.
                                                        </li>
                                                        <li>
                                                            <strong>Travel Preferences:</strong> Information about your travel preferences, interests,
                                                            budget, and other details you provide when creating itineraries.
                                                        </li>
                                                        <li>
                                                            <strong>Usage Data:</strong> Information about how you use our website, including your
                                                            browsing history, search queries, and interactions with our services.
                                                        </li>
                                                        <li>
                                                            <strong>Device Information:</strong> Information about the device you use to access our
                                                            website, including IP address, browser type, operating system, and device identifiers.
                                                        </li>
                                                    </ul>
                                                </section>

                                                <section>
                                                    <h2 className="text-xl font-semibold mb-3" id="information-use">
                                                        2. How We Use Your Information
                                                    </h2>
                                                    <p>We use the information we collect for various purposes, including:</p>
                                                    <ul className="list-disc pl-6 mt-2 space-y-1">
                                                        <li>To provide, maintain, and improve our services</li>
                                                        <li>To create personalized travel itineraries based on your preferences</li>
                                                        <li>To process and complete transactions</li>
                                                        <li>To send you technical notices, updates, security alerts, and support messages</li>
                                                        <li>To respond to your comments, questions, and requests</li>
                                                        <li>To communicate with you about products, services, offers, and events</li>
                                                        <li>
                                                            To monitor and analyze trends, usage, and activities in connection with our services
                                                        </li>
                                                        <li>
                                                            To detect, investigate, and prevent fraudulent transactions and other illegal activities
                                                        </li>
                                                        <li>To personalize your experience and deliver content relevant to your interests</li>
                                                    </ul>
                                                </section>

                                                <section>
                                                    <h2 className="text-xl font-semibold mb-3" id="information-sharing">
                                                        3. Sharing of Information
                                                    </h2>
                                                    <p>We may share your personal information in the following situations:</p>
                                                    <ul className="list-disc pl-6 mt-2 space-y-1">
                                                        <li>
                                                            <strong>With Service Providers:</strong> We may share your information with third-party
                                                            vendors, service providers, contractors, or agents who perform services for us.
                                                        </li>
                                                        <li>
                                                            <strong>With Business Partners:</strong> We may share your information with our business
                                                            partners to offer you certain products, services, or promotions.
                                                        </li>
                                                        <li>
                                                            <strong>With Your Consent:</strong> We may share your information with third parties when
                                                            you have given us your consent to do so.
                                                        </li>
                                                        <li>
                                                            <strong>For Legal Reasons:</strong> We may disclose your information if required to do so
                                                            by law or in response to valid requests by public authorities.
                                                        </li>
                                                        <li>
                                                            <strong>Business Transfers:</strong> We may share or transfer your information in
                                                            connection with, or during negotiations of, any merger, sale of company assets, financing,
                                                            or acquisition of all or a portion of our business to another company.
                                                        </li>
                                                    </ul>
                                                </section>

                                                <section>
                                                    <h2 className="text-xl font-semibold mb-3" id="cookies">
                                                        4. Cookies and Tracking Technologies
                                                    </h2>
                                                    <p>
                                                        We use cookies and similar tracking technologies to track activity on our website and store
                                                        certain information. You can instruct your browser to refuse all cookies or to indicate when
                                                        a cookie is being sent. However, if you do not accept cookies, you may not be able to use
                                                        some portions of our service.
                                                    </p>
                                                    <p className="mt-2">
                                                        For more information about the cookies we use, please see our{" "}
                                                        <Link href="/cookies" className="text-primary hover:underline">
                                                            Cookie Policy
                                                        </Link>
                                                        .
                                                    </p>
                                                </section>

                                                <section>
                                                    <h2 className="text-xl font-semibold mb-3" id="data-security">
                                                        5. Data Security
                                                    </h2>
                                                    <p>
                                                        We have implemented appropriate technical and organizational security measures designed to
                                                        protect the security of any personal information we process. However, please also remember
                                                        that we cannot guarantee that the internet itself is 100% secure. Although we will do our
                                                        best to protect your personal information, transmission of personal information to and from
                                                        our website is at your own risk.
                                                    </p>
                                                    <p className="mt-2">
                                                        We maintain appropriate data collection, storage, and processing practices as well as
                                                        security measures to protect against unauthorized access, alteration, disclosure, or
                                                        destruction of your personal information, username, password, transaction information, and
                                                        data stored on our website.
                                                    </p>
                                                </section>

                                                <section>
                                                    <h2 className="text-xl font-semibold mb-3" id="data-retention">
                                                        6. Data Retention
                                                    </h2>
                                                    <p>
                                                        We will retain your personal information only for as long as is necessary for the purposes
                                                        set out in this Privacy Policy. We will retain and use your information to the extent
                                                        necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
                                                    </p>
                                                </section>

                                                <section>
                                                    <h2 className="text-xl font-semibold mb-3" id="your-rights">
                                                        7. Your Data Protection Rights
                                                    </h2>
                                                    <p>
                                                        Depending on your location, you may have certain rights regarding your personal information,
                                                        including:
                                                    </p>
                                                    <ul className="list-disc pl-6 mt-2 space-y-1">
                                                        <li>
                                                            <strong>Right to Access:</strong> You have the right to request copies of your personal
                                                            information.
                                                        </li>
                                                        <li>
                                                            <strong>Right to Rectification:</strong> You have the right to request that we correct any
                                                            information you believe is inaccurate or complete information you believe is incomplete.
                                                        </li>
                                                        <li>
                                                            <strong>Right to Erasure:</strong> You have the right to request that we erase your
                                                            personal information, under certain conditions.
                                                        </li>
                                                        <li>
                                                            <strong>Right to Restrict Processing:</strong> You have the right to request that we
                                                            restrict the processing of your personal information, under certain conditions.
                                                        </li>
                                                        <li>
                                                            <strong>Right to Object to Processing:</strong> You have the right to object to our
                                                            processing of your personal information, under certain conditions.
                                                        </li>
                                                        <li>
                                                            <strong>Right to Data Portability:</strong> You have the right to request that we transfer
                                                            the data we have collected to another organization, or directly to you, under certain
                                                            conditions.
                                                        </li>
                                                    </ul>
                                                    <p className="mt-2">
                                                        If you make a request, we have one month to respond to you. If you would like to exercise
                                                        any of these rights, please contact us at privacy@sanchara-example.com.
                                                    </p>
                                                </section>

                                                <section>
                                                    <h2 className="text-xl font-semibold mb-3" id="children">
                                                        8. Children's Privacy
                                                    </h2>
                                                    <p>
                                                        Our service is not intended for use by children under the age of 13. We do not knowingly
                                                        collect personally identifiable information from children under 13. If you are a parent or
                                                        guardian and you are aware that your child has provided us with personal information, please
                                                        contact us so that we can take necessary actions.
                                                    </p>
                                                </section>

                                                <section>
                                                    <h2 className="text-xl font-semibold mb-3" id="changes">
                                                        9. Changes to This Privacy Policy
                                                    </h2>
                                                    <p>
                                                        We may update our Privacy Policy from time to time. We will notify you of any changes by
                                                        posting the new Privacy Policy on this page and updating the "Last updated" date at the top
                                                        of this Privacy Policy.
                                                    </p>
                                                    <p className="mt-2">
                                                        You are advised to review this Privacy Policy periodically for any changes. Changes to this
                                                        Privacy Policy are effective when they are posted on this page.
                                                    </p>
                                                </section>

                                                <section>
                                                    <h2 className="text-xl font-semibold mb-3" id="contact">
                                                        10. Contact Us
                                                    </h2>
                                                    <p>If you have any questions about this Privacy Policy, please contact us:</p>
                                                    <p className="mt-2">
                                                        Email: privacy@sanchara-example.com
                                                        <br />
                                                        Address: Sanchara Technologies, 123 Travel Street, Tech Park, Bengaluru, Karnataka 560001,
                                                        India
                                                    </p>
                                                </section>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="summary">
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                    <Database className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium mb-1">Information We Collect</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        We collect personal information, account details, travel preferences, usage data, and device
                                                        information to provide our services.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                    <Eye className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium mb-1">How We Use Your Information</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        We use your information to provide personalized travel itineraries, process transactions,
                                                        communicate with you, and improve our services.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                    <Lock className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium mb-1">Data Security</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        We implement appropriate security measures to protect your personal information, but no
                                                        method of transmission over the internet is 100% secure.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                    <UserCheck className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium mb-1">Your Rights</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Depending on your location, you have rights to access, correct, delete, and transfer your
                                                        personal information. Contact us to exercise these rights.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-4 p-4 bg-muted rounded-lg">
                                                <p className="text-sm">
                                                    This is a simplified summary of our Privacy Policy. For complete details, please read the full
                                                    Privacy Policy.
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>

                        <div className="flex justify-between items-center">
                            <Link href="/terms">
                                <Button variant="outline">Terms of Service</Button>
                            </Link>
                            <Link href="/cookies">
                                <Button variant="outline">Cookie Policy</Button>
                            </Link>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </PageTransition>
    )
}

