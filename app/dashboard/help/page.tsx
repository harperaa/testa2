import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const faqs = [
  {
    q: "How is calories out calculated?",
    a: "Calories out = your BMR (set in Settings) plus every workout you log that day.",
  },
  {
    q: "What does net balance mean?",
    a: "Net = calories in − calories out. Negative is a deficit (typical for fat loss); positive is a surplus (typical for muscle gain).",
  },
  {
    q: "How do I log food quickly?",
    a: "Use Food library for one-tap meals, or Add meal on the dashboard / Log page for custom entries.",
  },
  {
    q: "Where do I change my goal?",
    a: "Open Settings (or Edit goal on the fitness goal card) to set goal type, daily calorie target, BMR, and weights.",
  },
]

export default function HelpPage() {
  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Help</h2>
        <p className="text-muted-foreground text-sm">
          How Grok Fit tracks calories in, calories out, and goals.
        </p>
      </div>

      <div className="grid gap-3 max-w-3xl">
        {faqs.map((item) => (
          <Card key={item.q}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{item.q}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              {item.a}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button asChild className="bg-emerald-500 text-white hover:bg-emerald-600">
          <Link href="/dashboard/log">Open log</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/dashboard/settings">Settings</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/blog">Read guides</Link>
        </Button>
      </div>
    </div>
  )
}
