// lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const cookie = cookieStore.get(name);
          return cookie ? cookie.value : null;
        },
        set(key: string, value: string, options: any) {
          try {
            cookieStore.set({
              name: key,
              value,
              ...options,
            });
          } catch (error) {
            // This will throw in middleware, but we can ignore it
            console.error("Cookie setting error (can be ignored in middleware):", error);
          }
        },
      },
    }
  );
}