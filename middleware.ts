import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value || null;
                },
                set(name: string, value: string, options?: any) {
                    response.cookies.set(name, value, options);
                },
                remove(name: string) {
                    response.cookies.delete(name);
                },
            },
        },
    )

    const {
        data: { session },
    } = await supabase.auth.getSession()

    // If there's no session and the user is trying to access a protected route
    if (
        !session &&
        (request.nextUrl.pathname.startsWith("/dashboard") ||
            request.nextUrl.pathname.startsWith("/create-itinerary") ||
            request.nextUrl.pathname.startsWith("/itinerary"))
    ) {
        const redirectUrl = new URL("/login", request.url)
        redirectUrl.searchParams.set("redirectedFrom", request.nextUrl.pathname)
        return NextResponse.redirect(redirectUrl)
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
}

