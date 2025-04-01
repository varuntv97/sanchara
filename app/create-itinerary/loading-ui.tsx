import { Settings, Sparkles, FileText, CheckCircle, Loader2 } from "lucide-react"

export function ItineraryLoadingUI({ stage, progress }: { stage: string; progress: number }) {
    const stageMessages = {
        preparing: "Preparing your request...",
        generating: "Generating your personalized itinerary...",
        processing: "Processing your itinerary...",
        complete: "Itinerary complete! Redirecting...",
    }

    const stageIcons = {
        preparing: <Settings className="h-6 w-6 animate-spin" />,
        generating: <Sparkles className="h-6 w-6 animate-pulse" />,
        processing: <FileText className="h-6 w-6 animate-bounce" />,
        complete: <CheckCircle className="h-6 w-6 text-green-500" />,
    }

    return (
        <div className="space-y-4 py-8">
            <div className="flex items-center justify-center">
                {stageIcons[stage as keyof typeof stageIcons] || <Loader2 className="h-6 w-6 animate-spin" />}
            </div>

            <p className="text-center font-medium">{stageMessages[stage as keyof typeof stageMessages] || "Loading..."}</p>

            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                    className="bg-primary h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
                This may take up to a minute. We're crafting the perfect itinerary for you.
            </p>
        </div>
    )
}

