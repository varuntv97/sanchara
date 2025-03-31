import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PageTransition } from "@/components/animations/page-transition"
import { FadeIn } from "@/components/animations/fade-in"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
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
                            <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
                            <p className="text-muted-foreground">Last updated: March 31, 2025</p>
                        </div>

                        <Card className="mb-8">
                            <CardContent className="p-6">
                                <div className="prose prose-sm max-w-none">
                                    <p className="text-muted-foreground mb-6">
                                        Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Sanchara
                                        website and services operated by Sanchara Technologies.
                                    </p>

                                    <div className="space-y-6">
                                        <section>
                                            <h2 className="text-xl font-semibold mb-3" id="acceptance">
                                                1. Acceptance of Terms
                                            </h2>
                                            <p>
                                                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with
                                                any part of the terms, then you may not access the Service.
                                            </p>
                                            <p className="mt-2">
                                                These Terms apply to all visitors, users, and others who access or use the Service. By accessing
                                                or using any part of the site, you agree to be bound by these Terms of Service. If you do not
                                                agree to all the terms and conditions of this agreement, then you may not access the website or
                                                use any services.
                                            </p>
                                        </section>

                                        <section>
                                            <h2 className="text-xl font-semibold mb-3" id="accounts">
                                                2. Accounts
                                            </h2>
                                            <p>
                                                When you create an account with us, you must provide information that is accurate, complete, and
                                                current at all times. Failure to do so constitutes a breach of the Terms, which may result in
                                                immediate termination of your account on our Service.
                                            </p>
                                            <p className="mt-2">
                                                You are responsible for safeguarding the password that you use to access the Service and for any
                                                activities or actions under your password, whether your password is with our Service or a
                                                third-party service.
                                            </p>
                                            <p className="mt-2">
                                                You agree not to disclose your password to any third party. You must notify us immediately upon
                                                becoming aware of any breach of security or unauthorized use of your account.
                                            </p>
                                        </section>

                                        <section>
                                            <h2 className="text-xl font-semibold mb-3" id="content">
                                                3. Content and Intellectual Property Rights
                                            </h2>
                                            <p>
                                                Our Service allows you to post, link, store, share and otherwise make available certain
                                                information, text, graphics, videos, or other material. You are responsible for the content that
                                                you post to the Service, including its legality, reliability, and appropriateness.
                                            </p>
                                            <p className="mt-2">
                                                By posting content to the Service, you grant us the right to use, modify, publicly perform,
                                                publicly display, reproduce, and distribute such content on and through the Service. You retain
                                                any and all of your rights to any content you submit, post or display on or through the Service
                                                and you are responsible for protecting those rights.
                                            </p>
                                            <p className="mt-2">
                                                You represent and warrant that: (i) the content is yours (you own it) or you have the right to
                                                use it and grant us the rights and license as provided in these Terms, and (ii) the posting of
                                                your content on or through the Service does not violate the privacy rights, publicity rights,
                                                copyrights, contract rights or any other rights of any person.
                                            </p>
                                        </section>

                                        <section>
                                            <h2 className="text-xl font-semibold mb-3" id="service">
                                                4. Use of Service
                                            </h2>
                                            <p>
                                                The Service and its original content, features, and functionality are and will remain the
                                                exclusive property of Sanchara Technologies and its licensors. The Service is protected by
                                                copyright, trademark, and other laws of both India and foreign countries. Our trademarks and
                                                trade dress may not be used in connection with any product or service without the prior written
                                                consent of Sanchara Technologies.
                                            </p>
                                            <p className="mt-2">You agree not to use the Service:</p>
                                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                                <li>In any way that violates any applicable national or international law or regulation.</li>
                                                <li>
                                                    To transmit, or procure the sending of, any advertising or promotional material, including any
                                                    "junk mail", "chain letter," "spam," or any other similar solicitation.
                                                </li>
                                                <li>
                                                    To impersonate or attempt to impersonate Sanchara, a Sanchara employee, another user, or any
                                                    other person or entity.
                                                </li>
                                                <li>
                                                    In any way that infringes upon the rights of others, or in any way is illegal, threatening,
                                                    fraudulent, or harmful, or in connection with any unlawful, illegal, fraudulent, or harmful
                                                    purpose or activity.
                                                </li>
                                            </ul>
                                        </section>

                                        <section>
                                            <h2 className="text-xl font-semibold mb-3" id="liability">
                                                5. Limitation of Liability
                                            </h2>
                                            <p>
                                                In no event shall Sanchara Technologies, nor its directors, employees, partners, agents,
                                                suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or
                                                punitive damages, including without limitation, loss of profits, data, use, goodwill, or other
                                                intangible losses, resulting from:
                                            </p>
                                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                                <li>Your access to or use of or inability to access or use the Service;</li>
                                                <li>Any conduct or content of any third party on the Service;</li>
                                                <li>Any content obtained from the Service; and</li>
                                                <li>
                                                    Unauthorized access, use or alteration of your transmissions or content, whether based on
                                                    warranty, contract, tort (including negligence) or any other legal theory, whether or not we
                                                    have been informed of the possibility of such damage.
                                                </li>
                                            </ul>
                                        </section>

                                        <section>
                                            <h2 className="text-xl font-semibold mb-3" id="disclaimer">
                                                6. Disclaimer
                                            </h2>
                                            <p>
                                                Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS
                                                AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or
                                                implied, including, but not limited to, implied warranties of merchantability, fitness for a
                                                particular purpose, non-infringement or course of performance.
                                            </p>
                                            <p className="mt-2">
                                                Sanchara Technologies, its subsidiaries, affiliates, and its licensors do not warrant that:
                                            </p>
                                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                                <li>
                                                    The Service will function uninterrupted, secure or available at any particular time or
                                                    location;
                                                </li>
                                                <li>Any errors or defects will be corrected;</li>
                                                <li>The Service is free of viruses or other harmful components; or</li>
                                                <li>The results of using the Service will meet your requirements.</li>
                                            </ul>
                                        </section>

                                        <section>
                                            <h2 className="text-xl font-semibold mb-3" id="changes">
                                                7. Changes to Terms
                                            </h2>
                                            <p>
                                                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                                                revision is material we will try to provide at least 30 days' notice prior to any new terms
                                                taking effect. What constitutes a material change will be determined at our sole discretion.
                                            </p>
                                            <p className="mt-2">
                                                By continuing to access or use our Service after those revisions become effective, you agree to
                                                be bound by the revised terms. If you do not agree to the new terms, please stop using the
                                                Service.
                                            </p>
                                        </section>

                                        <section>
                                            <h2 className="text-xl font-semibold mb-3" id="contact">
                                                8. Contact Us
                                            </h2>
                                            <p>If you have any questions about these Terms, please contact us at:</p>
                                            <p className="mt-2">
                                                Email: legal@sanchara-example.com
                                                <br />
                                                Address: Sanchara Technologies, 123 Travel Street, Tech Park, Bengaluru, Karnataka 560001, India
                                            </p>
                                        </section>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex justify-between items-center">
                            <Link href="/privacy">
                                <Button variant="outline">Privacy Policy</Button>
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

