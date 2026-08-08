"use client"

import * as React from "react"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import type { Id } from "@/convex/_generated/dataModel"
import { IconPlus, IconTrash } from "@tabler/icons-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AddEntryDialog } from "../add-entry-dialog"
import { useFitnessDashboard } from "../use-fitness-dashboard"
import { localDateString } from "@/lib/fitness"

export default function LogPage() {
  return (
    <Suspense fallback={<div className="text-muted-foreground px-6 py-8 text-sm">Loading log…</div>}>
      <LogPageInner />
    </Suspense>
  )
}

function LogPageInner() {
  const searchParams = useSearchParams()
  const [date, setDate] = React.useState(localDateString())
  const [kindFilter, setKindFilter] = React.useState<"all" | "meal" | "workout">("all")
  const [open, setOpen] = React.useState(false)
  const [defaultKind, setDefaultKind] = React.useState<"meal" | "workout">("meal")

  useFitnessDashboard(date)

  const entries = useQuery(api.fitness.listEntries, {
    date,
    kind: kindFilter === "all" ? undefined : kindFilter,
  })
  const deleteEntry = useMutation(api.fitness.deleteEntry)
  const updateEntry = useMutation(api.fitness.updateEntry)

  React.useEffect(() => {
    const add = searchParams.get("add")
    if (add === "meal" || add === "workout") {
      setDefaultKind(add)
      setOpen(true)
    }
  }, [searchParams])

  const onDelete = async (id: Id<"fitnessEntries">, name: string) => {
    try {
      await deleteEntry({ entryId: id })
      toast.success(`Removed ${name}`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed")
    }
  }

  const markLogged = async (id: Id<"fitnessEntries">) => {
    try {
      await updateEntry({ entryId: id, status: "logged" })
      toast.success("Marked as logged")
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Update failed")
    }
  }

  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Log</h2>
          <p className="text-muted-foreground text-sm">
            Manage meals and workouts for any day.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setDefaultKind("workout")
              setOpen(true)
            }}
          >
            <IconPlus className="size-4" />
            Workout
          </Button>
          <Button
            className="bg-emerald-500 text-white hover:bg-emerald-600"
            onClick={() => {
              setDefaultKind("meal")
              setOpen(true)
            }}
          >
            <IconPlus className="size-4" />
            Meal
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Filters</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <div className="space-y-2">
            <Label htmlFor="log-date">Date</Label>
            <Input
              id="log-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-44"
            />
          </div>
          <div className="space-y-2">
            <Label>Type</Label>
            <Select
              value={kindFilter}
              onValueChange={(v) => setKindFilter(v as typeof kindFilter)}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="meal">Meals</SelectItem>
                <SelectItem value="workout">Workouts</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="divide-y pt-4">
          {entries === undefined ? (
            <p className="text-muted-foreground py-8 text-center text-sm">Loading…</p>
          ) : entries.length === 0 ? (
            <p className="text-muted-foreground py-8 text-center text-sm">
              No entries for this day. Add a meal or workout to get started.
            </p>
          ) : (
            entries.map((entry) => (
              <div
                key={entry._id}
                className="flex flex-wrap items-center justify-between gap-3 py-3"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{entry.name}</span>
                    <Badge variant="outline">{entry.category}</Badge>
                    <Badge variant={entry.kind === "meal" ? "secondary" : "default"}>
                      {entry.kind}
                    </Badge>
                    {entry.status === "pending" && (
                      <Badge variant="outline" className="border-amber-500 text-amber-600">
                        pending
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm tabular-nums">
                    {entry.time} · {entry.calories} kcal
                  </p>
                </div>
                <div className="flex gap-2">
                  {entry.status === "pending" && (
                    <Button size="sm" variant="outline" onClick={() => markLogged(entry._id)}>
                      Mark logged
                    </Button>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => onDelete(entry._id, entry.name)}
                    aria-label={`Delete ${entry.name}`}
                  >
                    <IconTrash className="size-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <AddEntryDialog
        open={open}
        onOpenChange={setOpen}
        defaultKind={defaultKind}
        defaultDate={date}
      />
    </div>
  )
}
