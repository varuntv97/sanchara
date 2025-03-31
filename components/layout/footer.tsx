import Link from "next/link"
import { Plane, ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Plane color="#3b82f6" className="h-6 w-6" />
              <span className="font-bold text-xl">Sanchara</span>
            </Link>
            <p className="text-sm text-muted-foreground">AI-powered travel planning made simple.</p>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="font-medium">Company</h3>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
              About
            </Link>
            <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">
              Blog
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="font-medium">Legal</h3>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
              Cookie Policy
            </Link>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="font-medium">Connect</h3>
            <Link href="https://twitter.com" className="text-sm text-muted-foreground hover:text-foreground">
              Twitter
            </Link>
            <Link href="https://instagram.com" className="text-sm text-muted-foreground hover:text-foreground">
              Instagram
            </Link>
            <Link href="https://facebook.com" className="text-sm text-muted-foreground hover:text-foreground">
              Facebook
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground">
          <div>&copy; {new Date().getFullYear()} Sanchara. All rights reserved.</div>
          <a
            href="https://www.varuntv.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 sm:mt-0 font-medium transition-colors hover:text-primary cursor-pointer flex items-center gap-1 group"
          >
            Developed by 📺
            <ExternalLink className="h-3 w-3 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  )
}

