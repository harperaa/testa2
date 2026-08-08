"use client"

import * as React from "react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useFitnessDashboard } from "../use-fitness-dashboard"

export default function SearchPage() {
  useFitnessDashboard()
  const [q, setQ] = React.useState("")
  const debounced = useDebounced(q, 250)
  const results = useQuery(
    api.fitness.searchEntries,
    debounced.trim() ? { q: debounced } : "skip"
  )

  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Search log</h2>
        <p className="text-muted-foreground text-sm">
          Find past meals and workouts by name or category.
        </p>
      </div>

      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search e.g. chicken, run, snack…"
        className="max-w-md"
        autoFocus
      />

      <Card className="max-w-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">
            {debounced.trim()
              ? `Results for “${debounced.trim()}”`
              : "Type to search"}
          </CardTitle>
        </CardHeader>
        <CardContent className="divide-y">
          {!debounced.trim() ? (
            <p className="text-muted-foreground py-6 text-sm">
              Enter at least one character to search your history.
            </p>
          ) : results === undefined ? (
            <p className="text-muted-foreground py-6 text-sm">Searching…</p>
          ) : results.length === 0 ? (
            <p className="text-muted-foreground py-6 text-sm">No matches.</p>
          ) : (
            results.map((entry) => (
              <div
                key={entry._id}
                className="flex flex-wrap items-center justify-between gap-2 py-3"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{entry.name}</span>
                    <Badge variant="outline">{entry.category}</Badge>
                    <Badge variant="secondary">{entry.kind}</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm tabular-nums">
                    {entry.date} · {entry.time}
                  </p>
                </div>
                <span className="font-semibold tabular-nums">
                  {entry.calories} kcal
                </span>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function useDebounced(value: string, ms: number) {
  const [v, setV] = React.useState(value)
  React.useEffect(() => {
    const t = setTimeout(() => setV(value), ms)
    return () => clearTimeout(t)
  }, [value, ms])
  return v
}
